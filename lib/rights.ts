import type { Bi, ReviewMeta } from "./content";

export type RightsTopic = ReviewMeta & {
  slug: string;
  title: Bi;
  intro: Bi;
  bullets: Bi<string[]>;
};

const TODAY = "2026-05-02";

export const rightsTopics: RightsTopic[] = [
  {
    slug: "police",
    title: { en: "Police — basics", es: "Policía — lo básico" },
    intro: {
      en: "In many situations you may have these protections. Always stay calm and never run.",
      es: "En muchas situaciones puede que tengas estas protecciones. Mantén la calma y nunca corras.",
    },
    bullets: {
      en: [
        "You may have the right to remain silent in many encounters.",
        "If driving, you generally must show license, registration, and insurance.",
        "You may say you do not consent to a search. Do not physically resist.",
        "Ask: 'Officer, am I free to go?' If yes, calmly leave.",
        "Do not lie or give false documents.",
        "If arrested, ask for a lawyer.",
      ],
      es: [
        "Puede que tengas el derecho de permanecer en silencio en muchas situaciones.",
        "Si manejas, por lo general debes mostrar licencia, registración y seguro.",
        "Puedes decir que no consientes a un registro. No te resistas físicamente.",
        "Pregunta: «Oficial, ¿soy libre de irme?». Si dicen que sí, retírate con calma.",
        "No mientas ni entregues documentos falsos.",
        "Si te arrestan, pide un abogado.",
      ],
    },
    reviewed: false,
    lastUpdated: TODAY,
    sourceLinks: [
      { label: "ACLU — Stopped by Police", url: "https://www.aclu.org/know-your-rights/stopped-by-police" },
    ],
  },
  {
    slug: "immigration",
    title: { en: "Immigration — basics", es: "Inmigración — lo básico" },
    intro: {
      en: "Rules can vary. Ask a qualified immigration attorney for help with your specific case.",
      es: "Las reglas pueden variar. Consulta a un abogado de inmigración calificado para tu caso.",
    },
    bullets: {
      en: [
        "You generally do not have to open your door without a judicial warrant signed by a judge.",
        "An ICE administrative warrant (I-200/I-205) is typically not enough to enter your home.",
        "You may have the right to remain silent about your immigration status.",
        "Do not sign anything without a lawyer.",
        "Carry a 'know your rights' card and the number of a lawyer or trusted contact.",
        "Make a family preparedness plan: care of children, important documents, emergency contacts.",
      ],
      es: [
        "Por lo general no tienes que abrir la puerta sin una orden judicial firmada por un juez.",
        "Una orden administrativa de ICE (I-200/I-205) normalmente no es suficiente para entrar a tu casa.",
        "Puede que tengas el derecho de permanecer en silencio sobre tu estatus migratorio.",
        "No firmes nada sin un abogado.",
        "Lleva una tarjeta de «conoce tus derechos» y el número de un abogado o contacto de confianza.",
        "Haz un plan familiar: cuidado de los niños, documentos importantes y contactos de emergencia.",
      ],
    },
    reviewed: false,
    lastUpdated: TODAY,
    sourceLinks: [
      { label: "ILRC — Know Your Rights", url: "https://www.ilrc.org/" },
      { label: "NILC — Know Your Rights", url: "https://www.nilc.org/" },
    ],
  },
  {
    slug: "workplace",
    title: { en: "Workplace — basics", es: "Trabajo — lo básico" },
    intro: {
      en: "Federal and state laws may protect workers regardless of immigration status, but rules vary. Ask a qualified attorney for your situation.",
      es: "Las leyes federales y estatales pueden proteger a los trabajadores sin importar el estatus migratorio, pero las reglas varían. Consulta a un abogado calificado para tu caso.",
    },
    bullets: {
      en: [
        "You may have the right to be paid for hours worked, including overtime in many roles.",
        "Workplaces generally must provide reasonably safe working conditions.",
        "Retaliation for reporting safety problems or wage theft may be illegal.",
        "Keep records: hours worked, pay stubs, names of supervisors, photos of conditions.",
        "If injured at work, ask about workers' compensation.",
        "Ask a labor rights organization or attorney before signing waivers.",
      ],
      es: [
        "Puede que tengas el derecho de cobrar por las horas trabajadas, incluyendo horas extra en muchos puestos.",
        "Los lugares de trabajo generalmente deben ofrecer condiciones razonablemente seguras.",
        "Las represalias por reportar problemas de seguridad o robo de salario pueden ser ilegales.",
        "Guarda registros: horas trabajadas, talones de pago, nombres de supervisores y fotos de las condiciones.",
        "Si te lesionas en el trabajo, pregunta sobre la compensación laboral.",
        "Consulta a una organización de derechos laborales o a un abogado antes de firmar cualquier renuncia.",
      ],
    },
    reviewed: false,
    lastUpdated: TODAY,
    sourceLinks: [
      { label: "U.S. DOL — Workers’ Rights", url: "https://www.dol.gov/general/topic/workers-rights" },
    ],
  },
  {
    slug: "housing",
    title: { en: "Housing — basics", es: "Vivienda — lo básico" },
    intro: {
      en: "Tenant protections vary widely by state and city. Ask a local tenants' rights organization or attorney.",
      es: "Las protecciones para inquilinos varían mucho según el estado y la ciudad. Consulta a una organización local de derechos del inquilino o a un abogado.",
    },
    bullets: {
      en: [
        "Most landlords must give written notice before eviction.",
        "Eviction usually requires a court order — a landlord generally cannot remove you without one.",
        "Habitable conditions (heat, water, no major hazards) are often required.",
        "Discrimination based on race, national origin, family status, and disability is generally illegal.",
        "Keep all written communication and pay rent in a way that creates a record.",
        "Local legal aid organizations often help tenants for free.",
      ],
      es: [
        "La mayoría de los caseros deben dar aviso por escrito antes de un desalojo.",
        "El desalojo normalmente requiere una orden de la corte — un casero por lo general no puede sacarte sin ella.",
        "Las condiciones habitables (calefacción, agua, sin peligros graves) suelen ser obligatorias.",
        "La discriminación por raza, origen nacional, estado familiar o discapacidad por lo general es ilegal.",
        "Guarda toda comunicación escrita y paga la renta de una forma que deje constancia.",
        "Las organizaciones locales de ayuda legal con frecuencia apoyan a los inquilinos sin costo.",
      ],
    },
    reviewed: false,
    lastUpdated: TODAY,
    sourceLinks: [
      { label: "HUD — Fair Housing", url: "https://www.hud.gov/program_offices/fair_housing_equal_opp" },
    ],
  },
  {
    slug: "medical",
    title: { en: "Medical — basics", es: "Atención médica — lo básico" },
    intro: {
      en: "Do not avoid emergency care because of fear or insurance status.",
      es: "No evites la atención de emergencia por miedo o por no tener seguro.",
    },
    bullets: {
      en: [
        "Under federal law, ERs typically must screen and stabilize emergencies regardless of ability to pay or status.",
        "Many hospitals offer financial assistance / charity care programs — ask billing.",
        "Community health centers (FQHCs) treat everyone on a sliding scale.",
        "You generally have a right to language interpretation in many federally-funded settings.",
        "Ask before signing financial responsibility forms.",
        "Bring ID if available, but do not skip emergency care.",
      ],
      es: [
        "Bajo la ley federal, las salas de emergencia generalmente deben evaluar y estabilizar emergencias sin importar la capacidad de pago o el estatus.",
        "Muchos hospitales ofrecen asistencia financiera o ayuda económica — pregunta en facturación.",
        "Las clínicas comunitarias (FQHC) atienden a todos con tarifas según ingresos.",
        "Por lo general tienes derecho a interpretación de idioma en muchos lugares con fondos federales.",
        "Pregunta antes de firmar formularios de responsabilidad financiera.",
        "Lleva identificación si la tienes, pero no evites la atención de emergencia.",
      ],
    },
    reviewed: false,
    lastUpdated: TODAY,
    sourceLinks: [
      { label: "CMS — EMTALA", url: "https://www.cms.gov/Regulations-and-Guidance/Legislation/EMTALA" },
    ],
  },
];

export function getRightsTopic(slug: string): RightsTopic | undefined {
  return rightsTopics.find((t) => t.slug === slug);
}
