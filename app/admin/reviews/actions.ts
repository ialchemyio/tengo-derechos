"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  bumpVersion,
  recordAttestation,
  revokeAttestation,
} from "@/lib/attestations";
import { canReviewerApprove, explainRejection } from "@/lib/review-rules";
import { getReviewer } from "@/lib/reviewers";

async function requireAuth() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("unauthorized");
  }
}

const EMERGENCY_SLUGS = [
  "ice-at-door",
  "police-stop",
  "border-patrol",
  "medical",
];
const RIGHTS_SLUGS = ["police", "immigration", "workplace", "housing", "medical"];

function pathsForContent(contentId: string): string[] {
  const out: string[] = [];
  if (EMERGENCY_SLUGS.includes(contentId)) {
    out.push(`/emergency/${contentId}`, `/es/emergency/${contentId}`);
  }
  if (RIGHTS_SLUGS.includes(contentId)) {
    out.push(`/rights/${contentId}`, `/es/rights/${contentId}`);
  }
  return out;
}

export type ApprovalState = { ok: boolean; message: string | null };

export async function approveAction(
  _prev: ApprovalState,
  form: FormData
): Promise<ApprovalState> {
  await requireAuth();
  const contentId = String(form.get("contentId") || "");
  const reviewerId = String(form.get("reviewerId") || "");
  const scope =
    String(form.get("scope") || "full") === "partial" ? "partial" : "full";
  const notes = String(form.get("notes") || "").trim() || undefined;
  const audioReviewed = form.get("audioReviewed") === "on";

  if (!contentId || !reviewerId) {
    return { ok: false, message: "contentId and reviewerId are required." };
  }
  const reviewer = getReviewer(reviewerId);
  if (!reviewer) {
    return { ok: false, message: "Reviewer not found." };
  }
  if (!canReviewerApprove(reviewer, contentId)) {
    return {
      ok: false,
      message:
        explainRejection(reviewer, contentId) ??
        "This reviewer is not authorized to approve this content.",
    };
  }
  await recordAttestation(
    contentId,
    reviewerId,
    scope,
    notes,
    audioReviewed
  );
  for (const p of pathsForContent(contentId)) revalidatePath(p);
  revalidatePath("/admin/reviews");
  return { ok: true, message: "approved" };
}

export async function bumpVersionAction(form: FormData) {
  await requireAuth();
  const contentId = String(form.get("contentId") || "");
  const summary = String(form.get("summary") || "").trim() || "edited";
  if (!contentId) return;
  await bumpVersion(contentId, "admin", summary);
  for (const p of pathsForContent(contentId)) revalidatePath(p);
  revalidatePath("/admin/reviews");
}

export async function revokeAction(form: FormData) {
  await requireAuth();
  const contentId = String(form.get("contentId") || "");
  const reason =
    String(form.get("reason") || "").trim() || "revoked by admin";
  if (!contentId) return;
  await revokeAttestation(contentId, "admin", reason);
  for (const p of pathsForContent(contentId)) revalidatePath(p);
  revalidatePath("/admin/reviews");
}

export async function adminReviewsLogoutAction() {
  const { clearAdminCookie } = await import("@/lib/admin-auth");
  await clearAdminCookie();
  redirect("/admin/reviews");
}
