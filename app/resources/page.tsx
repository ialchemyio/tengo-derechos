import { ResourcesPageView } from "@/components/ResourcesPageView";

export const metadata = {
  title: "Community resources",
  description: "Find legal aid, clinics, hotlines, and more.",
};

export default function Page() {
  return <ResourcesPageView locale="en" />;
}
