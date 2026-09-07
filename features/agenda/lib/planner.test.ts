import { describe, it, expect } from "vitest";
import { buildItinerary } from "./planner";
import type { AgendaSession } from "../types";

const sessions: AgendaSession[] = [
  { id: "a", day: 1, title: "A", description: "", track: "general", startTime: "10:00", endTime: "11:00", location: "" },
  { id: "b", day: 1, title: "B", description: "", track: "mineria", startTime: "10:30", endTime: "11:30", location: "" },
  { id: "c", day: 1, title: "C", description: "", track: "tecnologia", startTime: "11:30", endTime: "12:30", location: "" },
  { id: "d", day: 2, title: "D", description: "", track: "tecnologia", startTime: "09:00", endTime: "10:00", location: "" },
];

describe("buildItinerary", () => {
  it("returns every session in chronological order — day first, then start time", () => {
    // d starts at 09:00 but on day 2, so it comes after day 1's later sessions.
    const result = buildItinerary({ sessions: [sessions[2], sessions[3], sessions[0]], interests: [] });
    expect(result.map((s) => s.id)).toEqual(["a", "c", "d"]);
  });

  it("does not interleave days when an earlier clock time falls on a later day", () => {
    const acrossDays: AgendaSession[] = [
      { id: "late-day1", day: 1, title: "", description: "", track: "general", startTime: "17:00", endTime: "18:00", location: "" },
      { id: "early-day2", day: 2, title: "", description: "", track: "general", startTime: "09:00", endTime: "10:00", location: "" },
    ];
    const result = buildItinerary({ sessions: acrossDays, interests: [] });
    expect(result.map((s) => s.id)).toEqual(["late-day1", "early-day2"]);
  });

  it("drops sessions that overlap an already-picked session on the same day", () => {
    // a (10:00-11:00) and b (10:30-11:30) overlap on day 1; a starts first so b is dropped
    const result = buildItinerary({ sessions: [sessions[0], sessions[1]], interests: [] });
    expect(result.map((s) => s.id)).toEqual(["a"]);
  });

  it("filters by interests (track)", () => {
    const result = buildItinerary({ sessions, interests: ["tecnologia"] });
    expect(result.map((s) => s.id).sort()).toEqual(["c", "d"]);
  });

  it("filters by day when provided", () => {
    const result = buildItinerary({ sessions, interests: [], day: 2 });
    expect(result.map((s) => s.id)).toEqual(["d"]);
  });

  it("does not overlap sessions across different days", () => {
    const crossDay: AgendaSession[] = [
      { id: "x", day: 1, title: "X", description: "", track: "general", startTime: "10:00", endTime: "11:00", location: "" },
      { id: "y", day: 2, title: "Y", description: "", track: "general", startTime: "10:00", endTime: "11:00", location: "" },
    ];
    const result = buildItinerary({ sessions: crossDay, interests: [] });
    expect(result.map((s) => s.id).sort()).toEqual(["x", "y"]);
  });
});
