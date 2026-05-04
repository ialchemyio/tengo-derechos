import { ShieldCheck, Info } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";
import { getNonprofitStatus, getEin } from "@/lib/donations";

export function NonprofitStatusBanner({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const status = getNonprofitStatus();
  const ein = getEin();

  if (status === "confirmed") {
    return (
      <aside className="flex items-start gap-3 rounded-2xl border border-[var(--brand)]/25 bg-[var(--brand-soft)] p-4 text-[var(--brand-deep)]">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-deep)]" aria-hidden />
        <div className="text-sm">
          <p className="font-semibold">{t.nonprofitConfirmed}</p>
          {ein ? (
            <p className="mt-1 text-xs uppercase tracking-wide">
              {t.ein}: {ein}
            </p>
          ) : null}
        </div>
      </aside>
    );
  }
  if (status === "denied") {
    return (
      <aside className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-800">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-zinc-500" aria-hidden />
        <p className="text-sm">{t.nonprofitDenied}</p>
      </aside>
    );
  }
  return (
    <aside className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
      <p className="text-sm">{t.nonprofitPending}</p>
    </aside>
  );
}
