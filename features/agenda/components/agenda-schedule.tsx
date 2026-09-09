"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PassScopeBar } from "@/components/pass/pass-scope-bar";
import { passCoversEverything, passMatches } from "@/lib/pass-scope";
import { usePass } from "@/lib/pass-store";
import { AGENDA_DAYS, type AgendaSession } from "../types";
import { SessionCard } from "./session-card";

export function AgendaSchedule({ sessions }: { sessions: AgendaSession[] }) {
  const days = Object.keys(AGENDA_DAYS).map(Number) as AgendaSession["day"][];
  const [day, setDay] = useState<AgendaSession["day"]>(days[0]);
  const pass = usePass();
  const [onlyMine, setOnlyMine] = useState(true);

  // Null unless there is a pass that actually narrows the programme: an
  // accredited visitor who chose no rubro sees the whole schedule, same as
  // someone who never accredited.
  const scopingPass =
    pass && onlyMine && !passCoversEverything(pass) ? pass : null;

  const visibleSessions = useMemo(
    () =>
      scopingPass
        ? sessions.filter((session) => passMatches(scopingPass, session.track))
        : sessions,
    [sessions, scopingPass]
  );

  return (
    <div className="space-y-6">
      <PassScopeBar
        noun={{ one: "actividad", other: "actividades" }}
        count={visibleSessions.length}
        onlyMine={onlyMine}
        onOnlyMineChange={setOnlyMine}
      />

      <Tabs value={String(day)} onValueChange={(v) => setDay(Number(v) as AgendaSession["day"])}>
        <TabsList>
          {days.map((d) => (
            <TabsTrigger key={d} value={String(d)}>
              Día {d}
            </TabsTrigger>
          ))}
        </TabsList>
        {days.map((d) => {
          const daySessions = visibleSessions
            .filter((s) => s.day === d)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));

          return (
            <TabsContent key={d} value={String(d)} className="space-y-4">
              <h3 className="text-xs font-bold tracking-[0.14em] text-accent uppercase">
                {AGENDA_DAYS[d]}
              </h3>
              {daySessions.length === 0 ? (
                <p className="text-sm text-muted-foreground" role="status">
                  Este día no tiene actividades de tus rubros. Tocá «Ver todo» para
                  mirar el cronograma completo.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {daySessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))}
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
