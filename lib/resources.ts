export type ResourceCategory =
  | "legal"
  | "clinic"
  | "hotline"
  | "food"
  | "shelter"
  | "consulate";

export type Resource = {
  id: string;
  name: string;
  category: ResourceCategory;
  city?: string;
  state?: string;
  phone?: string;
  website?: string;
  languages: string[];
  cost: "free" | "sliding" | "low" | "varies";
  emergency?: boolean;
  notes?: { en: string; es: string };
};

export const resources: Resource[] = [
  {
    id: "aclu-national",
    name: "ACLU – Know Your Rights",
    category: "legal",
    website: "https://www.aclu.org/know-your-rights/",
    languages: ["English", "Español"],
    cost: "free",
    notes: {
      en: "National civil liberties information and Know Your Rights guides.",
      es: "Información nacional de derechos civiles y guías Conoce Tus Derechos.",
    },
  },
  {
    id: "ilrc",
    name: "Immigrant Legal Resource Center (ILRC)",
    category: "legal",
    city: "San Francisco",
    state: "CA",
    website: "https://www.ilrc.org/",
    languages: ["English", "Español"],
    cost: "free",
    notes: {
      en: "Educational resources for immigrants and legal advocates.",
      es: "Recursos educativos para inmigrantes y defensores legales.",
    },
  },
  {
    id: "uwd-hotline",
    name: "United We Dream — MigraWatch Hotline",
    category: "hotline",
    phone: "1-844-363-1423",
    website: "https://unitedwedream.org/",
    languages: ["English", "Español"],
    cost: "free",
    emergency: true,
    notes: {
      en: "Report ICE activity and get connected to support (volunteer-run).",
      es: "Reporta actividad de ICE y conéctate con apoyo (voluntarios).",
    },
  },
  {
    id: "211",
    name: "211 — Local Help Line",
    category: "hotline",
    phone: "211",
    website: "https://www.211.org/",
    languages: ["English", "Español"],
    cost: "free",
    emergency: true,
    notes: {
      en: "Dial 211 to connect to local food, housing, and health resources.",
      es: "Marca 211 para conectarte con recursos locales de comida, vivienda y salud.",
    },
  },
  {
    id: "fqhc-finder",
    name: "Find a Community Health Center",
    category: "clinic",
    website: "https://findahealthcenter.hrsa.gov/",
    languages: ["English", "Español"],
    cost: "sliding",
    notes: {
      en: "Federal directory of community health centers serving everyone.",
      es: "Directorio federal de clínicas comunitarias que atienden a todos.",
    },
  },
  {
    id: "consulado-mx",
    name: "Consulado de México (US Network)",
    category: "consulate",
    website: "https://consulmex.sre.gob.mx/",
    languages: ["Español"],
    cost: "varies",
    notes: {
      en: "Mexican consular protection services across the U.S.",
      es: "Servicios de protección consular mexicana en EE. UU.",
    },
  },
  {
    id: "feeding-america",
    name: "Feeding America — Find a Food Bank",
    category: "food",
    website: "https://www.feedingamerica.org/find-your-local-foodbank",
    languages: ["English", "Español"],
    cost: "free",
    notes: {
      en: "Locator for food banks near you.",
      es: "Localizador de bancos de alimentos cerca de ti.",
    },
  },
  {
    id: "domestic-violence-hotline",
    name: "National Domestic Violence Hotline",
    category: "hotline",
    phone: "1-800-799-7233",
    website: "https://www.thehotline.org/",
    languages: ["English", "Español"],
    cost: "free",
    emergency: true,
    notes: {
      en: "24/7 confidential support.",
      es: "Apoyo confidencial las 24 horas.",
    },
  },
];

export const categoryLabels: Record<ResourceCategory, { en: string; es: string }> = {
  legal: { en: "Legal aid", es: "Ayuda legal" },
  clinic: { en: "Clinic", es: "Clínica" },
  hotline: { en: "Hotline", es: "Línea de ayuda" },
  food: { en: "Food", es: "Comida" },
  shelter: { en: "Shelter", es: "Refugio" },
  consulate: { en: "Consulate", es: "Consulado" },
};
