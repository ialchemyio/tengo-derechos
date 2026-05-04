import { ThankYouView } from "@/components/ThankYouView";

export const metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ThankYouView locale="en" />;
}
