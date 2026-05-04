import Link from "next/link";
import { type LucideIcon, Headphones, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "red" | "amber" | "teal" | "indigo" | "emerald" | "neutral";

const toneClasses: Record<Tone, string> = {
  red: "bg-gradient-to-br from-[#fdecea] via-white to-[#fbe7e2] text-[var(--danger-deep)] ring-[var(--danger)]/15 hover:ring-[var(--danger)]/45",
  amber:
    "bg-gradient-to-br from-[#fbeed0] via-white to-[#f7e7c0] text-[#7a5314] ring-[var(--gold)]/20 hover:ring-[var(--gold)]/55",
  teal: "bg-gradient-to-br from-[#e8eef7] via-white to-[#d1dbef] text-[var(--accent)] ring-[var(--accent)]/20 hover:ring-[var(--accent)]/55",
  indigo:
    "bg-gradient-to-br from-[#dde4f3] via-white to-[#c9d3ea] text-[var(--accent)] ring-[var(--accent)]/20 hover:ring-[var(--accent)]/55",
  emerald:
    "bg-gradient-to-br from-[var(--brand-soft)] via-white to-[#f3d6b5] text-[var(--brand-deep)] ring-[var(--brand)]/25 hover:ring-[var(--brand)]/55",
  neutral:
    "bg-gradient-to-br from-[#f0ece1] via-white to-[#e6dfd0] text-zinc-800 ring-[var(--hairline)] hover:ring-zinc-400",
};

const iconBgFor: Record<Tone, string> = {
  red: "bg-[var(--danger)] text-white",
  amber: "bg-[var(--gold)] text-white",
  teal: "bg-[var(--accent)] text-white",
  indigo: "bg-[var(--accent)] text-white",
  emerald: "bg-[var(--brand)] text-white",
  neutral: "bg-zinc-700 text-white",
};

export function EmergencyButton({
  href,
  title,
  subtitle,
  icon: Icon,
  tone = "red",
  hasAudio,
  audioLabel,
}: {
  href: string;
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  tone?: Tone;
  hasAudio?: boolean;
  audioLabel?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex min-h-[8.5rem] flex-col justify-between overflow-hidden rounded-2xl p-5 shadow-sm ring-1 transition-all duration-200 will-change-transform hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4",
        toneClasses[tone]
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-xl shadow-sm transition group-hover:scale-105",
            iconBgFor[tone]
          )}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        {hasAudio ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-[var(--brand-deep)] ring-1 ring-[var(--brand)]/30 backdrop-blur">
            <Headphones className="h-3 w-3" aria-hidden />
            {audioLabel ?? "Audio"}
          </span>
        ) : null}
      </div>
      <div>
        <div className="font-display text-lg font-bold leading-tight">
          {title}
        </div>
        {subtitle ? (
          <div className="mt-0.5 flex items-center gap-1 text-sm opacity-80">
            {subtitle}
            <ChevronRight
              className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
              aria-hidden
            />
          </div>
        ) : null}
      </div>
    </Link>
  );
}
