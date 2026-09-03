"use client";

import { motion, type Variants } from "motion/react";

/**
 * Cost per booked call: 2 directions, as cards.
 *
 * READ IMAGE-GUIDELINES 4.4 BEFORE CHANGING THIS FILE. The Argument Spine
 * calls cost per booked call "the number and it is falsifiable", and the
 * spec calls it "the claim we make and the number we are held to". Section
 * 4.4's separation rule is that whatever sits next to a claim reads as
 * evidence, so a chart with values on it would publish a measured result we
 * have not measured, which section 4.1 forbids outright.
 *
 * NO VALUES APPEAR. No ticks, no gridlines, no percentages, no currency, no
 * starting or ending figure. Each card carries a bare sparkline whose only
 * content is its direction, and the illustrative note is visible text rather
 * than a comment.
 *
 * WHY CARDS RATHER THAN ONE CHART. A single full width plot stretched to the
 * 1200 measure, which blew the labels up and dropped one across the line it
 * was labelling. Two small sparklines in cards say the same thing at a size
 * that stays legible, and they let the copy sit beside the shape instead of
 * underneath it.
 *
 * If real client data is ever cleared for publication, this becomes a
 * different component with a source, a date and a starting position per SEO
 * Guidelines 9.2. Do not simply add numbers to this one.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const CSS = `
@keyframes dcv-flow { to { stroke-dashoffset: -28; } }
@keyframes dcv-tip  { 0%, 100% { opacity: 0.45; transform: scale(1); } 50% { opacity: 1; transform: scale(1.28); } }
.dcv-flow { stroke-dasharray: 3 10; animation: dcv-flow 2s linear infinite; }
.dcv-tip  { transform-box: fill-box; transform-origin: center; animation: dcv-tip 2.8s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .dcv-flow, .dcv-tip { animation: none; }
}
`;

/** Shapes, not measurements. Both leave the same place on the left. */
const CARDS = [
  {
    k: "Capture only",
    v: "The cost climbs. Every year more companies bid for the same searches, and nobody is raising demand.",
    d: "M 10 34 C 52 30, 108 20, 150 10",
    tip: { x: 150, y: 10 },
    tone: "muted" as const,
  },
  {
    k: "Brand and performance together",
    v: "The cost falls. The same capture spend collects people who already recognize the name, without anybody touching a bid.",
    d: "M 10 14 C 52 20, 108 32, 150 42",
    tip: { x: 150, y: 42 },
    tone: "brand" as const,
  },
];

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, ease: EASE_OUT, delay: 0.1 + i * 0.15 },
      opacity: { duration: 0.2, delay: 0.1 + i * 0.15 },
    },
  }),
};

const card: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT, delay: i * 0.12 },
  }),
};

export function CostDirectionCards() {
  return (
    <motion.figure
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      <style>{CSS}</style>

      <div className="grid gap-3 sm:grid-cols-2">
        {CARDS.map((c, i) => {
          const on = c.tone === "brand";
          return (
            <motion.div
              key={c.k}
              custom={i}
              variants={card}
              className={`rounded-[16px] border p-5 md:p-6 ${
                on
                  ? "border-brand/40 bg-[linear-gradient(150deg,rgba(158,216,68,0.1),rgba(13,16,21,0.75)_70%)]"
                  : "border-[#2b323c] bg-[#0d1015]"
              }`}
            >
              <p className={`label-mono ${on ? "text-brand" : "text-ink-faint"}`}>{c.k}</p>

              {/* Direction only. Deliberately small, and deliberately bare. */}
              <svg
                aria-hidden
                viewBox="0 0 160 52"
                className="mt-4 h-12 w-full max-w-[13rem]"
              >
                <motion.path
                  custom={i}
                  variants={draw}
                  d={c.d}
                  fill="none"
                  stroke={on ? "var(--brand)" : "var(--ink-faint)"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity={on ? 1 : 0.75}
                />
                <motion.path
                  custom={i}
                  variants={draw}
                  className="dcv-flow"
                  d={c.d}
                  fill="none"
                  stroke={on ? "var(--brand-hot)" : "var(--ink-faint)"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle
                  className={on ? "dcv-tip" : ""}
                  cx={c.tip.x}
                  cy={c.tip.y}
                  r="4"
                  fill={on ? "var(--brand)" : "var(--ink-faint)"}
                />
              </svg>

              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                {c.v}
              </p>
            </motion.div>
          );
        })}
      </div>

      <figcaption className="mt-4 text-[0.8125rem] leading-relaxed text-ink-faint">
        <span className="label-mono mr-2">Illustrative</span>
        Direction over 12 months, not measured values. Your baseline is set in
        your first 90 days and every figure after it is reported against it.
      </figcaption>
    </motion.figure>
  );
}
