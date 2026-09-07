"use client";

import { useCallback, useSyncExternalStore } from "react";
import { PASS_STORAGE_KEY, isStoredPass, type StoredPass } from "./pass-scope";

/**
 * The accredited visitor's pass, shared across the site.
 *
 * This prototype has no backend and no accounts, so the credential lives in
 * the browser: the entradas page writes it, and the agenda, the exhibitor
 * catalogue and the venue map read it to show "lo tuyo" first. `localStorage`
 * is an external store rather than React state, so it is read through
 * `useSyncExternalStore` — that also gives the right server snapshot (no pass)
 * without a hydration mismatch, and picks up a pass issued in another tab.
 *
 * Storage can throw (private windows, blocked site data) and can hold a stale
 * entry from an older build. Neither is worth an error screen for a visitor
 * who just wants to read the agenda: every access degrades to "no pass yet".
 */

const listeners = new Set<() => void>();

// getSnapshot must return a stable reference while nothing changes, or
// useSyncExternalStore re-renders forever. Parsing is cached against the raw
// string, so a re-read only re-parses when the stored text actually differs.
let cachedRaw: string | null = null;
let cachedPass: StoredPass | null = null;

function readRaw(): string | null {
  try {
    return localStorage.getItem(PASS_STORAGE_KEY);
  } catch {
    return null;
  }
}

function getSnapshot(): StoredPass | null {
  const raw = readRaw();
  if (raw === cachedRaw) return cachedPass;

  cachedRaw = raw;
  let parsed: unknown = null;
  try {
    parsed = raw ? JSON.parse(raw) : null;
  } catch {
    parsed = null;
  }
  cachedPass = isStoredPass(parsed) ? parsed : null;
  return cachedPass;
}

/** The server has no storage, so it always renders the not-accredited site. */
function getServerSnapshot(): StoredPass | null {
  return null;
}

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  // "storage" only fires in the *other* tabs; same-tab writes notify directly.
  window.addEventListener("storage", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function emit(): void {
  for (const listener of listeners) listener();
}

/** Reads the stored pass. Null until the visitor accredits. */
export function usePass(): StoredPass | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Writes and clears the pass. Separate from `usePass` so pages that only read it do not re-render on every write path change. */
export function usePassActions() {
  const savePass = useCallback((pass: StoredPass) => {
    try {
      localStorage.setItem(PASS_STORAGE_KEY, JSON.stringify(pass));
    } catch {
      // Without storage the pass still shows on this page, it just will not
      // travel to the agenda or the map.
    }
    emit();
  }, []);

  const clearPass = useCallback(() => {
    try {
      localStorage.removeItem(PASS_STORAGE_KEY);
    } catch {
      // Nothing to clean up if storage is unavailable.
    }
    emit();
  }, []);

  return { savePass, clearPass };
}
