import type { Reviewer, Specialty } from "./reviewers";

// Which reviewer specialties may approve which content slug.
// content slugs include emergency-guide slugs ("ice-at-door" etc.)
// and rights-topic slugs ("workplace", "housing" etc.).
//
// NB: Phase 10 spec maps "workplace" → ["housing"] because the Reviewer
// specialty enum currently has no `employment` value. Treat housing-specialty
// reviewers as the closest stand-in for workplace content until a future
// phase splits the specialty enum further.
export const CONTENT_APPROVAL_RULES: Record<string, Specialty[]> = {
  // emergency guides
  "ice-at-door": ["immigration"],
  "border-patrol": ["immigration"],
  "police-stop": ["criminal"],
  medical: ["medical"],
  // rights topics — slug here is the rights-topic slug only (no namespace
  // prefix) since both content-history and review-rules treat the rights
  // topics as standalone content ids.
  immigration: ["immigration"],
  police: ["criminal"],
  workplace: ["housing"],
  housing: ["housing"],
};

export function getAllowedSpecialties(contentId: string): Specialty[] {
  return CONTENT_APPROVAL_RULES[contentId] ?? [];
}

export function canReviewerApprove(
  reviewer: Reviewer,
  contentId: string
): boolean {
  if (!reviewer.verified) return false;
  const allowed = getAllowedSpecialties(contentId);
  if (allowed.length === 0) return false;
  return reviewer.specialties.some((s) => allowed.includes(s));
}

export function explainRejection(
  reviewer: Reviewer | null,
  contentId: string
): string | null {
  if (!reviewer) return "Reviewer not found.";
  if (!reviewer.verified) {
    return "Reviewer is not yet marked verified. Confirm bar good-standing first.";
  }
  const allowed = getAllowedSpecialties(contentId);
  if (allowed.length === 0) {
    return `No specialty allowlist is configured for "${contentId}".`;
  }
  if (!reviewer.specialties.some((s) => allowed.includes(s))) {
    return `${reviewer.name} cannot approve "${contentId}". Allowed specialties: ${allowed.join(
      ", "
    )}.`;
  }
  return null;
}
