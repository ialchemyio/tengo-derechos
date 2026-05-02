import { HomeView } from "@/components/HomeView";
import { dict } from "@/lib/i18n";

export const metadata = {
  title: dict.es.metaHomeTitle,
  description: dict.es.metaHomeDesc,
  alternates: { canonical: "/es", languages: { en: "/", es: "/es" } },
};

export default function Page() {
  return <HomeView locale="es" />;
}
