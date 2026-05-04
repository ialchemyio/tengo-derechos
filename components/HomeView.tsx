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
  ShieldCheck,
  Globe2,
  HandCoins,
} from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";
import { hasAudioForGuide } from "@/lib/audio";
import { siteUrl } from "@/lib/seo";
import { EmergencyButton } from "./EmergencyButton";
import { TrustBanner } from "./TrustBanner";
import { OfflineNotice } from "./OfflineNotice";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { ShareWhatsAppButton } from "./ShareWhatsAppButton";

export function HomeView({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const p = (path: string) => (locale === "es" ? `/es${path}` : path);
  const audioLabel = "Audio";

  const trustItems = [
    {
      icon: ShieldCheck,
      title: locale === "es" ? "Revisado por abogados" : "Attorney-reviewed",
      sub: locale === "es" ? "(en proceso)" : "(in progress)",
    },
    {
      icon: Globe2,
      title: locale === "es" ? "Bilingüe" : "Bilingual",
      sub: "EN · ES",
    },
    {
      icon: HandCoins,
      title: locale === "es" ? "Sin costo" : "Always free",
      sub: locale === "es" ? "y sin anuncios" : "no ads",
    },
  ];

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-6">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-[var(--hairline)] bg-gradient-to-br from-[var(--brand-soft)] via-white to-[var(--accent-soft)] p-6 shadow-sm sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(currentColor 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              color: "var(--accent)",
            }}
          />
          <div className="relative">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-deep)] ring-1 ring-[var(--brand)]/20">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              {t.brand}
            </p>
            <h1 className="font-display mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-zinc-900 sm:text-6xl">
              {t.tagline}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-zinc-700 sm:text-xl">
              {t.heroSub}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={p("/emergency")}
                className="inline-flex items-center gap-2 rounded-2xl bg-[var(--danger)] px-5 py-3 text-base font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[var(--danger-deep)] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[var(--danger)]/30"
              >
                <ShieldAlert className="h-5 w-5" aria-hidden />
                {t.needHelp}
              </Link>
              <Link
                href={p("/resources")}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-base font-semibold text-zinc-900 shadow-sm ring-1 ring-[var(--hairline)] transition hover:-translate-y-0.5 hover:shadow-md hover:ring-[var(--accent)]/40"
              >
                {t.resources}
              </Link>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
              {trustItems.map((item) => (
                <li
                  key={item.title}
                  className="flex items-center gap-2 rounded-xl bg-white/65 px-3 py-2 ring-1 ring-[var(--hairline)] backdrop-blur"
                >
                  <item.icon
                    className="h-4 w-4 text-[var(--brand)]"
                    aria-hidden
                  />
                  <span className="font-semibold text-zinc-900">
                    {item.title}
                  </span>
                  <span className="text-zinc-500">{item.sub}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Scenario grid */}
        <section className="mt-10">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold text-zinc-900">
              {t.whatHappening}
            </h2>
            <Link
              href={p("/emergency")}
              className="text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              {locale === "es" ? "Ver todo →" : "See all →"}
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <EmergencyButton
              href={p("/emergency/ice-at-door")}
              title={t.iceAtDoor}
              subtitle={locale === "es" ? "Tocan la puerta" : "Knock at door"}
              icon={DoorClosed}
              tone="red"
              hasAudio={hasAudioForGuide("ice-at-door", locale)}
              audioLabel={audioLabel}
            />
            <EmergencyButton
              href={p("/emergency/police-stop")}
              title={t.policeStop}
              subtitle={locale === "es" ? "Tránsito" : "Traffic"}
              icon={Car}
              tone="amber"
              hasAudio={hasAudioForGuide("police-stop", locale)}
              audioLabel={audioLabel}
            />
            <EmergencyButton
              href={p("/emergency/border-patrol")}
              title={t.borderPatrol}
              subtitle={locale === "es" ? "Encuentro" : "Encounter"}
              icon={ShieldAlert}
              tone="indigo"
              hasAudio={hasAudioForGuide("border-patrol", locale)}
              audioLabel={audioLabel}
            />
            <EmergencyButton
              href={p("/emergency/medical")}
              title={t.medical}
              subtitle={locale === "es" ? "Sin seguro" : "No insurance"}
              icon={Stethoscope}
              tone="teal"
              hasAudio={hasAudioForGuide("medical", locale)}
              audioLabel={audioLabel}
            />
            <EmergencyButton
              href={p("/lawyers")}
              title={t.findLawyer}
              subtitle={locale === "es" ? "Ayuda legal" : "Legal help"}
              icon={Scale}
              tone="emerald"
            />
            <EmergencyButton
              href={p("/resources")}
              title={t.resources}
              subtitle={locale === "es" ? "Cerca de ti" : "Near you"}
              icon={Users}
              tone="neutral"
            />
          </div>
          <div className="mt-5 flex flex-col items-center gap-2 rounded-2xl bg-white p-5 text-center ring-1 ring-[var(--hairline)] sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-sm font-semibold text-zinc-800">
              {locale === "es"
                ? "Comparte estas guías con quien lo necesite."
                : "Share these guides with someone who needs them."}
            </p>
            <ShareWhatsAppButton
              url={`${siteUrl}${locale === "es" ? "/es" : "/"}`}
              locale={locale}
              size="sm"
            />
          </div>
        </section>

        {/* How it helps */}
        <section className="mt-12 overflow-hidden rounded-3xl border border-[var(--hairline)] bg-white p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-zinc-900">
            {t.howItHelps}
          </h2>
          <ol className="mt-6 grid gap-5 sm:grid-cols-3">
            {[t.step1, t.step2, t.step3].map((step, i) => (
              <li
                key={i}
                className="relative rounded-2xl bg-[var(--accent-soft)]/40 p-5 ring-1 ring-[var(--accent)]/15"
              >
                <span className="font-display absolute -top-3 left-4 inline-flex h-8 min-w-[2rem] items-center justify-center rounded-full bg-[var(--accent)] px-2 text-sm font-bold text-white shadow">
                  {i + 1}
                </span>
                <p className="mt-2 text-zinc-800">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Donate + Rights */}
        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            href={p("/donate")}
            aria-label={t.donate}
            className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--donate)] to-[var(--donate-deep)] p-6 text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/[0.06] blur-2xl"
            />
            <div className="relative">
              <div className="font-display text-xl font-bold">{t.donate}</div>
              <div className="mt-1 text-sm text-white/85">
                {locale === "es"
                  ? "Apoya a las familias en momentos difíciles"
                  : "Support families in crisis"}
              </div>
            </div>
            <Heart
              className="heartbeat relative h-10 w-10 fill-white/95 stroke-white"
              aria-hidden
            />
          </Link>
          <Link
            href={p("/rights")}
            className="group flex items-center justify-between gap-4 rounded-2xl bg-white p-6 ring-1 ring-[var(--hairline)] transition hover:-translate-y-0.5 hover:ring-[var(--accent)]/40 hover:shadow-md"
          >
            <div>
              <div className="font-display text-xl font-bold text-zinc-900">
                {t.rights}
              </div>
              <div className="mt-1 text-sm text-zinc-600">
                {locale === "es" ? "Aprende lo básico" : "Learn the basics"}
              </div>
            </div>
            <AlertTriangle
              className="h-8 w-8 text-[var(--accent)] transition group-hover:scale-110"
              aria-hidden
            />
          </Link>
        </section>

        <div className="mt-12 space-y-4">
          <TrustBanner locale={locale} />
          <OfflineNotice locale={locale} />
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
