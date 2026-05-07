import Link from "next/link";
import { BrandMark } from "./icons/BrandMark";
import { dict, type Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const p = (path: string) => (locale === "es" ? `/es${path}` : path);
  const home = locale === "es" ? "/es" : "/";
  return (
    <>
      {/* Brand outro — large centered lockup just above the navy footer.
          Cream background + Fraunces wordmark + bilingual tagline.
          Acts as a closing-page-mark for every public route. */}
      <section
        aria-label="Tengo Derechos"
        className="mt-16 border-t border-[var(--hairline)] bg-[var(--background)]"
      >
        <Link
          href={home}
          className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 py-14 sm:flex-row sm:items-center sm:justify-center sm:gap-7 sm:py-16"
        >
          <div className="relative">
            <BrandMark size={120} className="drop-shadow-sm" />
            <div
              aria-hidden
              className="absolute inset-x-4 -bottom-2 h-3 rounded-full bg-[var(--accent)]/10 blur-md"
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-[var(--accent)] sm:text-5xl">
              Tengo<br className="hidden sm:inline" />{" "}
              <span className="sm:block">Derechos</span>
            </p>
            <p className="mt-3 text-base text-[#3a4866] sm:text-lg">
              Tus derechos. Tu familia.
              <br />
              Tu protección.
            </p>
          </div>
        </Link>
      </section>

      <footer className="border-t border-[var(--hairline)] bg-[var(--accent)] text-[#dde4f3]">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/8 ring-1 ring-white/15">
                <BrandMark size={36} variant="full" />
              </span>
              <span className="font-display text-lg font-bold">
                Tengo Derechos
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm text-[#cdd5e8]">
              {t.legalNotice}
            </p>
          </div>
          <div className="grid gap-6 text-sm sm:grid-cols-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#a8b3cb]">
                {locale === "es" ? "Producto" : "Product"}
              </p>
              <ul className="mt-2 space-y-1.5">
                <li><Link href={p("/emergency")} className="hover:text-white">{t.emergency}</Link></li>
                <li><Link href={p("/rights")} className="hover:text-white">{t.rights}</Link></li>
                <li><Link href={p("/resources")} className="hover:text-white">{t.resources}</Link></li>
                <li><Link href={p("/lawyers")} className="hover:text-white">{t.findLawyer}</Link></li>
                <li><Link href={p("/prepare")} className="hover:text-white">{locale === "es" ? "Plan familiar" : "Family plan"}</Link></li>
                <li><Link href={p("/embed")} className="hover:text-white">{locale === "es" ? "Integrar" : "Embed"}</Link></li>
                <li><Link href={p("/donate")} className="hover:text-white">{t.donate}</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#a8b3cb]">
                {locale === "es" ? "Sobre nosotros" : "About"}
              </p>
              <ul className="mt-2 space-y-1.5">
                <li><Link href={p("/about")} className="hover:text-white">{t.about}</Link></li>
                <li><Link href={p("/about/team")} className="hover:text-white">{locale === "es" ? "Equipo" : "Team"}</Link></li>
                <li><Link href={p("/impact")} className="hover:text-white">{locale === "es" ? "Impacto" : "Impact"}</Link></li>
                <li><Link href={p("/about/transparency")} className="hover:text-white">{t.transparencyTitle}</Link></li>
                <li><Link href={p("/press")} className="hover:text-white">{locale === "es" ? "Prensa" : "Press"}</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#a8b3cb]">
                {locale === "es" ? "Confianza" : "Trust"}
              </p>
              <ul className="mt-2 space-y-1.5">
                <li><Link href={p("/about/methodology")} className="hover:text-white">{locale === "es" ? "Metodología" : "Methodology"}</Link></li>
                <li><Link href={p("/about/privacy")} className="hover:text-white">{locale === "es" ? "Privacidad" : "Privacy"}</Link></li>
                <li><Link href={p("/about/accessibility")} className="hover:text-white">{locale === "es" ? "Accesibilidad" : "Accessibility"}</Link></li>
                <li><Link href={p("/about/security")} className="hover:text-white">{locale === "es" ? "Seguridad" : "Security"}</Link></li>
                <li><Link href={p("/about/open-source")} className="hover:text-white">{locale === "es" ? "Código abierto" : "Open source"}</Link></li>
                <li><Link href={p("/disclaimer")} className="hover:text-white">{t.disclaimer}</Link></li>
              </ul>
            </div>
          </div>
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
    </>
  );
}
