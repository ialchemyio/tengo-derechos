import { DocPageView, type DocSection } from "./DocPageView";
import type { Locale } from "@/lib/i18n";

const COPY: Record<
  Locale,
  { title: string; intro: string; sections: DocSection[] }
> = {
  en: {
    title: "Accessibility",
    intro:
      "We are committed to WCAG 2.2 AA conformance. Our users include people in stressful situations, on slow networks, on cheap phones, with low vision, and with limited reading ability. Accessibility is a feature, not a remediation step.",
    sections: [
      {
        h: "Conformance target",
        body: [
          "WCAG 2.2 Level AA. We self-assess against the W3C published criteria and run automated audits with axe-core and Lighthouse on every release.",
          "We also publish the methodology so independent auditors can reproduce our findings.",
        ],
      },
      {
        h: "What is implemented",
        body: [
          { kind: "list", items: [
            "Color contrast ≥ 4.5:1 for body text and ≥ 3:1 for large text and UI components, verified against the brand palette tokens (--brand, --accent, --danger).",
            "Keyboard navigation works on every interactive element. Focus rings are 3px brand-color outline with 2px offset.",
            "Screen reader: all images carry alt text or are aria-hidden when decorative. The audio player uses aria-pressed + aria-live regions to announce play / pause state.",
            "Large tap targets: minimum 44×44 px on every primary action.",
            "Body type 17px / line-height 1.55. Headings use the Fraunces serif at large weights. No color-only signals.",
            "Reduced motion: every animation (including the donate heartbeat) honors prefers-reduced-motion: reduce.",
            "High contrast: prefers-contrast: more flips backgrounds to pure white and text to pure black.",
            "Bilingual lang attributes: <html lang> reflects the active locale.",
            "Quick Exit on every emergency page is the first focusable element after page load and is reachable via the keyboard.",
            "Service-worker offline cache so emergency pages work on slow / no networks.",
            "All form fields carry visible labels (no placeholder-as-label patterns).",
          ]},
        ],
      },
      {
        h: "Known limitations",
        body: [
          "Our audio recordings are currently text-to-speech (Apple Samantha + Paulina) and not yet human-recorded. Pronunciation is generally accurate but not perfect for legal terminology in either language. We are recruiting human voice actors and will update this section when human-reviewed clips ship.",
          "Captions for full-guide narration: not yet shipped. Per-step transcripts are exposed via a 'show transcript' disclosure under each clip.",
          "Resource directory submit form has not yet been audited with a screen-reader user. We are scheduling that audit and will publish results.",
        ],
      },
      {
        h: "How to report a barrier",
        body: [
          "Email accessibility@tengoderechos.org. Include the page URL, your assistive technology + browser, and a short description of the barrier. We acknowledge reports within 3 business days and aim to fix critical barriers within 14 days.",
        ],
      },
      {
        h: "Standards we reference",
        body: [
          { kind: "list", items: [
            "WCAG 2.2 (W3C, October 2023).",
            "Section 508 (Revised, January 2018).",
            "EN 301 549 V3.2.1 (European Telecommunications Standards Institute, March 2021).",
            "ATAG 2.0 for our admin authoring tool.",
            "Mobile Accessibility Guidelines (BBC, latest revision).",
          ]},
        ],
      },
    ],
  },
  es: {
    title: "Accesibilidad",
    intro:
      "Tenemos el compromiso con la conformidad WCAG 2.2 AA. Nuestras usuarias incluyen personas en momentos difíciles, con redes lentas, con teléfonos económicos, con baja visión y con habilidad de lectura limitada. La accesibilidad es una característica, no una etapa de corrección.",
    sections: [
      {
        h: "Objetivo de conformidad",
        body: [
          "WCAG 2.2 Nivel AA. Evaluamos contra los criterios publicados por W3C y corremos auditorías automáticas con axe-core y Lighthouse en cada publicación.",
          "También publicamos la metodología para que auditores independientes puedan reproducir nuestros hallazgos.",
        ],
      },
      {
        h: "Lo que está implementado",
        body: [
          { kind: "list", items: [
            "Contraste de color ≥ 4.5:1 para texto del cuerpo y ≥ 3:1 para texto grande y componentes de interfaz, verificado contra los tokens de la paleta (--brand, --accent, --danger).",
            "La navegación por teclado funciona en cada elemento interactivo. Los anillos de enfoque son de 3px del color de la marca con 2px de desplazamiento.",
            "Lector de pantalla: todas las imágenes tienen texto alt o están marcadas como aria-hidden cuando son decorativas. El reproductor de audio usa aria-pressed + regiones aria-live para anunciar reproducción / pausa.",
            "Áreas táctiles grandes: mínimo 44×44 px en cada acción principal.",
            "Texto del cuerpo de 17px / interlineado 1.55. Los títulos usan la serif Fraunces en pesos grandes. Ninguna señal depende solo del color.",
            "Movimiento reducido: cada animación (incluida la pulsación del corazón de donar) respeta prefers-reduced-motion: reduce.",
            "Alto contraste: prefers-contrast: more cambia los fondos a blanco puro y el texto a negro puro.",
            "Atributos de idioma bilingües: <html lang> refleja el idioma activo.",
            "La Salida rápida en cada página de emergencia es el primer elemento que recibe foco al cargar y es accesible por teclado.",
            "Caché de service worker para que las páginas de emergencia funcionen en redes lentas o sin conexión.",
            "Todos los campos de formulario tienen etiquetas visibles (no usamos placeholder-como-etiqueta).",
          ]},
        ],
      },
      {
        h: "Limitaciones conocidas",
        body: [
          "Nuestras grabaciones de audio son actualmente texto a voz (Apple Samantha + Paulina) y aún no están grabadas por personas. La pronunciación es generalmente correcta pero no perfecta para terminología legal en ninguno de los dos idiomas. Estamos reclutando actores de voz humanos y actualizaremos esta sección cuando publiquemos las grabaciones revisadas por humanos.",
          "Subtítulos para narración completa de guías: aún no publicados. Las transcripciones por paso se exponen mediante una opción «ver texto» debajo de cada audio.",
          "El formulario de propuesta de recursos aún no se ha auditado con una persona usuaria de lector de pantalla. Estamos programando esa auditoría y publicaremos los resultados.",
        ],
      },
      {
        h: "Cómo reportar una barrera",
        body: [
          "Escribe a accessibility@tengoderechos.org. Incluye la URL de la página, tu tecnología asistiva + navegador y una breve descripción de la barrera. Acusamos recibo en 3 días hábiles y buscamos resolver las barreras críticas en 14 días.",
        ],
      },
      {
        h: "Estándares que seguimos",
        body: [
          { kind: "list", items: [
            "WCAG 2.2 (W3C, octubre de 2023).",
            "Section 508 (revisado, enero de 2018).",
            "EN 301 549 V3.2.1 (Instituto Europeo de Normas de Telecomunicaciones, marzo de 2021).",
            "ATAG 2.0 para nuestra consola de autoría.",
            "Mobile Accessibility Guidelines (BBC, última revisión).",
          ]},
        ],
      },
    ],
  },
};

export function AccessibilityView({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <DocPageView
      locale={locale}
      title={c.title}
      intro={c.intro}
      sections={c.sections}
      meta={[
        {
          label: locale === "es" ? "Conformidad" : "Conformance",
          value: "WCAG 2.2 AA",
        },
        {
          label: locale === "es" ? "Última auditoría" : "Last audit",
          value: "2026-05-04",
        },
      ]}
    />
  );
}
