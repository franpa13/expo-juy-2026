// Kept in its own plain module (no "use client") so the Server Component
// root layout can import the real value — a named export from a "use
// client" file (like theme-toggle.tsx) resolves to undefined when
// imported from server code, since only the component itself crosses that
// boundary, not its other exports.
export const THEME_STORAGE_KEY = "expojuy-theme";
