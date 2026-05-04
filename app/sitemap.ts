import type { MetadataRoute } from "next";
import { SHARE_SCENARIOS, SITEMAP_STEPS_PER_SCENARIO } from "@/lib/share";
import { siteUrl } from "@/lib/seo";

const enRoutes = [
  "/",
  "/emergency",
  "/emergency/ice-at-door",
  "/emergency/police-stop",
  "/emergency/border-patrol",
  "/emergency/medical",
  "/rights",
  "/rights/police",
  "/rights/immigration",
  "/rights/workplace",
  "/rights/housing",
  "/rights/medical",
  "/resources",
  "/resources/submit",
  "/lawyers",
  "/donate",
  "/about",
  "/about/offline",
  "/about/transparency",
  "/about/audio",
  "/about/methodology",
  "/about/privacy",
  "/about/accessibility",
  "/about/security",
  "/about/team",
  "/about/open-source",
  "/press",
  "/impact",
  "/embed",
  "/prepare",
  "/disclaimer",
];

const esRoutes = enRoutes.map((p) => (p === "/" ? "/es" : `/es${p}`));

const shareRoutes: string[] = [];
for (const scenario of SHARE_SCENARIOS) {
  for (let step = 1; step <= SITEMAP_STEPS_PER_SCENARIO; step++) {
    shareRoutes.push(`/share/${scenario}/${step}`);
    shareRoutes.push(`/es/share/${scenario}/${step}`);
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const all = [...enRoutes, ...esRoutes, ...shareRoutes];
  return all.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" || path === "/es" ? 1 : path.includes("/share/") ? 0.4 : 0.6,
  }));
}
