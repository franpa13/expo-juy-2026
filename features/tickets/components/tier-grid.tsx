"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { riseItem, staggerContainer } from "../lib/motion-presets";
import type { TicketTier } from "../types";

/**
 * Rank is carried by weight, not by a ribbon — the same call the sponsors
 * page makes with its tiers: the pass most people come for sits on a filled
 * card with a heavier rule, the other two stay quiet. A "MÁS ELEGIDO" tag
 * would also be a claim this prototype cannot back with numbers, whereas the
 * `audience` line on every card tells a visitor which one is theirs.
 *
 * What each pass includes is a ruled list, the reading rhythm used across the
 * site (the footer, the itinerary inside the pass), rather than a column of
 * check marks.
 */
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
                "flex w-full flex-col border p-6 transition-colors",
                selected
                  ? "border-primary bg-secondary/50 ring-2 ring-primary/25"
                  : tier.featured
                    ? "border-primary/40 bg-secondary/40"
                    : "border-line bg-card"
              )}
            >
              <p className="text-xs font-bold tracking-[0.14em] text-accent uppercase">
                {tier.audience}
              </p>
              <h3
                className={cn(
                  "mt-3 font-extrabold tracking-tight",
                  tier.featured ? "text-2xl" : "text-xl"
                )}
              >
                {tier.name}
              </h3>

              <p className="mt-5 text-3xl font-extrabold tracking-tight tabular-nums">
                {tier.price}
              </p>
              <p className="mt-1 text-xs font-bold tracking-[0.1em] text-muted-foreground uppercase">
                {tier.priceNote}
              </p>

              <p className="mt-5 text-sm text-muted-foreground">{tier.summary}</p>

              <ul className="mt-6 divide-y divide-line border-t border-line text-sm">
                {tier.includes.map((line) => (
                  <li key={line} className="py-2.5">
                    {line}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex grow items-end pt-2">
                {tier.selfService && onSelect ? (
                  <Button
                    type="button"
                    variant={selected ? "default" : "outline"}
                    onClick={() => onSelect(tier.id)}
                    aria-pressed={selected}
                    className="w-full"
                  >
                    {selected ? "Pase elegido" : "Elegir este pase"}
                  </Button>
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
