import type { RubroScope } from "./rubros";

/** Where the visitor's pass lives between visits. Namespaced like the theme key. */
export const PASS_STORAGE_KEY = "expojuy:pase";

/**
 * The slice of the pass that outlives the accreditation page.
 *
 * The itinerary and the stand list are *derived* — `buildPass` recomputes both
 * from the same session and exhibitor data every time — so storing them would
 * only create a copy that goes stale when the agenda changes. What has to
 * survive is the identity of the pass and the rubros it was built around:
 * with those, the agenda, the catalogue and the venue map can each work out
 * what is "lo tuyo" on their own.
 */
export interface StoredPass {
  code: string;
  holderName: string;
  tierName: string;
  interests: RubroScope[];
}

/**
 * Guards the value read back from storage. It is the one input to the pass
 * flow that nobody validated on the way in — an older build, a half-written
 * entry or a hand-edited key would otherwise crash every page that reads it.
 */
export function isStoredPass(value: unknown): value is StoredPass {
  if (typeof value !== "object" || value === null) return false;
  const pass = value as Record<string, unknown>;
  return (
    typeof pass.code === "string" &&
    pass.code.length > 0 &&
    typeof pass.holderName === "string" &&
    typeof pass.tierName === "string" &&
    Array.isArray(pass.interests) &&
    pass.interests.every((interest) => typeof interest === "string")
  );
}

/**
 * A pass with no rubros chosen covers the whole event — the same rule
 * `buildItinerary` already applies to an empty interest list. Pages use this
 * to hide a "sólo lo mío" filter that would not filter anything.
 */
export function passCoversEverything(pass: StoredPass): boolean {
  return pass.interests.length === 0;
}

/** Whether a session track or an exhibitor's rubro falls inside the pass. */
export function passMatches(pass: StoredPass, track: RubroScope): boolean {
  return passCoversEverything(pass) || pass.interests.includes(track);
}

/** First name of the holder, for greetings. Falls back to the whole string. */
export function passFirstName(pass: StoredPass): string {
  return pass.holderName.trim().split(/\s+/)[0] || pass.holderName;
}
