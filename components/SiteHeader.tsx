import Link from "next/link";
import { Shield, Heart } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { dict, type Locale } from "@/lib/i18n";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const home = locale === "es" ? "/es" : "/";
  const donateHref = locale === "es" ? "/es/donate" : "/donate";
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--hairline)] bg-[color:var(--background)]/80 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--background)]/65">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href={home}
          className="group flex items-center gap-2 font-semibold text-zinc-900"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand)] text-white shadow-sm ring-1 ring-[var(--brand-deep)]/30 transition group-hover:scale-105">
            <Shield className="h-5 w-5" aria-hidden />
          </span>
          <span className="font-display text-base font-bold tracking-tight sm:text-lg">
            Tengo Derechos
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={donateHref}
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--donate)] px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--donate-deep)]"
          >
            <Heart
              className="heartbeat h-3.5 w-3.5 fill-white"
              aria-hidden
            />
            {t.donate}
          </Link>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
