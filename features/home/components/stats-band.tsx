"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedCounter } from "@/components/layout/animated-counter";
import { PageContainer } from "@/components/layout/page-container";
import { Reveal } from "@/components/layout/reveal";
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
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
      {/* Two soft glows in the fixed brand palette, drifting slowly for a bit of
          ambient life, then the topo-line texture on top — same "terrain in
          layers" motif as the strata bands, just quieter here. */}
      <motion.div
        className="absolute -top-24 -left-24 size-96 rounded-full bg-primary/30 blur-3xl"
        aria-hidden="true"
        animate={prefersReducedMotion ? undefined : { x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 -bottom-24 size-96 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
        animate={prefersReducedMotion ? undefined : { x: [0, -24, 0], y: [0, -16, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 text-primary/60" aria-hidden="true">
        <TopoLines />
      </div>

      <PageContainer className="relative py-16 sm:py-20">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.14em] text-accent uppercase">ExpoJuy en números</p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <AnimatedCounter
                value={stat.value}
                className="text-5xl font-extrabold tabular-nums text-accent sm:text-6xl"
              />
              <div className="mt-2 text-xs font-bold tracking-[0.14em] text-white/70 uppercase">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
