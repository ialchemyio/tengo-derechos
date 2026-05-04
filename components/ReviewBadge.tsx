import { ShieldCheck, AlertTriangle } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";

export function ReviewBadge({
  reviewed,
  locale,
}: {
  reviewed: boolean;
  locale: Locale;
}) {
  const t = dict[locale];
  if (reviewed) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--brand-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--brand-deep)] ring-1 ring-[var(--brand)]/25">
        <ShieldCheck className="h-3 w-3" aria-hidden />
        {t.verified}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-900 ring-1 ring-amber-200">
      <AlertTriangle className="h-3 w-3" aria-hidden />
      {t.unverified}
    </span>
  );
}
