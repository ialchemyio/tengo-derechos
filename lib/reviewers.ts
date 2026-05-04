export type Specialty =
  | "immigration"
  | "criminal"
  | "housing"
  | "medical";

export type Reviewer = {
  id: string;
  name: string;
  title: string;
  organization?: string;
  specialties: Specialty[];
  jurisdiction?: string;
  verified: boolean;
};

// Placeholder reviewer roster. Real entries should be added only after
// staff has confirmed bar good-standing on the relevant state bar website
// and recorded the verification source on file. Until then, leave
// `verified: false` so the sign-off API will reject any approval attempt.
export const reviewers: Reviewer[] = [
  {
    id: "reviewer-immigration-placeholder",
    name: "Maria Hernández (placeholder)",
    title: "Immigration Attorney",
    organization: "Immigrant Legal Resource Center (ILRC) — placeholder",
    specialties: ["immigration"],
    jurisdiction: "CA",
    verified: false,
  },
  {
    id: "reviewer-criminal-placeholder",
    name: "Daniel Ortega (placeholder)",
    title: "Criminal Defense Attorney",
    organization: "Public Defender Office — placeholder",
    specialties: ["criminal"],
    jurisdiction: "TX",
    verified: false,
  },
  {
    id: "reviewer-legalaid-placeholder",
    name: "Bay Area Legal Aid (placeholder)",
    title: "Staff Attorney",
    organization: "Bay Area Legal Aid — placeholder",
    specialties: ["housing", "medical"],
    jurisdiction: "CA",
    verified: false,
  },
];

export function getReviewer(reviewerId?: string): Reviewer | null {
  if (!reviewerId) return null;
  return reviewers.find((r) => r.id === reviewerId) ?? null;
}

export function listVerifiedReviewers(): Reviewer[] {
  return reviewers.filter((r) => r.verified);
}
