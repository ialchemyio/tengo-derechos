"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { donationAmounts, impactCopy, startCheckout } from "@/lib/donations";
import type { Locale } from "@/lib/i18n";

export function DonationCard({ locale }: { locale: Locale }) {
  const [amount, setAmount] = useState<number>(25);
  const [custom, setCustom] = useState<string>("");
  const [monthly, setMonthly] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function donate() {
    const value = custom ? Number(custom) : amount;
    if (!value || value < 1) {
      setMsg(locale === "es" ? "Ingresa un monto válido." : "Enter a valid amount.");
      return;
    }
    const res = await startCheckout({ amount: value, monthly });
    setMsg(res.message);
  }

  const impact =
    impactCopy[amount as keyof typeof impactCopy]?.[locale] ??
    (locale === "es"
      ? "Cada donación ayuda a proteger a las familias."
      : "Every gift helps protect families.");

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
      <div className="mb-4 flex items-center gap-2 text-emerald-700">
        <Heart className="h-5 w-5" aria-hidden />
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
            className={`rounded-xl border px-3 py-3 text-base font-bold transition focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              amount === a && !custom
                ? "border-emerald-600 bg-emerald-50 text-emerald-900"
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
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-base focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="$"
        />
      </label>

      <label className="mt-3 flex items-center gap-2 text-sm text-zinc-700">
        <input
          type="checkbox"
          checked={monthly}
          onChange={(e) => setMonthly(e.target.checked)}
          className="h-4 w-4 rounded border-zinc-300"
        />
        {locale === "es" ? "Hacer donación mensual" : "Make this a monthly gift"}
      </label>

      <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900">
        {impact}
      </p>

      <button
        onClick={donate}
        className="mt-4 w-full rounded-xl bg-emerald-600 px-4 py-3 text-base font-bold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        {locale === "es" ? "Donar ahora" : "Donate now"}
      </button>

      {msg ? (
        <p className="mt-3 text-sm text-zinc-600" role="status">
          {msg}
        </p>
      ) : null}

      <p className="mt-3 text-xs text-zinc-500">
        {locale === "es"
          ? "Las donaciones se procesarán de forma segura cuando se conecte Stripe."
          : "Donations will process securely once Stripe is connected."}
      </p>
    </div>
  );
}
