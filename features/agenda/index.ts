export { AgendaSchedule } from "./components/agenda-schedule";
export { AgendaPlanner } from "./components/agenda-planner";
export { SESSIONS } from "./data/sessions";
// Exposed on the façade because the tickets feature builds a pass around the
// same conflict-free itinerary the agenda page shows — one planner, one result.
export { buildItinerary } from "./lib/planner";
export { AGENDA_DAYS } from "./types";
export type { AgendaSession, ActivityTrack } from "./types";
