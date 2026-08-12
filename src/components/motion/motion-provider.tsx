"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Honors the user's prefers-reduced-motion setting for every motion component:
 * transform/layout animations are skipped, opacity fades remain. Keeping this
 * at the config level (instead of branching in components) keeps server and
 * client markup identical, which hydration requires.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
