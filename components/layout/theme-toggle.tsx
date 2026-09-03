"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { THEME_STORAGE_KEY } from "./theme-constants";

/**
 * Which icon shows is decided by CSS, not by React state.
 *
 * The obvious version — hold the theme in state and branch on it — cannot
 * hydrate cleanly: on the server there is no <html> to inspect, so it always
 * renders the light-mode icon, while the client renders whatever the
 * anti-flash script in app/layout.tsx already put on <html>. A dark-mode
 * visitor therefore gets a moon from the server and a sun from the client.
 * `suppressHydrationWarning` does not cover that: it forgives an element's
 * own attributes and text, not a different element appearing in its subtree.
 *
 * Rendering both icons and letting the `dark` class choose between them
 * removes the branch entirely. Server and client emit identical markup, the
 * right icon is correct before React ever hydrates, and the component needs
 * no state at all — the current theme is read off <html> at click time,
 * which is the one place it is always authoritative.
 */
export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private browsing / storage disabled — theme just won't persist.
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className={className}
      aria-label="Cambiar entre modo claro y oscuro"
    >
      <Sun className="hidden size-4 dark:block" aria-hidden="true" />
      <Moon className="size-4 dark:hidden" aria-hidden="true" />
    </Button>
  );
}
