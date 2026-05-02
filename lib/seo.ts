import type { Metadata } from "next";

export const siteUrl = "https://tengoderechos.org";

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tengo Derechos | Emergency Rights & Family Resource Hub",
    template: "%s | Tengo Derechos",
  },
  description:
    "Bilingual emergency rights and resource information for immigrant families. Tus derechos. Tu familia. Tu protección.",
  applicationName: "Tengo Derechos",
  keywords: [
    "know your rights",
    "conoce tus derechos",
    "ICE",
    "immigrant rights",
    "derechos inmigrantes",
    "police stop",
    "border patrol",
  ],
  openGraph: {
    type: "website",
    title: "Tengo Derechos",
    description:
      "Tus derechos. Tu familia. Tu protección. Bilingual emergency rights and resource hub.",
    siteName: "Tengo Derechos",
    locale: "es_US",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tengo Derechos",
    description: "Bilingual emergency rights and resource hub.",
  },
  alternates: {
    canonical: "/",
    languages: { en: "/", es: "/es" },
  },
};

export const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Tengo Derechos",
  url: siteUrl,
  description:
    "Bilingual emergency rights and resource information for immigrant families.",
  inLanguage: ["es", "en"],
};
