import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TrustBanner } from "@/components/TrustBanner";
import { dict } from "@/lib/i18n";

export const metadata = { title: "Know Your Rights" };

const topics = [
  { slug: "police", title: "Police", desc: "Stops, searches, arrest basics." },
  { slug: "immigration", title: "Immigration", desc: "ICE, warrants, detention basics." },
  { slug: "workplace", title: "Workplace", desc: "Wages, retaliation, safety basics." },
  { slug: "housing", title: "Housing", desc: "Eviction, repairs, discrimination." },
  { slug: "medical", title: "Medical", desc: "Emergency care, charity care basics." },
];

export default function Page() {
  const t = dict.en;
  return (
    <>
      <SiteHeader locale="en" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          {t.rights}
        </h1>
        <p className="mt-2 text-zinc-700">
          A starter library. Each topic links to a page with simple, conservative
          guidance. Content is awaiting attorney review.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {topics.map((topic) => (
            <li key={topic.slug}>
              <Link
                href={`/rights/${topic.slug}`}
                className="block rounded-2xl bg-white p-5 ring-1 ring-zinc-200 hover:ring-zinc-400"
              >
                <div className="text-lg font-bold text-zinc-900">{topic.title}</div>
                <p className="mt-1 text-sm text-zinc-600">{topic.desc}</p>
              </Link>
            </li>
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
