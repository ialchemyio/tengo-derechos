-- Phase 9: live, partner-editable resource directory.
-- Idempotent. Safe to re-run.

create extension if not exists "pgcrypto";

do $$ begin
  create type resource_category as enum
    ('legal','clinic','hotline','food','shelter','consulate');
exception when duplicate_object then null; end $$;

do $$ begin
  create type resource_cost as enum ('free','sliding','low','varies');
exception when duplicate_object then null; end $$;

create table if not exists public.resources (
  id            text primary key,
  name          text not null,
  category      resource_category not null,
  city          text,
  state         text,
  phone         text,
  website       text,
  languages     text[] not null default '{}',
  cost          resource_cost not null default 'varies',
  emergency     boolean not null default false,
  notes_en      text,
  notes_es      text,

  submitted_by  text,
  verified_at   timestamptz,
  verified_by   text,
  published     boolean not null default false,

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists resources_category_idx on public.resources (category);
create index if not exists resources_published_idx on public.resources (published);
create index if not exists resources_state_idx on public.resources (state);

create or replace function public.set_resources_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_resources_updated_at on public.resources;
create trigger trg_resources_updated_at
before update on public.resources
for each row execute function public.set_resources_updated_at();

-- Row-level security: anon can SELECT only published rows.
-- Authenticated callers (admin token via service-role bypass) can do anything.
alter table public.resources enable row level security;

drop policy if exists resources_anon_read_published on public.resources;
create policy resources_anon_read_published
  on public.resources
  for select
  to anon
  using (published = true);

-- Authenticated users (e.g. magic-link admins) can read everything.
drop policy if exists resources_auth_read_all on public.resources;
create policy resources_auth_read_all
  on public.resources
  for select
  to authenticated
  using (true);

-- Authenticated users can insert pending submissions; published defaults false.
drop policy if exists resources_auth_insert_pending on public.resources;
create policy resources_auth_insert_pending
  on public.resources
  for insert
  to authenticated
  with check (true);

-- Update + delete are restricted to service-role (which bypasses RLS).
-- Public submissions go through the server-side route handler with the
-- service-role key, never directly from the client.
