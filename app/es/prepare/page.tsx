import { PrepareView } from "@/components/PrepareView";

export const metadata = {
  title: "Plan familiar de emergencia",
  description:
    "Crea un plan privado e imprimible para tu familia. Ningún dato sale de tu navegador.",
  robots: { index: true, follow: true },
};

export default function Page() {
  return <PrepareView locale="es" />;
}
