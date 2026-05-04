import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { mkdir, appendFile } from "node:fs/promises";
import { dirname } from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const seenEvents = new Set<string>();
const SEEN_LIMIT = 1000;

function rememberEvent(id: string): boolean {
  if (seenEvents.has(id)) return false;
  if (seenEvents.size >= SEEN_LIMIT) {
    const first = seenEvents.values().next().value;
    if (first) seenEvents.delete(first);
  }
  seenEvents.add(id);
  return true;
}

const LOG_PATH =
  process.env.DONATIONS_LOG_PATH || "data/donations.jsonl";

async function logDonation(record: Record<string, unknown>) {
  try {
    await mkdir(dirname(LOG_PATH), { recursive: true });
    await appendFile(LOG_PATH, JSON.stringify(record) + "\n", "utf8");
  } catch (e) {
    console.error("[donations/webhook] log write failed", e);
  }
}

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  const whsec = process.env.STRIPE_WEBHOOK_SECRET;
  if (!key || !whsec) {
    return NextResponse.json(
      { ok: false, message: "Webhook not configured." },
      { status: 200 }
    );
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ ok: false }, { status: 200 });

  const stripe = new Stripe(key);
  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, whsec);
  } catch (e) {
    console.error("[donations/webhook] signature verification failed", e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!rememberEvent(event.id)) {
    return NextResponse.json({ ok: true, dedup: true });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const s = event.data.object as Stripe.Checkout.Session;
      await logDonation({
        ts: new Date().toISOString(),
        eventId: event.id,
        type: "checkout.completed",
        sessionId: s.id,
        mode: s.mode,
        amountTotal: s.amount_total,
        currency: s.currency,
        customerEmail: s.customer_details?.email ?? null,
        livemode: event.livemode,
      });
    } else if (event.type === "invoice.paid") {
      const inv = event.data.object as Stripe.Invoice;
      await logDonation({
        ts: new Date().toISOString(),
        eventId: event.id,
        type: "invoice.paid",
        invoiceId: inv.id,
        amountPaid: inv.amount_paid,
        currency: inv.currency,
        customerEmail: inv.customer_email ?? null,
        livemode: event.livemode,
      });
    }
  } catch (e) {
    console.error("[donations/webhook] handler error", e);
  }

  return NextResponse.json({ ok: true });
}
