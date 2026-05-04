"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type Props = {
  src?: string | null;
  durationMs?: number;
  transcript?: string;
  label?: string;
  locale?: Locale;
};

export function AudioButton({
  src,
  durationMs,
  transcript,
  label = "Listen",
  locale = "en",
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return () => {
      const a = audioRef.current;
      if (a) {
        a.pause();
        a.removeAttribute("src");
        a.load();
      }
    };
  }, []);

  if (!src) return null;

  function toggle() {
    let a = audioRef.current;
    if (!a) {
      a = new Audio(src!);
      a.preload = "metadata";
      a.addEventListener("ended", () => {
        setPlaying(false);
        setProgress(1);
      });
      a.addEventListener("timeupdate", () => {
        if (a!.duration > 0) setProgress(a!.currentTime / a!.duration);
      });
      audioRef.current = a;
    }
    if (a.paused) {
      // Stop any other Tengo Derechos audio buttons that might be playing.
      a.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      a.pause();
      setPlaying(false);
    }
  }

  const ariaLabel =
    locale === "es"
      ? playing
        ? "Pausar audio"
        : "Reproducir audio"
      : playing
        ? "Pause audio"
        : "Play audio";

  const transcriptLabel =
    locale === "es" ? "Ver texto" : "Show transcript";

  return (
    <span className="inline-flex flex-col gap-1">
      <button
        type="button"
        onClick={toggle}
        aria-label={ariaLabel}
        aria-pressed={playing}
        className="inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-soft)] px-3 py-1 text-xs font-medium text-[var(--brand-deep)] ring-1 ring-[var(--brand)]/25 hover:bg-[var(--brand-soft)]"
      >
        {playing ? (
          <Pause className="h-3.5 w-3.5" aria-hidden />
        ) : (
          <Play className="h-3.5 w-3.5" aria-hidden />
        )}
        <span>{label}</span>
        {durationMs ? (
          <span className="text-[10px] text-[var(--brand-deep)]">
            {(durationMs / 1000).toFixed(1)}s
          </span>
        ) : null}
      </button>
      {playing ? (
        <span
          aria-hidden
          className="block h-0.5 w-full overflow-hidden rounded bg-[var(--brand-soft)]"
        >
          <span
            className="block h-full bg-[var(--brand)] transition-all"
            style={{ width: `${Math.min(100, progress * 100)}%` }}
          />
        </span>
      ) : null}
      <span className="sr-only" aria-live="polite">
        {playing ? (locale === "es" ? "Reproduciendo" : "Playing") : ""}
      </span>
      {transcript ? (
        <details className="text-[11px] text-zinc-500">
          <summary className="cursor-pointer hover:text-zinc-700">
            {transcriptLabel}
          </summary>
          <p className="mt-1 italic">{transcript}</p>
        </details>
      ) : null}
    </span>
  );
}
