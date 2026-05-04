"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

const CAPTION: Record<Locale, string> = {
  en: "Scan for full guide",
  es: "Escanea para ver la guía completa",
};

export function QRCode({
  value,
  size = 120,
  locale = "en",
  showCaption = true,
  className = "",
}: {
  value: string;
  size?: number;
  locale?: Locale;
  showCaption?: boolean;
  className?: string;
}) {
  const [svg, setSvg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const QR = await import("qrcode");
        const out = await QR.toString(value, {
          type: "svg",
          margin: 1,
          color: { dark: "#1f2c44", light: "#fbf7ef" },
          errorCorrectionLevel: "M",
          width: size,
        });
        if (!cancelled) setSvg(out);
      } catch (e) {
        if (!cancelled) setErr(String(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [value, size]);

  return (
    <figure className={`flex flex-col items-center gap-2 ${className}`}>
      <div
        role="img"
        aria-label={`QR code linking to ${value}`}
        style={{ width: size, height: size }}
        className="rounded-xl bg-[var(--background)] p-1 ring-1 ring-[var(--hairline)]"
      >
        {svg ? (
          <div
            className="h-full w-full"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : err ? (
          <span className="text-xs text-red-700">QR unavailable</span>
        ) : (
          <div className="h-full w-full animate-pulse rounded-lg bg-[var(--accent-soft)]/60" />
        )}
      </div>
      {showCaption ? (
        <figcaption className="text-xs text-[var(--accent)]/80">
          {CAPTION[locale]}
        </figcaption>
      ) : null}
    </figure>
  );
}
