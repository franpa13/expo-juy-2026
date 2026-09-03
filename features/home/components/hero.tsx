import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";
import { Countdown } from "./countdown";

const VIDEO_FRAME_CLASSES = "h-40 w-full rounded-3xl object-cover sm:h-56 lg:h-104 lg:rounded-[2.5rem]";

export function Hero() {
  return (
    <section className="border-b border-border bg-background">
      <PageContainer className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-accent uppercase">
            9 al 12 de octubre de 2026 · Ciudad Cultural, San Salvador de Jujuy
          </p>
          <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-balance sm:text-6xl">
            Conectando países,
            <br />
            creando oportunidades
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            La 17ª edición de la feria multisectorial más importante del norte
            argentino. Innovación, tecnología, producción y vinculación empresarial
            en un mismo lugar.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/expositores">Ver expositores</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/agenda">Explorar la agenda</Link>
            </Button>
          </div>
          <div className="mt-10">
            <Countdown
              targetDate="2026-10-09T10:00:00-03:00"
              endDate="2026-10-12T18:00:00-03:00"
            />
          </div>
        </div>
        <div className="relative">
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
        </div>
      </PageContainer>
    </section>
  );
}
