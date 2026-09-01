import type { Metadata } from "next";
import { AgendaPlanner, AgendaSchedule, SESSIONS } from "@/features/agenda";

export const metadata: Metadata = {
  title: "Agenda | ExpoJuy 2026",
  description: "Agenda de actividades de ExpoJuy 2026 y planificador de itinerario personalizado.",
};

export default function AgendaPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 sm:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Agenda de actividades</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Del 9 al 12 de octubre de 2026. Explorá el cronograma completo por día
          o armá tu propio itinerario con el planificador inteligente.
        </p>
      </div>
      <AgendaPlanner sessions={SESSIONS} />
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Cronograma completo</h2>
        <div className="mt-4">
          <AgendaSchedule sessions={SESSIONS} />
        </div>
      </div>
    </div>
  );
}
