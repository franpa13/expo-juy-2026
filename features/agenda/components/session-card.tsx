import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RUBRO_COLOR, RUBRO_LABELS, type Rubro } from "@/lib/rubros";
import type { AgendaSession } from "../types";

function trackLabel(track: AgendaSession["track"]) {
  return track === "general" ? "General" : RUBRO_LABELS[track as Rubro];
}

function trackColor(track: AgendaSession["track"]) {
  return track === "general" ? "var(--foreground)" : RUBRO_COLOR[track as Rubro];
}

export function SessionCard({ session }: { session: AgendaSession }) {
  const color = trackColor(session.track);

  return (
    <Card className="overflow-hidden py-0">
      <div className="h-1.5 w-full" style={{ background: color }} aria-hidden="true" />
      <CardHeader className="flex flex-row items-start justify-between gap-2 pt-5">
        <CardTitle className="text-base">{session.title}</CardTitle>
        <Badge variant="secondary" className="shrink-0 tabular-nums">
          {session.startTime}–{session.endTime}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2 pb-5">
        <p className="flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase" style={{ color }}>
          <span className="size-1.5 rounded-full" style={{ background: color }} aria-hidden="true" />
          {trackLabel(session.track)}
        </p>
        <p className="text-sm text-muted-foreground">{session.description}</p>
        <p className="text-xs text-muted-foreground">
          {session.location}
          {session.speaker ? ` · ${session.speaker}` : ""}
        </p>
      </CardContent>
    </Card>
  );
}
