import { notFound } from "next/navigation";
import { RightsTopicView } from "@/components/RightsTopicView";
import { getRightsTopic } from "@/lib/rights";

const topic = getRightsTopic("housing");

export const metadata = { title: topic ? topic.title.es : "Derechos" };

export default function Page() {
  if (!topic) notFound();
  return <RightsTopicView topic={topic} locale="es" />;
}
