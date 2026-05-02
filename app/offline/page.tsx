import { OfflineView } from "@/components/OfflineView";

export const metadata = {
  title: "Offline",
  description: "You are offline. Saved emergency guides are available.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <OfflineView locale="en" />;
}
