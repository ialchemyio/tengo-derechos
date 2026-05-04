import Link from "next/link";
import { Info } from "lucide-react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { dict, type Locale } from "@/lib/i18n";

export function CancelledView({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const donateHref = locale === "es" ? "/es/donate" : "/donate";
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-zinc-200">
          <Info className="h-8 w-8 text-zinc-500" aria-hidden />
          <h1 className="mt-2 text-3xl font-extrabold text-zinc-900 sm:text-4xl">
            {t.cancelledTitle}
          </h1>
          <p className="mt-2 text-zinc-700">{t.cancelledBody}</p>
          <Link
            href={donateHref}
            className="mt-6 inline-block rounded-2xl bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-700"
          >
            ← {t.backToDonate}
          </Link>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
