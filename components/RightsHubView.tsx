import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { TrustBanner } from "./TrustBanner";
import { dict, type Locale } from "@/lib/i18n";
import { rightsTopics } from "@/lib/rights";

export function RightsHubView({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const base = locale === "es" ? "/es/rights" : "/rights";
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          {t.rightsTitle}
        </h1>
        <p className="mt-2 text-zinc-700">{t.rightsIntro}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {rightsTopics.map((topic) => (
            <li key={topic.slug}>
              <Link
                href={`${base}/${topic.slug}`}
                className="block rounded-2xl bg-white p-5 ring-1 ring-zinc-200 hover:ring-zinc-400"
              >
                <div className="text-lg font-bold text-zinc-900">
                  {topic.title[locale]}
                </div>
                <p className="mt-1 text-sm text-zinc-600">
                  {topic.intro[locale]}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <TrustBanner locale={locale} />
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
