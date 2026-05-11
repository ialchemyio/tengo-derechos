#!/usr/bin/env node
// IndexNow auto-ping: tells Bing + Yandex (and any IndexNow-participating
// engine) that our content has updated, accelerating reindex. Free, no
// auth headers, just an HTTPS POST with a public verification key file.
//
// How it works:
//   1. We host a key file at /<key>.txt containing the same key. The script
//      generates a fresh one on first run and stores it in INDEXNOW_KEY env
//      (or use a stable one in production).
//   2. We POST a JSON list of changed URLs to api.indexnow.org.
//   3. Engines fetch our key file to verify ownership, then crawl the URLs.
//
// Usage:
//   INDEXNOW_KEY=<32-64 hex chars> node scripts/indexnow-ping.mjs
//   # or skip env to ping with the public key file in /public/<key>.txt
//
// Wired into the deploy pipeline so every Coolify deploy re-pings.
// Safe to run repeatedly; engines rate-limit + dedupe on their end.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://tengoderechos.org";
const KEY = process.env.INDEXNOW_KEY;

if (!KEY) {
  console.log("[indexnow] INDEXNOW_KEY not set — skipping ping.");
  process.exit(0);
}

// Read sitemap-derived URLs. We don't fetch the live sitemap because that
// may not be deployed yet at ping time; instead we re-build the same list
// from the canonical routes.
const STATIC_PATHS = [
  "/",
  "/es",
  "/emergency",
  "/es/emergency",
  "/emergency/ice-at-door",
  "/emergency/police-stop",
  "/emergency/border-patrol",
  "/emergency/medical",
  "/es/emergency/ice-at-door",
  "/es/emergency/police-stop",
  "/es/emergency/border-patrol",
  "/es/emergency/medical",
  "/rights/immigration",
  "/rights/police",
  "/rights/workplace",
  "/rights/medical",
  "/es/rights/immigration",
  "/es/rights/police",
  "/es/rights/workplace",
  "/es/rights/medical",
  "/resources",
  "/es/resources",
  "/about",
  "/methodology",
  "/privacy",
  "/accessibility",
  "/security",
  "/team",
  "/press",
  "/open-source",
  "/impact",
  "/donate",
  "/es/donate",
];

const urlList = STATIC_PATHS.map((p) => `${SITE}${p}`);

const host = new URL(SITE).host;
const body = {
  host,
  key: KEY,
  keyLocation: `${SITE}/api/indexnow/${KEY}`,
  urlList,
};

const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

const ok = res.status === 200 || res.status === 202;
console.log(
  `[indexnow] ${ok ? "submitted" : "failed"} ${urlList.length} URLs → ${res.status} ${res.statusText}`
);
if (!ok) {
  const text = await res.text().catch(() => "");
  if (text) console.log(`[indexnow] response: ${text}`);
  // Don't fail the build — IndexNow is best-effort. Cron / next deploy retries.
}
