"use client";

import { useActionState, useEffect, useState } from "react";
import { Loader2, CloudOff } from "lucide-react";
import {
  submitResourceAction,
  type SubmitState,
} from "@/app/resources/submit/actions";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { dict, type Locale } from "@/lib/i18n";

const initial: SubmitState = { ok: false, message: "" };

export function SubmitResourceView({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const [state, formAction, pending] = useActionState(
    submitResourceAction,
    initial
  );
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    if (!navigator.onLine) off();
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          {t.submitResource}
        </h1>
        <p className="mt-2 text-zinc-700">{t.submitResourceIntro}</p>

        {!online ? (
          <div className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            <CloudOff className="mt-0.5 h-4 w-4" aria-hidden />
            {t.offlineSubmitWarning}
          </div>
        ) : null}

        {state.ok ? (
          <div className="mt-6 rounded-2xl border border-[var(--brand)]/25 bg-[var(--brand-soft)] p-4 text-[var(--brand-deep)]">
            <p className="font-semibold">{t.submitSent}</p>
          </div>
        ) : null}

        <form action={formAction} className="mt-6 space-y-4">
          <fieldset className="grid gap-3 sm:grid-cols-2" disabled={pending}>
            <Field name="submitter_name" label={t.submitYourName} />
            <Field name="submitter_email" label={t.submitYourEmail} type="email" />
            <Field
              name="name"
              label={t.submitOrgName}
              required
              span={2}
            />
            <SelectField
              name="category"
              label={t.submitCategory}
              options={[
                ["legal", "legal"],
                ["clinic", "clinic"],
                ["hotline", "hotline"],
                ["food", "food"],
                ["shelter", "shelter"],
                ["consulate", "consulate"],
              ]}
            />
            <SelectField
              name="cost"
              label={t.submitCost}
              options={[
                ["free", "free"],
                ["sliding", "sliding"],
                ["low", "low"],
                ["varies", "varies"],
              ]}
            />
            <Field name="city" label={t.submitCity} />
            <Field name="state" label={t.submitState} />
            <Field name="phone" label={t.submitPhone} />
            <Field name="website" label={t.submitWebsite} type="url" />
            <Field
              name="languages"
              label={t.submitLanguages}
              placeholder="English, Español"
              span={2}
            />
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-zinc-700">
                {t.submitNotesEn}
              </span>
              <textarea
                name="notes_en"
                rows={3}
                className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-base"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-zinc-700">
                {t.submitNotesEs}
              </span>
              <textarea
                name="notes_es"
                rows={3}
                className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-base"
              />
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-zinc-700 sm:col-span-2">
              <input
                name="emergency"
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-300"
              />
              {t.submitEmergency}
            </label>
          </fieldset>

          <button
            type="submit"
            disabled={pending || !online}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-4 py-3 text-base font-bold text-white shadow-sm hover:bg-[var(--brand-deep)] disabled:opacity-70"
          >
            {pending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                …
              </>
            ) : (
              t.submitButton
            )}
          </button>

          {state.message && !state.ok ? (
            <p className="text-sm text-red-700" role="status">
              {state.message === "submitted" ? t.submitSent : t.submitFailed}
            </p>
          ) : null}
        </form>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  span,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  span?: 2;
  placeholder?: string;
}) {
  return (
    <label className={`block ${span === 2 ? "sm:col-span-2" : ""}`}>
      <span className="text-sm font-medium text-zinc-700">
        {label} {required ? <span aria-hidden>*</span> : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-base"
      />
    </label>
  );
}

function SelectField({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: [string, string][];
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-700">{label}</span>
      <select
        name={name}
        className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-base"
        defaultValue={options[0][0]}
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}
