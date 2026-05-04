import type { Locale } from "./i18n";

export const donationAmounts = [5, 10, 25, 50, 100] as const;

export const PRESET_CENTS = donationAmounts.map((d) => d * 100);
export const MIN_CENTS = 100;
export const MAX_CENTS = 500_000;

export const impactCopy: Record<number, { en: string; es: string }> = {
  5: {
    en: "$5 helps print emergency rights cards",
    es: "$5 ayuda a imprimir tarjetas de derechos",
  },
  10: {
    en: "$10 helps print emergency rights cards for a family",
    es: "$10 ayuda a imprimir tarjetas para una familia",
  },
  25: {
    en: "$25 helps connect a family to resources",
    es: "$25 ayuda a conectar a una familia con recursos",
  },
  50: {
    en: "$50 helps support community outreach",
    es: "$50 apoya la educación comunitaria",
  },
  100: {
    en: "$100 sponsors a know-your-rights workshop",
    es: "$100 patrocina un taller de derechos",
  },
};

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export type NonprofitStatus = "pending" | "confirmed" | "denied";

export function getNonprofitStatus(): NonprofitStatus {
  const v = (process.env.NEXT_PUBLIC_NONPROFIT_STATUS || "pending").toLowerCase();
  if (v === "confirmed" || v === "denied") return v;
  return "pending";
}

export function getEin(): string | null {
  return process.env.NEXT_PUBLIC_NONPROFIT_EIN || null;
}

export function validateAmountCents(cents: number): boolean {
  return Number.isFinite(cents) && cents >= MIN_CENTS && cents <= MAX_CENTS;
}

export type DonationIntent = {
  amountCents: number;
  monthly: boolean;
  locale: Locale;
};

export type CheckoutResult =
  | { ok: true; url: string }
  | { ok: false; status: number; message: string };

export async function startCheckout(
  intent: DonationIntent
): Promise<CheckoutResult> {
  try {
    const res = await fetch("/api/donations/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: intent.amountCents,
        monthly: intent.monthly,
        locale: intent.locale,
      }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      url?: string;
      message?: string;
    };
    if (res.ok && data.url) {
      return { ok: true, url: data.url };
    }
    return {
      ok: false,
      status: res.status,
      message: data.message || "Could not start checkout.",
    };
  } catch {
    return { ok: false, status: 0, message: "Network error." };
  }
}
