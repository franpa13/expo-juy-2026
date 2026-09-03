"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";

/**
 * Counts up from 0 to `value` once it scrolls into view. The animated digit
 * is aria-hidden (it's driven by direct DOM writes, not React state — the
 * usual framer-motion pattern for a number that changes every frame without
 * re-rendering) with the real value available immediately to assistive tech
 * via a visually-hidden sibling. Skips straight to the final value for
 * prefers-reduced-motion.
 */
export function AnimatedCounter({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!inView || !ref.current) return;

    if (prefersReducedMotion) {
      ref.current.textContent = String(value);
      return;
    }

    ref.current.textContent = "0";
    const controls = animate(motionValue, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = String(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, value, prefersReducedMotion, motionValue]);

  return (
    <span className="relative">
      <span ref={ref} aria-hidden="true" className={className}>
        0
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
