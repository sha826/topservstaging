"use client";

import { motion, type Variants } from "motion/react";
import { threePhases } from "@/lib/bf-content";

/**
 * The 3 phases as a stair.
 *
 * Build Spec v2 section 4, Programs page 2 fixes the phases and their
 * timings. The Argument Spine's Outcome beat for this page is "you know what
 * month you are in and what should be true by the end of it", and a stair is
 * the shape that says it: each phase stands on the one before it, and the
 * rise is cumulative rather than decorative.
 *
 * This replaces a generated photograph of a video studio, which
 * IMAGE-GUIDELINES 4.2 does not permit: real photography is required for any
 * image a visitor would read as a record of the team, the office or the
 * studio.
 *
 * No quantities are asserted beyond time, which the spec supplies. The step
 * heights are ordinal, not measured, so nothing here is a claim. Phase copy
 * is single sourced from bf-content.
 *
 * COLOUR. Blue, not green. Both are official tokens and globals.css gives
 * green the accent role and blue "the companion tone". Elapsed time has no
 * claim on green, and reserving green for create demand keeps the colour
 * meaning consistent across the hub. IMAGE-GUIDELINES 5.1: influence, not
 * domination, and never a colour invented outside the token block.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Ordinal, not measured. Fixed heights rather than percentages, because a
 * percentage height on a grid item resolves against the row rather than the
 * container and does not give a reliable stair. Stacked on mobile, where a
 * rise across 3 columns has nothing to rise across.
 */
const STEP_H = ["md:min-h-[15rem]", "md:min-h-[19.5rem]", "md:min-h-[24rem]"];

const CSS = `
@keyframes dps-lit {
  0%, 3%    { opacity: 0; }
  10%, 26%  { opacity: 1; }
  34%, 100% { opacity: 0; }
}
@keyframes dps-glow { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
@media (prefers-reduced-motion: no-preference) {
  .dps-lit  { animation: dps-lit 6.6s linear infinite; }
  .dps-glow { animation: dps-glow 3.6s ease-in-out infinite; }
}
`;

const step: Variants = {
  hidden: { scaleY: 0.82, opacity: 0 },
  show: (i: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: EASE_OUT, delay: i * 0.16 },
  }),
};

const label: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT, delay: 0.3 + i * 0.16 },
  }),
};

export function PhaseStairDiagram() {
  return (
    <motion.figure
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="relative"
    >
      <style>{CSS}</style>

      <span
        aria-hidden
        className="pointer-events-none absolute -inset-5 -z-10 bg-[radial-gradient(closest-side,rgba(14,125,193,0.16),transparent)] blur-2xl"
      />

      <div className="relative overflow-hidden rounded-[24px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_58%,#0d1015_100%)] p-5 md:p-7">
        {/* Faint ruled ground, so the rise reads as a rise. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(244,245,242,0.045)_0_1px,transparent_1px_3.25rem)]"
        />

        <p className="label-mono relative flex items-center gap-2.5 text-ink-faint">
          <span aria-hidden className="dps-glow block size-2 rounded-full bg-brand-blue-hot" />
          12 months, 3 phases
        </p>

        <div className="relative mt-6 grid gap-3 md:grid-cols-3 md:items-end md:gap-4">
          {threePhases.map((p, i) => {
            const last = i === threePhases.length - 1;
            return (
              <motion.div
                key={p.n}
                custom={i}
                variants={step}
                style={{ originY: 1 }}
                className={`relative flex flex-col justify-end overflow-hidden rounded-[16px] border p-5 ${STEP_H[i]} ${
                  last
                    ? "border-brand-blue-hot/60 bg-[linear-gradient(180deg,rgba(61,155,217,0.26),rgba(13,16,21,0.82)_74%)]"
                    : "border-brand-blue/35 bg-[linear-gradient(180deg,rgba(14,125,193,0.16),rgba(13,16,21,0.8)_74%)]"
                }`}
              >
                {/* Each phase lights in turn, so the sequence keeps moving
                    after the entrance finishes. Decorative. */}
                <span
                  aria-hidden
                  className="dps-lit pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(61,155,217,0.3),transparent_62%)] opacity-0"
                  style={{ animationDelay: `${i * 2.2}s` }}
                />

                <motion.div custom={i} variants={label} className="relative">
                  <span
                    aria-hidden
                    className={`label-mono block text-[0.75rem] ${
                      last ? "text-brand-blue-hot" : "text-brand-blue-hot/70"
                    }`}
                  >
                    {String(p.n).padStart(2, "0")}
                  </span>
                  <p className="label-mono mt-2 text-[0.6875rem] leading-normal text-ink-faint">
                    {p.timing}
                  </p>
                  <p className="display mt-3 text-[clamp(1.15rem,1.9vw,1.45rem)] leading-[1.08] text-foreground">
                    {p.name}
                  </p>
                  <p className="mt-2 border-t border-[rgba(244,245,242,0.1)] pt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
                    {p.stages}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* The run underneath the rise. */}
        <div
          aria-hidden
          className="relative mt-4 flex items-center justify-between gap-2 border-t border-[rgba(244,245,242,0.1)] pt-3"
        >
          {["Month 1", "Month 2", "Month 6", "Month 12 and beyond"].map((m) => (
            <span key={m} className="label-mono text-[0.625rem] text-ink-faint">
              {m}
            </span>
          ))}
        </div>
      </div>

      <figcaption className="sr-only">
        Three phases across 12 months. Strategy and Alignment in months 1 to
        2, Execution and Activation in months 2 to 6, Optimization and Scale
        from month 6 onward. Each phase stands on the one before it.
      </figcaption>
    </motion.figure>
  );
}
