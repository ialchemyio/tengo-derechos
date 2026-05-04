import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { NonprofitStatusBanner } from "./NonprofitStatusBanner";
import { dict, type Locale } from "@/lib/i18n";

const placeholders = {
  donations: 0,
  expensePct: { programs: 80, ops: 15, fundraising: 5 },
  donors: 0,
  asOf: "2026-Q2",
};

export function TransparencyView({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const labels = {
    donations: locale === "es" ? "Donaciones recibidas" : "Donations received",
    donors: locale === "es" ? "Donantes" : "Donors",
    programs: locale === "es" ? "Programas" : "Programs",
    ops: locale === "es" ? "Operaciones" : "Operations",
    fundraising: locale === "es" ? "Recaudación" : "Fundraising",
    expenseTitle: locale === "es" ? "Distribución de gastos" : "Expense breakdown",
    asOf: locale === "es" ? "Datos al" : "As of",
  };
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          {t.transparencyTitle}
        </h1>
        <p className="mt-2 text-zinc-700">{t.transparencyIntro}</p>

        <div className="mt-4">
          <NonprofitStatusBanner locale={locale} />
        </div>

        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              {labels.donations}
            </p>
            <p className="mt-2 text-3xl font-extrabold text-zinc-900">
              ${placeholders.donations.toLocaleString()}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              {labels.donors}
            </p>
            <p className="mt-2 text-3xl font-extrabold text-zinc-900">
              {placeholders.donors}
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-zinc-200">
          <h2 className="text-lg font-bold text-zinc-900">
            {labels.expenseTitle}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              ["programs", labels.programs, placeholders.expensePct.programs, "bg-emerald-500"],
              ["ops", labels.ops, placeholders.expensePct.ops, "bg-amber-500"],
              ["fundraising", labels.fundraising, placeholders.expensePct.fundraising, "bg-zinc-400"],
            ].map(([key, label, pct, bar]) => (
              <li key={String(key)}>
                <div className="flex items-center justify-between text-zinc-800">
                  <span>{String(label)}</span>
                  <span className="font-semibold">{pct}%</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-zinc-100">
                  <div
                    className={`h-2 rounded-full ${bar}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-6 text-xs text-zinc-500">
          {labels.asOf} {placeholders.asOf}. {t.transparencyAsOf}
        </p>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
