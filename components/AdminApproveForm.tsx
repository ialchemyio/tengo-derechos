"use client";

import { useActionState } from "react";
import { approveAction, type ApprovalState } from "@/app/admin/reviews/actions";
import type { Reviewer } from "@/lib/reviewers";

const initial: ApprovalState = { ok: false, message: null };

export function AdminApproveForm({
  contentId,
  reviewers,
  defaultReviewerId,
}: {
  contentId: string;
  reviewers: Reviewer[];
  defaultReviewerId?: string;
}) {
  const [state, action, pending] = useActionState(approveAction, initial);
  return (
    <form action={action} className="mt-3 grid gap-2 sm:grid-cols-2">
      <input type="hidden" name="contentId" value={contentId} />
      <label className="block">
        <span className="text-xs font-medium text-zinc-700">Reviewer</span>
        <select
          name="reviewerId"
          defaultValue={defaultReviewerId ?? ""}
          required
          className="mt-1 w-full rounded-xl border border-zinc-300 px-2 py-1.5 text-sm"
        >
          <option value="" disabled>
            Pick a reviewer…
          </option>
          {reviewers.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name} — {r.specialties.join(", ")}{" "}
              {r.verified ? "✓" : "(unverified)"}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-xs font-medium text-zinc-700">Scope</span>
        <select
          name="scope"
          defaultValue="full"
          className="mt-1 w-full rounded-xl border border-zinc-300 px-2 py-1.5 text-sm"
        >
          <option value="full">full</option>
          <option value="partial">partial</option>
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className="text-xs font-medium text-zinc-700">
          Notes (optional)
        </span>
        <textarea
          name="notes"
          rows={2}
          className="mt-1 w-full rounded-xl border border-zinc-300 px-2 py-1.5 text-sm"
        />
      </label>
      <label className="inline-flex items-center gap-2 text-xs text-zinc-700 sm:col-span-2">
        <input
          type="checkbox"
          name="audioReviewed"
          className="h-4 w-4 rounded border-zinc-300"
        />
        Audio also reviewed (en + es clips)
      </label>
      <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-emerald-700 px-3 py-1.5 text-sm font-bold text-white hover:bg-emerald-800 disabled:opacity-70"
        >
          {pending ? "Saving…" : "Mark reviewed"}
        </button>
        {state.message ? (
          <span
            className={`text-xs ${
              state.ok ? "text-emerald-700" : "text-red-700"
            }`}
          >
            {state.ok ? "Saved." : state.message}
          </span>
        ) : null}
      </div>
    </form>
  );
}
