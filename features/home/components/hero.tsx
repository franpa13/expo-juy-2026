import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Countdown } from "./countdown";

export function Hero() {
  return (
    <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-sm font-semibold tracking-widest text-primary uppercase">
          9 al 12 de octubre de 2026 · Ciudad Cultural, San Salvador de Jujuy
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Conectando países, creando oportunidades
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
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
    </section>
  );
}
