import { notFound } from "next/navigation";
import { EmergencyGuideView } from "@/components/EmergencyGuideView";
import { getGuide } from "@/lib/content";

export const metadata = {
  title: "Encuentro con la Patrulla Fronteriza",
  description: "Qué hacer durante un encuentro con la Patrulla Fronteriza.",
};

export default function Page() {
  const guide = getGuide("border-patrol");
  if (!guide) notFound();
  return <EmergencyGuideView guide={guide} locale="es" />;
}
