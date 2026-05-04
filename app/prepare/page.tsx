import { PrepareView } from "@/components/PrepareView";

export const metadata = {
  title: "Family preparedness plan",
  description:
    "Build a private, printable emergency plan for your family. No data leaves your browser.",
  robots: { index: true, follow: true },
};

export default function Page() {
  return <PrepareView locale="en" />;
}
