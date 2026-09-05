"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { riseItem, staggerContainer } from "../lib/motion-presets";

/**
 * The page's opening, deliberately built on the shared `PageHeader` every
 * other inner route uses — eyebrow, display title, strata divider — instead of
 * a full-bleed dark panel of its own. Two reasons: a visitor arriving from
 * Agenda or Expositores should land on the same kind of page, and the pass
 * card further down is meant to be the only dark object on the route, which
 * only reads if nothing above it is competing.
 *
 * What it borrows from the home hero is the motion: the block and its calls to
 * action arrive in sequence on the same curve, and the buttons take the same
 * hover nudge.
 */
export function TicketsHero() {
  const reduced = useReducedMotion() ?? false;
  const item = riseItem(reduced);

  return (
    <PageContainer className="pb-0">
      <motion.div variants={staggerContainer()} initial="hidden" animate="show">
        <motion.div variants={item}>
          <PageHeader
            eyebrow="Acreditación abierta · 9 al 12 de octubre"
            title="Entradas y acreditación"
            description="Acreditate una vez y el pase se arma solo: tu itinerario de los cuatro días sin choques de horario, y los stands de los rubros que elegiste, marcados en el plano."
          />
        </motion.div>

        <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button asChild size="lg">
              <Link href="#acreditacion">Acreditarme</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button asChild size="lg" variant="outline">
              <Link href="#pases">Ver tipos de pase</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
}
