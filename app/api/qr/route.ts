import { NextResponse } from "next/server";
import QRCode from "qrcode";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_HOST_HINTS = ["tengoderechos.org", "localhost", "127.0.0.1"];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const size = Math.min(
    Math.max(Number(searchParams.get("size") ?? 480) || 480, 64),
    2048
  );
  if (!url) {
    return NextResponse.json(
      { ok: false, message: "Missing ?url= parameter." },
      { status: 400 }
    );
  }
  // Only allow encoding URLs that point at our own domain or a localhost dev
  // server. Prevents this endpoint from being abused to mint QR codes for
  // arbitrary third-party links.
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid URL." },
      { status: 400 }
    );
  }
  if (!ALLOWED_HOST_HINTS.some((h) => parsed.hostname.endsWith(h))) {
    return NextResponse.json(
      { ok: false, message: "Host not allowed." },
      { status: 400 }
    );
  }

  try {
    const png = await QRCode.toBuffer(url, {
      type: "png",
      width: size,
      margin: 2,
      color: { dark: "#1f2c44", light: "#fbf7ef" },
      errorCorrectionLevel: "M",
    });
    return new NextResponse(new Uint8Array(png), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (e) {
    console.error("[api/qr] error", e);
    return NextResponse.json(
      { ok: false, message: "QR generation failed." },
      { status: 500 }
    );
  }
}
