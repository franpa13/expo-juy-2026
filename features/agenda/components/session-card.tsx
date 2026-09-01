import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RUBRO_LABELS, type Rubro } from "@/lib/rubros";
import type { AgendaSession } from "../types";

function trackLabel(track: AgendaSession["track"]) {
  return track === "general" ? "General" : RUBRO_LABELS[track as Rubro];
}

export function SessionCard({ session }: { session: AgendaSession }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2">
        <CardTitle className="text-base">{session.title}</CardTitle>
        <Badge variant="secondary">
          {session.startTime}–{session.endTime}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <Badge>{trackLabel(session.track)}</Badge>
        <p className="text-sm text-muted-foreground">{session.description}</p>
        <p className="text-xs text-muted-foreground">
          {session.location}
          {session.speaker ? ` · ${session.speaker}` : ""}
        </p>
      </CardContent>
    </Card>
  );
}
