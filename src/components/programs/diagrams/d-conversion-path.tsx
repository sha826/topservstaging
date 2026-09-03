"use client";

import { motion, type Variants } from "motion/react";

/**
 * The conversion path, for the end of the last page.
 *
 * Build Spec v2 section 3 publishes this table and prefaces it with "one
 * path. Not twelve competing calls to action." Success Stories is the end of
 * step 2, so the honest thing to put beside its final CTA is the path
 * itself, with the finished steps marked and the next one lit.
 *
 * Every step, its location and its description are the spec's own rows. The
 * spec's note that "steps 3 through 5 are the Growth Engine" is carried too,
 * because it is what explains why the next click is an assessment rather
 * than a sales call.
 *
 * The Brand Assessment step says GRADE, never a number. Build Spec v2
 * section 5 separates the public Brand Assessment from the internal scoring
 * engine, and SEO Guidelines 1.4 keeps the words "Brand Score" off the site
 * entirely, including alt text and metadata.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const CSS = `
@keyframes dcp-next {
  0%, 100% { box-shadow: 0 0 0 0 rgba(158, 216, 68, 0); }
  50%      { box-shadow: 0 0 24px 0 rgba(158, 216, 68, 0.26); }
}
@keyframes dcp-drop {
  0%       { opacity: 0; transform: translateY(-40%); }
  12%, 78% { opacity: 1; }
  100%     { opacity: 0; transform: translateY(420%); }
}
@media (prefers-reduced-motion: no-preference) {
  .dcp-next { animation: dcp-next 3.4s ease-in-out infinite; }
  .dcp-drop { animation: dcp-drop 6.5s cubic-bezier(0.45, 0, 0.55, 1) infinite; }
}
`;

type State = "done" | "next" | "ahead";

const STEPS: { n: number; k: string; where: string; state: State }[] = [
  { n: 1, k: "Discover BrandFormance", where: "Home, BrandFormance, Method", state: "done" },
  { n: 2, k: "Understand the program", where: "These 5 pages", state: "done" },
  { n: 3, k: "Get your Brand Grade", where: "The Brand Assessment. A grade, not a number.", state: "next" },
  { n: 4, k: "Get your assessment", where: "Booking. The research modules run.", state: "ahead" },
  { n: 5, k: "Build your plan", where: "The strategy call, where the plan is presented.", state: "ahead" },
];

const row: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT, delay: i * 0.09 },
  }),
};

export function ConversionPathDiagram() {
  return (
    <motion.figure
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="rounded-[20px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_62%)] p-5 md:p-6"
    >
      <style>{CSS}</style>

      <p className="label-mono text-ink-faint">One path, 5 steps</p>

      <ol className="relative mt-5 grid gap-2.5 pl-7">
        {/* The spine, and a charge running down it. Decorative. */}
        <span
          aria-hidden
          className="absolute bottom-4 left-[0.5625rem] top-4 w-px bg-[linear-gradient(180deg,var(--brand),rgba(158,216,68,0.16))]"
        />
        <span
          aria-hidden
          className="dcp-drop absolute left-[0.4375rem] top-4 h-8 w-[3px] rounded-full bg-[linear-gradient(180deg,transparent,var(--brand),transparent)] opacity-0"
        />

        {STEPS.map((s, i) => {
          const done = s.state === "done";
          const next = s.state === "next";
          return (
            <motion.li key={s.n} custom={i} variants={row} className="relative">
              {/* The node on the spine. */}
              <span
                aria-hidden
                className={`absolute -left-7 top-3 flex size-[1.125rem] items-center justify-center rounded-full border text-[0.5rem] font-bold ${
                  done
                    ? "border-brand bg-brand text-[#0c0e12]"
                    : next
                      ? "border-brand bg-[#0b0e13] text-brand"
                      : "border-[rgba(244,245,242,0.2)] bg-[#0b0e13] text-ink-faint"
                }`}
              >
                {done ? "✓" : s.n}
              </span>

              <div
                className={`rounded-[12px] border p-3.5 ${
                  next
                    ? "dcp-next border-brand/50 bg-[linear-gradient(150deg,rgba(158,216,68,0.13),rgba(13,16,21,0.75)_70%)]"
                    : "border-[rgba(244,245,242,0.09)] bg-[#0b0e13]"
                }`}
              >
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <p
                    className={`text-[0.9375rem] font-semibold leading-snug ${
                      done ? "text-ink-faint" : "text-foreground"
                    }`}
                  >
                    {s.k}
                  </p>
                  {done && (
                    <span className="label-mono text-[0.5625rem] text-brand">Done</span>
                  )}
                  {next && (
                    <span className="label-mono text-[0.5625rem] text-brand">You are here</span>
                  )}
                </div>
                <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-faint">
                  {s.where}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>

      <figcaption className="mt-5 border-t border-[rgba(244,245,242,0.08)] pt-4 text-[0.8125rem] leading-relaxed text-ink-faint">
        Steps 3 to 5 are the Growth Engine. The assessment produces the scope,
        the scope produces the plan, and nothing is priced before either
        exists.
      </figcaption>
    </motion.figure>
  );
}
