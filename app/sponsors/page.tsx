import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { SponsorTier, SPONSORS } from "@/features/sponsors";

export const metadata: Metadata = {
  title: "Sponsors | ExpoJuy 2026",
  description: "Empresas e instituciones que acompañan ExpoJuy 2026.",
};

export default function SponsorsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow={`${SPONSORS.length} empresas e instituciones`}
        title="Sponsors"
        description="Gracias a quienes hacen posible ExpoJuy 2026."
      />
      <SponsorTier tier="platino" sponsors={SPONSORS} />
      <SponsorTier tier="oro" sponsors={SPONSORS} />
      <SponsorTier tier="plata" sponsors={SPONSORS} />
    </div>
  );
}
