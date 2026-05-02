import { ContentGuideView } from "@/components/ContentGuideView";

export const metadata = {
  title: "Guía de contenido",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ContentGuideView locale="es" />;
}
