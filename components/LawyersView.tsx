import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { TrustBanner } from "./TrustBanner";
import { dict, type Locale } from "@/lib/i18n";

const placeholders: { name: string; desc: { en: string; es: string }; url: string }[] = [
  {
    name: "Local Legal Aid (placeholder)",
    desc: {
      en: "Free or low-cost legal services for qualifying families.",
      es: "Servicios legales gratuitos o de bajo costo para familias que califican.",
    },
    url: "https://www.lsc.gov/about-lsc/what-legal-aid/get-legal-help",
  },
  {
    name: "AILA Lawyer Referral (placeholder)",
    desc: {
      en: "American Immigration Lawyers Association directory.",
      es: "Directorio de la Asociación Americana de Abogados de Inmigración.",
    },
    url: "https://www.ailalawyer.com/",
  },
  {
    name: "CLINIC Legal Network (placeholder)",
    desc: {
      en: "Catholic Legal Immigration Network — affiliate directory of nonprofit immigration legal services.",
      es: "Red Católica de Inmigración Legal — directorio de servicios legales de inmigración sin fines de lucro.",
    },
    url: "https://cliniclegal.org/",
  },
];

export function LawyersView({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          {t.lawyersTitle}
        </h1>
        <p className="mt-2 text-zinc-700">{t.lawyersIntro}</p>
        <ul className="mt-6 space-y-3">
          {placeholders.map((p) => (
            <li key={p.name} className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200">
              <div className="text-lg font-bold text-zinc-900">{p.name}</div>
              <p className="mt-1 text-sm text-zinc-600">{p.desc[locale]}</p>
              <Link
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-[var(--brand-deep)] hover:underline"
              >
                {t.visit} →
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <TrustBanner locale={locale} />
          <p className="mt-2 text-xs text-zinc-500">{t.lawyersDisclaimer}</p>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
