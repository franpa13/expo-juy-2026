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
