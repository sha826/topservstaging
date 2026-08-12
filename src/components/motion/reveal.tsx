"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Scroll reveal. Always renders motion.div so server and client markup match
 * (branching on useReducedMotion here caused hydration mismatches that froze
 * content at opacity 0). Reduced-motion preference is honored globally by
 * MotionConfig reducedMotion="user" in MotionProvider — movement is skipped,
 * the opacity fade remains.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
