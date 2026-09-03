"use client";

import Link from "next/link";
import { Check, Lock } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { riseItem, staggerContainer } from "../lib/motion-presets";
import type { TicketTier } from "../types";

export function TierGrid({
  tiers,
  selectedId,
  onSelect,
}: {
  tiers: TicketTier[];
  selectedId?: string;
  onSelect?: (id: TicketTier["id"]) => void;
}) {
  const reduced = useReducedMotion() ?? false;
  const item = riseItem(reduced, 18);

  return (
    <motion.ul
      variants={staggerContainer(0.09)}
      // Plays on mount rather than on scroll: an IntersectionObserver reveal
      // leaves everything below the fold at opacity 0 until someone scrolls,
      // which breaks full-page screenshots and PDF exports of the site — the
      // exact things a jury is likely to take. The stagger still reads on the
      // way in; nothing depends on it to become visible.
      initial="hidden"
      animate="show"
      className="grid gap-5 lg:grid-cols-3"
    >
      {tiers.map((tier) => {
        const selected = tier.id === selectedId;
        return (
          <motion.li key={tier.id} variants={item} className="flex">
            <article
              className={cn(
                "relative flex w-full flex-col border bg-card p-6 transition-colors",
                selected
                  ? "border-primary ring-2 ring-primary/25"
                  : tier.featured
                    ? "border-primary/50"
                    : "border-line"
              )}
            >
              {tier.featured ? (
                <span className="absolute -top-px right-6 -translate-y-1/2 bg-primary px-2.5 py-1 text-[0.65rem] font-bold tracking-[0.14em] text-primary-foreground uppercase">
                  Más elegido
                </span>
              ) : null}

              <h3 className="text-xl font-extrabold tracking-tight">{tier.name}</h3>

              <p className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight tabular-nums">
                  {tier.price}
                </span>
              </p>
              <p className="mt-1 text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase">
                {tier.priceNote}
              </p>

              <p className="mt-4 text-sm text-muted-foreground">{tier.summary}</p>

              <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6 text-sm">
                {tier.includes.map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex grow items-end pt-2">
                {tier.selfService && onSelect ? (
                  <button
                    type="button"
                    onClick={() => onSelect(tier.id)}
                    aria-pressed={selected}
                    className={cn(
                      "h-10 w-full border text-xs font-semibold tracking-widest uppercase transition-all outline-none",
                      "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 active:translate-y-px",
                      selected
                        ? "border-transparent bg-primary text-primary-foreground"
                        : "border-border hover:bg-muted"
                    )}
                  >
                    {selected ? "Pase elegido" : "Elegir este pase"}
                  </button>
                ) : (
                  // The icon and the sentence are the only flex items — the
                  // sentence stays one text run so its final period does not
                  // become a gap-separated child of its own.
                  <p className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                    <span>
                      Se gestiona con la organización desde{" "}
                      <Link
                        className="underline underline-offset-2 hover:text-foreground"
                        href="/contacto"
                      >
                        Contacto
                      </Link>
                      .
                    </span>
                  </p>
                )}
              </div>
            </article>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
