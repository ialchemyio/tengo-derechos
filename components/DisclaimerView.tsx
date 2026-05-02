import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { dict, type Locale } from "@/lib/i18n";

export function DisclaimerView({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          {t.disclaimerTitle}
        </h1>
        <div className="mt-4 space-y-4 text-zinc-800">
          <p>
            <strong>{t.disclaimerP1}</strong>
          </p>
          <p>{t.disclaimerP2}</p>
          <p>
            <strong>{t.disclaimerP3}</strong>
          </p>
          <p>{t.disclaimerP4}</p>
          <p>{t.disclaimerP5}</p>
          <p className="text-sm text-zinc-600">{t.disclaimerAck}</p>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
