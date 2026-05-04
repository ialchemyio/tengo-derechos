import { notFound } from "next/navigation";
import { SharePageView } from "@/components/SharePageView";
import {
  SHARE_SCENARIOS,
  getStepContent,
  shareUrlFor,
  type ShareScenario,
} from "@/lib/share";
import { siteUrl } from "@/lib/seo";

type Props = {
  params: Promise<{ scenario: string; step: string }>;
};

export async function generateStaticParams() {
  const out: { scenario: string; step: string }[] = [];
  for (const scenario of SHARE_SCENARIOS) {
    for (let i = 1; i <= 7; i++) {
      out.push({ scenario, step: String(i) });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Props) {
  const { scenario, step } = await params;
  const content = getStepContent(scenario, Number(step), "es");
  if (!content) return { title: "Tengo Derechos" };
  const ogTitle = encodeURIComponent(content.command);
  const ogSub = encodeURIComponent(content.guide.title.es);
  const ogUrl = `${siteUrl}/api/og?title=${ogTitle}&subtitle=${ogSub}&step=${content.stepNumber}&scenario=${content.scenario}&locale=es`;
  const url = shareUrlFor(content.scenario, content.stepNumber, "es");
  return {
    title: `${content.command} · Tengo Derechos`,
    description: "Conoce tus derechos — guía paso a paso de emergencia.",
    alternates: {
      canonical: url,
      languages: {
        en: shareUrlFor(content.scenario as ShareScenario, content.stepNumber, "en"),
        es: shareUrlFor(content.scenario as ShareScenario, content.stepNumber, "es"),
      },
    },
    openGraph: {
      title: content.command,
      description: content.guide.title.es,
      url,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: content.command }],
      type: "article",
      locale: "es_US",
    },
    twitter: { card: "summary_large_image", title: content.command, images: [ogUrl] },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: Props) {
  const { scenario, step } = await params;
  const content = getStepContent(scenario, Number(step), "es");
  if (!content) notFound();
  return <SharePageView content={content} locale="es" />;
}
