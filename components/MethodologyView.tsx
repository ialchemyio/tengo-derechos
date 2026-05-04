import { DocPageView, type DocSection } from "./DocPageView";
import type { Locale } from "@/lib/i18n";

const COPY: Record<
  Locale,
  { title: string; intro: string; sections: DocSection[] }
> = {
  en: {
    title: "How we make this content",
    intro:
      "Tengo Derechos publishes legal-sensitive emergency information. We treat editorial standards the way a newsroom does — with named reviewers, dated revisions, and an explicit chain of custody from claim to citation.",
    sections: [
      {
        h: "Our editorial principles",
        body: [
          "Treat every reader as someone in distress. Plain language. Short sentences. Reading level grade 6–8.",
          "Never overpromise. Use 'may', 'generally', 'in many situations'. Never 'always', 'never', or 'this will protect you'.",
          "Never imply attorney-client relationship. Always cite that information is educational and not legal advice.",
          "Bilingual parity is non-negotiable. We do not ship Spanish drafts that have not been reviewed for natural register; we do not ship English-only legal claims.",
        ],
      },
      {
        h: "Sourcing",
        body: [
          "Primary sources first: federal regulations, state bar publications, supreme-court holdings.",
          "Secondary sources from established advocacy: ACLU, ILRC, NILC, CLINIC, NACDL, public defender bar associations.",
          "Every claim must be supportable in two trusted sources before publishing.",
          { kind: "list", items: [
            "Federal: .gov sources (EOIR, USCIS, ICE policy memos, CMS, HRSA, HUD, DOL).",
            "Civil liberties: ACLU national + relevant state affiliate.",
            "Immigration: ILRC, NILC, AILA practice advisories.",
            "Criminal: NACDL, state public defender associations.",
            "Health: CMS EMTALA, HRSA Health Center Program, AHA Hospitals & Communities.",
            "Housing: HUD Fair Housing, state legal-aid org.",
          ]},
        ],
      },
      {
        h: "Review pipeline",
        body: [
          "Every emergency guide and rights topic carries machine-readable review metadata: reviewed flag, reviewer ID, reviewer title, jurisdiction, scope (full/partial), notes, sourceLinks, lastUpdated, and audioReviewed.",
          "An attestation is recorded only after a licensed attorney signs off in our admin console at /admin/reviews. The console enforces specialty allowlists per content slug, refusing approvals from reviewers whose specialty does not match (e.g. a tax attorney cannot approve an immigration guide).",
          "Each attestation is bound to a content version. Editing the underlying content increments the version and automatically invalidates the attestation, reverting the page to amber 'needs review' status until re-approved. There is no way to silently edit verified content.",
          "TrustBanner on every emergency and rights page surfaces the current state: green when verified (with reviewer name, title, organization, jurisdiction, and date) or amber when unverified.",
        ],
      },
      {
        h: "Translation",
        body: [
          "Spanish is drafted in natural register for Mexican / Latino families — not literal translation. We prefer 'puede que tengas el derecho' over the robotic 'puedes tener el derecho'.",
          "Both English and Spanish must be reviewed by an attorney who reads both languages, or by two co-signing attorneys from the same firm within 30 days of each other.",
          "When Spanish drafts are open for community review, we credit the Spanish-language reviewer separately on the relevant page.",
        ],
      },
      {
        h: "Audio production",
        body: [
          "Audio recordings of every 'what you may say' phrase ship in both English and Spanish. Phase 8 ships TTS as a starting point (Apple Samantha + Paulina) so families have a working pronunciation guide today.",
          "We are actively recruiting human voice actors and a clinical pronunciation reviewer. The audioReviewed flag is set true only after a licensed attorney has listened to BOTH the English and Spanish clips and confirmed they match the verified text.",
          "All clips are mono, 64 kbps MP3, normalized to about -16 LUFS, no music bed.",
        ],
      },
      {
        h: "Update cadence",
        body: [
          "Monthly internal pass: typos, broken links, freshness, source URL drift.",
          "Quarterly attorney pass: every page where reviewed=true is reconfirmed even if unchanged.",
          "Immediate pass when laws change: federal executive orders, federal rules, state statutes affecting immigration, policing, healthcare access, or housing. lastUpdated is bumped same-day; reviewed reverts to false until re-approved.",
        ],
      },
      {
        h: "Conflicts of interest",
        body: [
          "Reviewers must disclose any active client engagement with parties that could influence the content's framing. Active conflicts disqualify a reviewer for the affected slug.",
          "We do not accept content sponsorships, brand placements, or paid promotional links from any party — public or private.",
        ],
      },
      {
        h: "Corrections",
        body: [
          "If you spot an error, email corrections@tengoderechos.org with the page URL and the specific claim. We review every report within 7 days. Substantive corrections are logged in the admin history feed and surfaced via lastUpdated.",
        ],
      },
    ],
  },
  es: {
    title: "Cómo elaboramos este contenido",
    intro:
      "Tengo Derechos publica información de emergencia con sensibilidad legal. Tratamos los estándares editoriales como una redacción periodística — con revisores nombrados, fechas de revisión y una cadena explícita de custodia desde la afirmación hasta la fuente.",
    sections: [
      {
        h: "Principios editoriales",
        body: [
          "Trata a cada lectora como alguien en momentos difíciles. Lenguaje sencillo. Oraciones cortas. Nivel de lectura de 6° a 8° grado.",
          "Nunca prometas de más. Usa «puede», «por lo general», «en muchas situaciones». Nunca «siempre», «nunca» o «esto te va a proteger».",
          "Nunca implicar relación abogado-cliente. Siempre indicar que la información es educativa y no es asesoramiento legal.",
          "La paridad bilingüe no es negociable. No publicamos borradores en español que no hayan sido revisados; no publicamos afirmaciones legales solo en inglés.",
        ],
      },
      {
        h: "Fuentes",
        body: [
          "Fuentes primarias primero: regulaciones federales, publicaciones de barras estatales, fallos de la Corte Suprema.",
          "Fuentes secundarias de organizaciones de advocacy establecidas: ACLU, ILRC, NILC, CLINIC, NACDL, asociaciones de defensores públicos.",
          "Cada afirmación debe poder respaldarse en dos fuentes confiables antes de publicarse.",
          { kind: "list", items: [
            "Federal: fuentes .gov (EOIR, USCIS, memos de política de ICE, CMS, HRSA, HUD, DOL).",
            "Libertades civiles: ACLU nacional + filial estatal relevante.",
            "Inmigración: ILRC, NILC, advisorías de práctica de AILA.",
            "Penal: NACDL, asociaciones estatales de defensores públicos.",
            "Salud: CMS EMTALA, HRSA Health Center Program, AHA Hospitals & Communities.",
            "Vivienda: HUD Fair Housing, organización estatal de ayuda legal.",
          ]},
        ],
      },
      {
        h: "Pipeline de revisión",
        body: [
          "Cada guía de emergencia y tema de derechos lleva metadatos de revisión legibles por máquina: bandera reviewed, ID del revisor, título, jurisdicción, alcance (completo/parcial), notas, enlaces de fuente, lastUpdated y audioReviewed.",
          "Una atestación solo se registra después de que un abogado con licencia firma en nuestra consola en /admin/reviews. La consola hace cumplir listas de especialidad por contenido, rechazando aprobaciones cuando la especialidad del revisor no coincide (ej. un abogado fiscal no puede aprobar una guía de inmigración).",
          "Cada atestación está ligada a una versión del contenido. Editar el contenido incrementa la versión e invalida automáticamente la atestación, regresando la página al estado «necesita revisión» en ámbar hasta que se vuelva a aprobar. No es posible editar silenciosamente contenido verificado.",
          "El TrustBanner en cada página de emergencia y derechos muestra el estado actual: verde cuando está verificado (con nombre, título, organización, jurisdicción y fecha del revisor) o ámbar cuando no.",
        ],
      },
      {
        h: "Traducción",
        body: [
          "El español se redacta en registro natural para familias mexicanas y latinas — no traducción literal. Preferimos «puede que tengas el derecho» sobre el robotizado «puedes tener el derecho».",
          "Tanto el inglés como el español deben ser revisados por un abogado que lea ambos idiomas, o por dos abogados co-firmantes del mismo despacho dentro de 30 días.",
          "Cuando los borradores en español están abiertos a revisión comunitaria, acreditamos al revisor de español por separado en la página correspondiente.",
        ],
      },
      {
        h: "Producción de audio",
        body: [
          "Las grabaciones de cada frase «qué puedes decir» se publican en inglés y en español. La Fase 8 publica TTS como punto de partida (Apple Samantha + Paulina) para que las familias tengan una guía de pronunciación útil hoy.",
          "Estamos reclutando activamente actores de voz humanos y un revisor clínico de pronunciación. La bandera audioReviewed se pone en true solo después de que un abogado con licencia haya escuchado AMBAS grabaciones (inglés y español) y confirme que coinciden con el texto verificado.",
          "Todas las grabaciones son mono, 64 kbps MP3, normalizadas alrededor de -16 LUFS, sin pista musical.",
        ],
      },
      {
        h: "Cadencia de actualización",
        body: [
          "Pase interno mensual: errores de texto, enlaces rotos, vigencia, deriva de URLs de fuente.",
          "Pase de abogado trimestral: cada página con reviewed=true se vuelve a confirmar aunque no haya cambiado.",
          "Pase inmediato cuando cambian las leyes: órdenes ejecutivas federales, reglas federales, leyes estatales que afecten inmigración, policía, salud o vivienda. lastUpdated se actualiza el mismo día; reviewed regresa a false hasta nueva aprobación.",
        ],
      },
      {
        h: "Conflictos de interés",
        body: [
          "Los revisores deben declarar cualquier representación activa que pueda influir en cómo se redacta el contenido. Los conflictos activos descalifican al revisor para esa página.",
          "No aceptamos patrocinios de contenido, colocaciones de marca ni enlaces promocionales pagados de ninguna parte — pública o privada.",
        ],
      },
      {
        h: "Correcciones",
        body: [
          "Si detectas un error, escríbenos a corrections@tengoderechos.org con la URL y la afirmación específica. Revisamos cada reporte dentro de 7 días. Las correcciones sustantivas se registran en el historial de la consola y se reflejan en lastUpdated.",
        ],
      },
    ],
  },
};

export function MethodologyView({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <DocPageView
      locale={locale}
      title={c.title}
      intro={c.intro}
      sections={c.sections}
      meta={[
        {
          label: locale === "es" ? "Versión" : "Version",
          value: "1.0",
        },
        {
          label: locale === "es" ? "Última actualización" : "Last updated",
          value: "2026-05-04",
        },
      ]}
      cta={[
        {
          label: locale === "es" ? "Ver consola de revisiones" : "See review console",
          href: locale === "es" ? "/es/admin/content-guide" : "/admin/content-guide",
        },
      ]}
    />
  );
}
