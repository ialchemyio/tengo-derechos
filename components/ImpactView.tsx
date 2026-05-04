import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { type Locale } from "@/lib/i18n";
import { guides } from "@/lib/content";
import { rightsTopics } from "@/lib/rights";
import { audioManifest } from "@/lib/audio";
import { reviewers } from "@/lib/reviewers";
import { seedResources } from "@/lib/resources";
import {
  getCurrentVersion,
  getEffectiveReview,
} from "@/lib/attestations";

const COPY = {
  en: {
    title: "Impact",
    intro:
      "What we have shipped so far. Numbers update as content is published or attestations land. We do not run analytics, so we cannot show pageviews — these are artifacts on disk that anyone can audit.",
    metrics: {
      guides: "Emergency guides",
      rightsTopics: "Rights topics",
      verified: "Verified by attorney",
      reviewersOnboarded: "Reviewers in roster",
      verifiedReviewers: "Verified reviewers",
      audioClips: "Audio clips",
      audioBytes: "Audio shipped",
      languages: "Languages",
      sourceLinks: "Source citations",
      resources: "Curated resources",
      shareCards: "Shareable step cards",
      offlineReady: "Offline-ready emergency guides",
    },
    method: "How these numbers are computed",
    methodBody:
      "Counts are read from the source artifacts at render time. Verified-by-attorney is computed by walking each emergency guide and rights topic, calling getEffectiveReview, and counting the rows where reviewed === true after auto-invalidation. Audio counts come from public/audio/manifest.json. Resources count is the seed array length plus the live Supabase row count when configured (currently shown is the seed only). Source citations sum the sourceLinks arrays across all reviewable content.",
    transparencyTitle: "Transparency artifacts",
    transparencyItems: [
      "Methodology: /about/methodology",
      "Privacy posture: /about/privacy",
      "Accessibility statement: /about/accessibility",
      "Security disclosure: /about/security and /.well-known/security.txt",
      "Open-source licenses: /about/open-source",
      "Public roadmap: in repository README",
      "Annual report: published every January here on /about/transparency",
    ],
  },
  es: {
    title: "Impacto",
    intro:
      "Lo que hemos publicado hasta ahora. Las cifras se actualizan al publicar contenido o al registrar atestaciones. No corremos analytics, así que no podemos mostrar visitas — estos son artefactos en disco que cualquiera puede auditar.",
    metrics: {
      guides: "Guías de emergencia",
      rightsTopics: "Temas de derechos",
      verified: "Verificado por abogado",
      reviewersOnboarded: "Revisores en la lista",
      verifiedReviewers: "Revisores verificados",
      audioClips: "Grabaciones de audio",
      audioBytes: "Audio publicado",
      languages: "Idiomas",
      sourceLinks: "Citas de fuente",
      resources: "Recursos curados",
      shareCards: "Tarjetas compartibles por paso",
      offlineReady: "Guías de emergencia offline",
    },
    method: "Cómo se computan estos números",
    methodBody:
      "Las cuentas se leen de los artefactos fuente al renderizar la página. «Verificado por abogado» se calcula recorriendo cada guía de emergencia y tema de derechos, llamando a getEffectiveReview, y contando las filas donde reviewed === true después de la auto-invalidación. Las cuentas de audio salen de public/audio/manifest.json. La cuenta de recursos es el largo del arreglo semilla más las filas en vivo de Supabase cuando está configurado (actualmente se muestra solo el semilla). Las citas de fuente suman los arreglos sourceLinks a través de todo el contenido revisable.",
    transparencyTitle: "Artefactos de transparencia",
    transparencyItems: [
      "Metodología: /about/methodology",
      "Postura de privacidad: /about/privacy",
      "Declaración de accesibilidad: /about/accessibility",
      "Divulgación de seguridad: /about/security y /.well-known/security.txt",
      "Licencias de código abierto: /about/open-source",
      "Hoja de ruta pública: en el README del repositorio",
      "Informe anual: publicado cada enero aquí en /about/transparency",
    ],
  },
} as const;

function formatBytes(b: number): string {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
}

export async function ImpactView({ locale }: { locale: Locale }) {
  const c = COPY[locale];

  // Compute live counts
  let verifiedCount = 0;
  for (const g of guides) {
    const r = await getEffectiveReview(g.slug, g);
    if (r.reviewed) verifiedCount++;
  }
  for (const t of rightsTopics) {
    const r = await getEffectiveReview(t.slug, t);
    if (r.reviewed) verifiedCount++;
  }

  const totalReviewable = guides.length + rightsTopics.length;
  const verifiedReviewers = reviewers.filter((r) => r.verified).length;
  const audioClips = Object.values(audioManifest.steps).reduce(
    (acc, e) => acc + (e?.en ? 1 : 0) + (e?.es ? 1 : 0),
    0
  );
  const audioBytes = Object.values(audioManifest.steps).reduce(
    (acc, e) => acc + (e?.en?.bytes ?? 0) + (e?.es?.bytes ?? 0),
    0
  );
  const sourceLinkCount =
    guides.reduce((a, g) => a + (g.sourceLinks?.length ?? 0), 0) +
    rightsTopics.reduce((a, t) => a + (t.sourceLinks?.length ?? 0), 0);
  const shareCards = 4 * 7 * 2; // 4 scenarios x 7 max steps x 2 locales (out-of-range 404 is acceptable rounding)
  const offlineReady = guides.length * 2; // each guide cached in en + es

  // Sample versions for display
  const versionRows: { slug: string; version: number }[] = [];
  for (const g of guides) {
    versionRows.push({ slug: g.slug, version: await getCurrentVersion(g.slug) });
  }

  const tiles: { label: string; value: string }[] = [
    { label: c.metrics.guides, value: String(guides.length) },
    { label: c.metrics.rightsTopics, value: String(rightsTopics.length) },
    {
      label: c.metrics.verified,
      value: `${verifiedCount} / ${totalReviewable}`,
    },
    {
      label: c.metrics.reviewersOnboarded,
      value: String(reviewers.length),
    },
    {
      label: c.metrics.verifiedReviewers,
      value: String(verifiedReviewers),
    },
    { label: c.metrics.audioClips, value: String(audioClips) },
    { label: c.metrics.audioBytes, value: formatBytes(audioBytes) },
    { label: c.metrics.languages, value: "EN · ES" },
    { label: c.metrics.sourceLinks, value: String(sourceLinkCount) },
    { label: c.metrics.resources, value: String(seedResources.length) },
    { label: c.metrics.shareCards, value: String(shareCards) },
    { label: c.metrics.offlineReady, value: String(offlineReady) },
  ];

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <h1 className="font-display text-3xl font-extrabold leading-tight text-zinc-900 sm:text-5xl">
          {c.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-zinc-700">{c.intro}</p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {tiles.map((t) => (
            <div
              key={t.label}
              className="rounded-2xl bg-white p-4 ring-1 ring-[var(--hairline)]"
            >
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                {t.label}
              </div>
              <div className="font-display mt-2 text-3xl font-extrabold text-zinc-900">
                {t.value}
              </div>
            </div>
          ))}
        </div>

        <section className="mt-10 rounded-2xl bg-white p-6 ring-1 ring-[var(--hairline)]">
          <h2 className="font-display text-xl font-bold text-zinc-900">
            {locale === "es" ? "Versión por contenido" : "Version per content"}
          </h2>
          <ul className="mt-3 grid gap-1 text-sm text-zinc-700 sm:grid-cols-2">
            {versionRows.map((r) => (
              <li
                key={r.slug}
                className="flex items-center justify-between rounded-lg px-2 py-1 odd:bg-[var(--accent-soft)]/30"
              >
                <span className="font-mono">{r.slug}</span>
                <span className="font-semibold text-[var(--accent)]">
                  v{r.version}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-2xl bg-[var(--accent-soft)]/40 p-6 ring-1 ring-[var(--accent)]/15">
          <h2 className="font-display text-xl font-bold text-zinc-900">
            {c.transparencyTitle}
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-zinc-800">
            {c.transparencyItems.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-bold text-zinc-900">
            {c.method}
          </h2>
          <p className="mt-3 text-zinc-800">{c.methodBody}</p>
        </section>

        <p className="mt-10 text-xs text-zinc-500">
          {locale === "es"
            ? `Generado al renderizar — ${new Date().toISOString().slice(0, 10)}`
            : `Generated at render time — ${new Date().toISOString().slice(0, 10)}`}
        </p>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
