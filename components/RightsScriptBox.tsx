import { Quote } from "lucide-react";
import { AudioButton } from "./AudioButton";
import type { Locale } from "@/lib/i18n";
import type { AudioClip } from "@/lib/audio";

export function RightsScriptBox({
  title,
  phrase,
  listenLabel,
  clip,
  locale,
}: {
  title: string;
  phrase: string;
  listenLabel?: string;
  clip?: AudioClip | null;
  locale?: Locale;
}) {
  return (
    <div className="rounded-2xl border-l-4 border-[var(--brand)] bg-[var(--brand-soft)] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--brand-deep)]">
          <Quote className="h-4 w-4" aria-hidden />
          {title}
        </div>
        {clip ? (
          <AudioButton
            src={clip.url}
            durationMs={clip.durationMs}
            transcript={clip.transcript}
            label={listenLabel ?? "Listen"}
            locale={locale}
          />
        ) : null}
      </div>
      <p className="mt-2 text-base font-medium text-[var(--brand-deep)]">“{phrase}”</p>
    </div>
  );
}
