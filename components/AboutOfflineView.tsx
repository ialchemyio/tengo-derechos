import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    title: "How offline mode works",
    intro:
      "Tengo Derechos saves emergency guides on your phone so you can use them even without internet.",
    sections: [
      {
        h: "What is saved",
        body: [
          "All four emergency guides (ICE at the door, police stop, Border Patrol, medical), in English and Spanish.",
          "The home page in both languages.",
          "The disclaimer in both languages.",
          "The /weather page used by Quick Exit.",
          "Icons and the saved-pages menu.",
        ],
      },
      {
        h: "How to add this site to your home screen",
        body: [
          "iPhone (Safari): tap the Share button (the box with an arrow), scroll, and tap 'Add to Home Screen'.",
          "Android (Chrome): tap the three-dot menu, then 'Install app' or 'Add to Home Screen'.",
          "Once added, you will see a Tengo Derechos icon. Tap it to open even without internet.",
        ],
      },
      {
        h: "If pages look out of date",
        body: [
          "Open the site while you have internet. The newest version will save automatically.",
          "If you still see old pages after several minutes online, close all tabs and reopen, or remove and re-add the home-screen icon.",
        ],
      },
      {
        h: "What does NOT work offline",
        body: [
          "The donate page (Stripe is online-only).",
          "The community resources directory (loads live data).",
          "External links to government or partner sites.",
          "Always try emergency hotlines (911, 211, partner hotlines) by dialing them directly — calls work even when data does not.",
        ],
      },
    ],
  },
  es: {
    title: "Cómo funciona el modo sin conexión",
    intro:
      "Tengo Derechos guarda las guías de emergencia en tu teléfono para que puedas usarlas incluso sin internet.",
    sections: [
      {
        h: "Qué se guarda",
        body: [
          "Las cuatro guías de emergencia (ICE en la puerta, parada de policía, Patrulla Fronteriza, ayuda médica), en inglés y español.",
          "La página de inicio en ambos idiomas.",
          "El aviso legal en ambos idiomas.",
          "La página /weather que usa la salida rápida.",
          "Los íconos y el menú de páginas guardadas.",
        ],
      },
      {
        h: "Cómo añadir el sitio a la pantalla de inicio",
        body: [
          "iPhone (Safari): toca el botón de Compartir (la cajita con la flecha), baja y toca «Añadir a la pantalla de inicio».",
          "Android (Chrome): toca el menú de tres puntos y luego «Instalar app» o «Añadir a pantalla de inicio».",
          "Cuando lo agregues, verás un ícono de Tengo Derechos. Tócalo para abrir el sitio incluso sin internet.",
        ],
      },
      {
        h: "Si las páginas se ven desactualizadas",
        body: [
          "Abre el sitio cuando tengas internet. La versión más reciente se guardará automáticamente.",
          "Si aún ves páginas viejas después de unos minutos con internet, cierra todas las pestañas y vuelve a abrir, o borra y vuelve a añadir el ícono.",
        ],
      },
      {
        h: "Qué NO funciona sin conexión",
        body: [
          "La página de donaciones (Stripe necesita internet).",
          "El directorio de recursos comunitarios (carga datos en vivo).",
          "Los enlaces externos a sitios del gobierno u organizaciones aliadas.",
          "Siempre intenta marcar los teléfonos de emergencia (911, 211, líneas aliadas) directamente — las llamadas funcionan aunque los datos no.",
        ],
      },
    ],
  },
} as const;

export function AboutOfflineView({ locale }: { locale: Locale }) {
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
