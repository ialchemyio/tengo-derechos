import Link from "next/link";
import { dict, type Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const p = (path: string) => (locale === "es" ? `/es${path}` : path);
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-zinc-50/60">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-zinc-600">
        <p className="font-semibold text-zinc-900">Tengo Derechos</p>
        <p className="mt-1 max-w-2xl">{t.legalNotice}</p>
        <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          <Link href={p("/about")} className="hover:underline">{t.about}</Link>
          <Link href={p("/disclaimer")} className="hover:underline">{t.disclaimer}</Link>
          <Link href={p("/resources")} className="hover:underline">{t.resources}</Link>
          <Link href={p("/lawyers")} className="hover:underline">{t.findLawyer}</Link>
          <Link href={p("/donate")} className="hover:underline">{t.donate}</Link>
          <Link href={p("/admin/content-guide")} className="hover:underline">
            {locale === "es" ? "Guía de contenido" : "Content guide"}
          </Link>
        </nav>
        <p className="mt-6 text-xs text-zinc-500">
          © {new Date().getFullYear()} Tengo Derechos. {dict.es.tagline}
        </p>
      </div>
    </footer>
  );
}
