import { getSupabaseAnon, getSupabaseAdmin } from "./supabase";

export type ResourceCategory =
  | "legal"
  | "clinic"
  | "hotline"
  | "food"
  | "shelter"
  | "consulate";

export type ResourceCost = "free" | "sliding" | "low" | "varies";

export type Resource = {
  id: string;
  name: string;
  category: ResourceCategory;
  city?: string;
  state?: string;
  phone?: string;
  website?: string;
  languages: string[];
  cost: ResourceCost;
  emergency?: boolean;
  notes?: { en: string; es: string };
  verifiedAt?: string | null;
  verifiedBy?: string | null;
  submittedBy?: string | null;
  published?: boolean;
};

// Seed array — used as fallback when Supabase is not configured (so dev,
// build, and offline-first deploys still work). Once Supabase is wired up
// and the seed migration has run, the seed and the live table should agree.
export const seedResources: Resource[] = [
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
    verifiedBy: "seed",
    verifiedAt: "2026-05-02",
    published: true,
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
    verifiedBy: "seed",
    verifiedAt: "2026-05-02",
    published: true,
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
    verifiedBy: "seed",
    verifiedAt: "2026-05-02",
    published: true,
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
    verifiedBy: "seed",
    verifiedAt: "2026-05-02",
    published: true,
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
    verifiedBy: "seed",
    verifiedAt: "2026-05-02",
    published: true,
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
    verifiedBy: "seed",
    verifiedAt: "2026-05-02",
    published: true,
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
    verifiedBy: "seed",
    verifiedAt: "2026-05-02",
    published: true,
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
    verifiedBy: "seed",
    verifiedAt: "2026-05-02",
    published: true,
  },
];

export const categoryLabels: Record<
  ResourceCategory,
  { en: string; es: string }
> = {
  legal: { en: "Legal aid", es: "Ayuda legal" },
  clinic: { en: "Clinic", es: "Clínica" },
  hotline: { en: "Hotline", es: "Línea de ayuda" },
  food: { en: "Food", es: "Comida" },
  shelter: { en: "Shelter", es: "Refugio" },
  consulate: { en: "Consulate", es: "Consulado" },
};

// ---------- runtime fetcher with 5-minute in-memory cache ----------

export type ResourceFilters = {
  category?: ResourceCategory | "all";
  language?: string; // "any" | a language code
  city?: string; // free-text substring match against city + state
  emergencyOnly?: boolean;
};

type CacheEntry = { at: number; rows: Resource[] };
const CACHE_TTL_MS = 5 * 60 * 1000;
let cache: CacheEntry | null = null;

function rowToResource(row: Record<string, unknown>): Resource {
  return {
    id: String(row.id),
    name: String(row.name),
    category: row.category as ResourceCategory,
    city: (row.city as string) ?? undefined,
    state: (row.state as string) ?? undefined,
    phone: (row.phone as string) ?? undefined,
    website: (row.website as string) ?? undefined,
    languages: Array.isArray(row.languages) ? (row.languages as string[]) : [],
    cost: (row.cost as ResourceCost) ?? "varies",
    emergency: Boolean(row.emergency),
    notes:
      row.notes_en || row.notes_es
        ? {
            en: (row.notes_en as string) ?? "",
            es: (row.notes_es as string) ?? "",
          }
        : undefined,
    verifiedAt: (row.verified_at as string) ?? null,
    verifiedBy: (row.verified_by as string) ?? null,
    submittedBy: (row.submitted_by as string) ?? null,
    published: Boolean(row.published),
  };
}

async function fetchAllPublished(): Promise<Resource[]> {
  const sb = getSupabaseAnon();
  if (!sb) return seedResources;
  const { data, error } = await sb
    .from("resources")
    .select(
      "id,name,category,city,state,phone,website,languages,cost,emergency,notes_en,notes_es,verified_at,verified_by,submitted_by,published"
    )
    .eq("published", true)
    .order("name", { ascending: true })
    .limit(500);
  if (error) {
    console.error("[resources] supabase error, falling back to seed", error);
    return seedResources;
  }
  return (data ?? []).map(rowToResource);
}

export async function getResources(
  filters: ResourceFilters = {}
): Promise<Resource[]> {
  const now = Date.now();
  if (!cache || now - cache.at > CACHE_TTL_MS) {
    cache = { at: now, rows: await fetchAllPublished() };
  }
  return applyFilters(cache.rows, filters);
}

export function applyFilters(
  rows: Resource[],
  f: ResourceFilters
): Resource[] {
  return rows.filter((r) => {
    if (f.category && f.category !== "all" && r.category !== f.category)
      return false;
    if (f.language && f.language !== "any" && !r.languages.includes(f.language))
      return false;
    if (
      f.city &&
      !`${r.city ?? ""} ${r.state ?? ""}`
        .toLowerCase()
        .includes(f.city.toLowerCase())
    )
      return false;
    if (f.emergencyOnly && !r.emergency) return false;
    return true;
  });
}

export function invalidateResourcesCache() {
  cache = null;
}

// ---------- admin operations (service-role) ----------

export async function adminListAll(): Promise<Resource[]> {
  const sb = getSupabaseAdmin();
  if (!sb) return seedResources;
  const { data, error } = await sb
    .from("resources")
    .select(
      "id,name,category,city,state,phone,website,languages,cost,emergency,notes_en,notes_es,verified_at,verified_by,submitted_by,published,created_at"
    )
    .order("created_at", { ascending: false })
    .limit(1000);
  if (error) {
    console.error("[resources/admin] list error", error);
    return [];
  }
  return (data ?? []).map(rowToResource);
}

export async function adminUpsertResource(
  row: Partial<Resource> & { id: string }
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabaseAdmin();
  if (!sb) return { ok: false, error: "Supabase admin client not configured." };
  const payload = {
    id: row.id,
    name: row.name,
    category: row.category,
    city: row.city ?? null,
    state: row.state ?? null,
    phone: row.phone ?? null,
    website: row.website ?? null,
    languages: row.languages ?? [],
    cost: row.cost,
    emergency: row.emergency ?? false,
    notes_en: row.notes?.en ?? null,
    notes_es: row.notes?.es ?? null,
    submitted_by: row.submittedBy ?? null,
    verified_at: row.verifiedAt ?? null,
    verified_by: row.verifiedBy ?? null,
    published: row.published ?? false,
  };
  const { error } = await sb.from("resources").upsert(payload);
  if (error) {
    console.error("[resources/admin] upsert error", error);
    return { ok: false, error: error.message };
  }
  invalidateResourcesCache();
  return { ok: true };
}

export async function adminDeleteResource(
  id: string
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabaseAdmin();
  if (!sb) return { ok: false, error: "Supabase admin client not configured." };
  const { error } = await sb.from("resources").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  invalidateResourcesCache();
  return { ok: true };
}

export async function publicSubmitResource(
  row: Omit<Resource, "verifiedAt" | "verifiedBy" | "published">
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabaseAdmin();
  if (!sb) {
    // Fallback: log to disk so the submission isn't lost in dev.
    try {
      const { mkdir, appendFile } = await import("node:fs/promises");
      await mkdir("data", { recursive: true });
      await appendFile(
        "data/resource-submissions.jsonl",
        JSON.stringify({ ts: new Date().toISOString(), row }) + "\n",
        "utf8"
      );
      return { ok: true };
    } catch (e) {
      return { ok: false, error: String(e) };
    }
  }
  const payload = {
    id: row.id,
    name: row.name,
    category: row.category,
    city: row.city ?? null,
    state: row.state ?? null,
    phone: row.phone ?? null,
    website: row.website ?? null,
    languages: row.languages ?? [],
    cost: row.cost,
    emergency: row.emergency ?? false,
    notes_en: row.notes?.en ?? null,
    notes_es: row.notes?.es ?? null,
    submitted_by: row.submittedBy ?? null,
    published: false,
  };
  const { error } = await sb.from("resources").insert(payload);
  if (error) return { ok: false, error: error.message };

  // Best-effort admin email via Resend.
  const resendKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.RESOURCES_ADMIN_EMAIL;
  if (resendKey && adminEmail) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "Tengo Derechos <noreply@tengoderechos.org>",
          to: [adminEmail],
          subject: `New resource submitted: ${row.name}`,
          text:
            `A new resource was submitted and is awaiting review.\n\n` +
            `id: ${row.id}\nname: ${row.name}\ncategory: ${row.category}\n` +
            `city/state: ${row.city ?? ""} ${row.state ?? ""}\n` +
            `submitted by: ${row.submittedBy ?? "(anonymous)"}\n\n` +
            `Visit /admin/resources to review.`,
        }),
      });
    } catch (e) {
      console.error("[resources/submit] resend error", e);
    }
  }
  return { ok: true };
}
