import { EmergencyGuideView } from "@/components/EmergencyGuideView";
import { getGuide } from "@/lib/content";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Police traffic stop",
  description: "What to do during a traffic stop.",
};

export default function Page() {
  const guide = getGuide("police-stop");
  if (!guide) notFound();
  return <EmergencyGuideView guide={guide} locale="en" />;
}
