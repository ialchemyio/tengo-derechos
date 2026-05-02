import Link from "next/link";
import {
  AlertTriangle,
  Car,
  DoorClosed,
  Stethoscope,
  Scale,
  Users,
  Heart,
  ShieldAlert,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { dict } from "@/lib/i18n";
import { EmergencyButton } from "./EmergencyButton";
import { TrustBanner } from "./TrustBanner";
import { OfflineNotice } from "./OfflineNotice";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function HomeView({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-12 pt-6">
        <section className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-6 ring-1 ring-zinc-200 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
            {t.brand}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight text-zinc-900 sm:text-5xl">
            {t.tagline}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-zinc-700">{t.heroSub}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/emergency"
              className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-base font-bold text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              <ShieldAlert className="h-5 w-5" aria-hidden />
              {t.needHelp}
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-base font-bold text-zinc-900 shadow-sm ring-1 ring-zinc-300 hover:bg-zinc-50"
            >
              {t.resources}
            </Link>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-xl font-bold text-zinc-900">
            {locale === "es" ? "¿Qué está pasando?" : "What's happening?"}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <EmergencyButton
              href="/emergency/ice-at-door"
              title={t.iceAtDoor}
              subtitle={locale === "es" ? "Tocan la puerta" : "Knock at door"}
              icon={DoorClosed}
              tone="red"
            />
            <EmergencyButton
              href="/emergency/police-stop"
              title={t.policeStop}
              subtitle={locale === "es" ? "Tránsito" : "Traffic"}
              icon={Car}
              tone="amber"
            />
            <EmergencyButton
              href="/emergency/border-patrol"
              title={t.borderPatrol}
              subtitle={locale === "es" ? "Encuentro" : "Encounter"}
              icon={ShieldAlert}
              tone="indigo"
            />
            <EmergencyButton
              href="/emergency/medical"
              title={t.medical}
              subtitle={locale === "es" ? "Sin seguro" : "No insurance"}
              icon={Stethoscope}
              tone="teal"
            />
            <EmergencyButton
              href="/lawyers"
              title={t.findLawyer}
              subtitle={locale === "es" ? "Ayuda legal" : "Legal help"}
              icon={Scale}
              tone="emerald"
            />
            <EmergencyButton
              href="/resources"
              title={t.resources}
              subtitle={locale === "es" ? "Cerca de ti" : "Near you"}
              icon={Users}
              tone="neutral"
            />
          </div>
        </section>

        <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
          <h2 className="text-xl font-bold text-zinc-900">{t.howItHelps}</h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-3">
            {[t.step1, t.step2, t.step3].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-zinc-800">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/donate"
            className="flex items-center justify-between gap-4 rounded-2xl bg-emerald-600 p-5 text-white shadow-sm hover:bg-emerald-700"
          >
            <div>
              <div className="text-lg font-bold">{t.donate}</div>
              <div className="text-sm opacity-90">
                {locale === "es"
                  ? "Apoya a las familias en crisis"
                  : "Support families in crisis"}
              </div>
            </div>
            <Heart className="h-8 w-8" aria-hidden />
          </Link>
          <Link
            href="/rights"
            className="flex items-center justify-between gap-4 rounded-2xl bg-white p-5 ring-1 ring-zinc-200 hover:ring-zinc-400"
          >
            <div>
              <div className="text-lg font-bold text-zinc-900">{t.rights}</div>
              <div className="text-sm text-zinc-600">
                {locale === "es"
                  ? "Aprende lo básico"
                  : "Learn the basics"}
              </div>
            </div>
            <AlertTriangle className="h-8 w-8 text-emerald-600" aria-hidden />
          </Link>
        </section>

        <div className="mt-10 space-y-4">
          <TrustBanner
            message={t.legalNotice}
            reviewLabel={t.attorneyReviewed}
          />
          <OfflineNotice message={t.offlineNotice} />
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
