import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DonationCard } from "@/components/DonationCard";
import { TrustBanner } from "@/components/TrustBanner";

export const metadata = {
  title: "Donate",
  description: "Support bilingual emergency rights and resource information.",
};

export default function Page() {
  return (
    <>
      <SiteHeader locale="en" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          Support Tengo Derechos
        </h1>
        <p className="mt-2 text-zinc-700">
          Your gift funds bilingual emergency guides, printed rights cards, and
          community outreach for immigrant families.
        </p>

        <div className="mt-6">
          <DonationCard locale="en" />
        </div>

        <section className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
          <h2 className="text-lg font-bold text-zinc-900">Where money goes</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-700">
            <li>• Translation and attorney review of guides.</li>
            <li>• Printing and distributing emergency rights cards.</li>
            <li>• Community education workshops.</li>
            <li>• Hosting and accessibility improvements.</li>
          </ul>
        </section>

        <div className="mt-8">
          <TrustBanner
            message="Tengo Derechos is preparing nonprofit (501(c)(3)) status. Until determination is confirmed, donations may not be tax-deductible. We will update this page when status is final."
            reviewLabel="Nonprofit & finance review pending"
          />
        </div>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}
