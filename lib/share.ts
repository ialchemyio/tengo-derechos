import { guides, pick, type EmergencyGuide, type Step } from "./content";
import type { Locale } from "./i18n";
import { siteUrl } from "./seo";

export const SHARE_SCENARIOS = [
  "ice-at-door",
  "police-stop",
  "border-patrol",
  "medical",
] as const;

export type ShareScenario = (typeof SHARE_SCENARIOS)[number];

export function isShareScenario(s: string): s is ShareScenario {
  return (SHARE_SCENARIOS as readonly string[]).includes(s);
}

export function getGuideForScenario(s: string): EmergencyGuide | null {
  if (!isShareScenario(s)) return null;
  return guides.find((g) => g.slug === s) ?? null;
}

export type StepContent = {
  scenario: ShareScenario;
  guide: EmergencyGuide;
  stepIndex: number; // 0-based
  stepNumber: number; // 1-based, what users see
  step: Step;
  command: string;
  detail: string;
  say?: string;
  doNot?: string;
  totalSteps: number;
};

/**
 * Resolve a step from a scenario + step number (1-based per the URL).
 * Returns null if the scenario or step is out of range.
 */
export function getStepContent(
  scenario: string,
  step: number,
  locale: Locale
): StepContent | null {
  const guide = getGuideForScenario(scenario);
  if (!guide) return null;
  const idx = step - 1;
  if (idx < 0 || idx >= guide.steps.length) return null;
  const s = guide.steps[idx];
  return {
    scenario: scenario as ShareScenario,
    guide,
    stepIndex: idx,
    stepNumber: step,
    step: s,
    command: pick(locale, s.command),
    detail: pick(locale, s.detail),
    say: s.say ? pick(locale, s.say) : undefined,
    doNot: s.doNot ? pick(locale, s.doNot) : undefined,
    totalSteps: guide.steps.length,
  };
}

export function shareUrlFor(
  scenario: ShareScenario,
  step: number,
  locale: Locale
): string {
  const prefix = locale === "es" ? "/es" : "";
  return `${siteUrl}${prefix}/share/${scenario}/${step}`;
}

export function fullGuideUrlFor(
  scenario: ShareScenario,
  locale: Locale
): string {
  const prefix = locale === "es" ? "/es" : "";
  return `${siteUrl}${prefix}/emergency/${scenario}`;
}

export const DEFAULT_SHARE_TEXT: Record<Locale, string> = {
  en: "If you ever need it, this shows what to do step-by-step in emergencies. Save it on your phone.",
  es: "Por si algún día lo necesitas, aquí explica paso a paso qué hacer en emergencias. Guárdalo en tu teléfono.",
};

export function buildWhatsAppHref(
  url: string,
  locale: Locale,
  override?: string
): string {
  const text = `${override ?? DEFAULT_SHARE_TEXT[locale]} ${url}`.trim();
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/** Limit how many step pages we list in sitemap to avoid index bloat. */
export const SITEMAP_STEPS_PER_SCENARIO = 3;
