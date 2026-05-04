import { cookies } from "next/headers";

const COOKIE = "td_admin";

export async function isAdminAuthenticated(): Promise<boolean> {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;
  const c = await cookies();
  return c.get(COOKIE)?.value === expected;
}

export async function setAdminCookie(token: string): Promise<boolean> {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected || token !== expected) return false;
  const c = await cookies();
  c.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return true;
}

export async function clearAdminCookie() {
  const c = await cookies();
  c.delete(COOKIE);
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_TOKEN);
}
