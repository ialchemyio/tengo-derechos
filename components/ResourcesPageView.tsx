import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { ResourcesView } from "./ResourcesView";
import { TrustBanner } from "./TrustBanner";
import { dict, type Locale } from "@/lib/i18n";

export function ResourcesPageView({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          {t.resourcesTitle}
        </h1>
        <p className="mt-2 text-zinc-700">{t.resourcesIntro}</p>
        <div className="mt-6">
          <ResourcesView locale={locale} />
        </div>
        <div className="mt-8">
          <TrustBanner locale={locale} />
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
