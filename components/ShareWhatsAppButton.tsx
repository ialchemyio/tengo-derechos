"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { buildWhatsAppHref } from "@/lib/share";
import { WhatsAppGlyph } from "./icons/WhatsAppGlyph";

const LABEL: Record<Locale, string> = {
  en: "Send to family",
  es: "Enviar a familia",
};

const ARIA: Record<Locale, string> = {
  en: "Share to WhatsApp — opens WhatsApp",
  es: "Compartir a WhatsApp — abre WhatsApp",
};

const TOAST: Record<Locale, string> = {
  en: "Link copied — send it to someone",
  es: "Enlace copiado — envíaselo a alguien",
};

async function copyToClipboard(value: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
    if (typeof document === "undefined") return false;
    const ta = document.createElement("textarea");
    ta.value = value;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function ShareWhatsAppButton({
  url,
  locale,
  messageOverride,
  size = "lg",
  className = "",
}: {
  url: string;
  locale: Locale;
  messageOverride?: string;
  size?: "lg" | "sm";
  className?: string;
}) {
  const href = buildWhatsAppHref(url, locale, messageOverride);
  const [toast, setToast] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // Auto-copy fallback. Clicking 'Send to family' ALSO copies the
  // share text + URL to the clipboard. If WhatsApp isn't installed, the
  // user already has the link in their clipboard ready for SMS / iMessage,
  // and the toast tells them so. The wa.me anchor still navigates as a
  // normal <a target="_blank"> so on devices where WhatsApp IS installed
  // the deep link opens it normally.
  function onClick() {
    const fallbackPayload = messageOverride
      ? `${messageOverride} ${url}`
      : url;
    void copyToClipboard(fallbackPayload).then(() => {
      setToast(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast(false), 2600);
    });
  }

  const sizeCls =
    size === "lg" ? "px-5 py-3 text-base" : "px-3.5 py-1.5 text-sm";

  return (
    <span className="relative inline-flex">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        aria-label={ARIA[locale]}
        className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] font-bold text-white shadow-sm ring-1 ring-[#128C7E]/30 transition hover:-translate-y-0.5 hover:bg-[#128C7E] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 ${sizeCls} ${className}`}
      >
        <WhatsAppGlyph size={size === "lg" ? 20 : 16} />
        {LABEL[locale]}
      </a>
      {toast ? (
        <span
          role="status"
          aria-live="polite"
          className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-white shadow-md"
        >
          {TOAST[locale]}
        </span>
      ) : null}
    </span>
  );
}
