import { DocPageView, type DocSection } from "./DocPageView";
import type { Locale } from "@/lib/i18n";

const COPY: Record<
  Locale,
  { title: string; intro: string; sections: DocSection[] }
> = {
  en: {
    title: "Open source",
    intro:
      "Tengo Derechos is open source by design. The code is MIT-licensed; the editorial content, audio recordings, and translations are under Creative Commons. Take it, adapt it, run it for the community you serve.",
    sections: [
      {
        h: "Licenses",
        body: [
          { kind: "list", items: [
            "Code (TypeScript, React components, scripts, SQL, configs): MIT License. See LICENSE in the repository root.",
            "Editorial content (emergency guides, rights topics, all bilingual prose): Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0). See CONTENT-LICENSE.",
            "Audio recordings: same CC BY-SA 4.0 as the editorial content.",
            "Brand assets (TD shield logo, wordmark, color tokens): all rights reserved. Other organizations may not use the Tengo Derechos brand to imply endorsement.",
          ]},
        ],
      },
      {
        h: "Contributing",
        body: [
          "We welcome typo fixes, accessibility improvements, additional Spanish-language voice actors, infrastructure hardening, additional locales (Mam, K'iche', Haitian Creole, Vietnamese, Tagalog), additional emergency scenarios, and partner integrations.",
          "Read CONTRIBUTING.md before opening a pull request. Legal-content changes require an attorney sign-off via the admin console — we cannot accept anonymous edits to verified content.",
          "By contributing, you agree your work will be released under the same licenses as the rest of the project.",
        ],
      },
      {
        h: "Code of conduct",
        body: [
          "We follow the Contributor Covenant 2.1. Our review process is bilingual; you may submit in English or Spanish.",
          "Harassment of contributors based on immigration status, race, language, religion, gender identity, or any other protected characteristic results in a permanent ban from the repository.",
        ],
      },
      {
        h: "Forks for other communities",
        body: [
          "If you want to spin up a sibling site for a different immigrant community (e.g. Haitian, Filipino, Salvadoran, Vietnamese), fork the repo. We are happy to credit sibling sites and link to them from /about/team.",
          "What you must keep: the editorial methodology, the disclaimer language, the attestation system. What you should change: the brand, the voice actors, the source-link list, the partner directory.",
        ],
      },
    ],
  },
  es: {
    title: "Código abierto",
    intro:
      "Tengo Derechos es código abierto por diseño. El código está licenciado bajo MIT; el contenido editorial, las grabaciones de audio y las traducciones están bajo Creative Commons. Tómalo, adáptalo, opéralo para la comunidad a la que sirves.",
    sections: [
      {
        h: "Licencias",
        body: [
          { kind: "list", items: [
            "Código (TypeScript, componentes de React, scripts, SQL, configs): Licencia MIT. Ver LICENSE en la raíz del repositorio.",
            "Contenido editorial (guías de emergencia, temas de derechos, toda la prosa bilingüe): Creative Commons Atribución-CompartirIgual 4.0 Internacional (CC BY-SA 4.0). Ver CONTENT-LICENSE.",
            "Grabaciones de audio: misma CC BY-SA 4.0 que el contenido editorial.",
            "Recursos de marca (logo del escudo TD, wordmark, tokens de color): todos los derechos reservados. Otras organizaciones no pueden usar la marca Tengo Derechos para sugerir respaldo.",
          ]},
        ],
      },
      {
        h: "Contribuir",
        body: [
          "Damos la bienvenida a correcciones de errores tipográficos, mejoras de accesibilidad, voces adicionales en español, fortalecimiento de infraestructura, idiomas adicionales (mam, k'iche', creole haitiano, vietnamita, tagalo), escenarios de emergencia adicionales e integraciones de aliados.",
          "Lee CONTRIBUTING.md antes de abrir un pull request. Los cambios al contenido legal requieren la firma de un abogado en la consola — no podemos aceptar ediciones anónimas a contenido verificado.",
          "Al contribuir, aceptas que tu trabajo se publique bajo las mismas licencias que el resto del proyecto.",
        ],
      },
      {
        h: "Código de conducta",
        body: [
          "Seguimos el Contributor Covenant 2.1. Nuestro proceso de revisión es bilingüe; puedes enviar en inglés o en español.",
          "El acoso a contribuyentes por estatus migratorio, raza, idioma, religión, identidad de género, o cualquier otra característica protegida resulta en una expulsión permanente del repositorio.",
        ],
      },
      {
        h: "Forks para otras comunidades",
        body: [
          "Si deseas crear un sitio hermano para otra comunidad inmigrante (p. ej. haitiana, filipina, salvadoreña, vietnamita), bifurca el repositorio. Con gusto creditamos los sitios hermanos y los enlazamos desde /about/team.",
          "Lo que debes conservar: la metodología editorial, el lenguaje de aviso legal, el sistema de atestaciones. Lo que debes cambiar: la marca, los actores de voz, la lista de enlaces de fuente, el directorio de aliados.",
        ],
      },
    ],
  },
};

export function OpenSourceView({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <DocPageView
      locale={locale}
      title={c.title}
      intro={c.intro}
      sections={c.sections}
      meta={[
        {
          label: locale === "es" ? "Código" : "Code",
          value: "MIT",
        },
        {
          label: locale === "es" ? "Contenido" : "Content",
          value: "CC BY-SA 4.0",
        },
      ]}
      cta={[
        {
          label: "MIT License",
          href: "/LICENSE",
        },
        {
          label: "CC BY-SA 4.0",
          href: "/CONTENT-LICENSE",
        },
      ]}
    />
  );
}
