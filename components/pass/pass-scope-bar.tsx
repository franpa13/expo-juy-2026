"use client";

import Link from "next/link";
import { TicketCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { passCoversEverything, passFirstName } from "@/lib/pass-scope";
import { usePass } from "@/lib/pass-store";

interface PassScopeBarProps {
  /** What the page is listing, in both numbers: `{ one: "expositor", other: "expositores" }`. */
  noun: { one: string; other: string };
  onlyMine: boolean;
  onOnlyMineChange: (onlyMine: boolean) => void;
  /** How many items are showing right now, if the page can say. */
  count?: number;
  className?: string;
}

/**
 * The pass, seen from the rest of the site. Renders nothing for a visitor who
 * has not accredited, so every page it sits on works exactly as before until
 * there is a pass to honour — and once there is one, the same bar appears on
 * the agenda, the catalogue and the map, which is what makes the credential
 * feel like it travels with you instead of ending on the entradas page.
 */
export function PassScopeBar({
  noun,
  onlyMine,
  onOnlyMineChange,
  count,
  className,
}: PassScopeBarProps) {
  const pass = usePass();

  if (!pass) return null;

  const coversEverything = passCoversEverything(pass);
  const scoped = onlyMine && !coversEverything;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border border-primary/30 bg-primary/5 px-4 py-3",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <TicketCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
        <div className="text-sm">
          <p className="font-semibold">
            Hola, {passFirstName(pass)} — tu pase{" "}
            <span className="font-mono text-xs tracking-wide">{pass.code}</span> está activo.
          </p>
          <p className="text-muted-foreground" role="status">
            {coversEverything
              ? `Tu pase cubre todo el evento, así que ves ${noun.other} de todos los rubros.`
              : scoped
                ? count === undefined
                  ? `Mostrando ${noun.other} de tus rubros.`
                  : `Mostrando ${count} ${count === 1 ? noun.one : noun.other} de tus rubros.`
                : `Mostrando todos los ${noun.other} del evento.`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {coversEverything ? null : (
          <Button
            type="button"
            size="sm"
            variant={scoped ? "default" : "outline"}
            aria-pressed={scoped}
            onClick={() => onOnlyMineChange(!onlyMine)}
          >
            {scoped ? "Ver todo" : "Ver sólo lo mío"}
          </Button>
        )}
        <Button asChild size="sm" variant="ghost">
          <Link href="/entradas#pase">Ver mi pase</Link>
        </Button>
      </div>
    </div>
  );
}
