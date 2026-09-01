import type { ActivityTrack, AgendaSession } from "../types";

export interface PlannerInput {
  sessions: AgendaSession[];
  interests: ActivityTrack[];
  day?: AgendaSession["day"];
}

/**
 * Greedy earliest-start itinerary builder: filters by day/interests, sorts by
 * start time, then keeps a session only if it doesn't overlap one already
 * picked on the same day. This is a simple heuristic (not a guaranteed
 * maximum-count schedule) — good enough for a visitor-facing planner.
 */
export function buildItinerary({ sessions, interests, day }: PlannerInput): AgendaSession[] {
  const pool = sessions
    .filter((s) => (day === undefined ? true : s.day === day))
    .filter((s) => interests.length === 0 || interests.includes(s.track))
    .slice()
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const itinerary: AgendaSession[] = [];
  for (const session of pool) {
    const overlaps = itinerary.some(
      (picked) => picked.day === session.day && timeRangesOverlap(picked, session)
    );
    if (!overlaps) itinerary.push(session);
  }
  return itinerary;
}

function timeRangesOverlap(
  a: Pick<AgendaSession, "startTime" | "endTime">,
  b: Pick<AgendaSession, "startTime" | "endTime">
): boolean {
  return a.startTime < b.endTime && b.startTime < a.endTime;
}
