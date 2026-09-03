"use client";

import { motion, useReducedMotion } from "motion/react";
import { PageContainer } from "@/components/layout/page-container";
import { StrataDivider } from "@/components/layout/strata";
import { Button } from "@/components/ui/button";
import { riseItem, staggerContainer } from "../lib/motion-presets";

const STATS = [
  { value: "4", label: "Días de feria" },
  { value: "3", label: "Tipos de pase" },
  { value: "$0", label: "Entrada general" },
];

export function TicketsHero() {
  const reduced = useReducedMotion() ?? false;
  const item = riseItem(reduced);

  return (
    <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
      {/* Ambient light in the brand palette — violet settling into turquoise,
          the same two ends of the strata motif, kept low enough that the type
          carries the contrast. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(70% 55% at 50% 0%, color-mix(in oklch, var(--primary), transparent 62%) 0%, transparent 70%), radial-gradient(45% 40% at 50% 100%, color-mix(in oklch, var(--accent), transparent 78%) 0%, transparent 75%)",
        }}
      />

      <PageContainer className="relative py-20 sm:py-28">
        <motion.div
          variants={staggerContainer(0.08, 0.08)}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold tracking-[0.14em] text-accent uppercase"
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-accent motion-safe:animate-pulse"
            />
            Acreditación abierta
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-7 text-5xl font-extrabold tracking-tight text-balance sm:text-7xl"
          >
            Tu entrada
            <br />
            <span className="text-accent">ya sabe a dónde vas</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg text-white/60 text-pretty"
          >
            Acreditate una vez y el pase se arma solo: tu itinerario de los cuatro
            días sin choques de horario, y los stands de los rubros que elegiste,
            marcados en el plano.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-white text-neutral-950 hover:bg-white/85 focus-visible:ring-white/40"
            >
              <a href="#acreditacion">Acreditarme</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#pases">Ver tipos de pase</a>
            </Button>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-14 grid w-full max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-8"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-3xl font-extrabold tabular-nums sm:text-4xl">
                    {stat.value}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-2 block text-[0.65rem] font-bold tracking-[0.14em] text-white/50 uppercase"
                  >
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </PageContainer>

      <StrataDivider className="h-1 rounded-none" />
    </section>
  );
}
