import { Card, CardContent } from "@/components/ui/card";
import type { Sponsor, SponsorTier as Tier } from "../types";

const TIER_LABELS: Record<Tier, string> = {
  platino: "Platino",
  oro: "Oro",
  plata: "Plata",
};

export function SponsorTier({ tier, sponsors }: { tier: Tier; sponsors: Sponsor[] }) {
  const filtered = sponsors.filter((s) => s.tier === tier);
  if (filtered.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight">{TIER_LABELS[tier]}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((sponsor) => (
          <Card key={sponsor.id}>
            <CardContent className="flex h-24 items-center justify-center p-4 text-center text-sm font-medium">
              {sponsor.name}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
