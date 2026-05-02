import { ShieldCheck, Info } from "lucide-react";

export function TrustBanner({
  message,
  reviewLabel,
}: {
  message: string;
  reviewLabel?: string;
}) {
  return (
    <aside
      role="note"
      className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950"
    >
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
        <div className="text-sm leading-relaxed">
          <p>{message}</p>
          {reviewLabel ? (
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900">
              <ShieldCheck className="h-4 w-4" aria-hidden />
              {reviewLabel}
            </p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
