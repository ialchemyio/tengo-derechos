import { ImpactView } from "@/components/ImpactView";

export const metadata = {
  title: "Impact",
  description:
    "What Tengo Derechos has shipped so far. Live counts of guides, attestations, audio clips, source citations, and offline-ready content — auditable artifacts on disk.",
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <ImpactView locale="en" />;
}
