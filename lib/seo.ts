import type { Metadata } from "next";
import type { Locale } from "./i18n";
import type { EmergencyGuide } from "./content";
import type { RightsTopic } from "./rights";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tengoderechos.org";
export const orgName = "Tengo Derechos";
export const orgEmail = "hello@tengoderechos.org";

const ogImage = `${siteUrl}/api/og`;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tengo Derechos | Bilingual Emergency Rights for Immigrant Families",
    template: "%s · Tengo Derechos",
  },
  description:
    "Tus derechos. Tu familia. Tu protección. Bilingual (English + Spanish) step-by-step rights guides for ICE encounters, police stops, Border Patrol, and medical care without insurance.",
  applicationName: orgName,
  keywords: [
    "know your rights",
    "conoce tus derechos",
    "ICE",
    "immigrant rights",
    "derechos inmigrantes",
    "police stop",
    "border patrol",
    "emergency rights",
    "EMTALA",
    "tarjetas rojas",
    "red cards",
  ],
  authors: [{ name: "Tengo Derechos", url: siteUrl }],
  creator: orgName,
  publisher: orgName,
  category: "civic",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    title: "Tengo Derechos",
    description:
      "Tus derechos. Tu familia. Tu protección. Bilingual emergency rights and resource hub.",
    url: siteUrl,
    siteName: orgName,
    locale: "es_US",
    alternateLocale: ["en_US"],
    images: [
      { url: ogImage, width: 1200, height: 630, alt: "Tengo Derechos" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tengo Derechos",
    description: "Bilingual emergency rights and resource hub.",
    images: [ogImage],
  },
  alternates: {
    canonical: "/",
    languages: { en: "/", es: "/es" },
  },
};

export function pageMetadata({
  title,
  description,
  path,
  locale,
}: {
  title?: string;
  description?: string;
  path: string;
  locale: Locale;
}): Metadata {
  const url = `${siteUrl}${path}`;
  const enPath = path.startsWith("/es")
    ? path === "/es"
      ? "/"
      : path.replace(/^\/es/, "")
    : path;
  const esPath = path.startsWith("/es")
    ? path
    : path === "/"
      ? "/es"
      : `/es${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}${enPath}`,
        es: `${siteUrl}${esPath}`,
        "x-default": `${siteUrl}${enPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      locale: locale === "es" ? "es_US" : "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title ?? orgName }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

// -------- JSON-LD --------

export const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: orgName,
  url: siteUrl,
  logo: `${siteUrl}/icons/icon-512.png`,
  description:
    "Bilingual emergency rights and resource information for immigrant families.",
  inLanguage: ["es", "en"],
  email: orgEmail,
  sameAs: [],
  knowsLanguage: ["es", "en"],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: orgName,
  url: siteUrl,
  inLanguage: ["es", "en"],
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/resources?city={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export function howToJsonLd(guide: EmergencyGuide, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title[locale],
    description: guide.intro[locale],
    inLanguage: locale === "es" ? "es" : "en",
    totalTime: "PT5M",
    step: guide.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.command[locale],
      text: [
        step.detail[locale],
        step.say ? `${locale === "es" ? "Qué decir" : "What to say"}: "${step.say[locale]}"` : null,
        step.doNot ? `${locale === "es" ? "Qué no hacer" : "What not to do"}: ${step.doNot[locale]}` : null,
      ]
        .filter(Boolean)
        .join(" "),
    })),
  };
}

export function articleJsonLd(topic: RightsTopic, locale: Locale, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: topic.title[locale],
    description: topic.intro[locale],
    inLanguage: locale === "es" ? "es" : "en",
    url,
    author: { "@type": "Organization", name: orgName, url: siteUrl },
    publisher: {
      "@type": "Organization",
      name: orgName,
      logo: { "@type": "ImageObject", url: `${siteUrl}/icons/icon-512.png` },
    },
    dateModified: topic.lastUpdated,
    isAccessibleForFree: true,
    isPartOf: {
      "@type": "WebSite",
      name: orgName,
      url: siteUrl,
    },
  };
}

export function faqJsonLd(
  items: { question: string; answer: string }[],
  locale: Locale
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "es" ? "es" : "en",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function donateActionJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    name: locale === "es" ? "Donar a Tengo Derechos" : "Donate to Tengo Derechos",
    description:
      locale === "es"
        ? "Apoya guías bilingües de emergencia y recursos para familias inmigrantes."
        : "Support bilingual emergency guides and resources for immigrant families.",
    recipient: orgJsonLd,
    inLanguage: locale === "es" ? "es" : "en",
  };
}
