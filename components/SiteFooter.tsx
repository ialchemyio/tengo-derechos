import Link from "next/link";
import { Shield } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const p = (path: string) => (locale === "es" ? `/es${path}` : path);
  return (
    <footer className="mt-16 border-t border-[var(--hairline)] bg-[var(--accent)] text-[#dde4f3]">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                <Shield className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-display text-lg font-bold">
                Tengo Derechos
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm text-[#cdd5e8]">
              {t.legalNotice}
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <Link href={p("/about")} className="hover:text-white">{t.about}</Link>
            <Link href={p("/disclaimer")} className="hover:text-white">{t.disclaimer}</Link>
            <Link href={p("/resources")} className="hover:text-white">{t.resources}</Link>
            <Link href={p("/lawyers")} className="hover:text-white">{t.findLawyer}</Link>
            <Link href={p("/donate")} className="hover:text-white">{t.donate}</Link>
            <Link href={p("/about/transparency")} className="hover:text-white">
              {t.transparencyTitle}
            </Link>
            <Link href={p("/about/audio")} className="hover:text-white">
              {locale === "es" ? "Audio" : "Audio"}
            </Link>
            <Link
              href={p("/admin/content-guide")}
              className="hover:text-white"
            >
              {locale === "es" ? "Guía de contenido" : "Content guide"}
            </Link>
          </nav>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-[#a8b3cb]">
          <p>© {new Date().getFullYear()} Tengo Derechos · {dict.es.tagline}</p>
          <a
            href="https://beyondamedium.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium text-[#cdd5e8] ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
          >
            {locale === "es" ? "Impulsado por" : "Powered by"}{" "}
            <span className="font-semibold text-white">Beyond A Medium</span>{" "}
            <span className="hidden sm:inline opacity-70">
              —{" "}
              {locale === "es"
                ? "Herramientas de IA para organizaciones y creadores"
                : "AI tools for organizations & creators"}
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
