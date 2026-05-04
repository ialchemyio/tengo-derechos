import { NextRequest, NextResponse } from "next/server";

// Default deny-frame for the whole site, with an explicit allow for /embed/*
// (and /es/embed/*) so partner organizations can iframe verified guide cards
// without exposing the rest of the site to clickjacking.
//
// Skip the matcher for /api/, /_next/, /sw.js, and static assets so the
// middleware doesn't add headers to non-document responses.

export const config = {
  matcher: [
    "/((?!api/|_next/|sw\\.js|icons/|audio/|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.json|\\.well-known/).*)",
  ],
};

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isEmbed = path.startsWith("/embed/") || path.startsWith("/es/embed/");
  // The /embed and /es/embed index pages are NOT frameable themselves —
  // only the per-slug cards.
  const isEmbedSlug =
    isEmbed &&
    !(path === "/embed/" || path === "/embed" ||
      path === "/es/embed/" || path === "/es/embed");

  const res = NextResponse.next();
  if (isEmbedSlug) {
    res.headers.delete("X-Frame-Options");
    res.headers.set("Content-Security-Policy", "frame-ancestors *;");
  } else {
    res.headers.set("X-Frame-Options", "SAMEORIGIN");
    res.headers.set(
      "Content-Security-Policy",
      "frame-ancestors 'self'"
    );
  }
  // Don't override for everything; only set when not already present.
  if (!res.headers.has("Referrer-Policy")) {
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  }
  if (!res.headers.has("X-Content-Type-Options")) {
    res.headers.set("X-Content-Type-Options", "nosniff");
  }
  return res;
}
