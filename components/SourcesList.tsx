import { ExternalLink, BookOpen } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { dict } from "@/lib/i18n";
import type { SourceLink } from "@/lib/content";

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function SourcesList({
  locale,
  sources,
}: {
  locale: Locale;
  sources?: SourceLink[];
}) {
  if (!sources || sources.length === 0) return null;
  const t = dict[locale];
  return (
    <section
      aria-label={t.sourcesTitle}
      className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200"
    >
      <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-zinc-700">
        <BookOpen className="h-4 w-4" aria-hidden />
        {t.sourcesTitle}
      </h2>
      <ul className="mt-3 space-y-2 text-sm">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-emerald-700 hover:underline"
            >
              {s.label}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
            <span className="ml-2 text-xs text-zinc-500">
              {t.sourceDomain}: {hostnameOf(s.url)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
