import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StrataPanel } from "@/components/layout/strata";
import { Countdown } from "./countdown";

export function Hero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
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
        <StrataPanel className="h-40 rounded-3xl sm:h-56 lg:h-104 lg:rounded-[2.5rem]" />
      </div>
    </section>
  );
}
