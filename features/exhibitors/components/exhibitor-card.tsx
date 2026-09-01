import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RUBRO_LABELS } from "@/lib/rubros";
import type { Exhibitor } from "../types";

export function ExhibitorCard({ exhibitor }: { exhibitor: Exhibitor }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2">
        <CardTitle className="text-base">{exhibitor.name}</CardTitle>
        <Badge variant="secondary">Stand {exhibitor.standId}</Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <Badge>{RUBRO_LABELS[exhibitor.rubro]}</Badge>
        <p className="text-sm text-muted-foreground">{exhibitor.description}</p>
        <p className="text-xs text-muted-foreground">{exhibitor.country}</p>
      </CardContent>
    </Card>
  );
}
