import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

// Public civic-education content. We explicitly opt INTO indexing by major
// AI assistants so the rights guides surface inside ChatGPT, Claude,
// Perplexity, and Google's AI Overviews when people ask about ICE, police
// stops, etc. Admin + offline + neutral cover routes are excluded.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "DuckDuckBot",
  "Bytespider",
  "Amazonbot",
  "FacebookExternalHit",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/admin", "/api/", "/donate/thank-you", "/donate/cancelled", "/es/donate/thank-you", "/es/donate/cancelled"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...aiCrawlers.map((ua) => ({
        userAgent: ua,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
