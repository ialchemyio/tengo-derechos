# Deploying Tengo Derechos to Coolify

This is the deploy runbook for `tengoderechos.org` on a self-hosted Coolify
instance. Time to first request: about 25 minutes from a clean Coolify install.

You will need:

- DNS control for `tengoderechos.org` (you already own it).
- A Coolify v4 instance (any VPS — Hetzner, DigitalOcean, OVH, etc.).
- The repo pushed to a git remote that Coolify can reach (GitHub, GitLab,
  or a self-hosted Gitea).
- Optional but recommended: a Supabase project, a Stripe live account,
  and an `ADMIN_TOKEN` of at least 32 random bytes.

The site degrades gracefully when these are absent — donations show a
friendly 503, resources fall back to the seed array, the admin console
displays an "Admin disabled" message — so you can ship today and add
integrations later.

---

## 1. Point DNS

Add an `A` record:

```
tengoderechos.org    A    <coolify-server-ipv4>     proxied=false  TTL=300
www.tengoderechos.org CNAME tengoderechos.org       TTL=300
```

If your registrar offers DNSSEC, leave it enabled — Coolify's Caddy works
fine behind it.

Verify:

```sh
dig +short tengoderechos.org
dig +short www.tengoderechos.org
```

Both should return the Coolify server IP within a minute.

---

## 2. Push the repo

```sh
cd ~/tengo-derechos
git remote add origin git@github.com:<your-org>/tengo-derechos.git
git push -u origin main
```

If the repo is private, add a Coolify deploy key under the project's
"Source" settings.

---

## 3. Create the Coolify resource

In Coolify v4:

1. **Projects → New Project → Tengo Derechos**.
2. **Add new resource → Application → Public Repository** (or your provider).
3. **Repository URL**: paste the git URL.
4. **Branch**: `main`.
5. **Build pack**: `Dockerfile` (Coolify auto-detects ours).
6. **Ports exposed**: `3000`.
7. **Domain**: `tengoderechos.org` and `www.tengoderechos.org` — Coolify
   will issue Let's Encrypt for both automatically.

Click **Create**.

---

## 4. Set environment variables

In the Application page, **Environment Variables** tab. Mark each as
**Build Variable** when noted, otherwise runtime is fine.

### Required

```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://tengoderechos.org           # build variable
NEXT_PUBLIC_BUILD_ID=${COOLIFY_DEPLOYMENT_UUID}          # build variable, baked into SW cache
ADMIN_TOKEN=<32+ random bytes — `openssl rand -hex 32`>
```

### Strongly recommended

```
NEXT_PUBLIC_NONPROFIT_STATUS=pending                     # change to confirmed when 501c3 lands
NEXT_PUBLIC_NONPROFIT_EIN=                               # set when confirmed
```

### Stripe (when you're ready to take live donations)

```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...                          # from Stripe → Developers → Webhooks
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRICE_MONTHLY_25=price_...                        # optional, see Phase 7 commit
```

While the keys are absent, the donation flow returns a graceful 503 with
the message "Donations are not yet enabled."

### Supabase (when you're ready to enable live resources directory)

```
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RESOURCES_ADMIN_EMAIL=team@tengoderechos.org             # optional, fires moderator email on submit
RESEND_API_KEY=re_...                                    # optional
```

Without these, `/resources` falls back to the 8-row seed array and
`/resources/submit` writes to `data/resource-submissions.jsonl`.

### PWA audio precache (optional)

```
NEXT_PUBLIC_PWA_AUDIO=0                                  # 1 = also precache audio (~280KB extra)
```

---

## 5. Persistent storage

The runtime writes to `data/`:

- `data/content-attestations.json` — every attorney sign-off via
  `/admin/reviews`. **Must persist across deploys.**
- `data/donations.jsonl` — Stripe webhook audit log.
- `data/resource-submissions.jsonl` — only used when Supabase is unset.

In the Coolify Application page → **Persistent Storages** tab, add:

| Name        | Type          | Source     | Mount path |
|-------------|---------------|------------|------------|
| td-data     | Volume        | (auto)     | `/app/data` |

Coolify creates a Docker named volume; data survives redeploys and image
rebuilds.

---

## 6. (Optional) Apply Supabase migrations

If you set the Supabase env vars above, before your first sign-up flow:

```sh
cd ~/tengo-derechos
psql "$SUPABASE_DB_URL" -f supabase/migrations/0001_resources.sql
psql "$SUPABASE_DB_URL" -f supabase/migrations/0002_seed_resources.sql
```

The migrations are idempotent (`if not exists`, `on conflict do nothing`),
so re-running on subsequent deploys is safe.

---

## 7. Deploy

Click **Deploy** in Coolify. Watch the build logs:

1. `node:22-alpine AS deps` → `npm ci`
2. `AS builder` → `npm run build` → `Generating static pages (90/90)`
3. `AS runner` → image pushed to local registry → container started

First deploy: ~3 minutes including Let's Encrypt issuance. Subsequent:
~90 seconds.

---

## 8. Post-deploy checks

After Coolify shows **Healthy**:

```sh
# Site renders
curl -sI https://tengoderechos.org | head -1            # → HTTP/2 200

# Sitemap is fresh
curl -s https://tengoderechos.org/sitemap.xml | head

# Service worker has the right cache version baked in
curl -s https://tengoderechos.org/sw.js | grep "Cache version:"
# → Cache version: <COOLIFY_DEPLOYMENT_UUID>

# Security disclosure visible
curl -s https://tengoderechos.org/.well-known/security.txt

# Embed cards work
curl -sI https://tengoderechos.org/embed/ice-at-door | grep -i "content-security-policy"
# → content-security-policy: frame-ancestors *;

# Admin gate works (without cookie)
curl -s https://tengoderechos.org/admin/reviews | grep "Admin token"
```

---

## 9. Smoke test the donation flow

Visit `https://tengoderechos.org/donate`. With Stripe live keys set:

1. Click **Donate now**, $25, monthly off.
2. Stripe Checkout opens — pay with card `4242 4242 4242 4242`.
3. Land on `/donate/thank-you` with the heart pulsing.
4. Stripe → Developers → Events: see `checkout.session.completed`.
5. SSH into the container or open Coolify's file browser → confirm
   `/app/data/donations.jsonl` has a new line.

Without Stripe keys, the **Donate now** button returns 503 with the
friendly message — that's expected.

---

## 10. Smoke test the admin sign-off flow

```sh
# Set the cookie (replace with your real ADMIN_TOKEN)
curl -c /tmp/td.cookies -X POST \
  https://tengoderechos.org/admin/reviews \
  --data-urlencode "token=<your ADMIN_TOKEN>"
```

Then visit `https://tengoderechos.org/admin/reviews` in a browser with
that cookie set. You should see the 9-content review console.

To flip a real attestation: pick a verified reviewer in
`lib/reviewers.ts` (set `verified: true` and commit), redeploy, then
sign off via the console. Visit `/emergency/<slug>` — TrustBanner
should be green.

---

## 11. Watch list (first week)

| What | Where | Why |
|---|---|---|
| `/sw.js` cache version matches latest deploy | `curl -s https://tengoderechos.org/sw.js \| grep Cache` | Confirms ISR + SW invalidation are in sync |
| Stripe webhook signature failures | Coolify logs | Indicates STRIPE_WEBHOOK_SECRET drift |
| `data/donations.jsonl` row count | Container shell | Reconciles with Stripe dashboard |
| Lighthouse score for `/` | https://pagespeed.web.dev/ | Should be >= 95 / 100 / 100 / 100 |
| `https://internet.nl/site/tengoderechos.org` | external scan | should be 100% |
| `https://observatory.mozilla.org/analyze/tengoderechos.org` | external scan | A grade or above |

---

## 12. Rollback

Each Coolify build keeps the prior image. To roll back:

1. Coolify → Application → **Deployments** tab.
2. Pick the previous deployment → click **Redeploy**.

The persistent volume retains attestations + donations log across
rollbacks, so a roll-forward + roll-back is safe.

---

## 13. SSL renewal

Caddy (Coolify's reverse proxy) renews Let's Encrypt automatically every
60 days. No action needed unless DNS or the public IP changes.

---

## 14. Going live checklist

- [ ] DNS A + CNAME records propagated.
- [ ] `ADMIN_TOKEN` set to a long random value (rotated every 90 days).
- [ ] `NEXT_PUBLIC_BUILD_ID` set (Coolify deployment UUID is fine).
- [ ] Persistent volume `/app/data` mounted.
- [ ] `https://tengoderechos.org` returns 200 over HTTPS.
- [ ] `/sw.js`, `/.well-known/security.txt`, `/sitemap.xml`, `/robots.txt`
      all reachable.
- [ ] `/embed/ice-at-door` returns CSP `frame-ancestors *;`.
- [ ] `/admin/reviews` shows login form, login works, real attorney
      added to roster (`lib/reviewers.ts` → `verified: true`).
- [ ] `/donate` either says 503 (intentional pre-Stripe) OR redirects
      to a real Stripe Checkout (post-Stripe).
- [ ] At least one emergency guide flipped to `reviewed: true`.
- [ ] Press kit at `/press` updated with a real founder bio.
- [ ] Test WhatsApp share from a phone — the deep link opens.

When the last 4 items are checked, you're ready for the launch press
push (ProPublica / Wired / Documented / Univision per the press kit's
story angles).
