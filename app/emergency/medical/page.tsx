import { EmergencyGuideView } from "@/components/EmergencyGuideView";
import { getGuide } from "@/lib/content";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Medical help without insurance",
  description: "How to get medical care even without insurance.",
};

export default function Page() {
  const guide = getGuide("medical");
  if (!guide) notFound();
  return <EmergencyGuideView guide={guide} locale="en" />;
}
