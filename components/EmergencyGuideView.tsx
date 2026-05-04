import Link from "next/link";
import { Phone, Save, ArrowLeft, ShieldAlert } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { dict } from "@/lib/i18n";
import type { EmergencyGuide } from "@/lib/content";
import { pick } from "@/lib/content";
import { getEffectiveReview } from "@/lib/attestations";
import { howToJsonLd, breadcrumbJsonLd, siteUrl } from "@/lib/seo";
import { StepFlow } from "./StepFlow";
import { TrustBanner } from "./TrustBanner";
import { SourcesList } from "./SourcesList";
import { QuickExitButton } from "./QuickExitButton";
import { LanguageToggle } from "./LanguageToggle";
import { PrintButton } from "./PrintButton";
import { ReviewBadge } from "./ReviewBadge";
import { ShareWhatsAppButton } from "./ShareWhatsAppButton";
import { SharePrompt } from "./SharePrompt";

export async function EmergencyGuideView({
  guide,
  locale,
}: {
  guide: EmergencyGuide;
  locale: Locale;
}) {
  const t = dict[locale];
  const review = await getEffectiveReview(guide.slug, guide);
  const emergencyHref = locale === "es" ? "/es/emergency" : "/emergency";
  const resourcesHref = locale === "es" ? "/es/resources" : "/resources";
  const pageUrl = `${siteUrl}${emergencyHref}/${guide.slug}`;
  const howTo = howToJsonLd(guide, locale);
  const breadcrumbs = breadcrumbJsonLd([
    { name: locale === "es" ? "Inicio" : "Home", url: siteUrl + (locale === "es" ? "/es" : "/") },
    { name: locale === "es" ? "Emergencia" : "Emergency", url: siteUrl + emergencyHref },
    { name: guide.title[locale], url: pageUrl },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <QuickExitButton label={t.quickExit} />
      <div className="relative overflow-hidden bg-gradient-to-br from-[var(--danger-deep)] via-[var(--danger)] to-[#7d1a0e] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <Link
            href={emergencyHref}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white/90 ring-1 ring-white/20 hover:bg-white/15 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t.backEmergency}
          </Link>
          <div className="flex items-center gap-2">
            <LanguageToggle />
          </div>
        </div>
        <div className="relative mx-auto max-w-5xl px-4 pb-7">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-1 h-8 w-8 shrink-0 opacity-95" aria-hidden />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                  {pick(locale, guide.title)}
                </h1>
                <ReviewBadge reviewed={review.reviewed} locale={locale} />
              </div>
              <p className="mt-3 max-w-2xl text-base text-white/90 sm:text-lg">
                {pick(locale, guide.intro)}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-base font-bold ring-1 ring-white/20">
                1. {t.stayCalm}.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-3xl px-4 py-6">
        <div className="mb-5 flex justify-end no-print">
          <ShareWhatsAppButton url={pageUrl} locale={locale} size="sm" />
        </div>

        <StepFlow
          steps={guide.steps}
          locale={locale}
          labels={{ say: t.sayThis, doNot: t.doNotDo, listen: t.listen }}
          guideSlug={guide.slug}
        />

        <div className="mt-8 no-print">
          <SharePrompt
            url={pageUrl}
            locale={locale}
            storageKey={`td-share-prompt-${guide.slug}`}
          />
        </div>

        <div className="mt-4 flex justify-center no-print">
          <Link
            href={locale === "es" ? "/es/prepare" : "/prepare"}
            className="inline-flex items-center gap-2 rounded-2xl bg-[var(--accent)] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--accent)]/90 hover:shadow-md"
          >
            {locale === "es"
              ? "Haz un plan familiar de emergencia"
              : "Make a family emergency plan"}
          </Link>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <a
            href="tel:211"
            className="flex items-center justify-center gap-2 rounded-2xl bg-[var(--brand)] px-4 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--brand-deep)] hover:shadow-md"
          >
            <Phone className="h-5 w-5" aria-hidden />
            {t.callLawyer}
          </a>
          <PrintButton label={t.print} />
          <button
            type="button"
            disabled
            title="Coming soon"
            className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 font-semibold text-zinc-500 ring-1 ring-[var(--hairline)] no-print"
          >
            <Save className="h-5 w-5" aria-hidden />
            {t.saveOffline}
          </button>
        </div>

        <div className="mt-8">
          <TrustBanner locale={locale} review={review} />
        </div>

        <div className="mt-6">
          <SourcesList locale={locale} sources={guide.sourceLinks} />
        </div>

        <div className="mt-6 text-sm">
          <Link
            href={resourcesHref}
            className="font-semibold text-[var(--brand-deep)] hover:underline"
          >
            {t.seeResourcesNearby}
          </Link>
        </div>
      </main>
    </>
  );
}
