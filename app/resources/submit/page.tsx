import { SubmitResourceView } from "@/components/SubmitResourceView";

export const metadata = {
  title: "Suggest a resource",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SubmitResourceView locale="en" />;
}
