"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AGENDA_DAYS, type AgendaSession } from "../types";
import { SessionCard } from "./session-card";

export function AgendaSchedule({ sessions }: { sessions: AgendaSession[] }) {
  const days = Object.keys(AGENDA_DAYS).map(Number) as AgendaSession["day"][];
  const [day, setDay] = useState<AgendaSession["day"]>(days[0]);

  return (
    <Tabs value={String(day)} onValueChange={(v) => setDay(Number(v) as AgendaSession["day"])}>
      <TabsList>
        {days.map((d) => (
          <TabsTrigger key={d} value={String(d)}>
            Día {d}
          </TabsTrigger>
        ))}
      </TabsList>
      {days.map((d) => (
        <TabsContent key={d} value={String(d)} className="space-y-4">
          <h3 className="text-xs font-bold tracking-[0.14em] text-accent uppercase">
            {AGENDA_DAYS[d]}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {sessions
              .filter((s) => s.day === d)
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
