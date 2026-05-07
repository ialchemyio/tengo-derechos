import { BrandMark, BrandLockup } from "./icons/BrandMark";
import type { Locale } from "@/lib/i18n";

const LABELS = {
  en: {
    primary: "Primary mark",
    appicon: "App icon",
    horizontal: "Horizontal lockup",
    emergency: "Emergency variant (red)",
    mono: "Monochrome / outline",
    download: "Download",
    color: "Color tokens",
  },
  es: {
    primary: "Marca principal",
    appicon: "Ícono de app",
    horizontal: "Composición horizontal",
    emergency: "Variante de emergencia (rojo)",
    mono: "Monocromo / contorno",
    download: "Descargar",
    color: "Tokens de color",
  },
} as const;

const COLOR_TOKENS: { name: string; value: string; usage: string }[] = [
  { name: "Navy", value: "#1f2c44", usage: "Wordmark, footer, civic gravitas" },
  { name: "Terracotta", value: "#b4571f", usage: "Primary actions, brand accent" },
  { name: "Maroon", value: "#8a1d2c", usage: "Donate CTA only (heartbeat)" },
  { name: "Warm Red", value: "#b9341d", usage: "Emergency surfaces" },
  { name: "Verified Gold", value: "#a87826", usage: "Verified badges" },
  { name: "Cream", value: "#fbf7ef", usage: "Backgrounds, paper" },
];

export function BrandShowcase({ locale }: { locale: Locale }) {
  const t = LABELS[locale];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <BrandTile label={t.primary}>
          <div className="flex items-center justify-center bg-[var(--background)] py-8">
            <BrandLockup height={64} showTagline />
          </div>
        </BrandTile>
        <BrandTile label={t.appicon}>
          <div className="flex items-center justify-center bg-[var(--accent)] py-8">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[var(--background)] shadow-lg ring-1 ring-white/10">
              <BrandMark size={72} />
            </div>
          </div>
        </BrandTile>
        <BrandTile label={t.horizontal}>
          <div className="flex items-center justify-center bg-white py-8">
            <BrandLockup height={44} />
          </div>
        </BrandTile>
        <BrandTile label={t.emergency}>
          <div className="flex items-center justify-center bg-[var(--background)] py-8">
            <BrandLockup height={44} variant="red" />
          </div>
        </BrandTile>
        <BrandTile label={t.mono}>
          <div className="flex items-center justify-center bg-white py-8 text-[var(--accent)]">
            <BrandLockup height={44} variant="mono" />
          </div>
        </BrandTile>
        <BrandTile label="White on navy">
          <div className="flex items-center justify-center bg-[var(--accent)] py-8 text-white">
            <BrandLockup height={44} variant="white" />
          </div>
        </BrandTile>
      </div>

      <section className="rounded-2xl bg-white p-5 ring-1 ring-[var(--hairline)]">
        <h3 className="font-display text-lg font-bold text-zinc-900">
          {t.color}
        </h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {COLOR_TOKENS.map((c) => (
            <li
              key={c.value}
              className="flex items-center gap-3 rounded-xl bg-[var(--background)] p-2 ring-1 ring-[var(--hairline)]"
            >
              <span
                aria-hidden
                className="h-9 w-9 shrink-0 rounded-lg ring-1 ring-black/10"
                style={{ background: c.value }}
              />
              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  {c.name}{" "}
                  <code className="ml-1 text-xs font-mono text-zinc-500">
                    {c.value}
                  </code>
                </p>
                <p className="text-xs text-zinc-600">{c.usage}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function BrandTile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <figure className="overflow-hidden rounded-2xl ring-1 ring-[var(--hairline)]">
      {children}
      <figcaption className="bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 ring-t ring-[var(--hairline)]">
        {label}
      </figcaption>
    </figure>
  );
}
