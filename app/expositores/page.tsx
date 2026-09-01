import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { ExhibitorsExplorer, EXHIBITORS } from "@/features/exhibitors";
import { RUBROS } from "@/lib/rubros";

export const metadata: Metadata = {
  title: "Expositores | ExpoJuy 2026",
  description: "Buscá y filtrá los expositores de ExpoJuy 2026 por rubro.",
};

export default function ExpositoresPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow={`${EXHIBITORS.length} empresas · ${RUBROS.length} rubros`}
        title="Expositores"
        description="Explorá las empresas, cooperativas y organizaciones que participan de ExpoJuy 2026. Buscá por nombre o filtrá por rubro."
      />
      <div className="mt-10">
        <ExhibitorsExplorer exhibitors={EXHIBITORS} />
      </div>
    </PageContainer>
  );
}
