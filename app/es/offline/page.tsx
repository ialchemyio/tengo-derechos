import { OfflineView } from "@/components/OfflineView";

export const metadata = {
  title: "Sin conexión",
  description: "Estás sin conexión. Las guías guardadas están disponibles.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <OfflineView locale="es" />;
}
