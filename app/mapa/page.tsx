import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { VenueMap, STANDS } from "@/features/venue-map";
import { EXHIBITORS } from "@/features/exhibitors";

export const metadata: Metadata = {
  title: "Mapa del predio | ExpoJuy 2026",
  description: "Plano interactivo del predio de ExpoJuy 2026 con filtro por rubro.",
};

export default function MapaPage() {
  const zoneCount = new Set(STANDS.map((stand) => stand.zone)).size;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow={`${STANDS.length} stands · ${zoneCount} zonas`}
        title="Mapa del predio"
        description="Ubicá cada stand por zona y rubro. Buscá o filtrá por rubro y tocá un stand para ver el detalle del expositor."
      />
      <div className="mt-10">
        <VenueMap stands={STANDS} exhibitors={EXHIBITORS} />
      </div>
    </div>
  );
}
