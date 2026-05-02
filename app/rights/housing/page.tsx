import { RightsTopicView } from "@/components/RightsTopicView";

export const metadata = { title: "Rights — Housing" };

export default function Page() {
  return (
    <RightsTopicView
      title="Housing — basics"
      intro="Tenant protections vary widely by state and city. Ask a local tenants' rights organization or attorney."
      bullets={[
        "Most landlords must give written notice before eviction.",
        "Eviction usually requires a court order — a landlord generally cannot remove you without one.",
        "Habitable conditions (heat, water, no major hazards) are often required.",
        "Discrimination based on race, national origin, family status, and disability is generally illegal.",
        "Keep all written communication and pay rent in a way that creates a record.",
        "Local legal aid organizations often help tenants for free.",
      ]}
    />
  );
}
