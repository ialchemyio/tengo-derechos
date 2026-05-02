import { NextResponse } from "next/server";
import pkg from "@/package.json" with { type: "json" };

export const dynamic = "force-static";

const PRECACHE_ROUTES = [
  "/",
  "/es",
  "/weather",
  "/offline",
  "/es/offline",
  "/disclaimer",
  "/es/disclaimer",
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
  "/about/offline",
  "/es/about/offline",
];

const PRECACHE_ASSETS = [
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-512-maskable.png",
  "/icons/apple-touch-icon.png",
  "/icons/icon.svg",
];

const VERSION =
  process.env.NEXT_PUBLIC_BUILD_ID ||
  `${pkg.version}-${new Date().toISOString().slice(0, 10)}`;

export function GET() {
  const body = `
// Tengo Derechos service worker
// Cache version: ${VERSION}
const VERSION = ${JSON.stringify(VERSION)};
const STATIC_CACHE = "td-static-" + VERSION;
const RUNTIME_CACHE = "td-runtime-" + VERSION;

const PRECACHE_ROUTES = ${JSON.stringify(PRECACHE_ROUTES)};
const PRECACHE_ASSETS = ${JSON.stringify(PRECACHE_ASSETS)};
const PRECACHE_URLS = [...PRECACHE_ROUTES, ...PRECACHE_ASSETS];

const CACHE_FIRST_PREFIXES = [
  "/emergency/",
  "/es/emergency/",
  "/icons/",
  "/_next/static/",
  "/manifest.json",
  "/weather",
];

const NETWORK_FIRST_PREFIXES = [
  "/rights",
  "/es/rights",
  "/resources",
  "/es/resources",
  "/lawyers",
  "/es/lawyers",
  "/donate",
  "/es/donate",
  "/about",
  "/es/about",
  "/disclaimer",
  "/es/disclaimer",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) =>
        Promise.allSettled(
          PRECACHE_URLS.map((url) =>
            cache.add(new Request(url, { cache: "reload" })).catch((e) => {
              console.warn("[sw] precache failed for", url, e);
            })
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== STATIC_CACHE && k !== RUNTIME_CACHE)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

function isCacheFirst(pathname) {
  return CACHE_FIRST_PREFIXES.some((p) =>
    p.endsWith("/") ? pathname.startsWith(p) : pathname === p
  );
}

function isNetworkFirst(pathname) {
  return NETWORK_FIRST_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function offlineHtmlRequest(request) {
  return new Request(
    request.url.includes("/es/") ? "/es/offline" : "/offline",
    { mode: "navigate" }
  );
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Skip Next.js HMR / dev assets and API routes
  if (
    url.pathname.startsWith("/_next/data/") ||
    url.pathname.startsWith("/_next/webpack-hmr") ||
    url.pathname.startsWith("/api/")
  ) {
    return;
  }

  if (isCacheFirst(url.pathname)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request)
            .then((res) => {
              if (res.ok) {
                const copy = res.clone();
                caches.open(RUNTIME_CACHE).then((c) => c.put(request, copy));
              }
              return res;
            })
            .catch(() => caches.match(offlineHtmlRequest(request)))
      )
    );
    return;
  }

  if (isNetworkFirst(url.pathname) || request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(RUNTIME_CACHE).then((c) => c.put(request, copy));
          }
          return res;
        })
        .catch(() =>
          caches
            .match(request)
            .then((c) => c || caches.match(offlineHtmlRequest(request)))
        )
    );
    return;
  }
});
`;
  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Service-Worker-Allowed": "/",
    },
  });
}
