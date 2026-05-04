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
  const sizeCls =
    size === "lg"
      ? "px-5 py-3 text-base"
      : "px-3.5 py-1.5 text-sm";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ARIA[locale]}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] font-bold text-white shadow-sm ring-1 ring-[#128C7E]/30 transition hover:-translate-y-0.5 hover:bg-[#128C7E] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 ${sizeCls} ${className}`}
    >
      <WhatsAppGlyph size={size === "lg" ? 20 : 16} />
      {LABEL[locale]}
    </a>
  );
}
