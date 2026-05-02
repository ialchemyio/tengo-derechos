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
      className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/70 px-3 py-1.5 text-sm font-medium text-zinc-800 backdrop-blur hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
      aria-label={isEs ? "Switch to English" : "Cambiar a Español"}
    >
      <Languages className="h-4 w-4" aria-hidden />
      {isEs ? "English" : "Español"}
    </Link>
  );
}
