// Runtime overlay for ReviewMeta. The static defaults in lib/content.ts and
// lib/rights.ts ship with `reviewed: false`. After an admin signs off via
// /admin/reviews, an attestation is appended here. On every render, the
// effective ReviewMeta is the static default merged with the latest
// attestation for that contentId — UNLESS the version has been bumped since
// the attestation was recorded, in which case the attestation is invalidated.
//
// File backed (no DB required). Path defaults to data/content-attestations.json
// and is gitignored. A committed example file lives at
// data/content-attestations.example.json.

import { promises as fs } from "node:fs";
import { resolve } from "node:path";
import type { ReviewMeta } from "./content";
import { getReviewer } from "./reviewers";

export type Attestation = {
  contentId: string;
  reviewerId: string;
  reviewedDate: string;
  scope: "full" | "partial";
  notes?: string;
  signedAtVersion: number;
  audioReviewed?: boolean;
};

export type ContentVersionEntry = {
  version: number;
  updatedAt: string;
  updatedBy: string;
  changeSummary: string;
};

export type AttestationsFile = {
  versions: Record<string, ContentVersionEntry>;
  attestations: Record<string, Attestation>;
  history: ContentVersionEntry[];
};

const PATH = resolve(
  process.cwd(),
  process.env.ATTESTATIONS_PATH ?? "data/content-attestations.json"
);

const empty: AttestationsFile = { versions: {}, attestations: {}, history: [] };

// Cached read so repeated server renders within one request don't re-hit disk.
// Process-lifetime cache; invalidated by writes.
let cache: AttestationsFile | null = null;

export async function readAttestations(): Promise<AttestationsFile> {
  if (cache) return cache;
  try {
    const raw = await fs.readFile(PATH, "utf8");
    cache = JSON.parse(raw) as AttestationsFile;
    return cache;
  } catch {
    cache = { ...empty, versions: {}, attestations: {}, history: [] };
    return cache;
  }
}

async function writeAttestations(data: AttestationsFile): Promise<void> {
  await fs.mkdir(resolve(process.cwd(), "data"), { recursive: true });
  await fs.writeFile(PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
  cache = data;
}

export function invalidateAttestationsCache() {
  cache = null;
}

export async function getCurrentVersion(contentId: string): Promise<number> {
  const f = await readAttestations();
  return f.versions[contentId]?.version ?? 1;
}

export async function getAttestation(
  contentId: string
): Promise<Attestation | null> {
  const f = await readAttestations();
  const att = f.attestations[contentId];
  if (!att) return null;
  const ver = await getCurrentVersion(contentId);
  // Invalidation rule from lib/content-history.ts:
  // an attestation signed at version N is no longer valid if version > N.
  if (ver > att.signedAtVersion) return null;
  return att;
}

export async function getEffectiveReview(
  contentId: string,
  staticMeta: ReviewMeta
): Promise<ReviewMeta & { version: number }> {
  const version = await getCurrentVersion(contentId);
  const att = await getAttestation(contentId);
  if (!att) {
    // No live attestation OR it was invalidated by a version bump.
    return { ...staticMeta, reviewed: false, version };
  }
  const reviewer = getReviewer(att.reviewerId);
  return {
    ...staticMeta,
    version,
    reviewed: true,
    reviewerId: att.reviewerId,
    reviewedBy: reviewer?.name ?? staticMeta.reviewedBy,
    reviewerTitle: reviewer?.title ?? staticMeta.reviewerTitle,
    reviewedDate: att.reviewedDate,
    scope: att.scope,
    notes: att.notes,
    audioReviewed: att.audioReviewed ?? staticMeta.audioReviewed ?? false,
  };
}

// ----- mutations (admin only) -----

export async function recordAttestation(
  contentId: string,
  reviewerId: string,
  scope: "full" | "partial",
  notes?: string,
  audioReviewed?: boolean
): Promise<Attestation> {
  const f = await readAttestations();
  const version = f.versions[contentId]?.version ?? 1;
  const att: Attestation = {
    contentId,
    reviewerId,
    scope,
    notes,
    signedAtVersion: version,
    reviewedDate: new Date().toISOString().slice(0, 10),
    audioReviewed: !!audioReviewed,
  };
  const next: AttestationsFile = {
    ...f,
    attestations: { ...f.attestations, [contentId]: att },
  };
  await writeAttestations(next);
  return att;
}

export async function bumpVersion(
  contentId: string,
  updatedBy: string,
  changeSummary: string
): Promise<ContentVersionEntry> {
  const f = await readAttestations();
  const prev = f.versions[contentId]?.version ?? 1;
  const next: ContentVersionEntry = {
    version: prev + 1,
    updatedAt: new Date().toISOString(),
    updatedBy,
    changeSummary,
  };
  const updated: AttestationsFile = {
    versions: { ...f.versions, [contentId]: next },
    // Bumping always invalidates the prior attestation: drop it.
    attestations: Object.fromEntries(
      Object.entries(f.attestations).filter(([id]) => id !== contentId)
    ),
    history: [
      { ...next, ...({ contentId } as object) } as ContentVersionEntry & {
        contentId: string;
      },
      ...f.history.slice(0, 199),
    ],
  };
  await writeAttestations(updated);
  return next;
}

export async function revokeAttestation(
  contentId: string,
  revokedBy: string,
  reason: string
): Promise<void> {
  const f = await readAttestations();
  if (!f.attestations[contentId]) return;
  const next: AttestationsFile = {
    versions: f.versions,
    attestations: Object.fromEntries(
      Object.entries(f.attestations).filter(([id]) => id !== contentId)
    ),
    history: [
      {
        version: f.versions[contentId]?.version ?? 1,
        updatedAt: new Date().toISOString(),
        updatedBy: revokedBy,
        changeSummary: `revoked attestation: ${reason}`,
      },
      ...f.history.slice(0, 199),
    ],
  };
  await writeAttestations(next);
}

export async function listHistory(
  limit = 50
): Promise<ContentVersionEntry[]> {
  const f = await readAttestations();
  return f.history.slice(0, limit);
}
