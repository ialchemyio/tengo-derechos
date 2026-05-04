import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { TrustBanner } from "./TrustBanner";
import { SourcesList } from "./SourcesList";
import { ReviewBadge } from "./ReviewBadge";
import { dict, type Locale } from "@/lib/i18n";
import type { RightsTopic } from "@/lib/rights";
import { getEffectiveReview } from "@/lib/attestations";
import { articleJsonLd, breadcrumbJsonLd, siteUrl } from "@/lib/seo";

export async function RightsTopicView({
  topic,
  locale,
}: {
  topic: RightsTopic;
  locale: Locale;
}) {
  const t = dict[locale];
  const rightsHref = locale === "es" ? "/es/rights" : "/rights";
  const pageUrl = `${siteUrl}${rightsHref}/${topic.slug}`;
  const review = await getEffectiveReview(topic.slug, topic);
  const article = articleJsonLd(topic, locale, pageUrl);
  const breadcrumbs = breadcrumbJsonLd([
    {
      name: locale === "es" ? "Inicio" : "Home",
      url: siteUrl + (locale === "es" ? "/es" : "/"),
    },
    {
      name: locale === "es" ? "Conoce tus derechos" : "Know Your Rights",
      url: siteUrl + rightsHref,
    },
    { name: topic.title[locale], url: pageUrl },
  ]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <p className="text-sm">
          <Link
            href={rightsHref}
            className="font-semibold text-[var(--brand-deep)] hover:underline"
          >
            ← {t.backRights}
          </Link>
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
            {topic.title[locale]}
          </h1>
          <ReviewBadge reviewed={review.reviewed} locale={locale} />
        </div>
        <p className="mt-2 text-zinc-700">{topic.intro[locale]}</p>
        <ul className="mt-6 list-inside list-disc space-y-2 rounded-2xl bg-white p-5 text-zinc-800 ring-1 ring-zinc-200">
          {topic.bullets[locale].map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <div className="mt-8">
          <TrustBanner locale={locale} review={review} />
        </div>
        <div className="mt-6">
          <SourcesList locale={locale} sources={topic.sourceLinks} />
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
