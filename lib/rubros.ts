export const RUBROS = [
  "mineria",
  "energias-renovables",
  "turismo",
  "agroindustria",
  "tecnologia",
  "industria",
  "comercio-exterior",
] as const;

export type Rubro = (typeof RUBROS)[number];

export const RUBRO_LABELS: Record<Rubro, string> = {
  mineria: "Minería",
  "energias-renovables": "Energías renovables",
  turismo: "Turismo",
  agroindustria: "Agroindustria",
  tecnologia: "Tecnología",
  industria: "Industria",
  "comercio-exterior": "Comercio exterior",
};

// One color per rubro, cycled from the fixed brand palette (never a new
// hex) — a small wayfinding system reused everywhere a rubro appears:
// exhibitor cards, agenda track badges, the planner's interest chips.
export const RUBRO_COLOR: Record<Rubro, string> = {
  mineria: "var(--primary)",
  "energias-renovables": "var(--ring)",
  turismo: "var(--chart-3)",
  agroindustria: "var(--accent)",
  tecnologia: "var(--foreground)",
  industria: "var(--primary)",
  "comercio-exterior": "var(--ring)",
};
