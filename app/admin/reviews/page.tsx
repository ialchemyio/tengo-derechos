import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { AdminApproveForm } from "@/components/AdminApproveForm";
import { ReviewBadge } from "@/components/ReviewBadge";
import {
  isAdminAuthenticated,
  isAdminConfigured,
} from "@/lib/admin-auth";
import { reviewers } from "@/lib/reviewers";
import { getAllowedSpecialties } from "@/lib/review-rules";
import { guides } from "@/lib/content";
import { rightsTopics } from "@/lib/rights";
import {
  getCurrentVersion,
  getEffectiveReview,
  listHistory,
} from "@/lib/attestations";
import {
  bumpVersionAction,
  revokeAction,
  adminReviewsLogoutAction,
} from "./actions";

export const metadata = {
  title: "Reviews admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Row = {
  contentId: string;
  kind: "emergency_guide" | "rights_topic";
  titleEn: string;
  titleEs: string;
  reviewed: boolean;
  reviewerId?: string;
  reviewerTitle?: string;
  reviewedDate?: string;
  scope?: "full" | "partial";
  notes?: string;
  version: number;
  allowedSpecialties: string[];
};

export default async function Page() {
  const configured = isAdminConfigured();
  const authed = configured && (await isAdminAuthenticated());

  if (!configured) {
    return (
      <>
        <SiteHeader locale="en" />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
          <h1 className="text-2xl font-bold">Admin disabled</h1>
          <p className="mt-2 text-zinc-700">
            Set <code>ADMIN_TOKEN</code> in your environment to enable the admin console.
          </p>
        </main>
        <SiteFooter locale="en" />
      </>
    );
  }

  if (!authed) {
    return (
      <>
        <SiteHeader locale="en" />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
          <h1 className="text-2xl font-bold">Admin · Reviews</h1>
          <p className="mt-2 text-zinc-700">Enter the admin token.</p>
          <AdminLoginForm />
        </main>
        <SiteFooter locale="en" />
      </>
    );
  }

  const rows: Row[] = [];
  for (const g of guides) {
    const review = await getEffectiveReview(g.slug, g);
    const version = await getCurrentVersion(g.slug);
    rows.push({
      contentId: g.slug,
      kind: "emergency_guide",
      titleEn: g.title.en,
      titleEs: g.title.es,
      reviewed: review.reviewed,
      reviewerId: review.reviewerId,
      reviewerTitle: review.reviewerTitle,
      reviewedDate: review.reviewedDate,
      scope: review.scope,
      notes: review.notes,
      version,
      allowedSpecialties: getAllowedSpecialties(g.slug),
    });
  }
  for (const r of rightsTopics) {
    const review = await getEffectiveReview(r.slug, r);
    const version = await getCurrentVersion(r.slug);
    rows.push({
      contentId: r.slug,
      kind: "rights_topic",
      titleEn: r.title.en,
      titleEs: r.title.es,
      reviewed: review.reviewed,
      reviewerId: review.reviewerId,
      reviewerTitle: review.reviewerTitle,
      reviewedDate: review.reviewedDate,
      scope: review.scope,
      notes: review.notes,
      version,
      allowedSpecialties: getAllowedSpecialties(r.slug),
    });
  }

  const history = await listHistory(20);

  return (
    <>
      <SiteHeader locale="en" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">
            Admin · Reviews ({rows.length})
          </h1>
          <form action={adminReviewsLogoutAction}>
            <button
              type="submit"
              className="rounded-full bg-zinc-200 px-3 py-1 text-sm font-semibold text-zinc-800 hover:bg-zinc-300"
            >
              Sign out
            </button>
          </form>
        </div>

        <p className="mt-2 text-sm text-zinc-600">
          Editing content (bump version) automatically resets the review
          status. Specialty enforcement is server-side.
        </p>

        <div className="mt-6 space-y-3">
          {rows.map((row) => (
            <details
              key={`${row.kind}:${row.contentId}`}
              className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200"
            >
              <summary className="flex flex-wrap items-center gap-2 cursor-pointer">
                <span className="font-semibold text-zinc-900">
                  {row.titleEn}
                </span>
                <span className="text-xs text-zinc-500">
                  ({row.kind} · {row.contentId} · v{row.version})
                </span>
                <ReviewBadge reviewed={row.reviewed} locale="en" />
              </summary>

              <dl className="mt-3 grid gap-1 text-xs text-zinc-700 sm:grid-cols-2">
                <div>
                  <dt className="font-semibold">Allowed specialties</dt>
                  <dd>
                    {row.allowedSpecialties.join(", ") || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Reviewer</dt>
                  <dd>
                    {row.reviewerId
                      ? `${row.reviewerId} (${row.reviewerTitle ?? "?"})`
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Last reviewed</dt>
                  <dd>{row.reviewedDate ?? "—"}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Scope</dt>
                  <dd>{row.scope ?? "—"}</dd>
                </div>
                {row.notes ? (
                  <div className="sm:col-span-2">
                    <dt className="font-semibold">Notes</dt>
                    <dd>{row.notes}</dd>
                  </div>
                ) : null}
              </dl>

              <AdminApproveForm
                contentId={row.contentId}
                reviewers={reviewers}
                defaultReviewerId={row.reviewerId}
              />

              <div className="mt-3 flex flex-wrap gap-2">
                <form action={bumpVersionAction} className="flex items-center gap-2">
                  <input type="hidden" name="contentId" value={row.contentId} />
                  <input
                    name="summary"
                    placeholder="change summary (e.g. tightened wording on step 3)"
                    className="rounded-xl border border-zinc-300 px-2 py-1 text-xs w-64"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-amber-600 px-3 py-1 text-xs font-bold text-white hover:bg-amber-700"
                  >
                    Bump version (resets review)
                  </button>
                </form>
                {row.reviewed ? (
                  <form action={revokeAction} className="flex items-center gap-2">
                    <input type="hidden" name="contentId" value={row.contentId} />
                    <input
                      name="reason"
                      placeholder="revocation reason"
                      className="rounded-xl border border-zinc-300 px-2 py-1 text-xs w-48"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-800 hover:bg-red-100 hover:text-red-800"
                    >
                      Revoke
                    </button>
                  </form>
                ) : null}
              </div>

              <p className="mt-2 text-[11px] italic text-zinc-500">
                Editing this content removes its verified status.
              </p>
            </details>
          ))}
        </div>

        <section className="mt-8 rounded-2xl bg-white p-4 ring-1 ring-zinc-200">
          <h2 className="text-lg font-bold">Recent history</h2>
          <ul className="mt-2 space-y-1 text-xs text-zinc-700">
            {history.length === 0 ? <li>No history yet.</li> : null}
            {history.map((h, i) => (
              <li key={i}>
                <span className="text-zinc-500">
                  {new Date(h.updatedAt).toISOString()}
                </span>{" "}
                · {h.updatedBy} · v{h.version} · {h.changeSummary}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}
