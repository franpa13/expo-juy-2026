"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";
import { Countdown } from "./countdown";

const VIDEO_FRAME_CLASSES = "h-40 w-full rounded-3xl object-cover sm:h-56 lg:h-104 lg:rounded-[2.5rem]";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="border-b border-border bg-background">
      <PageContainer className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        <motion.div initial="hidden" animate="show" variants={container}>
          <motion.p
            variants={item}
            className="text-xs font-bold tracking-[0.14em] text-accent uppercase"
          >
            9 al 12 de octubre de 2026 · Ciudad Cultural, San Salvador de Jujuy
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-4 text-5xl font-extrabold tracking-tight text-balance sm:text-6xl"
          >
            Conectando países,
            <br />
            creando oportunidades
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-lg text-lg text-muted-foreground">
            La 17ª edición de la feria multisectorial más importante del norte
            argentino. Innovación, tecnología, producción y vinculación empresarial
            en un mismo lugar.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="lg">
                <Link href="/expositores">Ver expositores</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="lg" variant="outline">
                <Link href="/agenda">Explorar la agenda</Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div variants={item} className="mt-10">
            <Countdown
              targetDate="2026-10-09T10:00:00-03:00"
              endDate="2026-10-12T18:00:00-03:00"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: prefersReducedMotion ? 0 : 0.3,
          }}
          className="relative"
        >
          {/* Real footage from a past ExpoJuy edition, filmed at Ciudad Cultural —
              muted, looping ambiance. A static frame stands in for it when a
              viewer has prefers-reduced-motion on. */}
          <video
            className={`${VIDEO_FRAME_CLASSES} motion-reduce:hidden`}
            src="/videos/expojuy-highlights.mp4"
            poster="/images/expojuy-highlights-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <Image
            src="/images/expojuy-highlights-poster.jpg"
            alt="Fotografía aérea nocturna de Ciudad Cultural durante una edición anterior de ExpoJuy"
            width={1280}
            height={720}
            className={`hidden ${VIDEO_FRAME_CLASSES} motion-reduce:block`}
          />
        </motion.div>
      </PageContainer>
    </section>
  );
}
