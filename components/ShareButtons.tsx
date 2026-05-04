"use client";

import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";

export function ShareButtons({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const [copied, setCopied] = useState(false);
  const url =
    typeof window === "undefined"
      ? "https://tengoderechos.org"
      : window.location.origin;

  async function shareNative() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Tengo Derechos",
          text:
            locale === "es"
              ? "Información clara para proteger a tu familia."
              : "Clear information to protect your family.",
          url,
        });
        return;
      } catch {
        // user cancelled or unsupported — fall through to copy
      }
    }
    copy();
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={shareNative}
        className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
      >
        <Share2 className="h-4 w-4" aria-hidden />
        {t.shareNative}
      </button>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-800 ring-1 ring-zinc-300 hover:bg-zinc-50"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-emerald-600" aria-hidden />
            {t.shareCopied}
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" aria-hidden />
            {t.shareCopy}
          </>
        )}
      </button>
    </div>
  );
}
