import Link from "next/link";
import { Shield } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { dict, type Locale } from "@/lib/i18n";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const home = locale === "es" ? "/es" : "/";
  const donateHref = locale === "es" ? "/es/donate" : "/donate";
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-[#fdfaf3]/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href={home}
          className="flex items-center gap-2 font-bold text-zinc-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Shield className="h-5 w-5" aria-hidden />
          </span>
          <span>Tengo Derechos</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={donateHref}
            className="rounded-full bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            {t.donate}
          </Link>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
