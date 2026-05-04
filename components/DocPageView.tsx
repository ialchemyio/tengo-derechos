import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { dict, type Locale } from "@/lib/i18n";

export type DocSection = {
  h: string;
  body: (string | { kind: "list"; items: string[] } | { kind: "code"; text: string })[];
};

export function DocPageView({
  locale,
  title,
  intro,
  sections,
  meta,
  cta,
}: {
  locale: Locale;
  title: string;
  intro?: string;
  sections: DocSection[];
  meta?: { label: string; value: string }[];
  cta?: { label: string; href: string }[];
}) {
  const t = dict[locale];
  const home = locale === "es" ? "/es" : "/";
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <p className="text-sm">
          <Link
            href={home}
            className="font-semibold text-[var(--brand-deep)] hover:underline"
          >
            ← {t.home}
          </Link>
        </p>
        <h1 className="font-display mt-2 text-3xl font-extrabold leading-tight text-zinc-900 sm:text-5xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-3 max-w-2xl text-lg text-zinc-700">{intro}</p>
        ) : null}

        {meta && meta.length > 0 ? (
          <dl className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-white p-4 text-sm ring-1 ring-[var(--hairline)] sm:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  {m.label}
                </dt>
                <dd className="mt-0.5 font-semibold text-zinc-900">{m.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-8 space-y-7">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-2xl font-bold text-zinc-900">
                {s.h}
              </h2>
              <div className="mt-3 space-y-3 text-zinc-800">
                {s.body.map((b, i) => {
                  if (typeof b === "string")
                    return (
                      <p key={i} className="leading-relaxed">
                        {b}
                      </p>
                    );
                  if (b.kind === "list")
                    return (
                      <ul
                        key={i}
                        className="list-inside list-disc space-y-1.5 rounded-2xl bg-white p-5 ring-1 ring-[var(--hairline)]"
                      >
                        {b.items.map((it, j) => (
                          <li key={j}>{it}</li>
                        ))}
                      </ul>
                    );
                  if (b.kind === "code")
                    return (
                      <pre
                        key={i}
                        className="overflow-auto rounded-xl bg-[var(--accent)] px-4 py-3 text-xs text-white"
                      >
                        <code>{b.text}</code>
                      </pre>
                    );
                  return null;
                })}
              </div>
            </section>
          ))}
        </div>

        {cta && cta.length > 0 ? (
          <div className="mt-10 flex flex-wrap gap-2">
            {cta.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="inline-flex items-center gap-1.5 rounded-2xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent)]/90"
              >
                {c.label}
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Link>
            ))}
          </div>
        ) : null}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
