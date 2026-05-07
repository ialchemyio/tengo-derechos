import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

const SCENARIO_LABEL: Record<string, { en: string; es: string }> = {
  "ice-at-door": { en: "ICE at your door", es: "ICE en tu puerta" },
  "police-stop": { en: "Police traffic stop", es: "Parada de tránsito" },
  "border-patrol": {
    en: "Border Patrol encounter",
    es: "Encuentro con la Patrulla Fronteriza",
  },
  medical: {
    en: "Medical help without insurance",
    es: "Ayuda médica sin seguro",
  },
};

function clamp(text: string, max: number): string {
  return text.length > max ? text.slice(0, max - 1).trimEnd() + "…" : text;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get("locale") === "es" ? "es" : "en";
  const scenario = searchParams.get("scenario") ?? "";
  const stepRaw = searchParams.get("step");
  const step = stepRaw && /^\d+$/.test(stepRaw) ? Number(stepRaw) : null;

  const fallbackTitle = locale === "es"
    ? "Tus derechos. Tu familia. Tu protección."
    : "Your rights. Your family. Your protection.";
  const fallbackSubtitle = locale === "es"
    ? "Información clara para emergencias."
    : "Clear information for emergencies.";

  const scenarioLabel = SCENARIO_LABEL[scenario]?.[locale];
  const titleParam = searchParams.get("title");
  const subtitleParam = searchParams.get("subtitle");

  const title = clamp(titleParam ?? fallbackTitle, 90);
  const subtitle = clamp(
    subtitleParam ?? scenarioLabel ?? fallbackSubtitle,
    120
  );

  const stepLabel = locale === "es" ? "Paso" : "Step";
  const ctaTld = "tengoderechos.org";

  // Color tokens — duplicate the CSS vars here because @vercel/og can't read CSS.
  const cream = "#fbf7ef";
  const navy = "#1f2c44";
  const navyMuted = "#3a4866";
  const clay = "#b4571f";
  const clayDeep = "#8a3d11";
  const danger = "#b9341d";

  const accentColor = step !== null ? danger : clay;

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
          background: `linear-gradient(135deg, #fbe6d2 0%, ${cream} 45%, #dde2ec 100%)`,
          fontFamily: "system-ui, sans-serif",
          color: navy,
        }}
      >
        {/* Top row: brand + step pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* Brand mark fetched as PNG from our own origin.
                next/og uses satori; <img> is the correct primitive here. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              width={80}
              height={80}
              alt="Tengo Derechos"
              src={`${new URL(req.url).origin}/icons/icon-512.png`}
            />
            <div
              style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.5 }}
            >
              Tengo Derechos
            </div>
          </div>
          {step !== null ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: accentColor,
                color: "white",
                padding: "10px 22px",
                borderRadius: 999,
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: 0.5,
              }}
            >
              {stepLabel} {step}
            </div>
          ) : null}
        </div>

        {/* Center: instruction */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 1040,
          }}
        >
          {scenarioLabel && step !== null ? (
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: clayDeep,
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}
            >
              {scenarioLabel}
            </div>
          ) : null}
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: subtitle + url */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ fontSize: 26, color: navyMuted, maxWidth: 760 }}>
            {subtitle}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: clay,
              letterSpacing: 1,
            }}
          >
            {ctaTld}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
