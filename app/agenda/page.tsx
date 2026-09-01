import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { AgendaPlanner, AgendaSchedule, AGENDA_DAYS, SESSIONS } from "@/features/agenda";

export const metadata: Metadata = {
  title: "Agenda | ExpoJuy 2026",
  description: "Agenda de actividades de ExpoJuy 2026 y planificador de itinerario personalizado.",
};

export default function AgendaPage() {
  const dayCount = Object.keys(AGENDA_DAYS).length;

  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow={`9–12 de octubre · ${dayCount} días`}
        title="Agenda de actividades"
        description="Explorá el cronograma completo por día o armá tu propio itinerario con el planificador inteligente."
      />
      <AgendaPlanner sessions={SESSIONS} />
      <div>
        <p className="text-xs font-bold tracking-[0.14em] text-accent uppercase">Cronograma</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight">Actividades por día</h2>
        <div className="mt-6">
          <AgendaSchedule sessions={SESSIONS} />
        </div>
      </div>
    </div>
  );
}
