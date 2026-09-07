import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RUBRO_COLOR, RUBRO_LABELS } from "@/lib/rubros";
import { cn } from "@/lib/utils";
import type { Exhibitor } from "../types";

/**
 * `inPass` marks an exhibitor whose rubro the visitor picked when they
 * accredited. It stays optional so the card keeps working untouched for the
 * visitors who have no pass.
 */
export function ExhibitorCard({
  exhibitor,
  inPass = false,
}: {
  exhibitor: Exhibitor;
  inPass?: boolean;
}) {
  const color = RUBRO_COLOR[exhibitor.rubro];

  return (
    <Card
      className={cn("overflow-hidden py-0", inPass && "border-primary/40 bg-primary/[0.03]")}
    >
      <div className="h-1.5 w-full" style={{ background: color }} aria-hidden="true" />
      <CardHeader className="flex flex-row items-start justify-between gap-2 pt-5">
        <CardTitle className="text-base">{exhibitor.name}</CardTitle>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <Badge variant="secondary">Stand {exhibitor.standId}</Badge>
          {inPass ? <Badge>En tu pase</Badge> : null}
        </div>
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
