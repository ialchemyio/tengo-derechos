"use client";

import { LogOut } from "lucide-react";
import { useCallback } from "react";

// Quick Exit redirects to Google instead of a local /weather page so the
// browser URL bar shows zero trace of tengoderechos.org. Standard pattern
// from ACLU, RAINN, Planned Parenthood. We replace history so the back
// button cannot return to whatever rights guide the user was reading.
const EXIT_DESTINATION = "https://www.google.com/";

export function QuickExitButton({ label = "Quick Exit" }: { label?: string }) {
  const exit = useCallback(() => {
    try {
      // Replace current history entry, then trigger a fresh navigation.
      window.history.replaceState(null, "", EXIT_DESTINATION);
    } catch {
      // ignore — replace() below still does the right thing.
    }
    try {
      window.location.replace(EXIT_DESTINATION);
    } catch {
      window.location.href = EXIT_DESTINATION;
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
