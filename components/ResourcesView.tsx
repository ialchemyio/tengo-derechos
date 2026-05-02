"use client";

import { useMemo, useState } from "react";
import { ResourceCard } from "./ResourceCard";
import { resources, categoryLabels, type ResourceCategory } from "@/lib/resources";
import type { Locale } from "@/lib/i18n";

const CATS: ResourceCategory[] = [
  "legal",
  "clinic",
  "hotline",
  "food",
  "shelter",
  "consulate",
];

export function ResourcesView({ locale }: { locale: Locale }) {
  const [category, setCategory] = useState<ResourceCategory | "all">("all");
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [language, setLanguage] = useState<string>("any");
  const [city, setCity] = useState<string>("");

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (category !== "all" && r.category !== category) return false;
      if (emergencyOnly && !r.emergency) return false;
      if (language !== "any" && !r.languages.includes(language)) return false;
      if (city && !`${r.city ?? ""} ${r.state ?? ""}`.toLowerCase().includes(city.toLowerCase()))
        return false;
      return true;
    });
  }, [category, emergencyOnly, language, city]);

  return (
    <div>
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-zinc-700">
              {locale === "es" ? "Categoría" : "Category"}
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ResourceCategory | "all")}
              className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-base"
            >
              <option value="all">{locale === "es" ? "Todas" : "All"}</option>
              {CATS.map((c) => (
                <option key={c} value={c}>
                  {categoryLabels[c][locale]}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-zinc-700">
              {locale === "es" ? "Idioma" : "Language"}
            </span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-base"
            >
              <option value="any">{locale === "es" ? "Cualquiera" : "Any"}</option>
              <option value="Español">Español</option>
              <option value="English">English</option>
            </select>
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-zinc-700">
              {locale === "es" ? "Ciudad o estado" : "City or state"}
            </span>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={locale === "es" ? "ej. Los Angeles, CA" : "e.g. Los Angeles, CA"}
              className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-base"
            />
          </label>
        </div>

        <label className="mt-3 inline-flex items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={emergencyOnly}
            onChange={(e) => setEmergencyOnly(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300"
          />
          {locale === "es" ? "Solo emergencia" : "Emergency only"}
        </label>
      </div>

      <p className="mt-4 text-sm text-zinc-600">
        {filtered.length} {locale === "es" ? "resultados" : "results"}
      </p>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {filtered.map((r) => (
          <ResourceCard key={r.id} resource={r} locale={locale} />
        ))}
      </div>
    </div>
  );
}
