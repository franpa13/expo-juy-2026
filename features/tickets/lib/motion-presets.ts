import type { Transition, Variants } from "motion/react";

/**
 * One motion vocabulary for the whole entradas route: elements do not fade in
 * on their own schedule, they arrive as a sequence — badge, headline, subline,
 * buttons, stats — each on a spring rather than a linear tween, so the entrance
 * reads as physical instead of timed.
 *
 * Every variant here has a visible resting state (`show`); nothing is parked at
 * opacity 0 waiting on a scroll listener that might never fire.
 */

export const SPRING: Transition = {
  type: "spring",
  bounce: 0.28,
  duration: 0.75,
};

/** Parent: holds no visual change of its own, only the timing of its children. */
export function staggerContainer(stagger = 0.07, delay = 0.05): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

/** Child: rises and sharpens into place. `reduced` collapses it to a plain fade. */
export function riseItem(reduced: boolean, distance = 22): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.25 } },
    };
  }
  return {
    hidden: { opacity: 0, y: distance, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: SPRING },
  };
}

/** Child variant for things that should scale in rather than rise — the pass, a badge. */
export function popItem(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.25 } },
    };
  }
  return {
    hidden: { opacity: 0, scale: 0.94, filter: "blur(6px)" },
    show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: SPRING },
  };
}
