import { DocPageView, type DocSection } from "./DocPageView";
import type { Locale } from "@/lib/i18n";

const COPY: Record<
  Locale,
  { title: string; intro: string; sections: DocSection[] }
> = {
  en: {
    title: "Privacy",
    intro:
      "Tengo Derechos serves people who often cannot afford another data leak. Our privacy posture reflects that: we collect almost nothing, share nothing with third parties, and run no advertising or tracking pixels.",
    sections: [
      {
        h: "What we do not collect",
        body: [
          { kind: "list", items: [
            "No Google Analytics, Facebook Pixel, TikTok Pixel, or any other third-party analytics tag.",
            "No advertising. No marketing pixels. No cross-site tracking.",
            "No fingerprinting. No device-ID collection.",
            "No location tracking. We do not request geolocation.",
            "No personally-identifying account creation. There are no user accounts on the public site.",
          ]},
        ],
      },
      {
        h: "What technically happens when you visit",
        body: [
          "Your browser fetches HTML, CSS, JavaScript, fonts, icons, and (when used) audio clips. Server logs from our hosting provider record standard HTTP-request data — IP address, user-agent, requested path, response status — for security and abuse-prevention. We do not aggregate, sell, or transfer these logs.",
          "Our service worker (when you visit while online) saves emergency pages on your phone so you can use them later without internet. The cache lives in your browser only.",
          "We use first-party cookies and storage only in two very narrow places. The admin console at /admin/* sets a single httpOnly token cookie when an authorized administrator signs in. Public visitors never see it. The 'Saved offline' pill and the share prompt use sessionStorage to remember that you dismissed them in the current tab.",
        ],
      },
      {
        h: "Resource submissions",
        body: [
          "If you submit a community resource via /resources/submit, we keep the organization details you provided (name, address, contact, languages, notes). The submitter name and email are optional. We never publish a submitter's email.",
          "Submissions are stored in our Supabase database (US region) until reviewed by a moderator. Approved entries are published; the rest remain in moderation queue.",
        ],
      },
      {
        h: "Donations",
        body: [
          "Donations are processed by Stripe. We never see your card number. Stripe stores your payment data subject to Stripe's privacy policy.",
          "Our webhook records: donation amount, currency, the Stripe session id, customer email (only if you provided it to Stripe), and timestamp. We use this only to confirm fulfillment and produce annual transparency reports — never for marketing.",
        ],
      },
      {
        h: "Audio playback",
        body: [
          "Audio clips are streamed from our own server. No third party sees that you played a clip. Nothing is logged about which clip you played, how long you listened, or in which language.",
        ],
      },
      {
        h: "AI assistants and search engines",
        body: [
          "We deliberately allow major AI assistants (ChatGPT, Claude, Perplexity, Google AI Overviews) to read our public guides via robots.txt. We believe that when someone asks an AI 'what do I do if ICE comes to my door?', the AI should be able to surface verified, attorney-reviewed information rather than guessing. Indexing our content does not give those services access to any visitor data — only the public content itself.",
        ],
      },
      {
        h: "Children",
        body: [
          "The site is meant to be safe for children to navigate during a crisis. We do not collect data from anyone — minors or adults. There is no account creation, no profile, no targeted content.",
        ],
      },
      {
        h: "Quick Exit",
        body: [
          "Every emergency page carries a Quick Exit button that immediately replaces the current tab with /weather, a neutral cover page. The Quick Exit destination is also indexed as noindex so it does not appear in browser history search results.",
        ],
      },
      {
        h: "Your rights under CCPA / GDPR",
        body: [
          "Because we do not collect personal data on public visitors, there is nothing to access, correct, port, or delete on your behalf. If you submitted a community resource and want it removed before publication, email privacy@tengoderechos.org with the submission ID; we'll delete the row.",
          "California residents have the right to know what is collected and to opt out of sale of personal information. We do not sell personal information. Period.",
        ],
      },
      {
        h: "Contact",
        body: [
          "Privacy questions: privacy@tengoderechos.org. Security disclosure: see /about/security and /.well-known/security.txt.",
        ],
      },
    ],
  },
  es: {
    title: "Privacidad",
    intro:
      "Tengo Derechos atiende a personas que a menudo no pueden permitirse otra filtración de datos. Nuestra postura de privacidad lo refleja: recolectamos casi nada, no compartimos nada con terceros, y no hacemos publicidad ni rastreo.",
    sections: [
      {
        h: "Lo que NO recolectamos",
        body: [
          { kind: "list", items: [
            "No usamos Google Analytics, Facebook Pixel, TikTok Pixel ni ninguna otra etiqueta de análisis de terceros.",
            "No publicamos publicidad. No usamos píxeles de marketing. No hacemos rastreo entre sitios.",
            "No usamos fingerprinting. No recolectamos identificadores del dispositivo.",
            "No rastreamos ubicación. No pedimos geolocalización.",
            "No hay cuentas de usuario en el sitio público.",
          ]},
        ],
      },
      {
        h: "Qué ocurre técnicamente cuando visitas",
        body: [
          "Tu navegador descarga HTML, CSS, JavaScript, fuentes, íconos y (cuando se usan) grabaciones de audio. Los registros del servidor del hosting incluyen información estándar de cada petición HTTP — dirección IP, user-agent, ruta solicitada, estado de respuesta — para seguridad y prevención de abuso. No agregamos, vendemos ni transferimos esos registros.",
          "Nuestro service worker (cuando visitas con conexión) guarda las páginas de emergencia en tu teléfono para que puedas usarlas después sin internet. La caché vive solo en tu navegador.",
          "Usamos cookies y almacenamiento de primera parte solo en dos lugares muy limitados. La consola en /admin/* establece una cookie httpOnly cuando un administrador autorizado inicia sesión. Los visitantes públicos nunca la ven. La pastilla «Guardadas sin conexión» y el aviso de compartir usan sessionStorage para recordar que las cerraste en la pestaña actual.",
        ],
      },
      {
        h: "Propuestas de recursos",
        body: [
          "Si envías un recurso comunitario en /resources/submit, guardamos los datos de la organización que proporcionaste (nombre, dirección, contacto, idiomas, notas). El nombre y correo del remitente son opcionales. Nunca publicamos el correo del remitente.",
          "Las propuestas se almacenan en nuestra base de datos Supabase (región EE. UU.) hasta que un moderador las revise. Las entradas aprobadas se publican; las demás permanecen en cola de moderación.",
        ],
      },
      {
        h: "Donaciones",
        body: [
          "Las donaciones se procesan por Stripe. Nunca vemos tu número de tarjeta. Stripe almacena tus datos de pago bajo la política de privacidad de Stripe.",
          "Nuestro webhook registra: monto, moneda, el id de sesión de Stripe, correo del cliente (solo si lo proporcionaste a Stripe) y fecha. Lo usamos solo para confirmar el cumplimiento y producir informes anuales de transparencia — nunca para marketing.",
        ],
      },
      {
        h: "Reproducción de audio",
        body: [
          "Las grabaciones se sirven desde nuestro propio servidor. Ningún tercero ve que reprodujiste un audio. No registramos cuál reprodujiste, cuánto escuchaste, ni en qué idioma.",
        ],
      },
      {
        h: "Asistentes de IA y buscadores",
        body: [
          "Permitimos deliberadamente que los principales asistentes de IA (ChatGPT, Claude, Perplexity, Google AI Overviews) lean nuestras guías públicas vía robots.txt. Creemos que cuando alguien le pregunta a una IA «¿qué hago si llega ICE a mi casa?», la IA debe poder mostrar información verificada y revisada por abogados en lugar de adivinar. Indexar nuestro contenido no le da a esos servicios acceso a datos de visitantes — solo al contenido público.",
        ],
      },
      {
        h: "Niños",
        body: [
          "El sitio está pensado para que sea seguro para niños durante una crisis. No recolectamos datos de nadie — ni de menores ni de adultos. No hay registro, perfil ni contenido segmentado.",
        ],
      },
      {
        h: "Salida rápida",
        body: [
          "Cada página de emergencia tiene un botón de Salida rápida que reemplaza inmediatamente la pestaña actual con /weather, una página neutral. El destino de Salida rápida está marcado como noindex para que no aparezca en los resultados del historial del navegador.",
        ],
      },
      {
        h: "Tus derechos bajo CCPA / GDPR",
        body: [
          "Como no recolectamos datos personales de visitantes públicos, no hay nada que acceder, corregir, portar o eliminar en tu nombre. Si enviaste un recurso comunitario y quieres que lo eliminemos antes de publicarlo, escribe a privacy@tengoderechos.org con el ID de envío; eliminaremos la fila.",
          "Los residentes de California tienen el derecho de saber qué se recolecta y de optar por no vender su información personal. No vendemos información personal. Punto.",
        ],
      },
      {
        h: "Contacto",
        body: [
          "Consultas de privacidad: privacy@tengoderechos.org. Divulgación de seguridad: ver /about/security y /.well-known/security.txt.",
        ],
      },
    ],
  },
};

export function PrivacyView({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <DocPageView
      locale={locale}
      title={c.title}
      intro={c.intro}
      sections={c.sections}
      meta={[
        {
          label: locale === "es" ? "Vigente desde" : "Effective",
          value: "2026-05-04",
        },
        {
          label: locale === "es" ? "Versión" : "Version",
          value: "1.0",
        },
      ]}
    />
  );
}
