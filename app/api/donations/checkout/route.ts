import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { MAX_CENTS, MIN_CENTS, PRESET_CENTS } from "@/lib/donations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  amount?: number;
  monthly?: boolean;
  locale?: "en" | "es";
};

function siteOrigin(req: NextRequest): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env) return env.replace(/\/+$/, "");
  const proto = req.headers.get("x-forwarded-proto") || "http";
  const host = req.headers.get("host") || "localhost:3000";
  return `${proto}://${host}`;
}

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Donations are not yet enabled. Please check back soon. (Stripe is not configured.)",
      },
      { status: 503 }
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const amount = Number(body.amount);
  const monthly = !!body.monthly;
  const locale: "en" | "es" = body.locale === "es" ? "es" : "en";

  const isPreset = PRESET_CENTS.includes(amount);
  const isCustomValid =
    Number.isFinite(amount) && amount >= MIN_CENTS && amount <= MAX_CENTS;
  if (!isPreset && !isCustomValid) {
    return NextResponse.json(
      {
        ok: false,
        message:
          locale === "es"
            ? "Ingresa un monto entre $1 y $5,000."
            : "Please enter an amount between $1 and $5,000.",
      },
      { status: 400 }
    );
  }

  const origin = siteOrigin(req);
  const localePrefix = locale === "es" ? "/es" : "";
  const success_url = `${origin}${localePrefix}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`;
  const cancel_url = `${origin}${localePrefix}/donate/cancelled`;

  const stripe = new Stripe(key);

  try {
    const productName =
      locale === "es"
        ? "Donación a Tengo Derechos"
        : "Donation to Tengo Derechos";

    let session: Stripe.Checkout.Session;

    if (monthly) {
      const presetMonthlyPrice = process.env.STRIPE_PRICE_MONTHLY_25;
      // For monthly, prefer a preconfigured Price ID for $25/mo when amount matches.
      // Otherwise create a recurring price on the fly using `price_data`.
      session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items:
          amount === 2500 && presetMonthlyPrice
            ? [{ price: presetMonthlyPrice, quantity: 1 }]
            : [
                {
                  quantity: 1,
                  price_data: {
                    currency: "usd",
                    unit_amount: amount,
                    recurring: { interval: "month" },
                    product_data: { name: productName },
                  },
                },
              ],
        success_url,
        cancel_url,
        locale: locale === "es" ? "es" : "en",
        allow_promotion_codes: false,
        submit_type: undefined, // submit_type is not allowed in subscription mode
      });
    } else {
      session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: amount,
              product_data: { name: productName },
            },
          },
        ],
        success_url,
        cancel_url,
        locale: locale === "es" ? "es" : "en",
        submit_type: "donate",
      });
    }

    if (!session.url) {
      return NextResponse.json(
        { ok: false, message: "Stripe did not return a checkout URL." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true, url: session.url });
  } catch (e) {
    console.error("[donations/checkout] stripe error", e);
    return NextResponse.json(
      {
        ok: false,
        message:
          locale === "es"
            ? "No pudimos iniciar el pago. Inténtalo de nuevo."
            : "Could not start checkout. Please try again.",
      },
      { status: 502 }
    );
  }
}
