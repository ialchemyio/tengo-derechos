import { notFound } from "next/navigation";
import { EmbedCardView } from "@/components/EmbedCardView";
import { EMBED_SLUGS, getEmbedContent, embedSlugLabel } from "@/lib/embed";
import { siteUrl } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return EMBED_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (!EMBED_SLUGS.includes(slug as never)) return {};
  const label = embedSlugLabel(slug as never, "en");
  return {
    title: `${label} · embed`,
    description: "Tengo Derechos embeddable rights card.",
    robots: { index: false, follow: false },
    alternates: {
      canonical: `${siteUrl}/embed/${slug}`,
      languages: {
        en: `${siteUrl}/embed/${slug}`,
        es: `${siteUrl}/es/embed/${slug}`,
      },
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await getEmbedContent(slug, "en");
  if (!data) notFound();
  return <EmbedCardView data={data} locale="en" />;
}
