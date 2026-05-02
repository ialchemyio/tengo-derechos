import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { TrustBanner } from "./TrustBanner";
import { SourcesList } from "./SourcesList";
import { dict, type Locale } from "@/lib/i18n";
import type { RightsTopic } from "@/lib/rights";

export function RightsTopicView({
  topic,
  locale,
}: {
  topic: RightsTopic;
  locale: Locale;
}) {
  const t = dict[locale];
  const rightsHref = locale === "es" ? "/es/rights" : "/rights";
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <p className="text-sm">
          <Link
            href={rightsHref}
            className="font-semibold text-emerald-700 hover:underline"
          >
            ← {t.backRights}
          </Link>
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          {topic.title[locale]}
        </h1>
        <p className="mt-2 text-zinc-700">{topic.intro[locale]}</p>
        <ul className="mt-6 list-inside list-disc space-y-2 rounded-2xl bg-white p-5 text-zinc-800 ring-1 ring-zinc-200">
          {topic.bullets[locale].map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <div className="mt-8">
          <TrustBanner locale={locale} review={topic} />
        </div>
        <div className="mt-6">
          <SourcesList locale={locale} sources={topic.sourceLinks} />
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
