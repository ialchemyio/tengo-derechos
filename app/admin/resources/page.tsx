import { ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { adminListAll } from "@/lib/resources";
import {
  isAdminAuthenticated,
  isAdminConfigured,
} from "@/lib/admin-auth";
import {
  adminSaveAction,
  adminVerifyAction,
  adminDeleteAction,
  adminLogoutAction,
} from "./actions";

export const metadata = {
  title: "Resources admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const configured = isAdminConfigured();
  const authed = configured && (await isAdminAuthenticated());

  if (!configured) {
    return (
      <>
        <SiteHeader locale="en" />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
          <h1 className="text-2xl font-bold text-zinc-900">Admin disabled</h1>
          <p className="mt-2 text-zinc-700">
            Set <code>ADMIN_TOKEN</code> in your environment to enable the admin console.
          </p>
        </main>
        <SiteFooter locale="en" />
      </>
    );
  }

  if (!authed) {
    return (
      <>
        <SiteHeader locale="en" />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
          <h1 className="text-2xl font-bold text-zinc-900">Admin · Resources</h1>
          <p className="mt-2 text-zinc-700">
            Enter the admin token to continue.
          </p>
          <AdminLoginForm />
        </main>
        <SiteFooter locale="en" />
      </>
    );
  }

  const rows = await adminListAll();

  return (
    <>
      <SiteHeader locale="en" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-zinc-900">
            Admin · Resources ({rows.length})
          </h1>
          <form action={adminLogoutAction}>
            <button
              type="submit"
              className="rounded-full bg-zinc-200 px-3 py-1 text-sm font-semibold text-zinc-800 hover:bg-zinc-300"
            >
              Sign out
            </button>
          </form>
        </div>

        <p className="mt-2 text-sm text-zinc-600">
          Edit any row inline. Save publishes the change. Verify marks the row
          as attorney-reviewed and forces published=true.
        </p>

        <div className="mt-6 space-y-6">
          {rows.map((r) => (
            <details
              key={r.id}
              className="rounded-2xl bg-white p-4 ring-1 ring-zinc-200"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-2">
                <span className="font-semibold text-zinc-900">
                  {r.name}{" "}
                  <span className="text-xs text-zinc-500">({r.category})</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs">
                  {r.published ? (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-semibold text-emerald-800">
                      published
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 font-semibold text-amber-800">
                      draft
                    </span>
                  )}
                  {r.verifiedAt ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-800 ring-1 ring-emerald-200">
                      <ShieldCheck className="h-3 w-3" aria-hidden /> verified
                    </span>
                  ) : null}
                </span>
              </summary>

              <form action={adminSaveAction} className="mt-4 grid gap-3 sm:grid-cols-2">
                <input type="hidden" name="id" value={r.id} />
                <input type="hidden" name="submitted_by" value={r.submittedBy ?? ""} />
                <Field name="name" label="Name" defaultValue={r.name} required />
                <SelectField
                  name="category"
                  label="Category"
                  defaultValue={r.category}
                  options={[
                    "legal",
                    "clinic",
                    "hotline",
                    "food",
                    "shelter",
                    "consulate",
                  ]}
                />
                <Field name="city" label="City" defaultValue={r.city ?? ""} />
                <Field name="state" label="State" defaultValue={r.state ?? ""} />
                <Field name="phone" label="Phone" defaultValue={r.phone ?? ""} />
                <Field
                  name="website"
                  label="Website"
                  defaultValue={r.website ?? ""}
                />
                <Field
                  name="languages"
                  label="Languages (comma)"
                  defaultValue={r.languages.join(", ")}
                  span={2}
                />
                <SelectField
                  name="cost"
                  label="Cost"
                  defaultValue={r.cost}
                  options={["free", "sliding", "low", "varies"]}
                />
                <label className="inline-flex items-center gap-2 text-sm text-zinc-700">
                  <input
                    name="emergency"
                    type="checkbox"
                    defaultChecked={!!r.emergency}
                    className="h-4 w-4 rounded border-zinc-300"
                  />
                  emergency
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium text-zinc-700">
                    Notes (English)
                  </span>
                  <textarea
                    name="notes_en"
                    rows={2}
                    defaultValue={r.notes?.en ?? ""}
                    className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-base"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium text-zinc-700">
                    Notes (Spanish)
                  </span>
                  <textarea
                    name="notes_es"
                    rows={2}
                    defaultValue={r.notes?.es ?? ""}
                    className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-base"
                  />
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-zinc-700">
                  <input
                    name="published"
                    type="checkbox"
                    defaultChecked={!!r.published}
                    className="h-4 w-4 rounded border-zinc-300"
                  />
                  published
                </label>
                <div className="flex flex-wrap gap-2 sm:col-span-2">
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700"
                  >
                    Save
                  </button>
                </div>
              </form>

              <form action={adminVerifyAction} className="mt-3 flex items-center gap-2">
                <input type="hidden" name="id" value={r.id} />
                <input
                  name="verified_by"
                  defaultValue={r.verifiedBy ?? "admin"}
                  className="rounded-xl border border-zinc-300 px-2 py-1 text-sm"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-700 px-3 py-1 text-sm font-bold text-white hover:bg-emerald-800"
                >
                  Mark verified + publish
                </button>
              </form>

              <form action={adminDeleteAction} className="mt-3">
                <input type="hidden" name="id" value={r.id} />
                <button
                  type="submit"
                  className="rounded-xl bg-zinc-200 px-3 py-1 text-sm font-semibold text-zinc-800 hover:bg-red-100 hover:text-red-800"
                >
                  Delete
                </button>
              </form>
            </details>
          ))}
        </div>
      </main>
      <SiteFooter locale="en" />
    </>
  );
}

function Field({
  name,
  label,
  defaultValue,
  required,
  span,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  span?: 2;
}) {
  return (
    <label className={`block ${span === 2 ? "sm:col-span-2" : ""}`}>
      <span className="text-sm font-medium text-zinc-700">
        {label} {required ? <span aria-hidden>*</span> : null}
      </span>
      <input
        name={name}
        type="text"
        defaultValue={defaultValue}
        required={required}
        className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-base"
      />
    </label>
  );
}

function SelectField({
  name,
  label,
  defaultValue,
  options,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-700">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-base"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
