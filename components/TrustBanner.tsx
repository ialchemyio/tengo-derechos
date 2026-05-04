import { ShieldCheck, Info, AlertTriangle } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { dict } from "@/lib/i18n";
import type { ReviewMeta } from "@/lib/content";
import { getReviewer } from "@/lib/reviewers";

type EffectiveReview = ReviewMeta & { version?: number };

export function TrustBanner({
  locale,
  review,
}: {
  locale: Locale;
  review?: EffectiveReview;
}) {
  const t = dict[locale];
  const reviewed = !!review?.reviewed;
  const reviewer = review?.reviewerId ? getReviewer(review.reviewerId) : null;
  const tone = reviewed
    ? "border-emerald-200 bg-emerald-50 text-emerald-950"
    : "border-amber-200 bg-amber-50 text-amber-950";
  const Icon = reviewed ? ShieldCheck : AlertTriangle;
  const iconTone = reviewed ? "text-emerald-700" : "text-amber-600";

  return (
    <aside role="note" className={`rounded-2xl border p-4 ${tone}`}>
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 h-5 w-5 shrink-0 opacity-70" aria-hidden />
        <div className="text-sm leading-relaxed">
          <p className="font-medium">{t.educationalOnly}</p>

          {!review ? null : reviewed ? (
            <div className="mt-3 space-y-1 text-sm">
              <p className="inline-flex items-center gap-1.5 font-semibold">
                <Icon className={`h-4 w-4 ${iconTone}`} aria-hidden />
                {locale === "es" ? "Revisado por" : "Reviewed by"}{" "}
                {reviewer?.name ?? review.reviewedBy ?? "—"}
                {(reviewer?.title ?? review.reviewerTitle)
                  ? `, ${reviewer?.title ?? review.reviewerTitle}`
                  : ""}
                {reviewer?.organization
                  ? ` ${t.reviewedAt} ${reviewer.organization}`
                  : ""}
                .
              </p>
              {reviewer?.jurisdiction ? (
                <p className="text-xs">
                  {t.licensedIn} {reviewer.jurisdiction}.
                </p>
              ) : null}
              {review.scope === "partial" ? (
                <p className="text-xs italic">
                  {locale === "es" ? "Revisión parcial" : "Partial review"}
                  {review.notes ? `: ${review.notes}` : ""}
                </p>
              ) : null}
              {review.reviewedDate ? (
                <p className="text-xs">
                  {t.lastReviewed}: {review.reviewedDate}
                </p>
              ) : null}
            </div>
          ) : (
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold">
              <AlertTriangle className={`h-4 w-4 ${iconTone}`} aria-hidden />
              {t.notYetVerified}
            </p>
          )}

          {review?.lastUpdated || review?.version ? (
            <p className="mt-2 text-[11px] uppercase tracking-wide opacity-70">
              {review?.lastUpdated
                ? `${t.lastUpdated}: ${review.lastUpdated}`
                : ""}
              {review?.version
                ? ` · ${t.versionLabel} v${review.version}`
                : ""}
            </p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
