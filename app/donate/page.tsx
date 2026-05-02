import { DonateView } from "@/components/DonateView";

export const metadata = {
  title: "Donate",
  description: "Support bilingual emergency rights and resource information.",
};

export default function Page() {
  return <DonateView locale="en" />;
}
