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
  it("returns all sessions sorted by start time when there are no interests or overlaps", () => {
    const result = buildItinerary({ sessions: [sessions[0], sessions[2], sessions[3]], interests: [] });
    expect(result.map((s) => s.id)).toEqual(["a", "d", "c"].sort((x, y) =>
      sessions.find((s) => s.id === x)!.startTime.localeCompare(sessions.find((s) => s.id === y)!.startTime)
    ));
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
