import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/weather"] },
    ],
    sitemap: "https://tengoderechos.org/sitemap.xml",
  };
}
