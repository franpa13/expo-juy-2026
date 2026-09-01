import { PageContainer } from "@/components/layout/page-container";
import { TopoLines } from "@/components/layout/topo-lines";
import { AGENDA_DAYS, SESSIONS } from "@/features/agenda";
import { EXHIBITORS } from "@/features/exhibitors";

interface Stat {
  value: number;
  label: string;
}

function buildStats(): Stat[] {
  const speakerCount = new Set(
    SESSIONS.map((session) => session.speaker).filter((speaker): speaker is string => Boolean(speaker))
  ).size;

  return [
    { value: EXHIBITORS.length, label: "Expositores" },
    { value: speakerCount, label: "Speakers" },
    { value: Object.keys(AGENDA_DAYS).length, label: "Días" },
    { value: SESSIONS.length, label: "Actividades" },
  ];
}

export function StatsBand() {
  const stats = buildStats();

  return (
    <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
      {/* Real footage from a past ExpoJuy edition, filmed at Ciudad Cultural — muted,
          looping ambiance behind the numbers. Falls back to the static topo-line
          texture when a viewer has prefers-reduced-motion on. */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-50 motion-reduce:hidden"
        src="/videos/expojuy-highlights.mp4"
        poster="/images/expojuy-highlights-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 hidden text-primary/70 motion-reduce:block">
        <TopoLines />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/90 via-neutral-950/75 to-neutral-950/90" />

      <PageContainer className="relative py-16 sm:py-20">
        <p className="text-xs font-bold tracking-[0.14em] text-accent uppercase">ExpoJuy en números</p>
        <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-5xl font-extrabold tabular-nums text-accent sm:text-6xl">
                {stat.value}
              </div>
              <div className="mt-2 text-xs font-bold tracking-[0.14em] text-white/70 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
