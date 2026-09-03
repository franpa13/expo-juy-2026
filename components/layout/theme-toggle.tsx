"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { THEME_STORAGE_KEY } from "./theme-constants";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

// The real theme is already on <html> by the time this component ever
// mounts — set synchronously by the anti-flash inline script in
// app/layout.tsx, before React hydrates. Reading it here (instead of in an
// effect) means no extra render — but on the server this always reads
// "light" (there is no <html> to inspect), so the client's first real
// render can legitimately differ. That one-node mismatch is exactly what
// suppressHydrationWarning exists for, below.
function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const isDark = theme === "dark";

  function toggle() {
    const next: Theme = isDark ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private browsing / storage disabled — theme just won't persist.
    }
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      suppressHydrationWarning
      className={cn(
        "inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-border p-1 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        isDark ? "bg-primary/30" : "bg-foreground/15",
        className
      )}
    >
      <motion.span
        suppressHydrationWarning
        animate={{ x: isDark ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="relative flex size-5 items-center justify-center rounded-full bg-background shadow-md"
      >
        <motion.span
          suppressHydrationWarning
          initial={false}
          animate={{ opacity: isDark ? 0 : 1, rotate: isDark ? 90 : 0, scale: isDark ? 0.4 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inline-flex"
        >
          <Sun className="size-3 text-primary" />
        </motion.span>
        <motion.span
          suppressHydrationWarning
          initial={false}
          animate={{ opacity: isDark ? 1 : 0, rotate: isDark ? 0 : -90, scale: isDark ? 1 : 0.4 }}
          transition={{ duration: 0.2 }}
          className="absolute inline-flex"
        >
          <Moon className="size-3 text-accent" />
        </motion.span>
      </motion.span>
    </button>
  );
}
