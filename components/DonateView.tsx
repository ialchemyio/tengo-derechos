import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { DonationCard } from "./DonationCard";
import { TrustBanner } from "./TrustBanner";
import { dict, type Locale } from "@/lib/i18n";

export function DonateView({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          {t.donateTitle}
        </h1>
        <p className="mt-2 text-zinc-700">{t.donateIntro}</p>

        <div className="mt-6">
          <DonationCard locale={locale} />
        </div>

        <section className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
          <h2 className="text-lg font-bold text-zinc-900">{t.donateImpact}</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-700">
            <li>• {t.donateImpact1}</li>
            <li>• {t.donateImpact2}</li>
            <li>• {t.donateImpact3}</li>
            <li>• {t.donateImpact4}</li>
          </ul>
        </section>

        <div className="mt-8">
          <TrustBanner locale={locale} />
          <p className="mt-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-950 ring-1 ring-amber-200">
            <strong>{t.donateReviewLabel}.</strong> {t.donateNonprofitNote}
          </p>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
