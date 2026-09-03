"use client";

import { useEffect, useRef, useState } from "react";
import { sixStages } from "@/lib/bf-content";
import { Eyebrow, Shell } from "@/components/method/m-grid";

/**
 * The 6 stages. The core of the page.
 *
 * ARGUMENT SPINE, /method: "A real method tells you what happens, in what
 * order, what it produces, and how you know it worked. If any of those 4 is
 * missing it is a diagram, not a method." So every stage carries all 4:
 * the objective, its place in the order, what it produces, and the signal
 * that says it worked.
 *
 * KEYWORD-RESEARCH 4.3 requires each of the 6 stages to have its own H2 and
 * its metric named in crawlable text. Both hold here.
 *
 * PROVENANCE, because it matters on this page:
 *
 *   name, objective   bf-content.ts sixStages, verbatim. Build Spec v2 s4.
 *   signal            recombined from documented text only. Stages 1 and 2
 *                     take their signal from threePhases[0].progress, 3 to 5
 *                     from threePhases[1].progress, 6 from threePhases[2]
 *                     .progress and the spec's "cost per booked call is the
 *                     headline number". Nothing measured is invented.
 *   produces          written for this page from the objective. Mine, not
 *                     the documents'. Flagged in the handoff.
 *   problem           also mine. The Argument Spine specifies that a stage
 *                     carries "a problem it solves", so the field is
 *                     required by the documents even though its wording is
 *                     not supplied by them.
 *
 * WHAT IS STILL MISSING. The Argument Spine's callout asks for a metric per
 * stage. No document supplies one for stages 1 to 5: the only numeric
 * measure in the spec is cost per booked call, which belongs to stage 6.
 * The signals below are the documented progress markers instead. Ryan and
 * Alejandro need to supply real per-stage metrics before this page is
 * promoted, or the spine's callout stays unmet.
 *
 * The rail tracks the reader with an IntersectionObserver rather than a
 * scroll handler, so nothing runs per frame, and every panel is in normal
 * flow: nothing is hidden behind a click.
 */

const DETAIL = [
  {
    problem:
      "The company sounds like every competitor, so the customer has nothing to choose on except price and who answers first.",
    produces: "A written position, an approved message, and the reason to pick this company over the one down the road.",
    signal: "A distinct position and an approved message the whole team can repeat.",
  },
  {
    problem:
      "There is nothing to publish. The position exists in a document and nowhere a customer will ever encounter it.",
    produces: "The assets the brand runs on: video, messaging, proof, the site, the profiles.",
    signal: "A filming plan the whole team believes in.",
  },
  {
    problem:
      "Nobody knows the name before they need the service, so every job starts as a cold comparison against 4 other companies.",
    produces: "Brand advertising and content running at a fixed weekly frequency across the map the budget can hold.",
    signal: "Consistent local reach, 3 times weekly, held at the frequency floor.",
  },
  {
    problem:
      "Familiarity creates demand that a competitor collects, because they were present at the moment of need and you were not.",
    produces: "Presence at the moment of need: search, maps, Local Services, retargeting.",
    signal: "Working capture channels.",
  },
  {
    problem:
      "The phone rings and the work leaks out between the call and the booked job.",
    produces: "The infrastructure that turns attention into booked work, and the speed to answer it.",
    signal: "A booking flow that converts.",
  },
  {
    problem:
      "Each half can be reported as a success while the business stands still, because nothing measures them together.",
    produces: "1 measurement system across both halves, and the decisions that come out of it.",
    signal: "Cost per booked call falling as brand equity builds.",
  },
];

export function MStages() {
  const [active, setActive] = useState(0);
  const panels = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = panels.current.indexOf(e.target as HTMLElement);
            if (i >= 0) setActive(i);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    panels.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="m-stages-heading" className="border-b border-border bg-background">
      <Shell className="py-16 md:py-20">
        <div className="max-w-[46rem]">
          <Eyebrow>The system</Eyebrow>
          <p
            id="m-stages-heading"
            className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
          >
            6 stages, in order, each one accountable.
          </p>
          <p className="mt-6 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
            Each stage below states the problem it solves, what happens inside
            it, what it produces, and the signal that tells you it worked. They
            start in this order and then run together. Nothing on this list is
            decorative, and nothing is here because it looks good on a diagram.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,30fr)_minmax(0,70fr)] lg:gap-14">
          {/* The rail. Decorative: every stage below is a real heading. */}
          <ol aria-hidden className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
            {sixStages.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.n}>
                  <span
                    className={`flex items-center gap-3.5 border-l-2 py-2.5 pl-4 transition-colors ${
                      on ? "border-l-brand text-brand" : "border-l-[#2b323c] text-ink-faint"
                    }`}
                  >
                    <span className="label-mono text-[0.6875rem]">
                      {String(s.n).padStart(2, "0")}
                    </span>
                    <span className="text-[0.9375rem] font-semibold">{s.name}</span>
                  </span>
                </li>
              );
            })}
          </ol>

          <ol className="grid gap-4">
            {sixStages.map((s, i) => (
              <li
                key={s.n}
                ref={(el) => {
                  panels.current[i] = el;
                }}
              >
                <article className="rounded-[18px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_62%)] p-6 md:p-7">
                  <div className="flex items-baseline gap-4">
                    <span
                      aria-hidden
                      className="label-mono flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[rgba(158,216,68,0.26)] text-[0.75rem] text-[rgba(244,245,242,0.72)]"
                    >
                      {String(s.n).padStart(2, "0")}
                    </span>
                    <h2 className="display text-[clamp(1.25rem,2vw,1.65rem)] leading-[1.06]">
                      {s.name}
                    </h2>
                  </div>

                  <p className="mt-5 max-w-[64ch] text-[1rem] leading-relaxed text-muted-foreground md:text-[1.0625rem]">
                    {s.what}
                  </p>

                  <dl className="mt-6 grid gap-5 border-t border-[rgba(244,245,242,0.09)] pt-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <dt className="label-mono text-ink-faint">The problem it solves</dt>
                      <dd className="mt-2 max-w-[64ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
                        {DETAIL[i].problem}
                      </dd>
                    </div>
                    <div>
                      <dt className="label-mono text-ink-faint">What it produces</dt>
                      <dd className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                        {DETAIL[i].produces}
                      </dd>
                    </div>
                    <div>
                      <dt className="label-mono text-brand">How you know it worked</dt>
                      <dd className="mt-2 text-[0.9375rem] leading-relaxed text-foreground">
                        {DETAIL[i].signal}
                      </dd>
                    </div>
                  </dl>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </Shell>
    </section>
  );
}
