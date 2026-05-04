"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const pathname = usePathname() || "/";
  const isEs = pathname === "/es" || pathname.startsWith("/es/");
  const target = isEs
    ? pathname.replace(/^\/es(\/|$)/, "/")
    : pathname === "/"
      ? "/es"
      : `/es${pathname}`;
  return (
    <Link
      href={target}
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline)] bg-white/70 px-3 py-1.5 text-sm font-medium text-[var(--accent)] backdrop-blur transition hover:bg-white hover:border-[var(--accent)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
      aria-label={isEs ? "Switch to English" : "Cambiar a Español"}
    >
      <Languages className="h-4 w-4" aria-hidden />
      {isEs ? "English" : "Español"}
    </Link>
  );
}
