"use client";

import { LogOut } from "lucide-react";
import { useCallback } from "react";

export function QuickExitButton({ label = "Quick Exit" }: { label?: string }) {
  const exit = useCallback(() => {
    try {
      window.history.replaceState(null, "", "/weather");
      window.location.replace("/weather");
    } catch {
      window.location.href = "/weather";
    }
  }, []);
  return (
    <button
      onClick={exit}
      aria-label={label}
      className="fixed right-4 top-4 z-50 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-lg ring-1 ring-black/10 hover:bg-black focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      <LogOut className="h-4 w-4" aria-hidden />
      {label}
    </button>
  );
}
