import { guides, pick, type EmergencyGuide } from "./content";
import { rightsTopics, type RightsTopic } from "./rights";
import { getEffectiveReview } from "./attestations";
import type { Locale } from "./i18n";
import { siteUrl } from "./seo";

export const EMBED_SLUGS = [
  "ice-at-door",
  "police-stop",
  "border-patrol",
  "medical",
  "rights-police",
  "rights-immigration",
  "rights-workplace",
  "rights-housing",
  "rights-medical",
] as const;

export type EmbedSlug = (typeof EMBED_SLUGS)[number];

export function isEmbedSlug(s: string): s is EmbedSlug {
  return (EMBED_SLUGS as readonly string[]).includes(s);
}

type EmbedCommon = {
  slug: EmbedSlug;
  kind: "emergency" | "rights";
  title: string;
  summary: string;
  bullets: string[];
  reviewed: boolean;
  reviewerName?: string;
  reviewerOrg?: string;
  lastUpdated: string;
  version: number;
  fullGuideUrl: string;
};

function emergencyTop3(g: EmergencyGuide, locale: Locale): string[] {
  return g.steps.slice(0, 3).map((s) => pick(locale, s.command));
}

export async function getEmbedContent(
  slug: string,
  locale: Locale
): Promise<EmbedCommon | null> {
  if (!isEmbedSlug(slug)) return null;

  if (!slug.startsWith("rights-")) {
    const guide = guides.find((g) => g.slug === slug);
    if (!guide) return null;
    const review = await getEffectiveReview(guide.slug, guide);
    const prefix = locale === "es" ? "/es" : "";
    return {
      slug,
      kind: "emergency",
      title: pick(locale, guide.title),
      summary: pick(locale, guide.intro),
      bullets: emergencyTop3(guide, locale),
      reviewed: review.reviewed,
      reviewerName: review.reviewedBy,
      reviewerOrg: review.scope === "partial" ? review.notes : undefined,
      lastUpdated: review.lastUpdated,
      version: (review.version as number) ?? 1,
      fullGuideUrl: `${siteUrl}${prefix}/emergency/${guide.slug}`,
    };
  }

  const topicSlug = slug.replace(/^rights-/, "");
  const topic = rightsTopics.find((t: RightsTopic) => t.slug === topicSlug);
  if (!topic) return null;
  const review = await getEffectiveReview(topic.slug, topic);
  const prefix = locale === "es" ? "/es" : "";
  return {
    slug,
    kind: "rights",
    title: topic.title[locale],
    summary: topic.intro[locale],
    bullets: topic.bullets[locale].slice(0, 3),
    reviewed: review.reviewed,
    reviewerName: review.reviewedBy,
    reviewerOrg: review.scope === "partial" ? review.notes : undefined,
    lastUpdated: review.lastUpdated,
    version: (review.version as number) ?? 1,
    fullGuideUrl: `${siteUrl}${prefix}/rights/${topic.slug}`,
  };
}

export function embedSlugLabel(slug: EmbedSlug, locale: Locale): string {
  const labels: Record<EmbedSlug, { en: string; es: string }> = {
    "ice-at-door": { en: "ICE at your door", es: "ICE en tu puerta" },
    "police-stop": { en: "Police traffic stop", es: "Parada de tránsito" },
    "border-patrol": {
      en: "Border Patrol encounter",
      es: "Encuentro con la Patrulla Fronteriza",
    },
    medical: { en: "Medical without insurance", es: "Ayuda médica sin seguro" },
    "rights-police": { en: "Rights — Police", es: "Derechos — Policía" },
    "rights-immigration": {
      en: "Rights — Immigration",
      es: "Derechos — Inmigración",
    },
    "rights-workplace": { en: "Rights — Workplace", es: "Derechos — Trabajo" },
    "rights-housing": { en: "Rights — Housing", es: "Derechos — Vivienda" },
    "rights-medical": { en: "Rights — Medical", es: "Derechos — Médico" },
  };
  return labels[slug][locale];
}

export function buildEmbedSnippet(
  slug: EmbedSlug,
  locale: Locale,
  height = 360
): string {
  const prefix = locale === "es" ? "/es" : "";
  const url = `${siteUrl}${prefix}/embed/${slug}`;
  return `<iframe src="${url}" title="Tengo Derechos: ${embedSlugLabel(slug, locale)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style="width:100%;border:1px solid #e9e1d3;border-radius:16px;background:#fbf7ef;min-height:${height}px;"></iframe>`;
}
