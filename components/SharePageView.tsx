import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { BrandMark } from "./icons/BrandMark";
import type { Locale } from "@/lib/i18n";
import { fullGuideUrlFor, shareUrlFor, type StepContent } from "@/lib/share";
import { ShareWhatsAppButton } from "./ShareWhatsAppButton";
import { CopyLinkButton } from "./CopyLinkButton";
import { QRCode } from "./QRCode";

const COPY = {
  en: {
    step: "Step",
    of: "of",
    say: "What you may say",
    notLegalAdvice: "Educational only · Not legal advice",
    fullGuide: "View full guide",
    backHome: "Back to Tengo Derechos",
  },
  es: {
    step: "Paso",
    of: "de",
    say: "Qué puedes decir",
    notLegalAdvice: "Solo informativo · No es asesoramiento legal",
    fullGuide: "Ver guía completa",
    backHome: "Volver a Tengo Derechos",
  },
};

export function SharePageView({
  content,
  locale,
}: {
  content: StepContent;
  locale: Locale;
}) {
  const t = COPY[locale];
  const home = locale === "es" ? "/es" : "/";
  const fullGuideHref = locale === "es"
    ? `/es/emergency/${content.scenario}`
    : `/emergency/${content.scenario}`;
  const pageUrl = shareUrlFor(content.scenario, content.stepNumber, locale);
  const fullUrl = fullGuideUrlFor(content.scenario, locale);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 py-6">
      <header className="flex items-center justify-between text-sm">
        <Link
          href={home}
          className="inline-flex items-center gap-2 font-semibold text-[var(--accent)]"
        >
          <BrandMark size={28} />
          Tengo Derechos
        </Link>
        <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)]">
          {t.step} {content.stepNumber} {t.of} {content.totalSteps}
        </span>
      </header>

      <section className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-deep)]">
          {content.guide.title[locale]}
        </p>
        <h1 className="font-display mt-3 text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl">
          {content.command}
        </h1>
        <p className="mt-3 text-lg text-zinc-700">{content.detail}</p>

        {content.say ? (
          <div className="mt-5 rounded-2xl border-l-4 border-[var(--brand)] bg-[var(--brand-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-deep)]">
              {t.say}
            </p>
            <p className="mt-1 text-base font-medium text-[var(--brand-deep)]">
              “{content.say}”
            </p>
          </div>
        ) : null}

        {content.doNot ? (
          <div className="mt-3 flex items-start gap-2 rounded-2xl border-l-4 border-[var(--danger)] bg-[var(--danger-soft)] p-4">
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-[var(--danger)]"
              aria-hidden
            />
            <p className="text-sm text-[var(--danger-deep)]">{content.doNot}</p>
          </div>
        ) : null}
      </section>

      <section className="mt-7 grid gap-3">
        <Link
          href={fullGuideHref}
          className="inline-flex items-center justify-between rounded-2xl bg-[var(--accent)] px-5 py-3 font-bold text-white shadow-sm hover:bg-[var(--accent)]/90"
        >
          {t.fullGuide}
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Link>
        <ShareWhatsAppButton url={pageUrl} locale={locale} />
        <CopyLinkButton locale={locale} url={pageUrl} />
      </section>

      <section className="mt-8 flex flex-col items-center">
        <QRCode value={fullUrl} size={140} locale={locale} />
      </section>

      <footer className="mt-auto pt-8 text-center text-xs text-zinc-500">
        <p>{t.notLegalAdvice}</p>
        <p className="mt-1">tengoderechos.org</p>
      </footer>
    </main>
  );
}
