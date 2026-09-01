import { describe, it, expect } from "vitest";
import { filterExhibitors } from "./filter";
import type { Exhibitor } from "../types";

const sample: Exhibitor[] = [
  { id: "1", name: "Andes Litio S.A.", rubro: "mineria", standId: "A1", country: "Argentina", description: "Extracción de litio en la Puna." },
  { id: "2", name: "Puna Solar", rubro: "energias-renovables", standId: "A2", country: "Argentina", description: "Parques solares fotovoltaicos." },
  { id: "3", name: "Rutas del Norte Turismo", rubro: "turismo", standId: "B1", country: "Argentina", description: "Circuitos por la Quebrada." },
];

describe("filterExhibitors", () => {
  it("returns everything when query and rubro are empty/all", () => {
    expect(filterExhibitors(sample, "", "all")).toHaveLength(3);
  });

  it("filters by rubro", () => {
    const result = filterExhibitors(sample, "", "mineria");
    expect(result.map((e) => e.id)).toEqual(["1"]);
  });

  it("filters by case-insensitive query against name and description", () => {
    expect(filterExhibitors(sample, "solar", "all").map((e) => e.id)).toEqual(["2"]);
    expect(filterExhibitors(sample, "QUEBRADA", "all").map((e) => e.id)).toEqual(["3"]);
  });

  it("combines query and rubro filters", () => {
    expect(filterExhibitors(sample, "litio", "turismo")).toHaveLength(0);
    expect(filterExhibitors(sample, "litio", "mineria")).toHaveLength(1);
  });
});
