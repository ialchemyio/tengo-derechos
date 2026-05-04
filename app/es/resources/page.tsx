import { ResourcesPageView } from "@/components/ResourcesPageView";

export const metadata = {
  title: "Recursos comunitarios",
  description: "Encuentra ayuda legal, clínicas, líneas de ayuda y más.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <ResourcesPageView locale="es" searchParams={searchParams} />;
}
