import { DocPageView, type DocSection } from "./DocPageView";
import { BrandShowcase } from "./BrandShowcase";
import type { Locale } from "@/lib/i18n";

const COPY: Record<
  Locale,
  { title: string; intro: string; sections: DocSection[] }
> = {
  en: {
    title: "Press",
    intro:
      "Bilingual emergency rights toolkit for Mexican and Latino immigrant families in the United States. Built for WhatsApp distribution, verified by attorneys, works offline.",
    sections: [
      {
        h: "Fact sheet",
        body: [
          { kind: "list", items: [
            "Name: Tengo Derechos · tengoderechos.org",
            "Tagline: Tus derechos. Tu familia. Tu protección.",
            "Languages: English + Spanish (Mexican-Spanish register).",
            "Coverage: ICE-at-door, police traffic stops, Border Patrol encounters, medical care without insurance, plus rights topics on workplace and housing.",
            "Verification: every guide carries machine-readable review metadata; attorney sign-offs are bound to a content version with HMAC and auto-invalidate when content changes.",
            "Distribution: WhatsApp-first deep links, per-step shareable rights cards with their own OG previews and QR codes, full offline PWA, AI-crawler opt-in for ChatGPT / Claude / Perplexity / Google AI Overviews.",
            "Donations: Stripe Checkout (one-time + monthly). 501(c)(3) status pending.",
            "Audio: real MP3 narration of every 'what you may say' phrase, in both languages.",
            "Open source: under preparation.",
            "Privacy: no analytics, no third-party trackers, no advertising.",
          ]},
        ],
      },
      {
        h: "Story angles",
        body: [
          "1. The civic toolkit that fits in a WhatsApp message — how a small team built distribution as a first-class feature for a community where the fastest information channel is family group chats.",
          "2. Verified by attorneys, in real time — how the version-bump-invalidates-attestation HMAC system gives families and journalists a chain of custody for emergency rights information.",
          "3. Offline-first civic tech for the cheap-phone reality — how a bilingual PWA gives a $50 Android in rural Texas the same emergency rights guides as a $1200 iPhone in Manhattan.",
          "4. AI-friendly civic information by design — how Tengo Derechos opts in to ChatGPT, Claude, and Perplexity so families asking those tools get verified guidance instead of hallucinated answers.",
        ],
      },
      {
        h: "Brand assets",
        body: [
          { kind: "list", items: [
            "Logo (PNG 192): /icons/icon-192.png",
            "Logo (PNG 512): /icons/icon-512.png",
            "Logo (SVG vector): /icons/icon.svg",
            "OG image generator: /api/og?title=...&subtitle=...",
            "QR generator: /api/qr?url=...",
            "Wordmark color: terracotta #b4571f. Counterweight color: deep navy #1f2c44. Background: cream #fbf7ef.",
            "Display font: Fraunces (Google Fonts). Body font: Inter (Google Fonts).",
          ]},
        ],
      },
      {
        h: "Press contact",
        body: [
          "press@tengoderechos.org · response within 24 hours.",
          "We can provide: founder interview availability, on-the-record quotes about the methodology, screenshots, video demo, partner contacts (when partners are signed).",
        ],
      },
      {
        h: "What we ask of journalists",
        body: [
          "Always link to the page or step you're describing — never quote a partial step out of context. We update content when laws change, and the URL is the source of truth.",
          "If you cite a verified guide, please name the reviewing attorney where shown on the page.",
          "If you embed a screenshot, please use a current capture; older copies may show outdated language.",
        ],
      },
    ],
  },
  es: {
    title: "Prensa",
    intro:
      "Kit de derechos de emergencia bilingüe para familias mexicanas y latinas en Estados Unidos. Construido para distribución por WhatsApp, verificado por abogados, funciona sin conexión.",
    sections: [
      {
        h: "Hoja de datos",
        body: [
          { kind: "list", items: [
            "Nombre: Tengo Derechos · tengoderechos.org",
            "Lema: Tus derechos. Tu familia. Tu protección.",
            "Idiomas: inglés + español (registro mexicano).",
            "Cobertura: ICE en la puerta, parada de tránsito, encuentro con Patrulla Fronteriza, ayuda médica sin seguro, más temas de derechos laborales y de vivienda.",
            "Verificación: cada guía lleva metadatos legibles por máquina; las firmas de abogados están ligadas a la versión del contenido con HMAC y se invalidan automáticamente cuando el contenido cambia.",
            "Distribución: enlaces directos WhatsApp-first, tarjetas de derechos compartibles por paso con sus propias vistas previas OG y códigos QR, PWA completa sin conexión, opt-in para rastreadores de IA (ChatGPT, Claude, Perplexity, Google AI Overviews).",
            "Donaciones: Stripe Checkout (única + mensual). Estatus 501(c)(3) en trámite.",
            "Audio: narración real en MP3 de cada frase «qué puedes decir», en ambos idiomas.",
            "Código abierto: en preparación.",
            "Privacidad: sin analytics, sin rastreadores de terceros, sin publicidad.",
          ]},
        ],
      },
      {
        h: "Ángulos de historia",
        body: [
          "1. El kit cívico que cabe en un mensaje de WhatsApp — cómo un equipo pequeño construyó la distribución como característica de primera clase para una comunidad donde el canal de información más rápido son los chats familiares.",
          "2. Verificado por abogados, en tiempo real — cómo el sistema de HMAC con invalidación automática por versión le da a las familias y al periodismo una cadena de custodia para información de derechos de emergencia.",
          "3. Tecnología cívica que prioriza lo offline para la realidad del teléfono económico — cómo una PWA bilingüe le da a un Android de $50 en Texas rural las mismas guías de emergencia que a un iPhone de $1200 en Manhattan.",
          "4. Información cívica diseñada para la IA — cómo Tengo Derechos se inscribe deliberadamente en ChatGPT, Claude y Perplexity para que las familias que les pregunten reciban orientación verificada en lugar de respuestas inventadas.",
        ],
      },
      {
        h: "Recursos de marca",
        body: [
          { kind: "list", items: [
            "Logo (PNG 192): /icons/icon-192.png",
            "Logo (PNG 512): /icons/icon-512.png",
            "Logo (SVG vectorial): /icons/icon.svg",
            "Generador de imagen OG: /api/og?title=...&subtitle=...",
            "Generador de QR: /api/qr?url=...",
            "Color de wordmark: terracota #b4571f. Color de contrapeso: azul marino profundo #1f2c44. Fondo: crema #fbf7ef.",
            "Fuente display: Fraunces (Google Fonts). Fuente del cuerpo: Inter (Google Fonts).",
          ]},
        ],
      },
      {
        h: "Contacto de prensa",
        body: [
          "press@tengoderechos.org · respuesta en 24 horas.",
          "Podemos ofrecer: disponibilidad de entrevista con el fundador, citas en el récord sobre la metodología, capturas de pantalla, demo en video, contactos de aliados (cuando los aliados estén firmados).",
        ],
      },
      {
        h: "Lo que pedimos al periodismo",
        body: [
          "Por favor enlazar a la página o paso que describen — nunca citar un paso parcial fuera de contexto. Actualizamos el contenido cuando las leyes cambian, y la URL es la fuente verdadera.",
          "Si citan una guía verificada, por favor nombren al abogado revisor que aparece en la página.",
          "Si insertan una captura, por favor usen una captura actual; copias viejas pueden mostrar lenguaje obsoleto.",
        ],
      },
    ],
  },
};

export function PressView({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <DocPageView
      locale={locale}
      title={c.title}
      intro={c.intro}
      sections={c.sections}
      cta={[
        {
          label: locale === "es" ? "Logo SVG" : "Logo SVG",
          href: "/icons/icon.svg",
        },
        {
          label:
            locale === "es"
              ? "PNG 512 (transparente)"
              : "PNG 512 (transparent)",
          href: "/icons/icon-512.png",
        },
        {
          label:
            locale === "es"
              ? "PNG 1024 (transparente)"
              : "PNG 1024 (transparent)",
          href: "/icons/icon-1024-transparent.png",
        },
        {
          label: "App icon (iOS)",
          href: "/icons/apple-touch-icon.png",
        },
      ]}
    >
      <BrandShowcase locale={locale} />
    </DocPageView>
  );
}
