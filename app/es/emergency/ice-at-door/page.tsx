import { notFound } from "next/navigation";
import { EmergencyGuideView } from "@/components/EmergencyGuideView";
import { getGuide } from "@/lib/content";

export const metadata = {
  title: "ICE en tu puerta",
  description: "Qué hacer si oficiales de inmigración llegan a tu casa.",
};

export default function Page() {
  const guide = getGuide("ice-at-door");
  if (!guide) notFound();
  return <EmergencyGuideView guide={guide} locale="es" />;
}
