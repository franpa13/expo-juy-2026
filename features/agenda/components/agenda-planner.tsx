"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RUBROS, RUBRO_LABELS } from "@/lib/rubros";
import { buildItinerary } from "../lib/planner";
import type { ActivityTrack, AgendaSession } from "../types";
import { SessionCard } from "./session-card";

const TRACK_OPTIONS: { value: ActivityTrack; label: string }[] = [
  { value: "general", label: "General" },
  ...RUBROS.map((r) => ({ value: r as ActivityTrack, label: RUBRO_LABELS[r] })),
];

export function AgendaPlanner({ sessions }: { sessions: AgendaSession[] }) {
  const [interests, setInterests] = useState<ActivityTrack[]>([]);

  const itinerary = useMemo(
    () => buildItinerary({ sessions, interests }),
    [sessions, interests]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Planificador de agenda inteligente</CardTitle>
        <p className="text-sm text-muted-foreground">
          Elegí tus intereses y armamos un itinerario sin choques de horario para
          los cuatro días del evento.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <ToggleGroup
          type="multiple"
          value={interests}
          onValueChange={(v) => setInterests(v as ActivityTrack[])}
          className="flex flex-wrap justify-start gap-2"
          aria-label="Elegí tus intereses"
        >
          {TRACK_OPTIONS.map((option) => (
            <ToggleGroupItem key={option.value} value={option.value} variant="outline">
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <div>
          <p className="text-sm font-medium text-foreground" role="status">
            {interests.length === 0
              ? `Mostrando las ${itinerary.length} actividades sin superposición de horario.`
              : `Tu itinerario tiene ${itinerary.length} actividades sin choques de horario.`}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {itinerary.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
