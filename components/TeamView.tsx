import { DocPageView, type DocSection } from "./DocPageView";
import type { Locale } from "@/lib/i18n";

const COPY: Record<
  Locale,
  { title: string; intro: string; sections: DocSection[] }
> = {
  en: {
    title: "Team & advisors",
    intro:
      "Tengo Derechos is a small civic-tech project, intentionally. The team is named, the advisory board is named, and our governance is documented so partners know who they are working with.",
    sections: [
      {
        h: "Why this exists",
        body: [
          "Mexican and Latino families across the United States face emergencies they should not have to face alone — a knock at the door, a stop on the highway, a hospital visit they can't afford. Most of them carry a phone, but the verified, calm, step-by-step information they need at that moment isn't on the phone with them.",
          "Tengo Derechos is the toolkit that fits in a WhatsApp message. Every guide is bilingual, every step is shareable as a single card with its own QR, every page works offline once saved, and every claim is on a path to attorney verification.",
        ],
      },
      {
        h: "Founder",
        body: [
          "Founder bio (placeholder). Replace with your photo, two paragraphs, and what makes you uniquely positioned to lead this work. A specific origin story converts every grant proposal more reliably than a generic mission statement.",
          "Contact: founder@tengoderechos.org.",
        ],
      },
      {
        h: "Advisory board structure",
        body: [
          "We are recruiting a five-person advisory board with the following composition. None of these seats are filled today — they are listed publicly so that partner organizations can see the architecture and recommend candidates.",
          { kind: "list", items: [
            "Immigration attorney (AILA member, US-jurisdiction).",
            "Criminal defense attorney or public defender.",
            "Health-law or patient-advocacy attorney.",
            "Tenant-rights attorney with state-level practice (recruiting CA first).",
            "Bilingual community organizer with grassroots distribution experience.",
          ]},
        ],
      },
      {
        h: "Governance",
        body: [
          "Editorial decisions are bound by the methodology at /about/methodology. Content cannot be marked verified without a licensed attorney signing off in the admin console at /admin/reviews — and the specialty allowlist refuses approvals that don't match.",
          "Financial decisions, partnership decisions, and translation decisions are made by the founder with input from the advisory board (when convened). Major decisions are logged on the public roadmap.",
        ],
      },
      {
        h: "Partner organizations",
        body: [
          "(Recruiting.)  Letters of support: partners@tengoderechos.org.",
        ],
      },
    ],
  },
  es: {
    title: "Equipo y asesores",
    intro:
      "Tengo Derechos es un proyecto pequeño de tecnología cívica, de manera intencional. El equipo está nombrado, el consejo asesor está nombrado, y nuestra gobernanza está documentada para que los aliados sepan con quién están trabajando.",
    sections: [
      {
        h: "Por qué existe",
        body: [
          "Las familias mexicanas y latinas en Estados Unidos enfrentan emergencias que no deberían enfrentar solas — un toque en la puerta, una parada en la carretera, una visita al hospital que no pueden pagar. La mayoría carga un teléfono, pero la información verificada, calmada y paso a paso que necesitan en ese momento no está en el teléfono con ellos.",
          "Tengo Derechos es el kit de herramientas que cabe en un mensaje de WhatsApp. Cada guía es bilingüe, cada paso se puede compartir como una tarjeta con su propio código QR, cada página funciona sin conexión una vez guardada, y cada afirmación está en camino a verificación por abogado.",
        ],
      },
      {
        h: "Fundador",
        body: [
          "Biografía del fundador (provisional). Reemplaza con tu foto, dos párrafos y lo que te coloca de forma única para liderar este trabajo. Una historia de origen específica convierte cada propuesta de donación más confiablemente que una declaración de misión genérica.",
          "Contacto: founder@tengoderechos.org.",
        ],
      },
      {
        h: "Estructura del consejo asesor",
        body: [
          "Estamos reclutando un consejo asesor de cinco personas con la siguiente composición. Ninguno de estos asientos está ocupado hoy — se listan públicamente para que las organizaciones aliadas vean la arquitectura y recomienden candidaturas.",
          { kind: "list", items: [
            "Abogado de inmigración (miembro de AILA, jurisdicción de EE. UU.).",
            "Abogado de defensa penal o defensor público.",
            "Abogado de derecho sanitario o de defensoría del paciente.",
            "Abogado de derechos del inquilino con práctica estatal (reclutando primero en CA).",
            "Organizador comunitario bilingüe con experiencia de distribución a nivel de base.",
          ]},
        ],
      },
      {
        h: "Gobernanza",
        body: [
          "Las decisiones editoriales están atadas a la metodología en /about/methodology. El contenido no puede marcarse como verificado sin que un abogado con licencia firme en la consola en /admin/reviews — y la lista de especialidades rechaza aprobaciones que no coincidan.",
          "Las decisiones financieras, de alianzas y de traducción las toma el fundador con aportes del consejo asesor (cuando se convoca). Las decisiones importantes se registran en la hoja de ruta pública.",
        ],
      },
      {
        h: "Organizaciones aliadas",
        body: [
          "(Reclutando.) Cartas de apoyo: partners@tengoderechos.org.",
        ],
      },
    ],
  },
};

export function TeamView({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <DocPageView
      locale={locale}
      title={c.title}
      intro={c.intro}
      sections={c.sections}
      cta={[
        {
          label: locale === "es" ? "Contacto de prensa" : "Press contact",
          href: locale === "es" ? "/es/press" : "/press",
        },
      ]}
    />
  );
}
