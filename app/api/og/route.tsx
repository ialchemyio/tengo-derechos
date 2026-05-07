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
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 240'><path d='M110 10 C76 10 44 18 22 30 L22 116 C22 168 60 208 110 228 C160 208 198 168 198 116 L198 30 C176 18 144 10 110 10 Z' fill='%231f2c44'/><path d='M110 28 C82 28 56 35 38 45 L38 114 C38 156 68 188 110 204 C152 188 182 156 182 114 L182 45 C164 35 138 28 110 28 Z' fill='%23b4571f'/><path d='M110 28 C138 28 164 35 182 45 L182 114 C182 156 152 188 110 204 L110 28 Z' fill='%239a4a17' opacity='0.55'/><g transform='translate(108 50) rotate(6)'><path d='M0 0 H36 L48 12 V58 H0 Z' fill='%23fbf7ef'/><path d='M36 0 L48 12 H38 C36 12 36 10 36 8 Z' fill='%23e9e1d3'/><rect x='6' y='20' width='22' height='3' rx='1.5' fill='%231f2c44'/><rect x='6' y='28' width='32' height='3' rx='1.5' fill='%231f2c44'/><rect x='6' y='36' width='22' height='3' rx='1.5' fill='%231f2c44'/><rect x='6' y='44' width='28' height='3' rx='1.5' fill='%231f2c44'/></g><g transform='translate(154 32) rotate(-8)' fill='none' stroke='%23b4571f' stroke-width='6' stroke-linecap='round'><path d='M0 12 A12 12 0 0 1 12 0'/><path d='M0 22 A22 22 0 0 1 22 0' opacity='0.7'/><path d='M0 32 A32 32 0 0 1 32 0' opacity='0.4'/></g><g transform='translate(50 80)' fill='%23fbf7ef'><circle cx='38' cy='14' r='14'/><path d='M14 86 C14 56 26 32 42 32 C56 32 70 42 70 60 L70 102 C70 116 56 122 42 122 C26 122 14 116 14 102 Z'/></g><g transform='translate(50 80)' fill='%231f2c44' opacity='0.92'><circle cx='50' cy='60' r='9'/><path d='M34 72 C34 66 40 62 48 62 C58 62 64 68 64 78 L64 96 C64 104 58 106 50 106 C40 106 34 104 34 96 Z'/></g></svg>"
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
