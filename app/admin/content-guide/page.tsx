import { ContentGuideView } from "@/components/ContentGuideView";

export const metadata = {
  title: "Content guide",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ContentGuideView locale="en" />;
}
