import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = { title: "Disclaimer" };

export default function Page() {
  return (
    <>
      <SiteHeader locale="en" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          Legal disclaimer
        </h1>
        <div className="mt-4 space-y-4 text-zinc-800">
          <p>
            <strong>This site does not provide legal advice.</strong> The
            information on TengoDerechos.org is educational only. It is not a
            substitute for legal, medical, or professional advice from a
            licensed attorney or qualified professional.
          </p>
          <p>
            Laws and procedures change and vary by state, county, and city. The
            content on this site may not reflect the most current laws in your
            jurisdiction.
          </p>
          <p>
            <strong>No attorney-client relationship</strong> is created by
            using this website, sending us a message, or reading any content.
          </p>
          <p>
            We do our best to keep information accurate and reviewed, but we
            make no guarantees, and we are not responsible for outcomes that
            result from using this site.
          </p>
          <p>
            For urgent situations, contact a qualified attorney or call your
            local legal aid hotline. In a life-threatening emergency, call 911.
          </p>
          <p className="text-sm text-zinc-600">
            By using this site, you acknowledge that you have read and accept
            this disclaimer.
          </p>
        </div>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}
