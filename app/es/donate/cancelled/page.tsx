import { CancelledView } from "@/components/CancelledView";

export const metadata = {
  title: "Donación cancelada",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CancelledView locale="es" />;
}
