import { describe, expect, it } from "vitest";
import type { AgendaSession } from "@/features/agenda";
import type { Exhibitor } from "@/features/exhibitors";
import { TICKET_TIERS } from "../data/tiers";
import { buildPass, buildPassCode, passQrPayload } from "./pass";
import type { PassRequest } from "../types";

const TIER = TICKET_TIERS[0];

const SESSIONS: AgendaSession[] = [
  { id: "s1", title: "Apertura", description: "", track: "general", day: 1, startTime: "10:00", endTime: "11:00", location: "Auditorio" },
  { id: "s2", title: "Litio", description: "", track: "mineria", day: 1, startTime: "10:30", endTime: "11:30", location: "Sala A" },
  { id: "s3", title: "Puna solar", description: "", track: "energias-renovables", day: 2, startTime: "12:00", endTime: "13:00", location: "Sala B" },
  { id: "s4", title: "Cierre", description: "", track: "mineria", day: 2, startTime: "17:00", endTime: "18:00", location: "Auditorio" },
];

const EXHIBITORS: Exhibitor[] = [
  { id: "e1", name: "Andes Litio", rubro: "mineria", standId: "A1", description: "", country: "Argentina" },
  { id: "e2", name: "Puna Solar", rubro: "energias-renovables", standId: "B2", description: "", country: "Argentina" },
  { id: "e3", name: "Quebrada Textil", rubro: "industria", standId: "A2", description: "", country: "Argentina" },
];

const baseRequest: PassRequest = {
  fullName: "Gabriel Prieto",
  email: "gabriel@example.com",
  tierId: "general",
  interests: [],
};

function build(request: Partial<PassRequest> = {}) {
  return buildPass({
    request: { ...baseRequest, ...request },
    tier: TIER,
    sessions: SESSIONS,
    exhibitors: EXHIBITORS,
  });
}

describe("buildPassCode", () => {
  it("is deterministic for the same holder and tier", () => {
    expect(buildPassCode(baseRequest)).toBe(buildPassCode({ ...baseRequest }));
  });

  it("ignores casing and surrounding whitespace", () => {
    expect(buildPassCode({ ...baseRequest, fullName: "  GABRIEL PRIETO " })).toBe(
      buildPassCode(baseRequest)
    );
  });

  it("changes when the tier changes", () => {
    expect(buildPassCode({ ...baseRequest, tierId: "profesional" })).not.toBe(
      buildPassCode(baseRequest)
    );
  });

  it("uses the unambiguous alphabet and the EJ26 shape", () => {
    expect(buildPassCode(baseRequest)).toMatch(/^EJ26-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{2}$/);
  });
});

describe("buildPass", () => {
  it("keeps only sessions that do not overlap", () => {
    const pass = build({ interests: [] });
    // s1 10:00-11:00 and s2 10:30-11:30 collide on day 1 — only one survives.
    expect(pass.itinerary).toHaveLength(3);
    expect(pass.itinerary.map((s) => s.id)).toEqual(["s1", "s3", "s4"]);
  });

  it("narrows the itinerary to the chosen interests", () => {
    const pass = build({ interests: ["mineria"] });
    expect(pass.itinerary.map((s) => s.id)).toEqual(["s2", "s4"]);
  });

  it("pairs the pass with the stands of the chosen rubros, ordered by stand", () => {
    const pass = build({ interests: ["mineria", "energias-renovables"] });
    expect(pass.stands.map((s) => s.standId)).toEqual(["A1", "B2"]);
  });

  it("covers the whole event when no interest is chosen", () => {
    const pass = build({ interests: [] });
    expect(pass.stands).toHaveLength(EXHIBITORS.length);
  });

  it("counts the distinct days the itinerary touches", () => {
    expect(build({ interests: ["mineria"] }).daysCovered).toBe(2);
    expect(build({ interests: ["energias-renovables"] }).daysCovered).toBe(1);
  });

  it("trims the holder name it prints on the credential", () => {
    expect(build({ fullName: "  Gabriel Prieto  " }).holderName).toBe("Gabriel Prieto");
  });
});

describe("passQrPayload", () => {
  it("namespaces the code so a scanner knows what it read", () => {
    expect(passQrPayload("EJ26-ABCD-EF")).toBe("EXPOJUY2026:PASE:EJ26-ABCD-EF");
  });
});
