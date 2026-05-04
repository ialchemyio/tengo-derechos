"use server";

import { publicSubmitResource } from "@/lib/resources";
import type { ResourceCategory, ResourceCost } from "@/lib/resources";
import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";

export type SubmitState = {
  ok: boolean;
  message: string;
};

const VALID_CATS: ResourceCategory[] = [
  "legal",
  "clinic",
  "hotline",
  "food",
  "shelter",
  "consulate",
];
const VALID_COSTS: ResourceCost[] = ["free", "sliding", "low", "varies"];

export async function submitResourceAction(
  _prev: SubmitState,
  form: FormData
): Promise<SubmitState> {
  const name = String(form.get("name") || "").trim();
  const cat = String(form.get("category") || "legal");
  const cost = String(form.get("cost") || "varies");
  if (!name) return { ok: false, message: "Name is required." };
  if (!(VALID_CATS as string[]).includes(cat))
    return { ok: false, message: "Invalid category." };
  if (!(VALID_COSTS as string[]).includes(cost))
    return { ok: false, message: "Invalid cost." };

  const langsRaw = String(form.get("languages") || "");
  const languages = langsRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const id = `submitted-${randomUUID().slice(0, 8)}`;
  const submittedBy = [
    String(form.get("submitter_name") || "").trim(),
    String(form.get("submitter_email") || "").trim(),
  ]
    .filter(Boolean)
    .join(" / ") || null;

  const result = await publicSubmitResource({
    id,
    name,
    category: cat as ResourceCategory,
    city: (String(form.get("city") || "").trim() || undefined) as
      | string
      | undefined,
    state: (String(form.get("state") || "").trim() || undefined) as
      | string
      | undefined,
    phone: (String(form.get("phone") || "").trim() || undefined) as
      | string
      | undefined,
    website: (String(form.get("website") || "").trim() || undefined) as
      | string
      | undefined,
    languages,
    cost: cost as ResourceCost,
    emergency: form.get("emergency") === "on",
    notes: {
      en: String(form.get("notes_en") || "").trim(),
      es: String(form.get("notes_es") || "").trim(),
    },
    submittedBy: submittedBy ?? undefined,
  });

  if (!result.ok) {
    return {
      ok: false,
      message: result.error ?? "Submission failed.",
    };
  }
  revalidatePath("/resources");
  revalidatePath("/es/resources");
  return { ok: true, message: "submitted" };
}
