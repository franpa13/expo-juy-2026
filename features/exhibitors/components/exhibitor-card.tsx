import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RUBRO_COLOR, RUBRO_LABELS } from "@/lib/rubros";
import type { Exhibitor } from "../types";

export function ExhibitorCard({ exhibitor }: { exhibitor: Exhibitor }) {
  const color = RUBRO_COLOR[exhibitor.rubro];

  return (
    <Card className="overflow-hidden py-0">
      <div className="h-1.5 w-full" style={{ background: color }} aria-hidden="true" />
      <CardHeader className="flex flex-row items-start justify-between gap-2 pt-5">
        <CardTitle className="text-base">{exhibitor.name}</CardTitle>
        <Badge variant="secondary" className="shrink-0">
          Stand {exhibitor.standId}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2 pb-5">
        <p className="flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase" style={{ color }}>
          <span className="size-1.5 rounded-full" style={{ background: color }} aria-hidden="true" />
          {RUBRO_LABELS[exhibitor.rubro]}
        </p>
        <p className="text-sm text-muted-foreground">{exhibitor.description}</p>
        <p className="text-xs text-muted-foreground">{exhibitor.country}</p>
      </CardContent>
    </Card>
  );
}
