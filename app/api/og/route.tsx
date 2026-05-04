import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Tengo Derechos";
  const subtitle =
    searchParams.get("subtitle") ?? "Tus derechos. Tu familia. Tu protección.";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "linear-gradient(135deg, #fbe6d2 0%, #ffffff 45%, #dde2ec 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#b4571f",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            TD
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#1f2c44",
              letterSpacing: -0.5,
            }}
          >
            Tengo Derechos
          </div>
        </div>

        <div
          style={{
            fontSize: 78,
            fontWeight: 800,
            color: "#1f2c44",
            lineHeight: 1.05,
            letterSpacing: -1.5,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ fontSize: 28, color: "#3a4866", maxWidth: 760 }}>
            {subtitle}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#b4571f",
              letterSpacing: 1,
            }}
          >
            tengoderechos.org
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
