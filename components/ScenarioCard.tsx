import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";

export function ScenarioCard({
  href,
  title,
  description,
  icon: Icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200 transition hover:ring-zinc-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-soft)] text-[var(--brand-deep)]">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1 text-base font-semibold text-zinc-900">
          {title}
          <ChevronRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" aria-hidden />
        </div>
        <p className="mt-1 text-sm text-zinc-600">{description}</p>
      </div>
    </Link>
  );
}
