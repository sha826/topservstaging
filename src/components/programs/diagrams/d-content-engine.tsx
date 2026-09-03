"use client";

import { motion, type Variants } from "motion/react";

/**
 * The Content Engine: 1 shoot, 7 assets.
 *
 * This is the Overview page's Proof beat from the Argument Spine: "one long
 * form shoot produces six or more assets across video, article, short form,
 * podcast, email, social and search. We do it on our own site."
 *
 * It replaces a 7 item list that stated the count without showing the
 * fan out. A list of 7 things reads as 7 separate jobs, which is the exact
 * opposite of the argument. A spine with 7 branches off a single source
 * reads as 1 job, which is the argument.
 *
 * Drawn with a rail and CSS elbows rather than an SVG fan, so it reflows at
 * any width without geometry math, and every label is real HTML text per
 * SEO Guidelines 5.7.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const CSS = `
@keyframes dce-pip { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
@media (prefers-reduced-motion: no-preference) {
  .dce-pip    { animation: dce-pip 2.6s ease-in-out infinite; }
}
`;

const ASSETS = [
  { k: "Long form video", v: "The sitting itself, cut to length" },
  { k: "Short form cuts", v: "The moments that travel on their own" },
  { k: "An article", v: "The same argument, written to be found" },
  { k: "A podcast segment", v: "The audio, where the drive time is" },
  { k: "Email", v: "The list, told the same thing in the same week" },
  { k: "Social", v: "The run that holds the frequency floor" },
  { k: "Search answers", v: "What a search engine and an AI assistant quote back" },
];

const branch: Variants = {
  hidden: { opacity: 0, x: -14 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE_OUT, delay: 0.18 + i * 0.075 },
  }),
};

const source: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export function ContentEngineDiagram() {
  return (
    <motion.figure
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="relative"
    >
      <style>{CSS}</style>

      {/* The source. Everything below it is made from this one thing. */}
      <motion.div
        variants={source}
        className="relative z-10 flex items-center gap-4 rounded-[16px] border border-brand/40 bg-[linear-gradient(140deg,rgba(158,216,68,0.14),rgba(13,16,21,0.8)_66%)] p-5"
      >
        <span
          aria-hidden
          className="dce-pip mt-0.5 block size-3 shrink-0 rounded-full bg-brand shadow-[0_0_0_5px_rgba(158,216,68,0.16)]"
        />
        <div>
          <p className="label-mono text-brand">The source</p>
          <p className="display mt-1.5 text-[clamp(1.1rem,1.8vw,1.4rem)] leading-tight">
            1 long form shoot
          </p>
          <p className="mt-1 text-[0.875rem] leading-relaxed text-muted-foreground">
            One sitting with the owner on camera, filmed once.
          </p>
        </div>
      </motion.div>

      {/* The spine and its 7 branches. Each row carries its own rail
          segment, stretched over the row gap so the line reads continuous,
          and the tick always meets the card because both live in the same
          fixed column. */}
      <ol className="mt-2.5 grid gap-2.5">
        {ASSETS.map((a, i) => {
          const last = i === ASSETS.length - 1;
          return (
            <motion.li
              key={a.k}
              custom={i}
              variants={branch}
              className="grid grid-cols-[1.75rem_minmax(0,1fr)] md:grid-cols-[2.25rem_minmax(0,1fr)]"
            >
              <span aria-hidden className="relative">
                <span
                  className={`absolute left-[0.4375rem] w-px bg-[rgba(158,216,68,0.35)] ${
                    last ? "-top-[0.3125rem] h-[calc(50%+0.3125rem)]" : "-inset-y-[0.3125rem]"
                  }`}
                />
                <span className="absolute inset-x-0 left-[0.4375rem] top-1/2 h-px bg-[rgba(158,216,68,0.35)]" />
                <span className="dce-pip absolute left-[0.1875rem] top-1/2 block size-2 -translate-y-1/2 rounded-full bg-brand" />
              </span>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-[12px] border border-[#2b323c] bg-[#0b0e13] px-4 py-3">
                <span aria-hidden className="label-mono text-[0.625rem] text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.9375rem] font-semibold">{a.k}</span>
                <span className="text-[0.875rem] leading-relaxed text-muted-foreground">
                  {a.v}
                </span>
              </div>
            </motion.li>
          );
        })}
      </ol>

    </motion.figure>
  );
}
