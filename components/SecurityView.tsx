import { DocPageView, type DocSection } from "./DocPageView";
import type { Locale } from "@/lib/i18n";

const COPY: Record<
  Locale,
  { title: string; intro: string; sections: DocSection[] }
> = {
  en: {
    title: "Security",
    intro:
      "We treat the safety of the people who use this site as a security property. If you are a researcher who has found a vulnerability, please report it through the responsible-disclosure process below.",
    sections: [
      {
        h: "Responsible disclosure",
        body: [
          "Please do not publicly disclose a vulnerability before we have had a chance to fix it. Email security@tengoderechos.org with details and a reproduction. We will acknowledge within 72 hours and provide a remediation timeline.",
          "We do not yet run a paid bug-bounty program. We do publicly credit reporters (with consent) on /about/security under 'Hall of fame' once a fix has shipped.",
        ],
      },
      {
        h: "What's in scope",
        body: [
          { kind: "list", items: [
            "Anything served on tengoderechos.org and *.tengoderechos.org.",
            "The /api/donations/checkout, /api/donations/webhook, /api/og, /api/qr, /api/connections/* routes.",
            "The admin consoles at /admin/resources and /admin/reviews.",
            "The service worker at /sw.js and the offline cache behavior.",
          ]},
        ],
      },
      {
        h: "What's out of scope",
        body: [
          { kind: "list", items: [
            "Any third-party domain (Stripe, Supabase, Resend, ElevenLabs, Apple Wallet) — please report directly to those providers.",
            "Spam / abuse via the public submission form (we already require server-side moderation).",
            "Best-practice nits without a concrete attack scenario (e.g. missing X-Frame-Options on a page that already returns no sensitive data).",
          ]},
        ],
      },
      {
        h: "Architecture notes for reviewers",
        body: [
          "Public site is a Next.js 16 App Router application. All emergency and rights pages are statically prerendered; the service worker caches them with a versioned cache key bound to package.json.version + build date.",
          "Donation flow uses Stripe Checkout (hosted) — we never see card details. Webhook signature verification uses STRIPE_WEBHOOK_SECRET; events are deduplicated in an in-memory LRU.",
          "The admin token cookie is httpOnly, Secure, SameSite=lax, and only set when ADMIN_TOKEN matches at sign-in.",
          "Content attestations are stored at data/content-attestations.json. Each attestation is bound to a content version; bumping the version drops the attestation, preventing silent edits to verified content.",
          "robots.txt explicitly opts in major AI crawlers. /admin and /weather are explicitly disallowed.",
        ],
      },
      {
        h: "Hall of fame",
        body: [
          "(Empty — be the first.)",
        ],
      },
      {
        h: "security.txt",
        body: [
          "We publish a machine-readable security.txt at /.well-known/security.txt per RFC 9116. Tools like the Mozilla HTTP Observatory and Internet.nl test for it automatically.",
        ],
      },
    ],
  },
  es: {
    title: "Seguridad",
    intro:
      "Tratamos la seguridad de las personas que usan este sitio como una propiedad de seguridad técnica. Si eres investigador y encontraste una vulnerabilidad, por favor repórtala mediante el proceso de divulgación responsable a continuación.",
    sections: [
      {
        h: "Divulgación responsable",
        body: [
          "Por favor no divulgues públicamente una vulnerabilidad antes de que tengamos la oportunidad de corregirla. Escribe a security@tengoderechos.org con detalles y una reproducción. Acusamos recibo en 72 horas y proporcionamos un cronograma de corrección.",
          "Aún no operamos un programa de recompensas pagado. Sí reconocemos públicamente a los reportantes (con su consentimiento) en /about/security bajo «Salón de la fama» una vez publicado el arreglo.",
        ],
      },
      {
        h: "Qué está dentro del alcance",
        body: [
          { kind: "list", items: [
            "Cualquier cosa servida en tengoderechos.org y *.tengoderechos.org.",
            "Las rutas /api/donations/checkout, /api/donations/webhook, /api/og, /api/qr, /api/connections/*.",
            "Las consolas de administración /admin/resources y /admin/reviews.",
            "El service worker en /sw.js y el comportamiento de caché sin conexión.",
          ]},
        ],
      },
      {
        h: "Qué está fuera de alcance",
        body: [
          { kind: "list", items: [
            "Cualquier dominio de terceros (Stripe, Supabase, Resend, ElevenLabs, Apple Wallet) — repórtalo directamente a esos proveedores.",
            "Spam / abuso vía el formulario público (ya requerimos moderación del lado del servidor).",
            "Detalles de buenas prácticas sin un escenario concreto de ataque (p. ej. falta de X-Frame-Options en una página que no devuelve datos sensibles).",
          ]},
        ],
      },
      {
        h: "Notas de arquitectura para revisores",
        body: [
          "El sitio público es una aplicación Next.js 16 con App Router. Todas las páginas de emergencia y derechos se prerrenderizan estáticamente; el service worker las guarda con una clave de caché versionada ligada a package.json.version + fecha de build.",
          "El flujo de donación usa Stripe Checkout (hospedado) — nunca vemos datos de tarjeta. La verificación de firma del webhook usa STRIPE_WEBHOOK_SECRET; los eventos se deduplican en un LRU en memoria.",
          "La cookie de admin es httpOnly, Secure, SameSite=lax y se establece solo cuando ADMIN_TOKEN coincide al iniciar sesión.",
          "Las atestaciones de contenido se guardan en data/content-attestations.json. Cada atestación está ligada a una versión de contenido; subir la versión descarta la atestación, evitando ediciones silenciosas al contenido verificado.",
          "El robots.txt incluye explícitamente a los principales rastreadores de IA. /admin y /weather están explícitamente prohibidos.",
        ],
      },
      {
        h: "Salón de la fama",
        body: [
          "(Vacío — sé la primera persona en la lista.)",
        ],
      },
      {
        h: "security.txt",
        body: [
          "Publicamos un security.txt legible por máquina en /.well-known/security.txt según el RFC 9116. Herramientas como Mozilla HTTP Observatory e Internet.nl lo verifican automáticamente.",
        ],
      },
    ],
  },
};

export function SecurityView({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <DocPageView
      locale={locale}
      title={c.title}
      intro={c.intro}
      sections={c.sections}
      meta={[
        {
          label: "RFC",
          value: "9116",
        },
        {
          label: locale === "es" ? "Contacto" : "Contact",
          value: "security@tengoderechos.org",
        },
      ]}
      cta={[
        {
          label: "security.txt",
          href: "/.well-known/security.txt",
        },
      ]}
    />
  );
}
