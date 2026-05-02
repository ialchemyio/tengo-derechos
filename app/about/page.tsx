import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = { title: "About" };

export default function Page() {
  return (
    <>
      <SiteHeader locale="en" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          About Tengo Derechos
        </h1>
        <div className="mt-4 space-y-4 text-zinc-800">
          <p>
            Tengo Derechos is a bilingual, mobile-first emergency rights and
            resource hub for Mexican / Latino immigrant families in the United
            States.
          </p>
          <p>
            Our mission: help families stay calm, know their basic options, and
            connect with trusted local help during stressful situations. We
            focus on clarity, compassion, and accessibility — not politics.
          </p>
          <p>
            <strong>Core promise: </strong> Tus derechos. Tu familia. Tu protección.
          </p>
          <p>
            All legal content is reviewed (or queued for review) by qualified
            attorneys and nonprofit partners. We do not provide legal advice.
            Laws vary by state — please consult a qualified attorney for help
            with your specific situation.
          </p>
        </div>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}
