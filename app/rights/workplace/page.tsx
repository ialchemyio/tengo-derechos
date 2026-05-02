import { RightsTopicView } from "@/components/RightsTopicView";

export const metadata = { title: "Rights — Workplace" };

export default function Page() {
  return (
    <RightsTopicView
      title="Workplace — basics"
      intro="Federal and state laws may protect workers regardless of immigration status, but rules vary. Ask a qualified attorney for your situation."
      bullets={[
        "You may have the right to be paid for hours worked, including overtime in many roles.",
        "Workplaces generally must provide reasonably safe working conditions.",
        "Retaliation for reporting safety problems or wage theft may be illegal.",
        "Keep records: hours worked, pay stubs, names of supervisors, photos of conditions.",
        "If injured at work, ask about workers' compensation.",
        "Ask a labor rights organization or attorney before signing waivers.",
      ]}
    />
  );
}
