import { cn } from "@/lib/utils";

/**
 * ExpoJuy's signature visual motif: irregular horizontal color bands, in the
 * fixed brand palette, evoking the Serranía del Hornocal ("Cerro de los
 * Siete Colores") outside Humahuaca — the province's most recognizable
 * landscape, a mountainside of stacked, sharply-banded mineral strata.
 *
 * Two sizes, one motif: `StrataDivider` (thin, flat) marks section rhythm
 * across every page; `StrataPanel` (thick, tilted) is the one place it gets
 * to be the hero. Deliberately not a smooth blurred gradient — the bands
 * are hard-edged and unevenly sized, like rock strata, not a SaaS glow.
 */

// Irregular widths, like real strata — never uniform stripes.
const BANDS = [
  { color: "var(--primary)", weight: 5 },
  { color: "var(--ring)", weight: 3 },
  { color: "var(--chart-3)", weight: 2 },
  { color: "var(--accent)", weight: 4 },
  { color: "var(--foreground)", weight: 1 },
  { color: "var(--accent)", weight: 2 },
  { color: "var(--ring)", weight: 3 },
] as const;

function bandStops() {
  const total = BANDS.reduce((sum, b) => sum + b.weight, 0);
  let acc = 0;
  return BANDS.map((b) => {
    const start = (acc / total) * 100;
    acc += b.weight;
    const end = (acc / total) * 100;
    return `${b.color} ${start}% ${end}%`;
  }).join(", ");
}

export function StrataDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("h-1.5 w-full rounded-full", className)}
      style={{ backgroundImage: `linear-gradient(90deg, ${bandStops()})` }}
    />
  );
}

export function StrataPanel({ className }: { className?: string }) {
  const total = BANDS.reduce((sum, b) => sum + b.weight, 0);
  return (
    <div aria-hidden="true" className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-[-15%] -rotate-6">
        <div className="flex h-full w-full flex-col">
          {BANDS.map((b, i) => (
            <div
              key={i}
              style={{ background: b.color, flexBasis: `${(b.weight / total) * 100}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
