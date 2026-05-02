import { notFound } from "next/navigation";
import { EmergencyGuideView } from "@/components/EmergencyGuideView";
import { getGuide } from "@/lib/content";

export const metadata = {
  title: "Ayuda médica sin seguro",
  description: "Cómo conseguir atención médica incluso sin seguro.",
};

export default function Page() {
  const guide = getGuide("medical");
  if (!guide) notFound();
  return <EmergencyGuideView guide={guide} locale="es" />;
}
