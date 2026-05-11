import { NextResponse } from "next/server";

// IndexNow key verification endpoint.
//
// IndexNow (Bing, Yandex, Naver, etc.) verifies site ownership by fetching
// a URL we declare as `keyLocation` in the submission payload and checking
// that its body equals the submitted key. The spec allows that URL to live
// anywhere on the host — it doesn't have to be `/<key>.txt` at the root.
// We use `/api/indexnow/<key>` so the route doesn't collide with arbitrary
// `.txt` requests, and so the param naming is clean for Next 16.
//
// The route only returns 200 when the requested key matches the
// INDEXNOW_KEY env var exactly. Otherwise 404 — keeps us from being a
// generic text endpoint.

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ key: string }> }
) {
  const { key } = await ctx.params;
  const expected = process.env.INDEXNOW_KEY;
  if (!expected || key !== expected) {
    return new NextResponse("Not found", { status: 404 });
  }
  return new NextResponse(expected, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
