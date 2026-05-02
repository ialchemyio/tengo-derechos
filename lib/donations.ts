export const donationAmounts = [5, 10, 25, 50, 100] as const;

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

export type DonationIntent = {
  amount: number;
  monthly: boolean;
};

export async function startCheckout(intent: DonationIntent): Promise<{
  ok: boolean;
  url?: string;
  message: string;
}> {
  if (!isStripeConfigured()) {
    return {
      ok: false,
      message:
        "Stripe is not yet configured. Your generosity is noted — please check back soon.",
    };
  }
  return {
    ok: false,
    message: `Checkout for $${intent.amount}${intent.monthly ? "/mo" : ""} not yet wired. Please email donations@tengoderechos.org.`,
  };
}
