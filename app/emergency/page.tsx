import Link from "next/link";
import { DoorClosed, Car, ShieldAlert, Stethoscope } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ScenarioCard } from "@/components/ScenarioCard";
import { TrustBanner } from "@/components/TrustBanner";
import { dict } from "@/lib/i18n";

export const metadata = {
  title: "Emergency help",
  description: "Step-by-step emergency guides for families.",
};

export default function Page() {
  const locale = "en" as const;
  const t = dict[locale];
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          {t.emergency}
        </h1>
        <p className="mt-2 text-zinc-700">
          Choose the situation that fits what is happening right now.
        </p>

        <div className="mt-6 space-y-3">
          <ScenarioCard
            href="/emergency/ice-at-door"
            title={t.iceAtDoor}
            description="Steps to take if immigration officers come to your home."
            icon={DoorClosed}
          />
          <ScenarioCard
            href="/emergency/police-stop"
            title={t.policeStop}
            description="What to do during a traffic stop."
            icon={Car}
          />
          <ScenarioCard
            href="/emergency/border-patrol"
            title={t.borderPatrol}
            description="What to do during a Border Patrol encounter."
            icon={ShieldAlert}
          />
          <ScenarioCard
            href="/emergency/medical"
            title={t.medical}
            description="How to get medical help, even without insurance."
            icon={Stethoscope}
          />
        </div>

        <div className="mt-8">
          <TrustBanner message={t.legalNotice} reviewLabel={t.attorneyReviewed} />
        </div>

        <p className="mt-6 text-sm">
          <Link href="/" className="font-semibold text-emerald-700 hover:underline">
            ← {t.home}
          </Link>
        </p>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
