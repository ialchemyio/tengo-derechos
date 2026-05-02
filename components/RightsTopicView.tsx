import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { TrustBanner } from "./TrustBanner";
import { dict } from "@/lib/i18n";

export function RightsTopicView({
  title,
  intro,
  bullets,
}: {
  title: string;
  intro: string;
  bullets: string[];
}) {
  const t = dict.en;
  return (
    <>
      <SiteHeader locale="en" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <p className="text-sm">
          <Link href="/rights" className="font-semibold text-emerald-700 hover:underline">
            ← {t.rights}
          </Link>
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-zinc-700">{intro}</p>
        <ul className="mt-6 list-inside list-disc space-y-2 rounded-2xl bg-white p-5 text-zinc-800 ring-1 ring-zinc-200">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <div className="mt-8">
          <TrustBanner message={t.legalNotice} reviewLabel={t.attorneyReviewed} />
        </div>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}
