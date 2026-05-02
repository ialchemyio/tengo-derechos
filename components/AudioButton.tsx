"use client";

import { Volume2 } from "lucide-react";

export function AudioButton({ label = "Listen" }: { label?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title="Audio coming soon"
      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 ring-1 ring-emerald-200 hover:bg-emerald-100"
    >
      <Volume2 className="h-3.5 w-3.5" aria-hidden />
      {label}
    </button>
  );
}
