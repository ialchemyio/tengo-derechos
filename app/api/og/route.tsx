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
            {/* Brand mark inlined as data-URI (matches public/icons/icon.svg).
                Inlined so the edge function never fetches across the network.
                next/og uses satori; <img> is the correct primitive here. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              width={72}
              height={80}
              alt="Tengo Derechos"
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 220'><path d='M100 6 L18 30 L18 110 C18 158 56 196 100 214 C144 196 182 158 182 110 L182 30 Z' fill='%231f2c44'/><path d='M100 26 L40 44 L40 108 C40 146 68 178 100 192 C132 178 160 146 160 108 L160 44 Z' fill='%23b4571f'/><g transform='translate(108 50) rotate(8)'><rect width='42' height='52' rx='4' fill='%23fbf7ef'/><rect x='6' y='10' width='22' height='3' rx='1.5' fill='%231f2c44'/><rect x='6' y='18' width='30' height='3' rx='1.5' fill='%231f2c44'/><rect x='6' y='26' width='22' height='3' rx='1.5' fill='%231f2c44'/><rect x='6' y='34' width='26' height='3' rx='1.5' fill='%231f2c44'/></g><g transform='translate(150 38)' fill='none' stroke='%23b4571f' stroke-width='6' stroke-linecap='round'><path d='M0 14 A14 14 0 0 1 14 0'/><path d='M0 26 A26 26 0 0 1 26 0' opacity='0.55'/></g><g transform='translate(56 76)'><circle cx='38' cy='14' r='14' fill='%23fbf7ef'/><path d='M10 80 C10 50 24 34 38 34 C50 34 64 44 64 60 L64 96 C64 110 50 116 38 116 C26 116 10 110 10 96 Z' fill='%23fbf7ef'/><circle cx='46' cy='58' r='9' fill='%231f2c44' opacity='0.9'/><path d='M30 70 C30 64 36 60 44 60 C54 60 60 66 60 76 L60 92 C60 100 54 102 46 102 C36 102 30 100 30 92 Z' fill='%231f2c44' opacity='0.9'/></g></svg>"
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
