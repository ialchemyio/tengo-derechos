import Link from "next/link";
import { WifiOff, ArrowRight } from "lucide-react";
import { dict, type Locale } from "@/lib/i18n";

export function OfflineNotice({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const href = locale === "es" ? "/es/about/offline" : "/about/offline";
  const learnMore =
    locale === "es" ? "Cómo funciona sin conexión" : "How offline works";
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
      <WifiOff className="mt-0.5 h-5 w-5 shrink-0 text-zinc-500" aria-hidden />
      <div className="flex-1">
        <p>{t.offlineNotice}</p>
        <Link
          href={href}
          className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-deep)] hover:underline"
        >
          {learnMore}
          <ArrowRight className="h-3 w-3" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
