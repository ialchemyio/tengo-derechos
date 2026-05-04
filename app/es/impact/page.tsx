import { ImpactView } from "@/components/ImpactView";

export const metadata = {
  title: "Impacto",
  description:
    "Lo que Tengo Derechos ha publicado hasta ahora. Cuentas en vivo de guías, atestaciones, grabaciones de audio, citas de fuente y contenido offline — artefactos auditables en disco.",
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <ImpactView locale="es" />;
}
