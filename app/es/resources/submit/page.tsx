import { SubmitResourceView } from "@/components/SubmitResourceView";

export const metadata = {
  title: "Sugerir un recurso",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SubmitResourceView locale="es" />;
}
