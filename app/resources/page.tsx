import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ResourcesView } from "@/components/ResourcesView";
import { TrustBanner } from "@/components/TrustBanner";
import { dict } from "@/lib/i18n";

export const metadata = {
  title: "Community resources",
  description: "Find legal aid, clinics, hotlines, and more.",
};

export default function Page() {
  const t = dict.en;
  return (
    <>
      <SiteHeader locale="en" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          {t.resources}
        </h1>
        <p className="mt-2 text-zinc-700">
          A starter directory. Each resource is independently operated.
        </p>
        <div className="mt-6">
          <ResourcesView locale="en" />
        </div>
        <div className="mt-8">
          <TrustBanner message={t.legalNotice} reviewLabel={t.attorneyReviewed} />
        </div>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}
