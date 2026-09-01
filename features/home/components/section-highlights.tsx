import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-2xl font-bold tracking-tight">Explorá el sitio</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HIGHLIGHTS.map((item) => (
          <Link key={item.href} href={item.href} className="block">
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
