"use server";

import {
  adminUpsertResource,
  adminDeleteResource,
  type ResourceCategory,
  type ResourceCost,
} from "@/lib/resources";
import { isAdminAuthenticated, setAdminCookie, clearAdminCookie } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const VALID_CATS: ResourceCategory[] = [
  "legal",
  "clinic",
  "hotline",
  "food",
  "shelter",
  "consulate",
];
const VALID_COSTS: ResourceCost[] = ["free", "sliding", "low", "varies"];

export type AdminLoginState = { error: string | null };

export async function adminLoginAction(
  _prev: AdminLoginState,
  form: FormData
): Promise<AdminLoginState> {
  const token = String(form.get("token") || "");
  const ok = await setAdminCookie(token);
  if (!ok) return { error: "Invalid token." };
  redirect("/admin/resources");
}

export async function adminLogoutAction() {
  await clearAdminCookie();
  redirect("/admin/resources");
}

async function requireAuth() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("unauthorized");
  }
}

export async function adminSaveAction(form: FormData) {
  await requireAuth();
  const id = String(form.get("id") || "").trim();
  if (!id) return;
  const cat = String(form.get("category") || "legal");
  const cost = String(form.get("cost") || "varies");
  const langsRaw = String(form.get("languages") || "");
  const languages = langsRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  await adminUpsertResource({
    id,
    name: String(form.get("name") || "").trim(),
    category: ((VALID_CATS as string[]).includes(cat)
      ? cat
      : "legal") as ResourceCategory,
    city: String(form.get("city") || "").trim() || undefined,
    state: String(form.get("state") || "").trim() || undefined,
    phone: String(form.get("phone") || "").trim() || undefined,
    website: String(form.get("website") || "").trim() || undefined,
    languages,
    cost: ((VALID_COSTS as string[]).includes(cost)
      ? cost
      : "varies") as ResourceCost,
    emergency: form.get("emergency") === "on",
    notes: {
      en: String(form.get("notes_en") || "").trim(),
      es: String(form.get("notes_es") || "").trim(),
    },
    published: form.get("published") === "on",
    submittedBy: String(form.get("submitted_by") || "") || null,
  });
  revalidatePath("/admin/resources");
  revalidatePath("/resources");
  revalidatePath("/es/resources");
}

export async function adminVerifyAction(form: FormData) {
  await requireAuth();
  const id = String(form.get("id") || "");
  const reviewer = String(form.get("verified_by") || "admin");
  if (!id) return;
  await adminUpsertResource({
    id,
    verifiedAt: new Date().toISOString(),
    verifiedBy: reviewer,
    published: true,
  });
  revalidatePath("/admin/resources");
  revalidatePath("/resources");
  revalidatePath("/es/resources");
}

export async function adminDeleteAction(form: FormData) {
  await requireAuth();
  const id = String(form.get("id") || "");
  if (!id) return;
  await adminDeleteResource(id);
  revalidatePath("/admin/resources");
  revalidatePath("/resources");
  revalidatePath("/es/resources");
}
