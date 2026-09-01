interface ScriptEntry {
  keywords: string[];
  answer: string;
}

const SCRIPT: ScriptEntry[] = [
  {
    keywords: ["cuando", "fecha", "dia"],
    answer: "ExpoJuy 2026 se realiza del 9 al 12 de octubre de 2026.",
  },
  {
    keywords: ["donde", "ubicacion", "predio", "direccion"],
    answer: "El evento es en Ciudad Cultural, San Salvador de Jujuy. Podés ver el plano en la sección Mapa del predio.",
  },
  {
    keywords: ["expositor", "empresa", "stand"],
    answer: "Podés buscar y filtrar expositores por rubro en la sección Expositores.",
  },
  {
    keywords: ["agenda", "actividad", "charla", "horario"],
    answer: "En la sección Agenda vas a encontrar el cronograma completo y un planificador que arma tu itinerario sin choques de horario.",
  },
  {
    keywords: ["entrada", "precio", "costo"],
    answer: "El esquema de entradas todavía no está publicado. Mirá la sección Preguntas frecuentes para novedades.",
  },
  {
    keywords: ["contacto", "inscribir", "sponsor"],
    answer: "Para consultas de expositores, prensa o sponsors, completá el formulario en la sección Contacto.",
  },
];

const FALLBACK_ANSWER =
  "Todavía no tengo una respuesta guionada para eso — probá preguntando por fecha, ubicación, expositores, agenda o cómo contactarte con la organización.";

export function answerAssistant(question: string): string {
  const normalized = question
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, ""); // strip accents for keyword matching

  const match = SCRIPT.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword))
  );

  return match ? match.answer : FALLBACK_ANSWER;
}
