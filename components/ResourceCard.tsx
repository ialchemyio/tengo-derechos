import { Phone, Globe, MapPin } from "lucide-react";
import type { Resource } from "@/lib/resources";
import type { Locale } from "@/lib/i18n";
import { categoryLabels } from "@/lib/resources";

export function ResourceCard({
  resource,
  locale,
}: {
  resource: Resource;
  locale: Locale;
}) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-zinc-900">
            {resource.name}
          </h3>
          <p className="text-xs uppercase tracking-wide text-emerald-700">
            {categoryLabels[resource.category][locale]}
          </p>
        </div>
        {resource.emergency ? (
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800">
            {locale === "es" ? "Emergencia" : "Emergency"}
          </span>
        ) : null}
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
              className="font-medium text-emerald-700 underline-offset-2 hover:underline"
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
              className="font-medium text-emerald-700 underline-offset-2 hover:underline"
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
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-800">
          {resource.cost}
        </span>
      </div>
    </article>
  );
}
