import { ShieldCheck, AlertTriangle, ArrowUpRight, ExternalLink } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export type EmbedCardData = {
  title: string;
  summary: string;
  bullets: string[];
  reviewed: boolean;
  lastUpdated: string;
  version: number;
  fullGuideUrl: string;
  kind: "emergency" | "rights";
};

const COPY = {
  en: {
    verified: "Attorney-reviewed",
    unverified: "Pending review",
    fullGuide: "View full guide",
    poweredBy: "Powered by",
    educational: "Educational only · Not legal advice",
    lastUpdated: "Updated",
    version: "v",
  },
  es: {
    verified: "Revisado por abogado",
    unverified: "En revisión",
    fullGuide: "Ver guía completa",
    poweredBy: "Por",
    educational: "Solo informativo · No es asesoramiento legal",
    lastUpdated: "Actualizado",
    version: "v",
  },
};

export function EmbedCardView({
  data,
  locale,
}: {
  data: EmbedCardData;
  locale: Locale;
}) {
  const t = COPY[locale];
  const accent =
    data.kind === "emergency"
      ? "border-l-[var(--danger)]"
      : "border-l-[var(--accent)]";
  return (
    <article
      className={`m-2 flex flex-col rounded-2xl border border-[var(--hairline)] border-l-4 bg-[var(--surface)] p-4 text-zinc-900 sm:p-5 ${accent}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-2">
        <h1 className="font-display text-lg font-extrabold leading-tight tracking-tight sm:text-xl">
          {data.title}
        </h1>
        {data.reviewed ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--brand-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--brand-deep)] ring-1 ring-[var(--brand)]/25">
            <ShieldCheck className="h-3 w-3" aria-hidden />
            {t.verified}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-900 ring-1 ring-amber-200">
            <AlertTriangle className="h-3 w-3" aria-hidden />
            {t.unverified}
          </span>
        )}
      </header>

      <p className="mt-2 text-sm leading-relaxed text-zinc-700">{data.summary}</p>

      <ul className="mt-3 space-y-1.5 text-sm">
        {data.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[10px] font-bold text-[var(--accent)]">
              {i + 1}
            </span>
            <span className="text-zinc-800">{b}</span>
          </li>
        ))}
      </ul>

      <a
        href={data.fullGuideUrl}
        target="_top"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-2xl bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-white hover:bg-[var(--accent)]/90"
      >
        {t.fullGuide}
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </a>

      <footer className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--hairline)] pt-3 text-[11px] text-zinc-500">
        <span>
          {t.lastUpdated}: {data.lastUpdated} · {t.version}
          {data.version}
        </span>
        <a
          href={`https://tengoderechos.org${locale === "es" ? "/es" : "/"}`}
          target="_top"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-[var(--brand-deep)] hover:underline"
        >
          {t.poweredBy} TengoDerechos.org
          <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      </footer>

      <p className="mt-2 text-[10px] italic text-zinc-500">{t.educational}</p>
    </article>
  );
}
