import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import type { Sponsor, SponsorTier as Tier } from "../types";

const TIER_LABELS: Record<Tier, string> = {
  platino: "Platino",
  oro: "Oro",
  plata: "Plata",
};

// Visual weight encodes tier rank — platino reads biggest and boldest,
// plata quietest — instead of three identical rows that only differ by a
// text label.
const TIER_STYLE: Record<Tier, { heading: string; card: string; height: string; name: string }> = {
  platino: {
    heading: "text-2xl text-primary",
    card: "border-2 border-primary/25 bg-secondary/50",
    height: "h-28",
    name: "text-lg font-bold",
  },
  oro: {
    heading: "text-xl text-accent-foreground",
    card: "border border-accent/40",
    height: "h-24",
    name: "text-base font-semibold",
  },
  plata: {
    heading: "text-base text-muted-foreground",
    card: "border border-border",
    height: "h-20",
    name: "text-sm font-medium text-muted-foreground",
  },
};

export function SponsorTier({ tier, sponsors }: { tier: Tier; sponsors: Sponsor[] }) {
  const filtered = sponsors.filter((s) => s.tier === tier);
  if (filtered.length === 0) return null;

  const style = TIER_STYLE[tier];

  return (
    <div>
      <h2 className={cn("font-extrabold tracking-tight", style.heading)}>{TIER_LABELS[tier]}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((sponsor) => (
          <Card key={sponsor.id} className={style.card}>
            <CardContent
              className={cn("flex items-center justify-center p-4 text-center", style.height, style.name)}
            >
              {sponsor.name}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
