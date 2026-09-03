import { AnimatedCounter } from "@/components/layout/animated-counter";
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
      {/* Two soft glows in the fixed brand palette, then the topo-line
          texture on top — same "terrain in layers" motif as the strata
          bands, just quieter here since the numbers are the focus. */}
      <div className="absolute -top-24 -left-24 size-96 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-24 -bottom-24 size-96 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-0 text-primary/60" aria-hidden="true">
        <TopoLines />
      </div>

      <PageContainer className="relative py-16 sm:py-20">
        <p className="text-xs font-bold tracking-[0.14em] text-accent uppercase">ExpoJuy en números</p>
        <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <AnimatedCounter
                value={stat.value}
                className="text-5xl font-extrabold tabular-nums text-accent sm:text-6xl"
              />
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
