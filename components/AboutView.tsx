import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { dict, type Locale } from "@/lib/i18n";

export function AboutView({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          {t.aboutTitle}
        </h1>
        <div className="mt-4 space-y-4 text-zinc-800">
          <p>{t.aboutP1}</p>
          <p>{t.aboutP2}</p>
          <p>
            <strong>{t.aboutPromise}</strong> {t.tagline}
          </p>
          <p>{t.aboutP3}</p>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
