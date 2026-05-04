"use client";

import { useEffect, useState } from "react";
import { Send, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { ShareWhatsAppButton } from "./ShareWhatsAppButton";
import { CopyLinkButton } from "./CopyLinkButton";

const COPY: Record<
  Locale,
  { headline: string; dismiss: string }
> = {
  en: {
    headline: "Send this to someone who might need it.",
    dismiss: "Dismiss",
  },
  es: {
    headline: "Envíale esto a alguien que lo pueda necesitar.",
    dismiss: "Cerrar",
  },
};

export function SharePrompt({
  url,
  locale,
  storageKey = "td-share-prompt-dismissed",
  variant = "panel",
}: {
  url: string;
  locale: Locale;
  storageKey?: string;
  variant?: "panel" | "inline";
}) {
  const t = COPY[locale];
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      // Sync once from sessionStorage (external storage, not derivable).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (sessionStorage.getItem(storageKey) === "1") setDismissed(true);
    } catch {}
  }, [storageKey]);

  function dismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {}
  }

  if (dismissed) return null;

  return (
    <aside
      role="region"
      aria-label={t.headline}
      className={`relative rounded-2xl bg-gradient-to-br from-[var(--brand-soft)] via-white to-[var(--accent-soft)] p-5 ring-1 ring-[var(--brand)]/20 ${
        variant === "panel" ? "shadow-sm" : ""
      }`}
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label={t.dismiss}
        className="absolute right-3 top-3 rounded-full p-1 text-zinc-500 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
      <div className="flex items-start gap-3 pr-7">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand)]/10 text-[var(--brand-deep)]">
          <Send className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="font-display text-lg font-bold text-zinc-900">
            {t.headline}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <ShareWhatsAppButton url={url} locale={locale} size="sm" />
        <CopyLinkButton locale={locale} url={url} size="sm" />
      </div>
    </aside>
  );
}
