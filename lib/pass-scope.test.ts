import { describe, expect, it } from "vitest";
import {
  isStoredPass,
  passCoversEverything,
  passFirstName,
  passMatches,
  type StoredPass,
} from "./pass-scope";

function makePass(overrides: Partial<StoredPass> = {}): StoredPass {
  return {
    code: "EJ26-ABCD-EF",
    holderName: "Ana María Quispe",
    tierId: "profesional",
    interests: ["mineria", "turismo"],
    ...overrides,
  };
}

describe("isStoredPass", () => {
  it("accepts a well-formed stored pass", () => {
    expect(isStoredPass(makePass())).toBe(true);
  });

  it("rejects null, primitives and arrays", () => {
    expect(isStoredPass(null)).toBe(false);
    expect(isStoredPass("EJ26-ABCD-EF")).toBe(false);
    expect(isStoredPass(undefined)).toBe(false);
  });

  it("rejects a pass with an empty code", () => {
    expect(isStoredPass(makePass({ code: "" }))).toBe(false);
  });

  it("rejects a pass whose interests are not all strings", () => {
    expect(isStoredPass({ ...makePass(), interests: ["mineria", 7] })).toBe(false);
  });

  it("rejects an entry left by an older build without the tier id", () => {
    const withoutTier: Record<string, unknown> = { ...makePass() };
    delete withoutTier.tierId;
    expect(isStoredPass(withoutTier)).toBe(false);
  });
});

describe("passMatches", () => {
  it("matches a track the visitor chose", () => {
    expect(passMatches(makePass(), "mineria")).toBe(true);
  });

  it("does not match a track the visitor left out", () => {
    expect(passMatches(makePass(), "agroindustria")).toBe(false);
  });

  it("matches everything when no rubro was chosen", () => {
    const openPass = makePass({ interests: [] });
    expect(passMatches(openPass, "agroindustria")).toBe(true);
    expect(passMatches(openPass, "general")).toBe(true);
  });

  it("treats the general track like any other interest", () => {
    expect(passMatches(makePass({ interests: ["general"] }), "general")).toBe(true);
    expect(passMatches(makePass(), "general")).toBe(false);
  });
});

describe("passCoversEverything", () => {
  it("is true only when the interest list is empty", () => {
    expect(passCoversEverything(makePass({ interests: [] }))).toBe(true);
    expect(passCoversEverything(makePass())).toBe(false);
  });
});

describe("passFirstName", () => {
  it("takes the first word of the holder's name", () => {
    expect(passFirstName(makePass())).toBe("Ana");
  });

  it("survives padded or single-word names", () => {
    expect(passFirstName(makePass({ holderName: "  Quispe  " }))).toBe("Quispe");
  });
});
