"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds — pass `index * 0.08` for a list of siblings. */
  delay?: number;
}

/**
 * Fades a section in and nudges it up slightly once it scrolls into view.
 * Used across the home page for scroll-triggered reveals — never on the
 * hero, which animates on load instead (whileInView has nothing to wait
 * for there, it's already on screen). Fires once; skips the motion offset
 * (near-instant fade only) under prefers-reduced-motion.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: prefersReducedMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
