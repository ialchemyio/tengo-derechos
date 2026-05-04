"use client";

import { useActionState } from "react";
import { adminLoginAction, type AdminLoginState } from "@/app/admin/resources/actions";

const initial: AdminLoginState = { error: null };

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(adminLoginAction, initial);
  return (
    <form action={action} className="mt-6 max-w-sm space-y-3">
      <label className="block">
        <span className="text-sm font-medium text-zinc-700">Admin token</span>
        <input
          name="token"
          type="password"
          required
          autoFocus
          className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 text-base"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-[var(--brand)] px-4 py-2 font-bold text-white hover:bg-[var(--brand-deep)] disabled:opacity-70"
      >
        {pending ? "…" : "Sign in"}
      </button>
      {state.error ? (
        <p className="text-sm text-red-700">{state.error}</p>
      ) : null}
    </form>
  );
}
