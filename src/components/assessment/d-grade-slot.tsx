"use client";

import { brandGrades } from "@/lib/bf-content";

/**
 * The hero graphic: what the assessment actually returns.
 *
 * THE DOCTRINE IS THE GRAPHIC. Build Spec v2 section 5 separates the public
 * Brand Assessment from the internal scoring engine, and the rule is
 * absolute: the public artifact is a GRADE, never a number. SEO Guidelines
 * 1.4 keeps the words "Brand Score" off the site entirely, including alt
 * text and metadata. So the hero shows a result slot cycling through the 4
 * possible grades with the line "1 of 4. Never a number." under it, which
 * says what the page is offering and what it refuses to offer in the same
 * shape.
 *
 * NOTHING NUMERIC APPEARS. No score, no percentage, no scale, no dial. A
 * dial would imply the continuum underneath, which is exactly the internal
 * object section 5 says must never surface. Four discrete labels and four
 * pips: a grade is a category, not a position on a line.
 *
 * The 4 grade labels are read from bf-content rather than retyped, so the
 * open labelling conflict recorded in CLAUDE.md and CONVERSION-NOTES.md
 * resolves in exactly 1 place when Ryan and Alejandro settle it. See the
 * page file for the conflict itself. Do not fix it here.
 */

const CYCLE = brandGrades.length * 2.6;

const CSS = `
@keyframes dgs-slot {
  0%, 3%    { opacity: 0; transform: translateY(8px); }
  6%, 22%   { opacity: 1; transform: none; }
  25%, 100% { opacity: 0; transform: translateY(-8px); }
}
@keyframes dgs-pip {
  0%, 3%    { background-color: rgba(244,245,242,0.16); }
  6%, 22%   { background-color: var(--brand); }
  25%, 100% { background-color: rgba(244,245,242,0.16); }
}
@keyframes dgs-tick { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
@media (prefers-reduced-motion: no-preference) {
  .dgs-slot { animation: dgs-slot var(--dgs-cycle) ease-in-out infinite; }
  .dgs-pip  { animation: dgs-pip var(--dgs-cycle) ease-in-out infinite; }
  .dgs-tick { animation: dgs-tick 2.6s ease-in-out infinite; }
}
/* With motion off, the first grade stands as a worked example and the rest
   stay in the DOM for a screen reader rather than stacked invisibly. */
@media (prefers-reduced-motion: reduce) {
  .dgs-slot { position: static; opacity: 1; }
  .dgs-slot ~ .dgs-slot { display: none; }
}
`;

export function GradeSlotDiagram() {
  return (
    <figure
      className="relative flex min-h-[20rem] flex-col overflow-hidden rounded-[24px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_62%)] p-6 md:p-7"
      style={{ ["--dgs-cycle" as string]: `${CYCLE}s` }}
    >
      <style>{CSS}</style>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(72%_54%_at_50%_0%,rgba(158,216,68,0.12),transparent_68%)]"
      />

      <p className="label-mono relative flex items-center gap-2.5 text-ink-faint">
        <span aria-hidden className="dgs-tick block size-2 rounded-full bg-brand" />
        What comes back
      </p>

      {/* The slot. One label at a time, each holding its own row so the box
          never resizes as they swap. */}
      <div className="relative flex flex-1 items-center">
        <div className="relative grid w-full">
          {brandGrades.map((g, i) => (
            <p
              key={g.grade}
              className="dgs-slot display col-start-1 row-start-1 text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.04] text-brand"
              style={{ animationDelay: `${i * 2.6}s` }}
            >
              {g.grade}
            </p>
          ))}
        </div>
      </div>

      <div className="relative">
        <p className="label-mono text-ink-faint">1 of 4. Never a number.</p>

        {/* 4 pips, in step with the slot. A category, not a position. */}
        <span aria-hidden className="mt-3 flex gap-2">
          {brandGrades.map((g, i) => (
            <span
              key={g.grade}
              className="dgs-pip h-1 flex-1 rounded-full bg-[rgba(244,245,242,0.16)]"
              style={{ animationDelay: `${i * 2.6}s` }}
            />
          ))}
        </span>

        <p className="mt-5 border-t border-[rgba(244,245,242,0.1)] pt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
          A grade with a consequence beats a number without context. Yours
          arrives with what it means and the right next step.
        </p>
      </div>

      <figcaption className="sr-only">
        The Brand Assessment returns 1 of 4 grades, each with what it means
        for the business. It never returns a number.
      </figcaption>
    </figure>
  );
}
