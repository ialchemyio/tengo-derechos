import Link from "next/link";
import { type LucideIcon, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "red" | "amber" | "teal" | "indigo" | "emerald" | "neutral";

const toneClasses: Record<Tone, string> = {
  red: "from-red-50 to-red-100 ring-red-200 hover:ring-red-400 text-red-900",
  amber: "from-amber-50 to-amber-100 ring-amber-200 hover:ring-amber-400 text-amber-900",
  teal: "from-teal-50 to-teal-100 ring-teal-200 hover:ring-teal-400 text-teal-900",
  indigo: "from-indigo-50 to-indigo-100 ring-indigo-200 hover:ring-indigo-400 text-indigo-900",
  emerald: "from-emerald-50 to-emerald-100 ring-emerald-200 hover:ring-emerald-400 text-emerald-900",
  neutral: "from-zinc-50 to-zinc-100 ring-zinc-200 hover:ring-zinc-400 text-zinc-900",
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
        "group relative flex min-h-[7.5rem] flex-col justify-between rounded-2xl bg-gradient-to-br p-5 shadow-sm ring-1 transition focus:outline-none focus:ring-4",
        toneClasses[tone]
      )}
    >
      <div className="flex items-start justify-between">
        <Icon className="h-8 w-8 opacity-90 transition group-hover:scale-110" aria-hidden />
        {hasAudio ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 ring-1 ring-emerald-200">
            <Headphones className="h-3 w-3" aria-hidden />
            {audioLabel ?? "Audio"}
          </span>
        ) : null}
      </div>
      <div>
        <div className="text-lg font-bold leading-tight">{title}</div>
        {subtitle ? (
          <div className="mt-0.5 text-sm opacity-80">{subtitle}</div>
        ) : null}
      </div>
    </Link>
  );
}
