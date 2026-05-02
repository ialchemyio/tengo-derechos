import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Content guide",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <SiteHeader locale="en" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 prose prose-zinc">
        <h1>Internal content management guide</h1>
        <p>
          This page is for staff and partner attorneys who maintain the site.
        </p>

        <h2>Where content lives</h2>
        <ul>
          <li>
            <code>lib/content.ts</code> — emergency guides (ICE, police, border
            patrol, medical). Each guide has bilingual <code>title</code>,{" "}
            <code>intro</code>, and <code>steps</code> with optional{" "}
            <code>say</code> and <code>doNot</code> blocks.
          </li>
          <li>
            <code>lib/resources.ts</code> — directory of legal aid, clinics,
            hotlines, food, shelter, consulates.
          </li>
          <li>
            <code>app/rights/[topic]/page.tsx</code> — Know-Your-Rights topic
            pages (police, immigration, workplace, housing, medical).
          </li>
          <li>
            <code>lib/i18n.ts</code> — UI strings in English and Spanish.
          </li>
        </ul>

        <h2>How to update translations</h2>
        <p>
          Each piece of legal/medical content is keyed by <code>en</code> and{" "}
          <code>es</code>. Always update both. If a Spanish string is missing,
          the UI falls back to English.
        </p>

        <h2>Marking pages as attorney-reviewed</h2>
        <p>
          Each guide in <code>lib/content.ts</code> has a{" "}
          <code>reviewed: boolean</code> flag. Set to <code>true</code> only
          after a licensed attorney has reviewed both languages and signed off
          (record name, bar number, and date in the commit).
        </p>

        <h2>Adding source links</h2>
        <p>
          Use plain prose links in the body of guides. Prefer:
        </p>
        <ul>
          <li>Federal government (.gov) sources for procedural facts.</li>
          <li>National advocacy orgs (ACLU, ILRC, NILC) for know-your-rights framing.</li>
          <li>State legal-aid orgs for state-specific guidance.</li>
        </ul>

        <h2>Recommended review cycle</h2>
        <ul>
          <li>Monthly internal review.</li>
          <li>Quarterly attorney review.</li>
          <li>Immediate review when laws change (executive orders, federal rules, state statutes).</li>
        </ul>

        <h2>Voice & tone</h2>
        <ul>
          <li>Calm, protective, clear, compassionate.</li>
          <li>Never claim guarantees. Use “may”, “in many situations”, “generally”.</li>
          <li>Short sentences. Reading level around 6th–8th grade.</li>
          <li>No political framing.</li>
        </ul>

        <h2>Disclaimer requirements</h2>
        <p>
          Every page with legal or medical information must show the{" "}
          <code>TrustBanner</code> component with the educational-not-legal
          notice and a link to <a href="/disclaimer">/disclaimer</a>.
        </p>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}
