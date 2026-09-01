import type { Metadata } from "next";
import { ExhibitorsExplorer, EXHIBITORS } from "@/features/exhibitors";

export const metadata: Metadata = {
  title: "Expositores | ExpoJuy 2026",
  description: "Buscá y filtrá los expositores de ExpoJuy 2026 por rubro.",
};

export default function ExpositoresPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Expositores</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Explorá las empresas, cooperativas y organizaciones que participan de
        ExpoJuy 2026. Buscá por nombre o filtrá por rubro.
      </p>
      <div className="mt-8">
        <ExhibitorsExplorer exhibitors={EXHIBITORS} />
      </div>
    </div>
  );
}
