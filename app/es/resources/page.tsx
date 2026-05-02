import { ResourcesPageView } from "@/components/ResourcesPageView";

export const metadata = {
  title: "Recursos comunitarios",
  description: "Encuentra ayuda legal, clínicas, líneas de ayuda y más.",
};

export default function Page() {
  return <ResourcesPageView locale="es" />;
}
