import Link from "next/link";
import { Heart } from "lucide-react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { ShareButtons } from "./ShareButtons";
import { dict, type Locale } from "@/lib/i18n";

export function ThankYouView({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const home = locale === "es" ? "/es" : "/";
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
        <div className="rounded-2xl bg-emerald-50 p-6 ring-1 ring-emerald-200">
          <Heart className="h-10 w-10 text-emerald-700" aria-hidden />
          <h1 className="mt-2 text-3xl font-extrabold text-zinc-900 sm:text-4xl">
            {t.thankyouTitle}
          </h1>
          <p className="mt-2 text-zinc-800">{t.thankyouBody}</p>

          <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-zinc-700">
            <li>{t.donateImpact1}</li>
            <li>{t.donateImpact2}</li>
            <li>{t.donateImpact3}</li>
          </ul>

          <p className="mt-6 text-sm font-semibold text-zinc-800">
            {t.sharePrompt}
          </p>
          <div className="mt-2">
            <ShareButtons locale={locale} />
          </div>

          <Link
            href={home}
            className="mt-6 inline-block text-sm font-semibold text-emerald-700 hover:underline"
          >
            ← {t.home}
          </Link>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
