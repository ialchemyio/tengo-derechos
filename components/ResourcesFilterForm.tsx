"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import { categoryLabels, type ResourceCategory } from "@/lib/resources";
import { dict, type Locale } from "@/lib/i18n";

const CATS: ResourceCategory[] = [
  "legal",
  "clinic",
  "hotline",
  "food",
  "shelter",
  "consulate",
];

export function ResourcesFilterForm({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [pending, startTransition] = useTransition();

  function update(key: string, value: string) {
    const next = new URLSearchParams(sp?.toString() ?? "");
    if (value && value !== "all" && value !== "any" && value !== "") {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    startTransition(() => {
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    });
  }

  function toggle(key: string, checked: boolean) {
    const next = new URLSearchParams(sp?.toString() ?? "");
    if (checked) next.set(key, "1");
    else next.delete(key);
    startTransition(() => {
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    });
  }

  const category = sp?.get("category") ?? "all";
  const language = sp?.get("language") ?? "any";
  const city = sp?.get("city") ?? "";
  const emergency = sp?.get("emergency") === "1";

  return (
    <div
      className={`rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200 ${
        pending ? "opacity-80" : ""
      }`}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-zinc-700">
            {t.filterCategory}
          </span>
          <select
            value={category}
            onChange={(e) => update("category", e.target.value)}
            className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-base"
          >
            <option value="all">{t.all}</option>
            {CATS.map((c) => (
              <option key={c} value={c}>
                {categoryLabels[c][locale]}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-zinc-700">
            {t.filterLanguage}
          </span>
          <select
            value={language}
            onChange={(e) => update("language", e.target.value)}
            className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-base"
          >
            <option value="any">{t.any}</option>
            <option value="Español">Español</option>
            <option value="English">English</option>
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-zinc-700">
            {t.filterCityState}
          </span>
          <input
            type="text"
            defaultValue={city}
            onBlur={(e) => update("city", e.target.value)}
            placeholder={t.cityPlaceholder}
            className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-base"
          />
        </label>
      </div>

      <label className="mt-3 inline-flex items-center gap-2 text-sm text-zinc-700">
        <input
          type="checkbox"
          checked={emergency}
          onChange={(e) => toggle("emergency", e.target.checked)}
          className="h-4 w-4 rounded border-zinc-300"
        />
        {t.emergencyOnly}
      </label>
    </div>
  );
}
