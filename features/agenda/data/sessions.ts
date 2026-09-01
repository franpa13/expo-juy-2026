import type { AgendaSession } from "../types";

export const SESSIONS: AgendaSession[] = [
  { id: "s1", day: 1, title: "Apertura oficial ExpoJuy 2026", description: "Ceremonia de inauguración con autoridades provinciales y de CAMCOMEX.", track: "general", startTime: "10:00", endTime: "11:00", location: "Auditorio Principal" },
  { id: "s2", day: 1, title: "Litio y minería sustentable en la Puna", description: "Panel sobre extracción responsable y agregado de valor local.", track: "mineria", startTime: "11:30", endTime: "12:30", location: "Sala A", speaker: "Andes Litio S.A." },
  { id: "s3", day: 1, title: "Energías renovables: el mapa eólico y solar del NOA", description: "Estado actual y proyección de proyectos de energía limpia.", track: "energias-renovables", startTime: "12:00", endTime: "13:00", location: "Sala B", speaker: "Puna Solar" },
  { id: "s4", day: 1, title: "Rueda de negocios internacional", description: "Encuentros B2B entre expositores locales y delegaciones extranjeras.", track: "comercio-exterior", startTime: "14:00", endTime: "16:00", location: "Salón de Negocios" },
  { id: "s5", day: 2, title: "Turismo y desarrollo territorial", description: "Circuitos turísticos, sostenibilidad y promoción regional.", track: "turismo", startTime: "10:00", endTime: "11:00", location: "Sala A", speaker: "Rutas del Norte Turismo" },
  { id: "s6", day: 2, title: "Economía del conocimiento en Jujuy", description: "Software, datos e IA aplicada a la producción provincial.", track: "tecnologia", startTime: "10:30", endTime: "11:30", location: "Sala B", speaker: "NubeAndina Software" },
  { id: "s7", day: 2, title: "Agroindustria: del campo a la góndola", description: "Cadenas de valor cooperativas y agregado de valor agroindustrial.", track: "agroindustria", startTime: "12:00", endTime: "13:00", location: "Sala A", speaker: "AgroJujuy Cooperativa" },
  { id: "s8", day: 2, title: "Corredor Bioceánico: logística y oportunidades", description: "Infraestructura y comercio exterior hacia el Pacífico.", track: "comercio-exterior", startTime: "13:30", endTime: "14:30", location: "Sala B", speaker: "Corredor Bioceánico Logística" },
  { id: "s9", day: 3, title: "Industria metalúrgica y proveedores mineros", description: "Encadenamiento productivo entre industria local y minería.", track: "industria", startTime: "10:00", endTime: "11:00", location: "Sala A", speaker: "Metalúrgica del Norte" },
  { id: "s10", day: 3, title: "Inteligencia artificial para pymes regionales", description: "Casos de uso concretos de IA aplicada a producción y logística.", track: "tecnologia", startTime: "11:30", endTime: "12:30", location: "Sala B", speaker: "Andes Data Labs" },
  { id: "s11", day: 3, title: "Vinculación empresarial: financiamiento e inversión", description: "Herramientas de financiamiento para escalar proyectos productivos.", track: "general", startTime: "15:00", endTime: "16:00", location: "Auditorio Principal" },
  { id: "s12", day: 4, title: "Balance y cierre de ExpoJuy 2026", description: "Resultados de la edición y anuncio de próximos pasos.", track: "general", startTime: "17:00", endTime: "18:00", location: "Auditorio Principal" },
];
