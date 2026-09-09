import { buildItinerary, type AgendaSession } from "@/features/agenda";
import type { Exhibitor } from "@/features/exhibitors";
import type { StoredPass } from "@/lib/pass-scope";
import type { ActivityTrack } from "@/features/agenda";
import type { Pass, PassRequest, PassStand, TicketTier } from "../types";

/**
 * Base32-style alphabet with the ambiguous glyphs removed (no I/O/0/1), so a
 * code read off a phone screen at the door can be typed back without
 * guessing. Same convention airlines use for record locators.
 */
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** FNV-1a, 32-bit. Deterministic and dependency-free — same holder, same code. */
function hash32(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

function encode(value: number, length: number): string {
  let out = "";
  let n = value;
  for (let i = 0; i < length; i++) {
    out += CODE_ALPHABET[n % CODE_ALPHABET.length];
    n = Math.floor(n / CODE_ALPHABET.length) + 7;
  }
  return out;
}

/**
 * Pass code, shaped `EJ26-XXXX-XX`. Derived from the holder's identity and
 * tier so the same person always gets the same code back — this prototype has
 * no backend to store one.
 */
export function buildPassCode(request: Pick<PassRequest, "fullName" | "email" | "tierId">): string {
  const seed = `${request.fullName.trim().toLowerCase()}|${request.email.trim().toLowerCase()}|${request.tierId}`;
  const h = hash32(seed);
  return `EJ26-${encode(h, 4)}-${encode(h >>> 11, 2)}`;
}

/** What gets encoded in the pass QR. Not a URL: this prototype has no host. */
export function passQrPayload(code: string): string {
  return `EXPOJUY2026:PASE:${code}`;
}

interface BuildPassInput {
  request: PassRequest;
  tier: TicketTier;
  sessions: AgendaSession[];
  exhibitors: Exhibitor[];
}

/**
 * Turns an accreditation request into a credential: it runs the same
 * conflict-free planner the agenda page uses, and pairs the result with the
 * stands whose rubro the visitor picked. No interests means the whole event,
 * matching how the agenda planner already behaves.
 */
export function buildPass({ request, tier, sessions, exhibitors }: BuildPassInput): Pass {
  const itinerary = buildItinerary({ sessions, interests: request.interests });

  const stands: PassStand[] = exhibitors
    .filter(
      (exhibitor) =>
        request.interests.length === 0 ||
        request.interests.includes(exhibitor.rubro)
    )
    .map((exhibitor) => ({
      standId: exhibitor.standId,
      exhibitorName: exhibitor.name,
      rubro: exhibitor.rubro,
    }))
    .sort((a, b) => a.standId.localeCompare(b.standId));

  return {
    code: buildPassCode(request),
    holderName: request.fullName.trim(),
    tier,
    interests: request.interests,
    itinerary,
    stands,
    daysCovered: new Set(itinerary.map((session) => session.day)).size,
  };
}

interface RestorePassInput {
  stored: StoredPass;
  tier: TicketTier;
  sessions: AgendaSession[];
  exhibitors: Exhibitor[];
}

/**
 * Rebuilds the full credential from the little that was stored. A visitor who
 * accredited, walked through the agenda and came back to /entradas has to find
 * their pass waiting — the stored slice carries the identity, and the
 * itinerary and stands are recomputed here from live data, so a pass issued
 * before a programme change comes back updated rather than stale.
 */
export function restorePass({
  stored,
  tier,
  sessions,
  exhibitors,
}: RestorePassInput): Pass {
  const request: PassRequest = {
    fullName: stored.holderName,
    email: "",
    tierId: tier.id,
    interests: stored.interests as ActivityTrack[],
  };
  // The code is the one the visitor already has; it is not recomputed, since
  // buildPassCode hashes the email and the stored pass does not carry one.
  return { ...buildPass({ request, tier, sessions, exhibitors }), code: stored.code };
}
