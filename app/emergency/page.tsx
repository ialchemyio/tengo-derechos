import { EmergencyHubView } from "@/components/EmergencyHubView";

export const metadata = {
  title: "Emergency help",
  description: "Step-by-step emergency guides for families.",
};

export default function Page() {
  return <EmergencyHubView locale="en" />;
}
