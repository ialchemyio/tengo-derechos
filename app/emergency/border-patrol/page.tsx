import { EmergencyGuideView } from "@/components/EmergencyGuideView";
import { getGuide } from "@/lib/content";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Border Patrol encounter",
  description: "What to do during a Border Patrol encounter.",
};

export default function Page() {
  const guide = getGuide("border-patrol");
  if (!guide) notFound();
  return <EmergencyGuideView guide={guide} locale="en" />;
}
