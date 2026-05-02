import { ShieldCheck, Info, AlertTriangle } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { dict } from "@/lib/i18n";
import type { ReviewMeta } from "@/lib/content";

export function TrustBanner({
  locale,
  review,
}: {
  locale: Locale;
  review?: ReviewMeta;
}) {
  const t = dict[locale];
  const reviewed = !!review?.reviewed;
  return (
    <aside
      role="note"
      className={`rounded-2xl border p-4 ${
        reviewed
          ? "border-emerald-200 bg-emerald-50 text-emerald-950"
          : "border-amber-200 bg-amber-50 text-amber-950"
      }`}
    >
      <div className="flex items-start gap-3">
        <Info
          className={`mt-0.5 h-5 w-5 shrink-0 ${
            reviewed ? "text-emerald-700" : "text-amber-600"
          }`}
          aria-hidden
        />
        <div className="text-sm leading-relaxed">
          <p className="font-medium">{t.legalNotice}</p>

          {review ? (
            <p
              className={`mt-2 inline-flex items-center gap-1.5 text-xs font-semibold ${
                reviewed ? "text-emerald-900" : "text-amber-900"
              }`}
            >
              {reviewed ? (
                <>
                  <ShieldCheck className="h-4 w-4" aria-hidden />
                  {t.reviewedBy}{" "}
                  {review.reviewedBy ?? "—"}
                  {review.reviewerTitle ? `, ${review.reviewerTitle}` : ""}
                  {review.reviewedDate
                    ? ` ${t.reviewedOn} ${review.reviewedDate}`
                    : ""}
                  .
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4" aria-hidden />
                  {t.needsReview}
                </>
              )}
            </p>
          ) : null}

          {review?.lastUpdated ? (
            <p className="mt-1 text-[11px] uppercase tracking-wide opacity-70">
              {t.lastUpdated}: {review.lastUpdated}
            </p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
