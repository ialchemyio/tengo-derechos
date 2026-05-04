import { Phone, Globe, MapPin, ShieldCheck, Clock } from "lucide-react";
import type { Resource } from "@/lib/resources";
import type { Locale } from "@/lib/i18n";
import { dict } from "@/lib/i18n";
import { categoryLabels } from "@/lib/resources";

export function ResourceCard({
  resource,
  locale,
}: {
  resource: Resource;
  locale: Locale;
}) {
  const t = dict[locale];
  const isVerified = !!resource.verifiedAt;
  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-zinc-900">
            {resource.name}
          </h3>
          <p className="text-xs uppercase tracking-wide text-[var(--brand-deep)]">
            {categoryLabels[resource.category][locale]}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          {resource.emergency ? (
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800">
              {locale === "es" ? "Emergencia" : "Emergency"}
            </span>
          ) : null}
          {isVerified ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--brand-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--brand-deep)] ring-1 ring-[var(--brand)]/25">
              <ShieldCheck className="h-3 w-3" aria-hidden />
              {t.verifiedBadge}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800 ring-1 ring-amber-200">
              <Clock className="h-3 w-3" aria-hidden />
              {t.pendingBadge}
            </span>
          )}
        </div>
      </div>

      {resource.notes ? (
        <p className="mt-2 text-sm text-zinc-700">{resource.notes[locale]}</p>
      ) : null}

      <dl className="mt-3 space-y-1 text-sm text-zinc-700">
        {resource.city || resource.state ? (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-zinc-500" aria-hidden />
            <span>
              {[resource.city, resource.state].filter(Boolean).join(", ")}
            </span>
          </div>
        ) : null}
        {resource.phone ? (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-zinc-500" aria-hidden />
            <a
              href={`tel:${resource.phone.replace(/[^\d+]/g, "")}`}
              className="font-medium text-[var(--brand-deep)] underline-offset-2 hover:underline"
            >
              {resource.phone}
            </a>
          </div>
        ) : null}
        {resource.website ? (
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-zinc-500" aria-hidden />
            <a
              href={resource.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--brand-deep)] underline-offset-2 hover:underline"
            >
              {new URL(resource.website).hostname.replace(/^www\./, "")}
            </a>
          </div>
        ) : null}
      </dl>

      <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
        {resource.languages.map((l) => (
          <span
            key={l}
            className="rounded-full bg-zinc-100 px-2 py-0.5 text-zinc-700"
          >
            {l}
          </span>
        ))}
        <span className="rounded-full bg-[var(--brand-soft)] px-2 py-0.5 text-[var(--brand-deep)]">
          {resource.cost}
        </span>
      </div>
    </article>
  );
}
