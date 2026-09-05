import type { Transition, Variants } from "framer-motion";

/**
 * One motion vocabulary for the whole entradas route — and it is the home
 * page's vocabulary, not a second one. The hero, the stats band and the
 * section index all move on the same curve and the same rise distance, so
 * these presets restate that rather than inventing a spring-and-blur feel
 * that would make this route read like it came from a different site.
 *
 * Every variant has a visible resting state (`show`); nothing is parked at
 * opacity 0 waiting on a scroll listener that might never fire.
 */

/** The site's ease — a fast start that settles, used by every home animation. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const TRANSITION: Transition = {
  duration: 0.65,
  ease: EASE_OUT_EXPO,
};

/** Parent: holds no visual change of its own, only the timing of its children. */
export function staggerContainer(stagger = 0.08, delay = 0.05): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

/** Child: rises into place. `reduced` collapses it to a near-instant fade. */
export function riseItem(reduced: boolean, distance = 18): Variants {
  return {
    hidden: { opacity: 0, y: reduced ? 0 : distance },
    show: {
      opacity: 1,
      y: 0,
      transition: reduced ? { duration: 0.01 } : TRANSITION,
    },
  };
}

/**
 * Child variant for things that should scale in rather than rise — the pass
 * itself. Mirrors how the home hero brings in its video panel.
 */
export function popItem(reduced: boolean): Variants {
  return {
    hidden: { opacity: 0, scale: reduced ? 1 : 0.96 },
    show: {
      opacity: 1,
      scale: 1,
      transition: reduced ? { duration: 0.01 } : { duration: 0.8, ease: EASE_OUT_EXPO },
    },
  };
}
