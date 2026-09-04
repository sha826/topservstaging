"use client";

import { motion, type Variants } from "motion/react";
import { namesCleared, namesWithheldNote, sixClients } from "@/lib/bf-content";

/**
 * The 6 outcomes, drawn so they can be compared.
 *
 * THIS IS EVIDENCE, NOT A CONCEPTUAL VISUAL. IMAGE-GUIDELINES 4.4 keeps the
 * 2 apart, and this sits on the proof side of that line: every value here is
 * the spec's own table in bf-content.ts, rendered rather than restated. That
 * is also why the numbers are parsed from the single source instead of being
 * retyped into this file, where they could drift.
 *
 * The shape is the Argument Spine's insight beat for this page: "a number
 * without a starting position is not proof. Forty three percent more traffic
 * tells you nothing about whether the phone rang." So every bar starts at
 * the company's actual starting revenue and the starting figure is printed,
 * never only the ending one. A bar that began at zero would be the exact
 * dishonesty the page argues against.
 *
 * NAMES. Build Spec v2 section 15, Decision 1: which of the 6 clients can be
 * named publicly is unresolved, owners Ryan and JB. Until it resolves the
 * Argument Spine's documented fallback applies, "at minimum assume market and
 * outcome without company names", so the rows carry market plus outcome. The
 * flag is namesCleared in bf-content.ts, shared with the home page proof
 * band so 1 switch covers every surface.
 *
 * No Review or AggregateRating schema anywhere near this, per
 * KEYWORD-RESEARCH 4.4e: self published case studies do not get review
 * markup.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const CSS = `
@keyframes dgb-tip { 0%, 100% { opacity: 0.45; } 50% { opacity: 1; } }
@media (prefers-reduced-motion: no-preference) {
  .dgb-tip { animation: dgb-tip 2.9s ease-in-out infinite; }
}
`;

/** Reads "$3.9M to $9M" and "$500K to $3.5M" off the single source. */
function parseRange(result: string) {
  const m = result.match(/\$([\d.]+)\s*([KM])\s+to\s+\$([\d.]+)\s*([KM])/i);
  if (!m) return null;
  const scale = (v: string, unit: string) =>
    Number(v) * (unit.toUpperCase() === "K" ? 0.001 : 1);
  return { from: scale(m[1], m[2]), to: scale(m[3], m[4]) };
}

const ROWS = sixClients
  .map((c) => ({ ...c, range: parseRange(c.result) }))
  .filter((c) => c.range !== null);

const CEILING = Math.max(...ROWS.map((r) => r.range!.to));

const grow: Variants = {
  hidden: { scaleX: 0 },
  show: (i: number) => ({
    scaleX: 1,
    transition: { duration: 0.85, ease: EASE_OUT, delay: 0.1 + i * 0.1 },
  }),
};

const fade: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT, delay: i * 0.1 },
  }),
};

export function GrowthBarsDiagram() {
  return (
    <motion.figure
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="rounded-[20px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_62%)] p-5 md:p-7"
    >
      <style>{CSS}</style>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="label-mono text-ink-faint">Where each one started, and where it got to</p>
        <p className="label-mono flex items-center gap-4 text-ink-faint">
          <span className="flex items-center gap-2">
            <span aria-hidden className="block h-1.5 w-5 rounded-full bg-[rgba(244,245,242,0.28)]" />
            Starting revenue
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden className="block h-1.5 w-5 rounded-full bg-brand" />
            Where it is now
          </span>
        </p>
      </div>

      <ul className="mt-6 grid gap-4">
        {ROWS.map((row, i) => {
          const { from, to } = row.range!;
          const fromPct = (from / CEILING) * 100;
          const toPct = (to / CEILING) * 100;
          return (
            <li key={`${row.market}-${row.result}`} className="grid gap-2">
              <motion.div
                custom={i}
                variants={fade}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
              >
                <p className="text-[0.9375rem] font-semibold">
                  {namesCleared ? row.client : row.market}
                  {namesCleared && (
                    <span className="ml-2 font-normal text-ink-faint">{row.market}</span>
                  )}
                </p>
                <p className="flex flex-wrap items-baseline gap-x-3">
                  <span className="display text-[1.0625rem] text-brand">{row.result}</span>
                  <span className="label-mono text-[0.6875rem] text-ink-faint">{row.detail}</span>
                </p>
              </motion.div>

              {/* The track. The starting position is drawn, not implied. */}
              <div
                aria-hidden
                className="relative h-8 overflow-hidden rounded-[9px] border border-[rgba(244,245,242,0.08)] bg-[#0b0e13]"
              >
                <motion.span
                  custom={i}
                  variants={grow}
                  className="absolute inset-y-0 left-0 origin-left rounded-[8px] bg-[linear-gradient(90deg,rgba(158,216,68,0.5),var(--brand))]"
                  style={{ width: `${toPct}%` }}
                />
                <span
                  className="absolute inset-y-0 left-0 rounded-l-[8px] bg-[rgba(244,245,242,0.16)]"
                  style={{ width: `${fromPct}%` }}
                />
                <span
                  className="dgb-tip absolute inset-y-0 w-px bg-[rgba(244,245,242,0.55)]"
                  style={{ left: `${fromPct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <figcaption className="mt-6 border-t border-[rgba(244,245,242,0.08)] pt-5 text-[0.9375rem] leading-relaxed text-muted-foreground">
        Each bar starts where the company actually started. That is the part
        most case studies leave out, and it is the only part that makes the
        second number mean anything.
        {!namesCleared && (
          <span className="mt-2 block text-ink-faint">
            Markets and outcomes are published here. {namesWithheldNote}
          </span>
        )}
      </figcaption>
    </motion.figure>
  );
}
