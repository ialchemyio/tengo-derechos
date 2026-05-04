import { CancelledView } from "@/components/CancelledView";

export const metadata = {
  title: "Donation cancelled",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CancelledView locale="en" />;
}
