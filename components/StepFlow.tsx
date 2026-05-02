import { AlertTriangle, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { pick, type Step } from "@/lib/content";
import { RightsScriptBox } from "./RightsScriptBox";

export function StepFlow({
  steps,
  locale,
  labels,
}: {
  steps: Step[];
  locale: Locale;
  labels: { say: string; doNot: string; listen: string };
}) {
  return (
    <ol className="space-y-4">
      {steps.map((step, i) => (
        <li
          key={i}
          className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 text-base font-bold text-white">
              {i + 1}
            </div>
            <div className="flex-1">
              <div className="text-lg font-bold text-zinc-900">
                {pick(locale, step.command)}
              </div>
              <p className="mt-1 text-base text-zinc-700">
                {pick(locale, step.detail)}
              </p>

              {step.say ? (
                <div className="mt-3">
                  <RightsScriptBox
                    title={labels.say}
                    phrase={pick(locale, step.say)}
                    listenLabel={labels.listen}
                  />
                </div>
              ) : null}

              {step.doNot ? (
                <div className="mt-3 flex items-start gap-2 rounded-2xl border-l-4 border-red-500 bg-red-50 p-4">
                  <AlertTriangle
                    className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                    aria-hidden
                  />
                  <div>
                    <div className="text-sm font-semibold text-red-900">
                      {labels.doNot}
                    </div>
                    <div className="text-sm text-red-950">
                      {pick(locale, step.doNot)}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <CheckCircle2
              className="hidden h-6 w-6 text-emerald-500 sm:block"
              aria-hidden
            />
          </div>
        </li>
      ))}
    </ol>
  );
}
