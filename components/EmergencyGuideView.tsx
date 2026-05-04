import Link from "next/link";
import { Phone, Save, ArrowLeft, ShieldAlert } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { dict } from "@/lib/i18n";
import type { EmergencyGuide } from "@/lib/content";
import { pick } from "@/lib/content";
import { getEffectiveReview } from "@/lib/attestations";
import { StepFlow } from "./StepFlow";
import { TrustBanner } from "./TrustBanner";
import { SourcesList } from "./SourcesList";
import { QuickExitButton } from "./QuickExitButton";
import { LanguageToggle } from "./LanguageToggle";
import { PrintButton } from "./PrintButton";
import { ReviewBadge } from "./ReviewBadge";

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

  return (
    <>
      <QuickExitButton label={t.quickExit} />
      <div className="bg-red-700 text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <Link
            href={emergencyHref}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t.backEmergency}
          </Link>
          <div className="flex items-center gap-2">
            <LanguageToggle />
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-4 pb-6">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-1 h-7 w-7 shrink-0" aria-hidden />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                  {pick(locale, guide.title)}
                </h1>
                <ReviewBadge reviewed={review.reviewed} locale={locale} />
              </div>
              <p className="mt-2 max-w-2xl text-base text-white/90">
                {pick(locale, guide.intro)}
              </p>
              <p className="mt-3 text-lg font-bold">1. {t.stayCalm}.</p>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-3xl px-4 py-6">
        <StepFlow
          steps={guide.steps}
          locale={locale}
          labels={{ say: t.sayThis, doNot: t.doNotDo, listen: t.listen }}
          guideSlug={guide.slug}
        />

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <a
            href="tel:211"
            className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white shadow-sm hover:bg-emerald-700"
          >
            <Phone className="h-5 w-5" aria-hidden />
            {t.callLawyer}
          </a>
          <PrintButton label={t.print} />
          <button
            type="button"
            disabled
            title="Coming soon"
            className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 font-semibold text-zinc-500 ring-1 ring-zinc-200 no-print"
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
            className="font-semibold text-emerald-700 hover:underline"
          >
            {t.seeResourcesNearby}
          </Link>
        </div>
      </main>
    </>
  );
}
