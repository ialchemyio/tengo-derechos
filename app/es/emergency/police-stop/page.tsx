import { notFound } from "next/navigation";
import { EmergencyGuideView } from "@/components/EmergencyGuideView";
import { getGuide } from "@/lib/content";

export const metadata = {
  title: "Parada de tránsito",
  description: "Qué hacer durante una parada de policía.",
};

export default function Page() {
  const guide = getGuide("police-stop");
  if (!guide) notFound();
  return <EmergencyGuideView guide={guide} locale="es" />;
}
