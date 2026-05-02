import { RightsTopicView } from "@/components/RightsTopicView";

export const metadata = { title: "Rights — Medical" };

export default function Page() {
  return (
    <RightsTopicView
      title="Medical — basics"
      intro="Do not avoid emergency care because of fear or insurance status."
      bullets={[
        "Under federal law, ERs typically must screen and stabilize emergencies regardless of ability to pay or status.",
        "Many hospitals offer financial assistance / charity care programs — ask billing.",
        "Community health centers (FQHCs) treat everyone on a sliding scale.",
        "You generally have a right to language interpretation in many federally-funded settings.",
        "Ask before signing financial responsibility forms.",
        "Bring ID if available, but do not skip emergency care.",
      ]}
    />
  );
}
