import type { Metadata } from "next";
import { SponsorTier, SPONSORS } from "@/features/sponsors";

export const metadata: Metadata = {
  title: "Sponsors | ExpoJuy 2026",
  description: "Empresas e instituciones que acompañan ExpoJuy 2026.",
};

export default function SponsorsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sponsors</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Gracias a las empresas e instituciones que hacen posible ExpoJuy 2026.
        </p>
      </div>
      <SponsorTier tier="platino" sponsors={SPONSORS} />
      <SponsorTier tier="oro" sponsors={SPONSORS} />
      <SponsorTier tier="plata" sponsors={SPONSORS} />
    </div>
  );
}
