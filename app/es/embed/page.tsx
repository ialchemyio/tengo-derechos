import { EmbedIndexView } from "@/components/EmbedIndexView";

export const metadata = {
  title: "Integra nuestras guías",
  description:
    "Fragmentos iframe para que organizaciones aliadas integren las guías de Tengo Derechos en sus propios sitios.",
};

export default function Page() {
  return <EmbedIndexView locale="es" />;
}
