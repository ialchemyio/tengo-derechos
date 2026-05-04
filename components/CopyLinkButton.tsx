"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const LABELS: Record<Locale, { copy: string; copied: string; aria: string }> = {
  en: { copy: "Copy link", copied: "Link copied", aria: "Copy this page's link" },
  es: { copy: "Copiar enlace", copied: "Enlace copiado", aria: "Copiar el enlace de esta página" },
};

export function CopyLinkButton({
  locale,
  url,
  size = "lg",
  className = "",
}: {
  locale: Locale;
  url?: string;
  size?: "lg" | "sm";
  className?: string;
}) {
  const t = LABELS[locale];
  const [copied, setCopied] = useState(false);

  async function copy() {
    const value = url ?? (typeof window !== "undefined" ? window.location.href : "");
    if (!value) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else if (typeof document !== "undefined") {
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  }

  const sizeCls =
    size === "lg" ? "px-5 py-3 text-base" : "px-3.5 py-1.5 text-sm";

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={t.aria}
      aria-live="polite"
      className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-white font-bold text-zinc-900 shadow-sm ring-1 ring-[var(--hairline)] transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 ${sizeCls} ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-[var(--brand-deep)]" aria-hidden />
          {t.copied}
        </>
      ) : (
        <>
          <Copy className="h-4 w-4 text-zinc-600" aria-hidden />
          {t.copy}
        </>
      )}
    </button>
  );
}
