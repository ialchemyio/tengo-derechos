import { NextRequest, NextResponse } from "next/server";

// Edge proxy:
//   1) Force every request onto HTTPS. Coolify's Caddy normally handles
//      this at the reverse-proxy layer, but we belt-and-suspenders it here
//      so the application is correct regardless of how it's fronted.
//   2) Set a deny-frame default with an explicit allow for /embed/<slug>
//      (and /es/embed/<slug>) so partner orgs can iframe verified guide
//      cards without exposing the rest of the site to clickjacking.
//   3) Send HSTS, Referrer-Policy, X-Content-Type-Options on every doc.
//
// Skip the matcher for /api/, /_next/, /sw.js, and static assets so the
// middleware doesn't add headers to non-document responses.

export const config = {
  matcher: [
    "/((?!api/|_next/|sw\\.js|icons/|audio/|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.json|\\.well-known/).*)",
  ],
};

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // ---- 1. Force HTTPS in production --------------------------------------
  // Only redirect when X-Forwarded-Proto is explicitly "http". This header
  // is set by Coolify's Caddy / Cloudflare — never by `npm run dev` on
  // localhost — so local development still works. We also skip the redirect
  // on localhost / 127.0.0.1 in case a developer hits the proxy directly
  // without a forwarder in front.
  const xfp = req.headers.get("x-forwarded-proto");
  const host = req.headers.get("host") ?? "";
  const isLocal =
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1") ||
    host.startsWith("0.0.0.0");
  if (xfp === "http" && !isLocal) {
    const httpsUrl = req.nextUrl.clone();
    httpsUrl.protocol = "https:";
    httpsUrl.port = "";
    return NextResponse.redirect(httpsUrl, 308);
  }

  // ---- 2. Frame controls -------------------------------------------------
  const isEmbed = path.startsWith("/embed/") || path.startsWith("/es/embed/");
  const isEmbedSlug =
    isEmbed &&
    !(
      path === "/embed/" ||
      path === "/embed" ||
      path === "/es/embed/" ||
      path === "/es/embed"
    );

  const res = NextResponse.next();
  if (isEmbedSlug) {
    res.headers.delete("X-Frame-Options");
    res.headers.set("Content-Security-Policy", "frame-ancestors *;");
  } else {
    res.headers.set("X-Frame-Options", "SAMEORIGIN");
    res.headers.set("Content-Security-Policy", "frame-ancestors 'self'");
  }

  // ---- 3. Security baseline ---------------------------------------------
  // HSTS: tell browsers to remember this site is HTTPS-only for 2 years and
  // to apply the same rule to subdomains. 'preload' makes us eligible for
  // browser HSTS preload lists later.
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  if (!res.headers.has("Referrer-Policy")) {
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  }
  if (!res.headers.has("X-Content-Type-Options")) {
    res.headers.set("X-Content-Type-Options", "nosniff");
  }
  return res;
}
