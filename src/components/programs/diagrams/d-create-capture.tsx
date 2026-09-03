"use client";

import { motion, type Variants } from "motion/react";

/**
 * Create Demand / Capture Demand.
 *
 * One of the 7 visual explanations Copy Framework section 24 requires, and
 * reproduced in IMAGE-GUIDELINES section 5 as "show both sides working
 * simultaneously". It did not exist anywhere in the build before this.
 *
 * What it draws is the Overview page's Problem beat, literally: the market
 * sells you 3 kinds of vendor and all 3 of them sit on the capture half.
 * The create half is not contested, it is empty, which is why the copy can
 * say capture "can only collect demand that already exists, and nobody is
 * raising it". The last row is the only one that crosses the middle.
 *
 * Colour carries the argument, matching the home page visual: green is
 * create demand, blue is capture demand.
 *
 * SEO Guidelines 5.7: the diagram carries the argument for humans and every
 * label in it is real HTML text, so it carries for machines too. The vendor
 * cards below the figure remain the full text equivalent.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const CSS = `
@keyframes dcc-gap  { 0%, 100% { opacity: 0.28; } 50% { opacity: 0.6; } }
@keyframes dcc-flow { to { background-position: 36px 0; } }
.dcc-gap  { animation: dcc-gap 3.4s ease-in-out infinite; }
.dcc-flow {
  background-image: repeating-linear-gradient(115deg, rgba(12,14,18,0.32) 0 8px, transparent 8px 18px);
  background-size: 36px 100%;
  animation: dcc-flow 1.1s linear infinite;
}
.dcc-track { --dcc-label: 13rem; }
@media (prefers-reduced-motion: reduce) {
  .dcc-gap, .dcc-flow { animation: none; }
}
`;

type Row = { who: string; side: "capture" | "both"; note: string };

const ROWS: Row[] = [
  { who: "The lead generation agency", side: "capture", note: "Fills the calendar" },
  { who: "The SEO only vendor", side: "capture", note: "Wins the ranking" },
  { who: "The performance only media buyer", side: "capture", note: "Reports a clean number" },
  { who: "TopServ Digital", side: "both", note: "Sizes one half against the other" },
];

const bar: Variants = {
  hidden: { scaleX: 0 },
  show: (i: number) => ({
    scaleX: 1,
    transition: { duration: 0.7, ease: EASE_OUT, delay: 0.12 * i },
  }),
};

export function CreateCaptureDiagram() {
  return (
    <motion.figure
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="rounded-[20px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_62%)] p-5 md:p-7"
    >
      <style>{CSS}</style>

      {/* The 2 halves, named once at the top. */}
      <div className="grid grid-cols-2 gap-3 pl-0 sm:pl-[14rem]">
        <p className="label-mono flex items-center gap-2 text-brand">
          <span aria-hidden className="block size-2 rounded-full bg-brand" />
          Create demand
        </p>
        <p className="label-mono flex items-center gap-2 text-brand-blue-hot">
          <span aria-hidden className="block size-2 rounded-full bg-brand-blue-hot" />
          Capture demand
        </p>
      </div>

      <ul className="mt-5 grid gap-3">
        {ROWS.map((row, i) => {
          const both = row.side === "both";
          return (
            <li
              key={row.who}
              className="grid items-center gap-2 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-4"
            >
              <div className="min-w-0">
                <p
                  className={`truncate text-[0.9375rem] font-semibold ${
                    both ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {row.who}
                </p>
                <p className="label-mono mt-0.5 text-[0.625rem] text-ink-faint">{row.note}</p>
              </div>

              {/* The coverage track. Left half is create, right half is
                  capture. Decorative: the row label and the caption state
                  the same coverage in words. */}
              <div
                aria-hidden
                className="relative flex h-9 overflow-hidden rounded-[10px] border border-[rgba(244,245,242,0.08)] bg-[#0b0e13]"
              >
                <span className="absolute inset-y-0 left-1/2 w-px bg-[rgba(244,245,242,0.12)]" />

                {both ? (
                  <motion.span
                    custom={i}
                    variants={bar}
                    className="absolute inset-y-0 left-0 w-full origin-left overflow-hidden rounded-[9px] bg-[linear-gradient(90deg,var(--brand),var(--brand-blue))]"
                  >
                    {/* The travelling stripes sit on their own layer, so they
                        do not overwrite the gradient underneath them. */}
                    <span aria-hidden className="dcc-flow absolute inset-0" />
                  </motion.span>
                ) : (
                  <>
                    {/* The empty create half, marked rather than left blank. */}
                    <span className="dcc-gap absolute inset-y-0 left-0 flex w-1/2 items-center justify-center bg-[repeating-linear-gradient(135deg,rgba(244,245,242,0.05)_0_6px,transparent_6px_12px)]">
                      <span className="label-mono text-[0.625rem] text-ink-faint">Not covered</span>
                    </span>
                    <motion.span
                      custom={i}
                      variants={bar}
                      className="absolute inset-y-0 left-1/2 w-1/2 origin-left rounded-r-[9px] bg-[linear-gradient(90deg,color-mix(in_srgb,var(--brand-blue)_78%,transparent),var(--brand-blue-hot))]"
                    />
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <figcaption className="mt-6 border-t border-[rgba(244,245,242,0.08)] pt-5 text-[0.9375rem] leading-relaxed text-muted-foreground">
        All 3 vendors work the capture half. None of them raises demand, which
        is why the ceiling holds no matter which one you hire, and why the
        gap between them is the part you pay for twice.
      </figcaption>
    </motion.figure>
  );
}
