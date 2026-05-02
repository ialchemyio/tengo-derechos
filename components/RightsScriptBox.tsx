import { Quote } from "lucide-react";
import { AudioButton } from "./AudioButton";

export function RightsScriptBox({
  title,
  phrase,
  listenLabel,
}: {
  title: string;
  phrase: string;
  listenLabel?: string;
}) {
  return (
    <div className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
          <Quote className="h-4 w-4" aria-hidden />
          {title}
        </div>
        <AudioButton label={listenLabel ?? "Listen"} />
      </div>
      <p className="mt-2 text-base font-medium text-emerald-950">“{phrase}”</p>
    </div>
  );
}
