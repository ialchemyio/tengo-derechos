import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a self-contained .next/standalone server bundle so the Docker
  // image only needs node + the standalone tree + public/. Cuts the
  // production image from ~700MB to ~150MB.
  output: "standalone",

  // Static-asset emission: keep the default but make sure public/audio/*
  // is included verbatim (the Phase 8 manifest references files there).
  // Next 16 + standalone copies public/ when COPY in Dockerfile picks it up.

  // Allow embed cards to be iframed; middleware.ts handles per-route CSP.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // HSTS at the Next layer too (belt-and-suspenders with proxy.ts)
          // so static assets and edge routes that skip middleware still tell
          // browsers to lock this origin to HTTPS for 2 years.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Ensure SW gets correct cache + scope headers
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
      {
        source: "/.well-known/security.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
        ],
      },
    ];
  },
};

export default nextConfig;
