"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RUBROS, RUBRO_LABELS, type Rubro } from "@/lib/rubros";
import { filterExhibitors, type Exhibitor } from "@/features/exhibitors";
import { PassScopeBar } from "@/components/pass/pass-scope-bar";
import { passCoversEverything, passMatches } from "@/lib/pass-scope";
import { usePass } from "@/lib/pass-store";
import type { VenueStand } from "../types";

const ZONE_FILL: Record<VenueStand["zone"], string> = {
  A: "var(--chart-1)",
  B: "var(--chart-2)",
  C: "var(--chart-3)",
  D: "var(--chart-4)",
};

// Zones A/B (deep violet, indigo) are dark enough for white labels; zones C/D
// (lavender, turquoise) are too light for white text to meet contrast, so they
// use the standard dark foreground token instead.
const ZONE_TEXT: Record<VenueStand["zone"], string> = {
  A: "var(--primary-foreground)",
  B: "var(--primary-foreground)",
  C: "var(--foreground)",
  D: "var(--foreground)",
};

export function VenueMap({
  stands,
  exhibitors,
}: {
  stands: VenueStand[];
  exhibitors: Exhibitor[];
}) {
  const [query, setQuery] = useState("");
  const [rubro, setRubro] = useState<Rubro | "all">("all");
  const [selectedStandId, setSelectedStandId] = useState<string | null>(null);
  const [focusedStandId, setFocusedStandId] = useState<string | null>(null);
  const pass = usePass();
  const [onlyMine, setOnlyMine] = useState(true);

  // Two different questions about the pass. `passStandIds` is "which stands
  // are mine" — it outlines them on the plan even while the whole predio is
  // showing, which is the point of walking in with a pass. `scopingPass` is
  // the stricter "show me only mine", and it can be switched off.
  const passStandIds = useMemo(() => {
    if (!pass || passCoversEverything(pass)) return new Set<string>();
    return new Set(
      exhibitors
        .filter((exhibitor) => passMatches(pass, exhibitor.rubro))
        .map((exhibitor) => exhibitor.id)
    );
  }, [pass, exhibitors]);

  const scopingPass =
    pass && onlyMine && !passCoversEverything(pass) ? pass : null;

  const exhibitorsById = useMemo(
    () => new Map(exhibitors.map((e) => [e.id, e])),
    [exhibitors]
  );

  const matchingExhibitorIds = useMemo(
    () => new Set(filterExhibitors(exhibitors, query, rubro).map((e) => e.id)),
    [exhibitors, query, rubro]
  );

  const selectedExhibitor = selectedStandId
    ? exhibitorsById.get(stands.find((s) => s.id === selectedStandId)?.exhibitorId ?? "")
    : undefined;

  const isVisible = (stand: VenueStand) =>
    matchingExhibitorIds.has(stand.exhibitorId) &&
    (!scopingPass || passStandIds.has(stand.exhibitorId));

  const visibleStandCount = stands.filter(isVisible).length;

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <PassScopeBar
        className="lg:col-span-2"
        noun={{ one: "stand", other: "stands" }}
        count={visibleStandCount}
        onlyMine={onlyMine}
        onOnlyMineChange={setOnlyMine}
      />

      <Card>
        <CardHeader className="flex flex-col gap-4">
          <CardTitle>Plano del predio</CardTitle>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar expositor por nombre..."
              aria-label="Buscar expositor"
              className="sm:max-w-sm"
            />
            <Select value={rubro} onValueChange={(v) => setRubro(v as Rubro | "all")}>
              <SelectTrigger className="sm:w-56" aria-label="Filtrar stands por rubro">
                <SelectValue placeholder="Todos los rubros" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los rubros</SelectItem>
                {RUBROS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {RUBRO_LABELS[r]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {visibleStandCount === 0 && (
            <p className="text-sm text-muted-foreground" role="status">
              {matchingExhibitorIds.size === 0
                ? "Ningún expositor coincide con la búsqueda."
                : "Ningún stand de tus rubros coincide con la búsqueda. Tocá «Ver todo» para mirar el predio completo."}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <svg
            viewBox="0 0 920 280"
            role="group"
            aria-label="Plano del predio con los stands de expositores"
            className="w-full rounded-md border border-border bg-muted/30"
          >
            {stands.map((stand) => {
              const exhibitor = exhibitorsById.get(stand.exhibitorId);
              const visible = isVisible(stand);
              const handleSelectStand = () => setSelectedStandId(stand.id);
              const handleKeyDown = (e: React.KeyboardEvent<SVGGElement>) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelectStand();
                }
              };
              const isFocused = focusedStandId === stand.id;
              const isSelected = selectedStandId === stand.id;
              const inPass = passStandIds.has(stand.exhibitorId);
              const strokeColor = isFocused
                ? "var(--ring)"
                : isSelected
                  ? "var(--foreground)"
                  : inPass
                    ? "var(--accent)"
                    : "transparent";
              return (
                <g
                  key={stand.id}
                  onClick={handleSelectStand}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setFocusedStandId(stand.id)}
                  onBlur={() =>
                    setFocusedStandId((current) => (current === stand.id ? null : current))
                  }
                  tabIndex={visible ? 0 : -1}
                  role="button"
                  aria-label={
                    inPass
                      ? `${exhibitor?.name ?? stand.id} — stand de tu pase`
                      : (exhibitor?.name ?? stand.id)
                  }
                  className="cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  opacity={visible ? 1 : 0.25}
                  pointerEvents={visible ? "auto" : "none"}
                >
                  <rect
                    x={stand.x}
                    y={stand.y}
                    width={stand.width}
                    height={stand.height}
                    rx={8}
                    fill={ZONE_FILL[stand.zone]}
                    stroke={strokeColor}
                    strokeWidth={3}
                  />
                  <text
                    x={stand.x + stand.width / 2}
                    y={stand.y + stand.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={14}
                    fontWeight={600}
                    fill={ZONE_TEXT[stand.zone]}
                  >
                    {stand.id}
                  </text>
                  <title>
                    {exhibitor?.name ?? stand.id}
                    {inPass ? " — stand de tu pase" : ""}
                  </title>
                </g>
              );
            })}
          </svg>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {selectedExhibitor ? selectedExhibitor.name : "Elegí un stand"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {selectedExhibitor ? (
            <>
              <Badge>{RUBRO_LABELS[selectedExhibitor.rubro]}</Badge>
              <p className="text-sm text-muted-foreground">{selectedExhibitor.description}</p>
              <p className="text-xs text-muted-foreground">
                Stand {selectedExhibitor.standId} · {selectedExhibitor.country}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Tocá cualquier stand del plano para ver el expositor que lo ocupa.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
