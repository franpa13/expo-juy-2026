import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const HIGHLIGHTS = [
  { href: "/expositores", title: "Expositores", description: "Buscá y filtrá empresas por rubro." },
  { href: "/agenda", title: "Agenda inteligente", description: "Armá tu itinerario sin choques de horario." },
  { href: "/mapa", title: "Mapa del predio", description: "Ubicá cada stand en el plano interactivo." },
  { href: "/noticias", title: "Noticias", description: "Novedades y anuncios de la organización." },
  { href: "/sponsors", title: "Sponsors", description: "Empresas e instituciones que acompañan el evento." },
  { href: "/sobre-expojuy", title: "Sobre ExpoJuy", description: "Historia, valores y objetivos del evento." },
];

export function SectionHighlights() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-xs font-bold tracking-[0.14em] text-accent uppercase">Recorré el sitio</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Todo lo que necesitás saber</h2>
      <div className="mt-8 border-t border-line">
        {HIGHLIGHTS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center justify-between gap-6 border-b border-line py-6 transition-colors hover:bg-secondary/40"
          >
            <div className="flex items-baseline gap-4 sm:gap-8">
              <span className="text-xl font-bold tracking-tight sm:text-2xl">{item.title}</span>
              <span className="hidden max-w-xs text-sm text-muted-foreground sm:block">
                {item.description}
              </span>
            </div>
            <ArrowUpRight
              className="size-6 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
