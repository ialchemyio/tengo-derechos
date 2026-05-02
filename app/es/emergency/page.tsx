import { EmergencyHubView } from "@/components/EmergencyHubView";

export const metadata = {
  title: "Ayuda de emergencia",
  description: "Guías paso a paso para familias.",
};

export default function Page() {
  return <EmergencyHubView locale="es" />;
}
