import { RightsTopicView } from "@/components/RightsTopicView";

export const metadata = { title: "Rights — Police" };

export default function Page() {
  return (
    <RightsTopicView
      title="Police — basics"
      intro="In many situations you may have these protections. Always stay calm and never run."
      bullets={[
        "You may have the right to remain silent in many encounters.",
        "If driving, you generally must show license, registration, and insurance.",
        "You may say you do not consent to a search. Do not physically resist.",
        "Ask: 'Officer, am I free to go?' If yes, calmly leave.",
        "Do not lie or give false documents.",
        "If arrested, ask for a lawyer.",
      ]}
    />
  );
}
