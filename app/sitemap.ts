import type { MetadataRoute } from "next";

const routes = [
  "/",
  "/es",
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
  "/lawyers",
  "/donate",
  "/about",
  "/disclaimer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path) => ({
    url: `https://tengoderechos.org${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
