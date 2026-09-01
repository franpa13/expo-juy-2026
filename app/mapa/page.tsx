import type { Metadata } from "next";
import { VenueMap, STANDS } from "@/features/venue-map";
import { EXHIBITORS } from "@/features/exhibitors";

export const metadata: Metadata = {
  title: "Mapa del predio | ExpoJuy 2026",
  description: "Plano interactivo del predio de ExpoJuy 2026 con filtro por rubro.",
};

export default function MapaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Mapa del predio</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Ubicá cada stand por zona y rubro. Filtrá por rubro y tocá un stand para
        ver el detalle del expositor.
      </p>
      <div className="mt-8">
        <VenueMap stands={STANDS} exhibitors={EXHIBITORS} />
      </div>
    </div>
  );
}
