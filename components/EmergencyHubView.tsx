import Link from "next/link";
import { DoorClosed, Car, ShieldAlert, Stethoscope } from "lucide-react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { ScenarioCard } from "./ScenarioCard";
import { TrustBanner } from "./TrustBanner";
import { dict, type Locale } from "@/lib/i18n";

export function EmergencyHubView({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const home = locale === "es" ? "/es" : "/";
  const base = locale === "es" ? "/es/emergency" : "/emergency";
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          {t.emergency}
        </h1>
        <p className="mt-2 text-zinc-700">{t.chooseSituation}</p>

        <div className="mt-6 space-y-3">
          <ScenarioCard
            href={`${base}/ice-at-door`}
            title={t.iceAtDoor}
            description={
              locale === "es"
                ? "Pasos a seguir si oficiales de inmigración llegan a tu casa."
                : "Steps to take if immigration officers come to your home."
            }
            icon={DoorClosed}
          />
          <ScenarioCard
            href={`${base}/police-stop`}
            title={t.policeStop}
            description={
              locale === "es"
                ? "Qué hacer durante una parada de tránsito."
                : "What to do during a traffic stop."
            }
            icon={Car}
          />
          <ScenarioCard
            href={`${base}/border-patrol`}
            title={t.borderPatrol}
            description={
              locale === "es"
                ? "Qué hacer durante un encuentro con la Patrulla Fronteriza."
                : "What to do during a Border Patrol encounter."
            }
            icon={ShieldAlert}
          />
          <ScenarioCard
            href={`${base}/medical`}
            title={t.medical}
            description={
              locale === "es"
                ? "Cómo conseguir atención médica, incluso sin seguro."
                : "How to get medical help, even without insurance."
            }
            icon={Stethoscope}
          />
        </div>

        <div className="mt-8">
          <TrustBanner locale={locale} />
        </div>

        <p className="mt-6 text-sm">
          <Link
            href={home}
            className="font-semibold text-emerald-700 hover:underline"
          >
            ← {t.backHome}
          </Link>
        </p>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
