"use client";

import { motion, type Variants } from "motion/react";

/**
 * How the number is reached.
 *
 * Build Spec v2 section 4, Programs page 4 names the inputs exactly: "market
 * size, competitive saturation, current brand position, service area, and
 * video scope", and states the order plainly: "the assessment and the
 * research modules produce the scope. The scope produces the price. The
 * program is assigned by diagnosis, not chosen from a menu."
 *
 * The Argument Spine calls the absence of a price table the strongest line
 * on the page and says to make it the argument rather than an omission. What
 * carries that is the ORDER, so the order is the thing this component draws:
 * 5 inputs, then 3 numbered steps that can only run one way.
 *
 * WHY CARDS RATHER THAN A FUNNEL. An SVG fan converged on a point that sat
 * in the gap between the 2 cards below it, so the lines resolved into
 * nothing and the eye had to guess the connection. Numbered cards state the
 * same sequence without asking the layout to hold a coordinate.
 *
 * NO FIGURE APPEARS HERE. The floor and the activation are published once,
 * in the anchors section, which is the only place Build Spec v2 puts them.
 * The last card names an order, never an amount. Do not add a range, a
 * monthly figure or an annual one to this component.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const CSS = `
@keyframes dpi-chip {
  0%, 5%    { border-color: rgba(244,245,242,0.1); }
  12%, 20%  { border-color: rgba(158,216,68,0.55); }
  30%, 100% { border-color: rgba(244,245,242,0.1); }
}
@keyframes dpi-step {
  0%, 6%    { opacity: 0; }
  14%, 28%  { opacity: 1; }
  38%, 100% { opacity: 0; }
}
@media (prefers-reduced-motion: no-preference) {
  .dpi-chip { animation: dpi-chip 5.5s ease-in-out infinite; }
  .dpi-step { animation: dpi-step 6.6s ease-in-out infinite; }
}
`;

const INPUTS = [
  { k: "Market size", v: "How much geography there is to hold" },
  { k: "Competitive saturation", v: "How loud the market already is" },
  { k: "Current brand position", v: "How well the name is known today" },
  { k: "Service area", v: "How far the trucks actually go" },
  { k: "Video scope", v: "How much the content engine has to produce" },
];

/** Diagnosis, then prescription. In that order and never the reverse. */
const ORDER = [
  {
    k: "The assessment",
    v: "The research modules run against your market, not a template.",
  },
  {
    k: "Then the scope",
    v: "What the work actually has to be, once there is something to look at.",
  },
  {
    k: "Then the number",
    v: "Sized from the floor up. Never picked off a menu before any of this happened.",
  },
];

const item: Variants = {
  hidden: { opacity: 0, y: -10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT, delay: i * 0.08 },
  }),
};

const step: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT, delay: 0.35 + i * 0.12 },
  }),
};

export function PriceInputsDiagram() {
  return (
    <motion.figure
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      <style>{CSS}</style>

      <p className="label-mono text-ink-faint">What sets the number</p>

      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
        {INPUTS.map((input, i) => (
          <motion.li
            key={input.k}
            custom={i}
            variants={item}
            className="dpi-chip flex h-full flex-col rounded-[12px] border border-[rgba(244,245,242,0.1)] bg-[#0b0e13] p-4"
            style={{ animationDelay: `${i * 1.1}s` }}
          >
            <p className="text-[0.9375rem] font-semibold leading-snug">{input.k}</p>
            <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-faint">{input.v}</p>
          </motion.li>
        ))}
      </ul>

      <p className="label-mono mt-8 text-ink-faint">The order it happens in</p>

      <ol className="mt-4 grid gap-2.5 md:grid-cols-3 md:gap-3">
        {ORDER.map((o, i) => {
          const last = i === ORDER.length - 1;
          return (
            <motion.li
              key={o.k}
              custom={i}
              variants={step}
              className={`relative flex h-full flex-col overflow-hidden rounded-[16px] border p-5 md:p-6 ${
                last
                  ? "border-brand/45 bg-[linear-gradient(150deg,rgba(158,216,68,0.12),rgba(13,16,21,0.75)_70%)]"
                  : "border-[#2b323c] bg-[#0d1015]"
              }`}
            >
              {/* The sequence lights in turn, so the order keeps asserting
                  itself after the entrance is over. Decorative. */}
              <span
                aria-hidden
                className="dpi-step pointer-events-none absolute inset-x-0 top-0 h-px bg-brand opacity-0"
                style={{ animationDelay: `${i * 2.2}s` }}
              />

              <span
                aria-hidden
                className={`label-mono text-[0.75rem] ${last ? "text-brand" : "text-ink-faint"}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-[1.0625rem] font-semibold leading-snug">{o.k}</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                {o.v}
              </p>
            </motion.li>
          );
        })}
      </ol>

      <figcaption className="mt-5 text-[0.9375rem] leading-relaxed text-muted-foreground">
        5 things about your market converge before a price exists. A published
        table reverses that order, which is how 2 contractors in the same city
        end up paying the same number for different problems.
      </figcaption>
    </motion.figure>
  );
}
