import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TrustBanner } from "@/components/TrustBanner";
import { dict } from "@/lib/i18n";

export const metadata = { title: "Find a lawyer" };

const placeholders = [
  {
    name: "Local Legal Aid (placeholder)",
    desc: "Free or low-cost legal services for qualifying families.",
    url: "https://www.lsc.gov/about-lsc/what-legal-aid/get-legal-help",
  },
  {
    name: "AILA Lawyer Referral (placeholder)",
    desc: "American Immigration Lawyers Association directory.",
    url: "https://www.ailalawyer.com/",
  },
  {
    name: "Catholic Legal Immigration Network (placeholder)",
    desc: "CLINIC affiliate directory of nonprofit immigration legal services.",
    url: "https://cliniclegal.org/",
  },
];

export default function Page() {
  const t = dict.en;
  return (
    <>
      <SiteHeader locale="en" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          {t.findLawyer}
        </h1>
        <p className="mt-2 text-zinc-700">
          A growing list of lawyer-referral starting points. We do not endorse
          specific attorneys — verify credentials before hiring.
        </p>
        <ul className="mt-6 space-y-3">
          {placeholders.map((p) => (
            <li
              key={p.name}
              className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200"
            >
              <div className="text-lg font-bold text-zinc-900">{p.name}</div>
              <p className="mt-1 text-sm text-zinc-600">{p.desc}</p>
              <Link
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-emerald-700 hover:underline"
              >
                Visit →
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <TrustBanner
            message="This list is for informational purposes only and does not constitute a referral or endorsement."
            reviewLabel={t.attorneyReviewed}
          />
        </div>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}
