import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    title: "Internal content management guide",
    intro: "This page is for staff and partner attorneys who maintain the site.",
    sections: [
      {
        h: "Where content lives",
        body: [
          "lib/content.ts — emergency guides (ICE, police, border patrol, medical). Each guide has bilingual title, intro, and steps with optional 'say' and 'doNot' blocks, plus review metadata (reviewed, reviewedBy, reviewerTitle, reviewedDate, sourceLinks, lastUpdated).",
          "lib/rights.ts — Know-Your-Rights topics (police, immigration, workplace, housing, medical), bilingual bullets + review metadata.",
          "lib/resources.ts — directory of legal aid, clinics, hotlines, food, shelter, consulates.",
          "lib/i18n.ts — UI strings in English and Spanish, keyed by short identifier.",
        ],
      },
      {
        h: "How to update bilingual content",
        body: [
          "Every piece of legal/medical content is keyed by `en` and `es`. Always update both — never ship one language ahead of the other on legal pages.",
          "Spanish should be natural for Mexican / Latino families, not a literal translation. Prefer 'puede que tengas el derecho' over robotic 'puedes tener el derecho'.",
          "Avoid legal overpromising in either language. Keep softeners like 'may', 'generally', 'in many situations'.",
        ],
      },
      {
        h: "How to mark content as reviewed",
        body: [
          "Set `reviewed: true` ONLY after a licensed attorney has reviewed BOTH languages.",
          "Always also set: reviewedBy (full name), reviewerTitle (e.g. 'Immigration Attorney, [Bar #]'), reviewedDate (ISO yyyy-mm-dd).",
          "Always update lastUpdated on any meaningful edit, even pre-review.",
          "When the TrustBanner sees `reviewed: true`, it will show 'Reviewed by …' instead of the pending-review notice.",
        ],
      },
      {
        h: "How to add source links",
        body: [
          "Add to the `sourceLinks` array: `{ label, url }`. Prefer .gov, ACLU, ILRC, NILC, HUD, CMS/HRSA, state AG sites.",
          "Sources render automatically at the bottom of emergency guides and rights topics via the SourcesList component.",
          "Avoid linking to op-eds, social media, or partisan content. Bias toward primary government and well-established advocacy sources.",
        ],
      },
      {
        h: "How often to review content",
        body: [
          "Monthly internal review of all guides for typos, broken links, freshness.",
          "Quarterly attorney review of every page where reviewed: true, even if unchanged.",
          "Immediate review when laws change — federal executive orders, federal rules, state statutes affecting immigration, policing, healthcare access, housing.",
        ],
      },
      {
        h: "Who can approve legal content",
        body: [
          "Only a licensed, in-good-standing attorney admitted in at least one US jurisdiction may flip `reviewed: true` for legal content.",
          "For state-specific guidance, prefer an attorney admitted in that state.",
          "For medical content, a clinical reviewer (MD, RN, or licensed social worker) plus an attorney where legal-medical overlap exists.",
          "Nonprofit partner staff may copy-edit, translate, and prepare drafts — but cannot mark content as attorney-reviewed.",
        ],
      },
      {
        h: "How to avoid unsafe or outdated guidance",
        body: [
          "Never use 'guaranteed', 'this will protect you', 'always', or 'never' on legal claims — use 'may', 'generally', 'in many situations'.",
          "If you cannot verify a fact in 2 trusted sources, do not ship it.",
          "Whenever law changes, push a same-day update with a fresh `lastUpdated` and reset `reviewed: false` until re-reviewed.",
          "Keep emergency-page steps to 3–7 max. Keep sentences short. Reading level around 6th–8th grade.",
          "Never make political claims. Tone is calm, protective, non-political.",
        ],
      },
      {
        h: "Voice & tone",
        body: [
          "Calm, protective, clear, compassionate.",
          "No long walls of text. Use icons, bullets, and short paragraphs.",
          "Treat the reader as a parent in a stressful moment, not a law student.",
        ],
      },
    ],
  },
  es: {
    title: "Guía interna de manejo de contenido",
    intro:
      "Esta página es para el equipo y los abogados aliados que mantienen el sitio.",
    sections: [
      {
        h: "Dónde vive el contenido",
        body: [
          "lib/content.ts — guías de emergencia (ICE, policía, Patrulla Fronteriza, médico). Cada guía tiene título, intro y pasos bilingües con bloques opcionales 'di esto' y 'no hagas', además de metadatos de revisión (reviewed, reviewedBy, reviewerTitle, reviewedDate, sourceLinks, lastUpdated).",
          "lib/rights.ts — temas de Conoce Tus Derechos (policía, inmigración, trabajo, vivienda, médico) con viñetas bilingües y metadatos de revisión.",
          "lib/resources.ts — directorio de ayuda legal, clínicas, líneas de ayuda, comida, refugio, consulados.",
          "lib/i18n.ts — textos de la interfaz en inglés y español, identificados con una clave corta.",
        ],
      },
      {
        h: "Cómo actualizar contenido bilingüe",
        body: [
          "Todo el contenido legal/médico se identifica por `en` y `es`. Siempre actualiza ambos — nunca publiques un idioma adelantado del otro en páginas legales.",
          "El español debe sonar natural para familias mexicanas y latinas, no una traducción literal. Prefiere «puede que tengas el derecho» en lugar del robótico «puedes tener el derecho».",
          "Evita prometer demasiado en cualquiera de los idiomas. Conserva palabras suaves como «puede», «por lo general», «en muchas situaciones».",
        ],
      },
      {
        h: "Cómo marcar contenido como revisado",
        body: [
          "Pon `reviewed: true` SOLO cuando un abogado con licencia haya revisado AMBOS idiomas.",
          "Siempre llena también: reviewedBy (nombre completo), reviewerTitle (p. ej. «Abogada de inmigración, número de barra»), reviewedDate (formato ISO yyyy-mm-dd).",
          "Siempre actualiza lastUpdated en cualquier edición significativa, incluso antes de la revisión.",
          "Cuando el TrustBanner detecta `reviewed: true`, mostrará «Revisado por …» en lugar del aviso de revisión pendiente.",
        ],
      },
      {
        h: "Cómo agregar enlaces de fuente",
        body: [
          "Agrega al arreglo `sourceLinks`: `{ label, url }`. Prefiere .gov, ACLU, ILRC, NILC, HUD, CMS/HRSA y sitios de la oficina del Procurador estatal.",
          "Las fuentes aparecen automáticamente al final de las guías de emergencia y los temas de derechos mediante el componente SourcesList.",
          "Evita enlaces a opinión, redes sociales o contenido partidista. Da preferencia a fuentes gubernamentales y de advocacy bien establecidas.",
        ],
      },
      {
        h: "Cada cuánto revisar el contenido",
        body: [
          "Revisión interna mensual de todas las guías por errores, enlaces rotos y vigencia.",
          "Revisión por abogado cada trimestre en cada página con reviewed: true, aunque no haya cambiado.",
          "Revisión inmediata cuando cambian las leyes — órdenes ejecutivas federales, reglas federales o leyes estatales que afecten inmigración, policía, salud o vivienda.",
        ],
      },
      {
        h: "Quién puede aprobar contenido legal",
        body: [
          "Solo un abogado con licencia activa en al menos una jurisdicción de EE. UU. puede cambiar `reviewed: true` en contenido legal.",
          "Para guía específica de un estado, prefiere a un abogado admitido en ese estado.",
          "Para contenido médico, un revisor clínico (médico, enfermera o trabajador social licenciado) más un abogado cuando haya cruce legal-médico.",
          "El equipo de organizaciones aliadas puede editar, traducir y preparar borradores — pero no puede marcar contenido como revisado por abogado.",
        ],
      },
      {
        h: "Cómo evitar guía insegura o desactualizada",
        body: [
          "Nunca uses «garantizado», «esto te va a proteger», «siempre» o «nunca» en afirmaciones legales — usa «puede», «por lo general», «en muchas situaciones».",
          "Si no puedes verificar un dato en 2 fuentes confiables, no lo publiques.",
          "Cuando la ley cambie, publica una actualización el mismo día con `lastUpdated` nuevo y reinicia `reviewed: false` hasta que se vuelva a revisar.",
          "Mantén los pasos de las páginas de emergencia entre 3 y 7. Frases cortas. Nivel de lectura aproximado de 6° a 8° grado.",
          "Nunca hagas afirmaciones políticas. El tono es calmado, protector y sin política.",
        ],
      },
      {
        h: "Voz y tono",
        body: [
          "Calmado, protector, claro, compasivo.",
          "Sin párrafos largos. Usa íconos, viñetas y párrafos cortos.",
          "Trata al lector como un padre o madre en un momento de estrés, no como un estudiante de leyes.",
        ],
      },
    ],
  },
} as const;

export function ContentGuideView({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          {c.title}
        </h1>
        <p className="mt-2 text-zinc-700">{c.intro}</p>

        {c.sections.map((s) => (
          <section key={s.h} className="mt-8">
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
