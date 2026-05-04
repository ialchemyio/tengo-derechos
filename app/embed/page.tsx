import { EmbedIndexView } from "@/components/EmbedIndexView";

export const metadata = {
  title: "Embed our guides",
  description:
    "Copy-paste iframes for partner organizations to embed Tengo Derechos rights guides on their own sites.",
};

export default function Page() {
  return <EmbedIndexView locale="en" />;
}
