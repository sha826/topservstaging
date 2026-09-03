"use client";

import { motion, type Variants } from "motion/react";

/**
 * The first 90 days, as a rail.
 *
 * Build Spec v2 section 4, Programs page 3 asks for "what improves in the
 * first 90 days, specific and defensible, with no revenue guarantee". The
 * page states 4 things and every one of them is a checkpoint in time, so a
 * rail with 4 nodes says what a grid of 4 cards could not: they happen in an
 * order, and the last one is the one that makes everything after it
 * measurable.
 *
 * The diagram holds the copy rather than sitting beside it, so there is one
 * visual per beat and the text equivalent SEO Guidelines 5.7 requires is the
 * same markup, not a duplicate.
 *
 * The only quantity is time, which the spec supplies. Nothing here states a
 * revenue figure, a percentage or a multiple.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const CSS = `
@keyframes dnr-run {
  0%       { opacity: 0; transform: translateX(-100%); }
  6%, 88%  { opacity: 1; }
  100%     { opacity: 0; transform: translateX(500%); }
}
@keyframes dnr-node {
  0%, 6%    { box-shadow: 0 0 0 0 rgba(158, 216, 68, 0.4); }
  14%, 22%  { box-shadow: 0 0 0 7px rgba(158, 216, 68, 0); }
  30%, 100% { box-shadow: 0 0 0 0 rgba(158, 216, 68, 0); }
}
@media (prefers-reduced-motion: no-preference) {
  .dnr-run  { animation: dnr-run 6s linear infinite; }
  .dnr-node { animation: dnr-node 6s ease-out infinite; }
}
`;

const NINETY = [
  {
    when: "Weeks 1 to 4",
    k: "The market has seen you",
    v: "Brand content has run at the frequency floor across the geography the budget holds, which is the first month anything can compound from.",
  },
  {
    when: "Weeks 4 to 8",
    k: "Capture is working properly",
    v: "Search, maps and Local Services are set up, measured and no longer competing with each other for the same click.",
  },
  {
    when: "Weeks 6 to 10",
    k: "The path converts",
    v: "Booking, speed to lead and the conversion infrastructure are in place, so demand that arrives is not leaking out between the call and the job.",
  },
  {
    when: "By week 12",
    k: "The number has a baseline",
    v: "Cost per booked call is being measured across both halves together, which is what makes every later change falsifiable.",
  },
];

const rail: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: EASE_OUT } },
};

const nodeIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT, delay: 0.2 + i * 0.14 },
  }),
};

export function NinetyRailDiagram() {
  return (
    <motion.figure
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="relative"
    >
      <style>{CSS}</style>

      <div className="relative rounded-[20px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_62%)] p-5 md:p-7">
        <div className="flex items-center justify-between">
          <p className="label-mono text-ink-faint">Day 1</p>
          <p className="label-mono text-brand">Day 90</p>
        </div>

        {/* The rail. Horizontal once there is room for 4 nodes across it,
            vertical underneath the labels on small screens. */}
        <div className="relative mt-4">
          <span
            aria-hidden
            className="absolute left-0 right-0 top-[0.4375rem] hidden h-px bg-[rgba(244,245,242,0.12)] md:block"
          />
          <motion.span
            aria-hidden
            variants={rail}
            className="absolute left-0 right-0 top-[0.4375rem] hidden h-px origin-left bg-[linear-gradient(90deg,rgba(158,216,68,0.35),var(--brand))] md:block"
          />
          <span
            aria-hidden
            className="absolute inset-x-0 top-[0.25rem] hidden h-[3px] overflow-hidden md:block"
          >
            <span className="dnr-run block h-full w-1/5 rounded-full bg-[linear-gradient(90deg,transparent,var(--brand),transparent)] opacity-0" />
          </span>

          <ol className="grid gap-6 md:grid-cols-4 md:gap-5">
            {NINETY.map((o, i) => (
              <motion.li key={o.k} custom={i} variants={nodeIn} className="relative pl-6 md:pl-0">
                {/* The node on the rail. */}
                <span
                  aria-hidden
                  className="dnr-node absolute left-0 top-1 block size-3.5 rounded-full border-2 border-brand bg-[#0b0e13] md:relative md:top-0"
                  style={{ animationDelay: `${i * 1.5}s` }}
                />
                {/* The run down to the label on mobile. */}
                <span
                  aria-hidden
                  className="absolute bottom-0 left-[0.375rem] top-5 w-px bg-[rgba(158,216,68,0.22)] md:hidden"
                />

                <p className="label-mono mt-0 text-[0.625rem] text-ink-faint md:mt-4">
                  {o.when}
                </p>
                <p className="mt-2 text-[1.0625rem] font-semibold leading-snug">{o.k}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {o.v}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      <figcaption className="mt-5 text-[0.9375rem] leading-relaxed text-ink-faint">
        Every one of these is checkable at 90 days, which is the point of
        stating them. None of them is a revenue promise.
      </figcaption>
    </motion.figure>
  );
}
