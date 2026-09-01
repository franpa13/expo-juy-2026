import { describe, it, expect } from "vitest";
import { answerAssistant } from "./script";

describe("answerAssistant", () => {
  it("answers questions about dates", () => {
    expect(answerAssistant("¿Cuándo es ExpoJuy?")).toMatch(/9 al 12 de octubre de 2026/);
  });

  it("answers questions about location", () => {
    expect(answerAssistant("¿Dónde queda el predio?")).toMatch(/Ciudad Cultural/);
  });

  it("answers questions about exhibitors", () => {
    expect(answerAssistant("¿Cómo busco un expositor?")).toMatch(/Expositores/);
  });

  it("answers questions about the agenda", () => {
    expect(answerAssistant("¿Hay agenda de actividades?")).toMatch(/Agenda/);
  });

  it("falls back to a default answer for unmatched questions", () => {
    expect(answerAssistant("asdkjqwe random text")).toMatch(/no tengo una respuesta guionada/i);
  });

  it("is case-insensitive and trims whitespace", () => {
    expect(answerAssistant("  CUÁNDO ES expojuy?  ")).toMatch(/2026/);
  });
});
