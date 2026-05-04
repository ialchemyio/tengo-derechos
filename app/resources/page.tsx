import { ResourcesPageView } from "@/components/ResourcesPageView";

export const metadata = {
  title: "Community resources",
  description: "Find legal aid, clinics, hotlines, and more.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <ResourcesPageView locale="en" searchParams={searchParams} />;
}
