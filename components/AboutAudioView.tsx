import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import type { Locale } from "@/lib/i18n";
import { audioManifest } from "@/lib/audio";

const copy = {
  en: {
    title: "About the audio recordings",
    intro:
      "Every 'what you may say' phrase in our emergency guides has a short audio recording in English and Spanish. You can play it from the green Listen button next to each phrase.",
    sections: [
      {
        h: "Who recorded these",
        body: [
          "Phase 8 ships text-to-speech recordings as a starting point so families have a working pronunciation guide today, generated from Apple's Samantha (English) and Paulina (Mexican Spanish) voices.",
          "We are actively seeking volunteer voice actors and partner attorneys to replace these with human-recorded versions reviewed by licensed counsel before being marked verified.",
        ],
      },
      {
        h: "How accuracy is checked",
        body: [
          "Each guide carries an `audioReviewed` flag. It is only set to true after a licensed attorney has listened to BOTH the English and Spanish clips and confirmed they match the verified text.",
          "If `reviewed` is true but `audioReviewed` is not, the listen button still works, but the surrounding TrustBanner will note that the audio is pending review.",
        ],
      },
      {
        h: "How to suggest a correction",
        body: [
          "If you hear a mispronounced word or unnatural phrasing, please email audio@tengoderechos.org with the page URL and the phrase. We log all reports and re-record monthly.",
          "Spanish recordings should sound natural for Mexican / Latino families. We are not trying to imitate any single regional accent.",
        ],
      },
      {
        h: "How to download for offline use",
        body: [
          "Phase 6's PWA caches the website. Audio clips are NOT included by default to keep the cache small.",
          "Site administrators can enable offline audio by setting the env var NEXT_PUBLIC_PWA_AUDIO=1 at deploy time. The next build will add all audio URLs to the precache.",
        ],
      },
    ],
  },
  es: {
    title: "Sobre las grabaciones de audio",
    intro:
      "Cada frase «qué puedes decir» en nuestras guías tiene una grabación corta en inglés y español. Puedes reproducirla con el botón verde Escuchar al lado de cada frase.",
    sections: [
      {
        h: "Quién las grabó",
        body: [
          "La fase 8 publica grabaciones de texto a voz como punto de partida para que las familias tengan hoy una guía de pronunciación útil, generadas con las voces de Apple Samantha (inglés) y Paulina (español de México).",
          "Estamos buscando voluntarios y abogados aliados para reemplazarlas por versiones grabadas por personas y revisadas por un abogado con licencia antes de marcarlas como verificadas.",
        ],
      },
      {
        h: "Cómo se verifica la precisión",
        body: [
          "Cada guía tiene una bandera `audioReviewed`. Solo se pone en true después de que un abogado con licencia escucha AMBAS grabaciones (inglés y español) y confirma que coinciden con el texto verificado.",
          "Si `reviewed` es true pero `audioReviewed` no, el botón Escuchar funciona, pero el TrustBanner notará que el audio aún está en revisión.",
        ],
      },
      {
        h: "Cómo sugerir una corrección",
        body: [
          "Si escuchas una palabra mal pronunciada o una frase poco natural, escríbenos a audio@tengoderechos.org con la URL y la frase. Registramos todos los reportes y volvemos a grabar cada mes.",
          "Las grabaciones en español deben sonar naturales para familias mexicanas y latinas. No intentamos imitar un acento regional específico.",
        ],
      },
      {
        h: "Cómo descargar para uso sin conexión",
        body: [
          "El PWA de la fase 6 guarda el sitio. Las grabaciones de audio NO se incluyen por defecto para que la caché siga siendo pequeña.",
          "Los administradores pueden activar el audio sin conexión poniendo la variable NEXT_PUBLIC_PWA_AUDIO=1 al hacer deploy. El siguiente build agregará todas las URLs de audio a la pre-caché.",
        ],
      },
    ],
  },
} as const;

export function AboutAudioView({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const totalBytes = Object.values(audioManifest.steps).reduce(
    (acc, e) => acc + (e?.en?.bytes || 0) + (e?.es?.bytes || 0),
    0
  );
  const clipCount =
    Object.keys(audioManifest.steps).length * 2;
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          {c.title}
        </h1>
        <p className="mt-2 text-zinc-700">{c.intro}</p>

        <p className="mt-3 text-xs text-zinc-500">
          {locale === "es"
            ? `Clips disponibles: ${clipCount} · Tamaño total: ${(totalBytes / 1024).toFixed(0)} KB · Fuente: ${audioManifest.source}`
            : `Clips available: ${clipCount} · Total size: ${(totalBytes / 1024).toFixed(0)} KB · Source: ${audioManifest.source}`}
        </p>

        {c.sections.map((s) => (
          <section key={s.h} className="mt-6">
            <h2 className="text-xl font-bold text-zinc-900">{s.h}</h2>
            <ul className="mt-2 list-inside list-disc space-y-1.5 text-zinc-800">
              {s.body.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </section>
        ))}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
