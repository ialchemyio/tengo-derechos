import Link from "next/link";

export function SiteFooter({ locale }: { locale: "en" | "es" }) {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-zinc-50/60">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-zinc-600">
        <p className="font-semibold text-zinc-900">Tengo Derechos</p>
        <p className="mt-1 max-w-2xl">
          {locale === "es"
            ? "Esta información es educativa y no es asesoramiento legal. Las leyes pueden variar según el estado. Consulta a un abogado calificado."
            : "This information is educational and not legal advice. Laws may vary by state. Contact a qualified attorney for legal help."}
        </p>
        <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/about" className="hover:underline">{locale === "es" ? "Sobre nosotros" : "About"}</Link>
          <Link href="/disclaimer" className="hover:underline">{locale === "es" ? "Aviso legal" : "Disclaimer"}</Link>
          <Link href="/resources" className="hover:underline">{locale === "es" ? "Recursos" : "Resources"}</Link>
          <Link href="/lawyers" className="hover:underline">{locale === "es" ? "Abogados" : "Lawyers"}</Link>
          <Link href="/donate" className="hover:underline">{locale === "es" ? "Donar" : "Donate"}</Link>
          <Link href="/admin/content-guide" className="hover:underline">
            {locale === "es" ? "Guía de contenido" : "Content guide"}
          </Link>
        </nav>
        <p className="mt-6 text-xs text-zinc-500">
          © {new Date().getFullYear()} Tengo Derechos. Tus derechos. Tu familia. Tu protección.
        </p>
      </div>
    </footer>
  );
}
