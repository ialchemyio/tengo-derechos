import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { EmbedSnippetRow } from "./EmbedSnippetRow";
import {
  EMBED_SLUGS,
  buildEmbedSnippet,
  embedSlugLabel,
  type EmbedSlug,
} from "@/lib/embed";
import type { Locale } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Embed our guides",
    intro:
      "Drop a verified, attorney-reviewed Tengo Derechos guide card into your own website with a single iframe. Updates flow automatically when our content updates.",
    why: "Why this exists",
    whyBody:
      "Partner organizations — legal-aid clinics, immigrant-rights groups, public defenders, hospital social-work desks, public libraries, school district family centers — should not need to copy-paste our content into their own CMS. Embed it instead. Every embed always shows the most-recent attorney attestation, the current version, and a canonical link back to the full guide.",
    available: "Available embeds",
    snippetLabel: "iframe snippet",
    technical: "Technical notes",
    technicalBody: [
      "Embeds are static-prerendered HTML (~3 KB per card) with a tiny stylesheet and zero client-side JavaScript on the card itself. They render instantly on slow networks.",
      "We send X-Frame-Options: ALLOWALL and Content-Security-Policy: frame-ancestors *; on /embed/* routes only. Every other route on tengoderechos.org defaults to frame-ancestors 'self' so the rest of the site cannot be clickjacked.",
      "Embedded cards link 'View full guide' with target=_top so they navigate the parent window, not the iframe.",
      "Embed cards are noindex — search engines should index the canonical /emergency/<slug> or /rights/<slug> page, not the embed.",
    ],
    license: "License",
    licenseBody:
      "Embedding our guides is free and unrestricted. The 'Powered by TengoDerechos.org' attribution is required and is built into every embed. Editorial content is CC BY-SA 4.0; if you significantly transform an embed (e.g. translate it into a new language), distribute the result under the same license. Brand assets are not licensed for adaptation.",
  },
  es: {
    title: "Integra nuestras guías",
    intro:
      "Coloca una tarjeta de Tengo Derechos verificada y revisada por un abogado en tu propio sitio web con un solo iframe. Las actualizaciones llegan automáticamente cuando nuestro contenido cambia.",
    why: "Por qué existe",
    whyBody:
      "Las organizaciones aliadas — clínicas de ayuda legal, grupos de derechos de inmigrantes, defensores públicos, trabajadoras sociales hospitalarias, bibliotecas públicas, centros familiares de distritos escolares — no deben tener que copiar y pegar nuestro contenido a su propio CMS. Mejor que lo integren. Cada integración muestra siempre la atestación de abogado más reciente, la versión actual y un enlace canónico a la guía completa.",
    available: "Integraciones disponibles",
    snippetLabel: "fragmento iframe",
    technical: "Notas técnicas",
    technicalBody: [
      "Las integraciones son HTML prerrenderizado estático (~3 KB por tarjeta) con una hoja de estilos pequeña y cero JavaScript del lado del cliente en la tarjeta misma. Cargan al instante en redes lentas.",
      "Enviamos X-Frame-Options: ALLOWALL y Content-Security-Policy: frame-ancestors *; solo en rutas /embed/*. Cualquier otra ruta en tengoderechos.org usa frame-ancestors 'self' por defecto para que el resto del sitio no pueda sufrir clickjacking.",
      "Las tarjetas integradas enlazan «Ver guía completa» con target=_top para navegar la ventana padre, no el iframe.",
      "Las tarjetas embed son noindex — los buscadores deberían indexar la página canónica /emergency/<slug> o /rights/<slug>, no la integración.",
    ],
    license: "Licencia",
    licenseBody:
      "Integrar nuestras guías es gratis y sin restricciones. La atribución «Por TengoDerechos.org» es obligatoria y viene incluida en cada integración. El contenido editorial es CC BY-SA 4.0; si transformas significativamente una integración (ej. la traduces a un nuevo idioma), distribuye el resultado bajo la misma licencia. Los recursos de marca no están licenciados para adaptación.",
  },
} as const;

export function EmbedIndexView({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <h1 className="font-display text-3xl font-extrabold leading-tight text-zinc-900 sm:text-5xl">
          {c.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-zinc-700">{c.intro}</p>

        <section className="mt-8">
          <h2 className="font-display text-xl font-bold text-zinc-900">
            {c.why}
          </h2>
          <p className="mt-2 text-zinc-800">{c.whyBody}</p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-bold text-zinc-900">
            {c.available}
          </h2>
          <ul className="mt-4 space-y-4">
            {EMBED_SLUGS.map((slug: EmbedSlug) => (
              <li key={slug} className="rounded-2xl bg-white p-4 ring-1 ring-[var(--hairline)]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-display text-base font-bold text-zinc-900">
                      {embedSlugLabel(slug, locale)}
                    </p>
                    <p className="font-mono text-[11px] text-zinc-500">
                      /{locale === "es" ? "es/" : ""}embed/{slug}
                    </p>
                  </div>
                  <a
                    href={`${locale === "es" ? "/es" : ""}/embed/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[var(--brand-deep)] hover:underline"
                  >
                    {locale === "es" ? "Vista previa →" : "Preview →"}
                  </a>
                </div>
                <div className="mt-3">
                  <EmbedSnippetRow
                    snippet={buildEmbedSnippet(slug, locale)}
                    label={c.snippetLabel}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-2xl bg-[var(--accent-soft)]/50 p-5 ring-1 ring-[var(--accent)]/15">
          <h2 className="font-display text-xl font-bold text-zinc-900">
            {c.technical}
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-zinc-800">
            {c.technicalBody.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-xl font-bold text-zinc-900">
            {c.license}
          </h2>
          <p className="mt-2 text-zinc-800">{c.licenseBody}</p>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
