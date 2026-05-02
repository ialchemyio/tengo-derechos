"use client";

import { Printer } from "lucide-react";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 font-semibold text-zinc-900 ring-1 ring-zinc-300 hover:bg-zinc-50 no-print"
    >
      <Printer className="h-5 w-5" aria-hidden />
      {label}
    </button>
  );
}
