"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RUBROS, RUBRO_LABELS, type Rubro } from "@/lib/rubros";
import type { Exhibitor } from "@/features/exhibitors";
import type { VenueStand } from "../types";

const ZONE_FILL: Record<VenueStand["zone"], string> = {
  A: "var(--chart-1)",
  B: "var(--chart-2)",
  C: "var(--chart-3)",
  D: "var(--chart-4)",
};

export function VenueMap({
  stands,
  exhibitors,
}: {
  stands: VenueStand[];
  exhibitors: Exhibitor[];
}) {
  const [rubro, setRubro] = useState<Rubro | "all">("all");
  const [selectedStandId, setSelectedStandId] = useState<string | null>(null);

  const exhibitorsById = useMemo(
    () => new Map(exhibitors.map((e) => [e.id, e])),
    [exhibitors]
  );

  const selectedExhibitor = selectedStandId
    ? exhibitorsById.get(stands.find((s) => s.id === selectedStandId)?.exhibitorId ?? "")
    : undefined;

  const isVisible = (stand: VenueStand) => {
    if (rubro === "all") return true;
    return exhibitorsById.get(stand.exhibitorId)?.rubro === rubro;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle>Plano del predio</CardTitle>
          <Select value={rubro} onValueChange={(v) => setRubro(v as Rubro | "all")}>
            <SelectTrigger className="w-56" aria-label="Filtrar stands por rubro">
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
        </CardHeader>
        <CardContent>
          <svg
            viewBox="0 0 920 280"
            role="img"
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
              return (
                <g
                  key={stand.id}
                  onClick={handleSelectStand}
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                  role="button"
                  aria-label={exhibitor?.name ?? stand.id}
                  className="cursor-pointer outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded"
                  opacity={visible ? 1 : 0.25}
                >
                  <rect
                    x={stand.x}
                    y={stand.y}
                    width={stand.width}
                    height={stand.height}
                    rx={8}
                    fill={ZONE_FILL[stand.zone]}
                    stroke={selectedStandId === stand.id ? "var(--foreground)" : "transparent"}
                    strokeWidth={3}
                  />
                  <text
                    x={stand.x + stand.width / 2}
                    y={stand.y + stand.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={14}
                    fontWeight={600}
                    fill="var(--primary-foreground)"
                  >
                    {stand.id}
                  </text>
                  <title>{exhibitor?.name ?? stand.id}</title>
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
