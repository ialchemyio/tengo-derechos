"use client";

import { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import {
  donationAmounts,
  impactCopy,
  startCheckout,
  MIN_CENTS,
  MAX_CENTS,
} from "@/lib/donations";
import { dict, type Locale } from "@/lib/i18n";

export function DonationCard({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const [amount, setAmount] = useState<number>(25);
  const [custom, setCustom] = useState<string>("");
  const [monthly, setMonthly] = useState(false);
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function donate() {
    setMsg(null);
    const dollars = custom ? Number(custom) : amount;
    const cents = Math.round(dollars * 100);
    if (
      !Number.isFinite(cents) ||
      cents < MIN_CENTS ||
      cents > MAX_CENTS
    ) {
      setMsg(t.donateAmountInvalid);
      return;
    }

    setPending(true);
    const res = await startCheckout({ amountCents: cents, monthly, locale });
    if (res.ok) {
      window.location.href = res.url;
      return;
    }
    setPending(false);
    if (res.status === 503) {
      setMsg(res.message || t.donateStripeUnconfigured);
    } else if (res.status === 400) {
      setMsg(res.message || t.donateAmountInvalid);
    } else {
      setMsg(res.message || t.donateFailed);
    }
  }

  const impact =
    impactCopy[amount as keyof typeof impactCopy]?.[locale] ??
    (locale === "es"
      ? "Cada donación ayuda a proteger a las familias."
      : "Every gift helps protect families.");

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
      <div className="mb-4 flex items-center gap-2 text-[var(--donate)]">
        <Heart className="heartbeat h-5 w-5 fill-[var(--donate)]" aria-hidden />
        <h2 className="text-xl font-bold text-zinc-900">
          {locale === "es" ? "Apoya a las familias" : "Support families"}
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {donationAmounts.map((a) => (
          <button
            key={a}
            onClick={() => {
              setAmount(a);
              setCustom("");
            }}
            disabled={pending}
            className={`rounded-xl border px-3 py-3 text-base font-bold transition focus:outline-none focus:ring-2 focus:ring-[var(--brand)] disabled:opacity-50 ${
              amount === a && !custom
                ? "border-[var(--brand)] bg-[var(--brand-soft)] text-[var(--brand-deep)]"
                : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400"
            }`}
            aria-pressed={amount === a && !custom}
          >
            ${a}
          </button>
        ))}
      </div>

      <label className="mt-3 block">
        <span className="text-sm text-zinc-600">
          {locale === "es" ? "Monto personalizado" : "Custom amount"}
        </span>
        <input
          type="number"
          inputMode="decimal"
          min={1}
          max={5000}
          step="0.01"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          disabled={pending}
          className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-base focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] disabled:opacity-50"
          placeholder="$"
        />
      </label>

      <label className="mt-3 flex items-center gap-2 text-sm text-zinc-700">
        <input
          type="checkbox"
          checked={monthly}
          onChange={(e) => setMonthly(e.target.checked)}
          disabled={pending}
          className="h-4 w-4 rounded border-zinc-300"
        />
        {locale === "es" ? "Hacer donación mensual" : "Make this a monthly gift"}
      </label>

      <p className="mt-4 rounded-xl bg-[var(--brand-soft)] p-3 text-sm text-[var(--brand-deep)]">
        {impact}
      </p>

      <button
        onClick={donate}
        disabled={pending}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--donate)] px-4 py-3 text-base font-bold text-white shadow-sm hover:bg-[var(--donate-deep)] focus:outline-none focus:ring-4 focus:ring-[var(--donate)]/40 disabled:opacity-70"
      >
        {pending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            {t.donateProcessing}
          </>
        ) : (
          <>
            <Heart
              className="heartbeat h-4 w-4 fill-white"
              aria-hidden
            />
            {locale === "es" ? "Donar ahora" : "Donate now"}
          </>
        )}
      </button>

      {msg ? (
        <p className="mt-3 text-sm text-zinc-700" role="status">
          {msg}
        </p>
      ) : null}
    </div>
  );
}
