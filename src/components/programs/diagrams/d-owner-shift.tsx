"use client";

import { motion, type Variants } from "motion/react";

/**
 * What changes for the owner.
 *
 * Build Spec v2 section 4, Programs page 3 ends on "what changes for the
 * owner", and the copy already states each change as a stop and a start.
 * Drawing it as a strike through the old state and a lit new one is the
 * shape the sentence already has, so the diagram is the copy rather than a
 * picture beside it.
 *
 * It replaces a generated photograph of a tidy desk, which asserted a
 * calmness it had no way to earn and could have sat on any agency's site.
 *
 * No claim is quantified. Every line is a change in what the owner does,
 * which is the only kind of promise this page is permitted to make: Build
 * Spec v2 is explicit that there is no revenue guarantee anywhere on it.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const CSS = `
@keyframes dos-pip { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
@media (prefers-reduced-motion: no-preference) {
  .dos-pip { animation: dos-pip 3s ease-in-out infinite; }
}
`;

const SHIFTS = [
  {
    from: "Managing vendors",
    to: "Reviewing 1 number with 1 partner",
  },
  {
    from: "Rebuilding the plan every quarter",
    to: "A system that explains the number before you change anything",
  },
  {
    from: "Being interchangeable in your own market",
    to: "A name the market already knows, which shows up in what you can charge",
  },
];

const row: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT, delay: i * 0.12 },
  }),
};

const strike: Variants = {
  hidden: { scaleX: 0 },
  show: (i: number) => ({
    scaleX: 1,
    transition: { duration: 0.5, ease: EASE_OUT, delay: 0.3 + i * 0.12 },
  }),
};

export function OwnerShiftDiagram() {
  return (
    <motion.figure
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="rounded-[20px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_62%)] p-5 md:p-7"
    >
      <style>{CSS}</style>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="label-mono text-ink-faint">You stop</p>
        <p className="label-mono flex items-center gap-2 text-brand">
          <span aria-hidden className="dos-pip block size-2 rounded-full bg-brand" />
          And start
        </p>
      </div>

      <ul className="mt-5 grid gap-3">
        {SHIFTS.map((s, i) => (
          <motion.li
            key={s.from}
            custom={i}
            variants={row}
            className="grid items-center gap-3 rounded-[14px] border border-[rgba(244,245,242,0.09)] bg-[#0b0e13] p-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.15fr)] md:gap-5 md:p-5"
          >
            <p className="relative w-fit text-[0.9375rem] leading-snug text-ink-faint">
              {s.from}
              <motion.span
                aria-hidden
                custom={i}
                variants={strike}
                className="absolute inset-x-0 top-1/2 block h-px origin-left bg-ink-faint"
              />
            </p>

            <span aria-hidden className="label-mono text-brand">
              <span className="hidden md:inline">&rarr;</span>
              <span className="md:hidden">&darr;</span>
            </span>

            <p className="text-[0.9375rem] font-semibold leading-snug text-foreground">
              {s.to}
            </p>
          </motion.li>
        ))}
      </ul>
    </motion.figure>
  );
}
