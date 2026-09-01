import { cn } from "@/lib/utils";

/**
 * Topographic contour-line texture — the same "terrain in layers" idea as
 * the strata motif (components/layout/strata.tsx), drawn as flowing
 * isolines instead of hard color bands. Used as the static/no-motion
 * background for the stats band (components/layout/stats-band section):
 * the default background there is the real ExpoJuy highlight video: this
 * is what shows instead when a viewer has prefers-reduced-motion on, or
 * while the video hasn't loaded yet.
 */

function wavePath(baseY: number, amplitude: number, frequency: number, phase: number, width: number) {
  const step = 16;
  const points: string[] = [];
  for (let x = -step; x <= width + step; x += step) {
    const y = baseY + amplitude * Math.sin((x / width) * frequency * Math.PI * 2 + phase);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `M${points.join(" L")}`;
}

// Irregular spacing and amplitude per line, like real elevation isolines
// crowding around a slope rather than an evenly-ruled grid.
const LINES = [
  { y: 20, amp: 14, freq: 2.3, phase: 0.2 },
  { y: 46, amp: 20, freq: 1.7, phase: 1.1 },
  { y: 78, amp: 12, freq: 2.8, phase: 2.4 },
  { y: 108, amp: 24, freq: 1.4, phase: 0.6 },
  { y: 142, amp: 16, freq: 2.1, phase: 3.1 },
  { y: 172, amp: 10, freq: 3.2, phase: 1.7 },
  { y: 200, amp: 22, freq: 1.6, phase: 2.0 },
  { y: 232, amp: 14, freq: 2.5, phase: 0.9 },
  { y: 262, amp: 18, freq: 1.9, phase: 3.6 },
  { y: 292, amp: 12, freq: 2.6, phase: 1.3 },
];

export function TopoLines({ className, width = 1200, height = 320 }: { className?: string; width?: number; height?: number }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("h-full w-full", className)}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {LINES.map((line, i) => (
        <path
          key={i}
          d={wavePath(line.y, line.amp, line.freq, line.phase, width)}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeOpacity={0.35}
        />
      ))}
    </svg>
  );
}
