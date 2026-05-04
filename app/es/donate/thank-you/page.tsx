import { ThankYouView } from "@/components/ThankYouView";

export const metadata = {
  title: "Gracias",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ThankYouView locale="es" />;
}
