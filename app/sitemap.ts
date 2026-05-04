import type { MetadataRoute } from "next";

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
  "/disclaimer",
];

const esRoutes = enRoutes.map((p) => (p === "/" ? "/es" : `/es${p}`));

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [...enRoutes, ...esRoutes].map((path) => ({
    url: `https://tengoderechos.org${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" || path === "/es" ? 1 : 0.6,
  }));
}
