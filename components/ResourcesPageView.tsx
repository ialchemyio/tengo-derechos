import Link from "next/link";
import { Plus } from "lucide-react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { ResourcesFilterForm } from "./ResourcesFilterForm";
import { ResourceCard } from "./ResourceCard";
import { TrustBanner } from "./TrustBanner";
import { dict, type Locale } from "@/lib/i18n";
import {
  getResources,
  type ResourceCategory,
  type ResourceFilters,
} from "@/lib/resources";

const VALID_CATS: ResourceCategory[] = [
  "legal",
  "clinic",
  "hotline",
  "food",
  "shelter",
  "consulate",
];

function parseFilters(
  sp: Record<string, string | string[] | undefined>
): ResourceFilters {
  const cat = typeof sp.category === "string" ? sp.category : undefined;
  return {
    category:
      cat && (VALID_CATS as readonly string[]).includes(cat)
        ? (cat as ResourceCategory)
        : "all",
    language: typeof sp.language === "string" ? sp.language : "any",
    city: typeof sp.city === "string" ? sp.city : "",
    emergencyOnly: sp.emergency === "1",
  };
}

const PAGE_SIZE = 40;

export async function ResourcesPageView({
  locale,
  searchParams,
}: {
  locale: Locale;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const t = dict[locale];
  const sp = await searchParams;
  const filters = parseFilters(sp);
  const cursorRaw = typeof sp.after === "string" ? sp.after : "";

  const all = await getResources(filters);
  const start = cursorRaw
    ? Math.max(0, all.findIndex((r) => r.id === cursorRaw) + 1)
    : 0;
  const slice = all.slice(start, start + PAGE_SIZE);
  const nextCursor =
    start + PAGE_SIZE < all.length ? all[start + PAGE_SIZE - 1].id : null;

  const submitHref = locale === "es" ? "/es/resources/submit" : "/resources/submit";

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
              {t.resourcesTitle}
            </h1>
            <p className="mt-2 text-zinc-700">{t.resourcesIntro}</p>
          </div>
          <Link
            href={submitHref}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" aria-hidden />
            {t.submitResource}
          </Link>
        </div>

        <div className="mt-6">
          <ResourcesFilterForm locale={locale} />
        </div>

        <p className="mt-4 text-sm text-zinc-600">
          {all.length} {t.results}
        </p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {slice.map((r) => (
            <ResourceCard key={r.id} resource={r} locale={locale} />
          ))}
        </div>

        {nextCursor ? (
          <p className="mt-6">
            <Link
              href={`?${new URLSearchParams({
                ...stripUndefined(sp),
                after: nextCursor,
              }).toString()}`}
              className="font-semibold text-emerald-700 hover:underline"
            >
              {locale === "es" ? "Ver más →" : "Load more →"}
            </Link>
          </p>
        ) : null}

        <div className="mt-8">
          <TrustBanner locale={locale} />
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

function stripUndefined(
  o: Record<string, string | string[] | undefined>
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(o)) {
    if (typeof v === "string" && v) out[k] = v;
  }
  return out;
}
