import { RightsTopicView } from "@/components/RightsTopicView";

export const metadata = { title: "Rights — Immigration" };

export default function Page() {
  return (
    <RightsTopicView
      title="Immigration — basics"
      intro="Rules can vary. Ask a qualified immigration attorney for help with your specific case."
      bullets={[
        "You generally do not have to open your door without a judicial warrant signed by a judge.",
        "An ICE administrative warrant (I-200/I-205) is typically not enough to enter your home.",
        "You may have the right to remain silent about your immigration status.",
        "Do not sign anything without a lawyer.",
        "Carry a 'know your rights' card and the number of a lawyer or trusted contact.",
        "Make a family preparedness plan: care of children, important documents, emergency contacts.",
      ]}
    />
  );
}
