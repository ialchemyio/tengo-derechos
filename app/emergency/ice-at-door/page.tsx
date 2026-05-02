import { EmergencyGuideView } from "@/components/EmergencyGuideView";
import { getGuide } from "@/lib/content";
import { notFound } from "next/navigation";

export const metadata = {
  title: "ICE at your door",
  description: "What to do if immigration officers come to your home.",
};

export default function Page() {
  const guide = getGuide("ice-at-door");
  if (!guide) notFound();
  return <EmergencyGuideView guide={guide} locale="en" />;
}
