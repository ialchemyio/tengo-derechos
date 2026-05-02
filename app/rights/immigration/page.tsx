import { notFound } from "next/navigation";
import { RightsTopicView } from "@/components/RightsTopicView";
import { getRightsTopic } from "@/lib/rights";

const topic = getRightsTopic("immigration");

export const metadata = { title: topic ? topic.title.en : "Rights" };

export default function Page() {
  if (!topic) notFound();
  return <RightsTopicView topic={topic} locale="en" />;
}
