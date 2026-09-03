import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { SESSIONS } from "@/features/agenda";
import { EXHIBITORS } from "@/features/exhibitors";
import { AccreditationFlow, TICKET_TIERS, TicketsHero } from "@/features/tickets";

export const metadata: Metadata = {
  title: "Entradas y acreditación · ExpoJuy 2026",
  description:
    "Acreditate para ExpoJuy 2026 y llevate un pase con tu itinerario de los cuatro días y los stands de los rubros que te interesan.",
};

export default function EntradasPage() {
  return (
    <>
      <TicketsHero />
      <PageContainer className="py-16">
        <AccreditationFlow
          tiers={TICKET_TIERS}
          sessions={SESSIONS}
          exhibitors={EXHIBITORS}
        />

        <p className="mt-16 border-t border-line pt-6 text-xs text-muted-foreground">
          Prototipo del Desafío Digital ExpoJuy 2026. El esquema de entradas, los
          precios y el circuito de pago reales los define la Cámara de Comercio
          Exterior de Jujuy — los pases que genera esta página son de demostración
          y no habilitan el ingreso al predio.
        </p>
      </PageContainer>
    </>
  );
}
