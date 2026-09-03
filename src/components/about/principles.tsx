"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Shell } from "@/components/about/page-grid";
import { RULES } from "@/components/about/rules-data";
import { RulesFigure } from "@/components/about/rules-figure";

/**
 * The 6 rules.
 *
 * THE COMPOSITION. A 2 column composition that pins for the length of the
 * section: on the left an eyebrow, the heading and one diagram; on the
 * right the 6 rules, which arrive in sequence as the page scrolls. The
 * ground is the site's near black with a brand green light that grows out of
 * the bottom left as you progress, so the environment develops with the
 * list. Ordinary vertical scroll drives all of it: no scroll jacking, no
 * snap, no autoplay, no arrows, no conventional progress bar.
 *
 * ONE VALUE DRIVES EVERYTHING. `step` runs -0.2 to 5.5 across the pin and
 * each rule takes `arrive`, its own 0 to 1. From that:
 *
 *   position   the row travels in from the right and settles.
 *   presence   the numeral tile goes from a dim olive to full brand green
 *              with ink numerals, and the type comes up to full strength.
 *   border     a green hairline draws clockwise around the row as it
 *              arrives and stays drawn. The border is the only progress
 *              indicator in the section.
 *   light      the green glow behind everything grows with the same value.
 *   draw       the diagram in the left column fills in on the same pass.
 *
 * A row never drops below 0.35 opacity, so every rule is legible at every
 * scroll position and none of this hides content.
 *
 * ONE TREE. There is no duplicated markup for small screens. `useLive`
 * decides at runtime whether the pinned behaviour applies, and when it does
 * not, every row is fed a constant 1, which is the fully arrived state.
 * That single fact covers 4 cases at once:
 *
 *   below lg          no pin. Heading, diagram, then the 6 rules stacked,
 *                     all in their arrived state.
 *   reduced motion    the same, at any width. Nothing moves.
 *   no JS             the server renders exactly that state, so every rule
 *                     is present and readable with no script at all.
 *   first paint       identical on server and client, so nothing flashes.
 *
 * Rows hold no links or buttons, so nothing off screen is focusable.
 */

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Pinned behaviour applies only on a wide viewport with motion allowed. */
function useLive() {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return wide && !reduce;
}

/* ------------------------------------------------------------------ */

/**
 * One rule. The numeral tile is its state at a glance: dim until the rule
 * has arrived, full brand green with ink numerals once it has.
 */
function Row({
  rule,
  arrive,
  last,
}: {
  rule: (typeof RULES)[number];
  arrive: MotionValue<number>;
  last: boolean;
}) {
  const x = useTransform(arrive, [0, 1], [92, 0]);
  const opacity = useTransform(arrive, [0, 1], [0.62, 1]);
  // Presence is crossfaded between 2 static layers rather than interpolated
  // as colour. Interpolating backgroundColor and color per row repaints every
  // frame of the scroll; opacity and transform stay on the compositor, which
  // is what keeps this section smooth under a blurred sticky header.
  const e1 = useTransform(arrive, (v) => clamp01(v / 0.4));
  const e2 = useTransform(arrive, (v) => clamp01((v - 0.4) / 0.1));
  const e3 = useTransform(arrive, (v) => clamp01((v - 0.5) / 0.4));
  const e4 = useTransform(arrive, (v) => clamp01((v - 0.9) / 0.1));

  return (
    <li>
      <motion.div
        style={{ x, opacity, willChange: "transform, opacity" }}
        className="relative flex items-center gap-4 rounded-[14px] p-3 lg:gap-5 lg:p-3.5"
      >
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[14px]">
          <motion.span
            style={{ scaleX: e1 }}
            className="absolute left-0 top-0 h-px w-full origin-left bg-[var(--brand)]/55"
          />
          <motion.span
            style={{ scaleY: e2 }}
            className="absolute right-0 top-0 h-full w-px origin-top bg-[var(--brand)]/55"
          />
          <motion.span
            style={{ scaleX: e3 }}
            className="absolute bottom-0 left-0 h-px w-full origin-right bg-[var(--brand)]/55"
          />
          <motion.span
            style={{ scaleY: e4 }}
            className="absolute bottom-0 left-0 h-full w-px origin-bottom bg-[var(--brand)]/55"
          />
        </span>

        <span className="relative flex size-[clamp(3.25rem,4.6vw,4.25rem)] shrink-0 items-center justify-center rounded-[12px] bg-[rgba(158,216,68,0.26)]">
          <motion.span
            aria-hidden
            style={{ opacity: arrive }}
            className="absolute inset-0 rounded-[12px] bg-[var(--brand)]"
          />
          <span
            aria-hidden
            className="relative font-mono text-[clamp(1rem,1.2vw,1.3rem)] tracking-[0.06em] text-[rgba(244,245,242,0.55)]"
          >
            {rule.n}
          </span>
          <motion.span
            style={{ opacity: arrive }}
            className="absolute font-mono text-[clamp(1rem,1.2vw,1.3rem)] tracking-[0.06em] text-[#0c0e12]"
          >
            {rule.n}
          </motion.span>
        </span>

        <div className="min-w-0">
          <h3 className="display text-[clamp(1.1rem,1.4vw,1.5rem)] uppercase leading-[1.04] text-foreground">
            {rule.title}
          </h3>
          <p className="mt-1.5 max-w-[46ch] text-[clamp(0.8125rem,0.95vw,0.9375rem)] leading-[1.5] text-[rgba(244,245,242,0.72)]">
            {rule.line}
          </p>
        </div>
      </motion.div>
      {last ? null : (
        <span aria-hidden className="mt-1 block h-px w-full bg-[rgba(244,245,242,0.09)]" />
      )}
    </li>
  );
}

/* ------------------------------------------------------------------ */

function Intro({ draw }: { draw: MotionValue<number> }) {
  return (
    <div>
      <p className="label-mono flex items-center gap-2.5 text-[rgba(244,245,242,0.85)]">
        <span aria-hidden className="block size-2 rounded-full bg-[var(--brand)]" />
        Our principles
      </p>
      <h2 className="display mt-5 max-w-[12ch] text-[clamp(2rem,4.6vw,3.9rem)] uppercase leading-[0.94] text-foreground">
        6 rules we do not <span className="text-brand">bend.</span>
      </h2>

      {/* One diagram, drawing with the list. A photograph sat here and was
          asked to carry all 6 rules by association. This carries the 2 that
          are concrete, 02 and 03, and lets the divergence imply 06. See
          rules-figure.tsx. */}
      <div className="mt-8 w-full lg:mt-9">
        <RulesFigure draw={draw} />
      </div>
    </div>
  );
}

export function Principles() {
  const ref = useRef<HTMLDivElement>(null);
  const live = useLive();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const settled = useMotionValue(1);
  const step = useTransform(scrollYProgress, [0, 1], [-0.2, 5.5]);
  const glow = useTransform(scrollYProgress, [0, 0.3, 1], [0.14, 0.55, 1]);
  // The diagram fills in across the same pin the rules arrive on. Off the
  // pin it is fed the settled 1, which is the finished state.
  const draw = useTransform(scrollYProgress, [0, 0.72], [0, 1]);

  // Every row's arrival, computed unconditionally so hook order never varies.
  const arrivals = [
    useTransform(step, (s) => clamp01((s - 0 + 0.15) / 0.55)),
    useTransform(step, (s) => clamp01((s - 1 + 0.15) / 0.55)),
    useTransform(step, (s) => clamp01((s - 2 + 0.15) / 0.55)),
    useTransform(step, (s) => clamp01((s - 3 + 0.15) / 0.55)),
    useTransform(step, (s) => clamp01((s - 4 + 0.15) / 0.55)),
    useTransform(step, (s) => clamp01((s - 5 + 0.15) / 0.55)),
  ];

  return (
    <section
      aria-label="6 rules we do not bend"
      className="relative isolate overflow-x-clip bg-background"
    >
      <div ref={ref} className={live ? "relative h-[250vh]" : "relative"}>
        <div
          className={
            live
              ? "sticky top-0 flex h-screen items-center overflow-hidden pt-16"
              : "py-16 md:py-20"
          }
        >
          {/* The light. It grows out of the bottom left as the list fills,
              and is anchored to the viewport so its source stays in frame
              for the whole pin. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <motion.span
              style={live ? { opacity: glow, willChange: "opacity" } : { opacity: 0.9 }}
              className="absolute inset-0 bg-[radial-gradient(78%_66%_at_10%_100%,rgba(158,216,68,0.62),transparent_64%)]"
            />
            <motion.span
              style={live ? { opacity: glow, willChange: "opacity" } : { opacity: 0.9 }}
              className="absolute inset-0 bg-[radial-gradient(64%_52%_at_58%_112%,rgba(124,185,47,0.5),transparent_60%)]"
            />
          </div>

          <Shell className="relative z-10 w-full">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,46fr)_minmax(0,54fr)] lg:gap-12 xl:gap-16">
              <Intro draw={live ? draw : settled} />
              <ol className="flex flex-col gap-1.5 lg:gap-2">
                {RULES.map((r, i) => (
                  <Row
                    key={r.n}
                    rule={r}
                    arrive={live ? arrivals[i] : settled}
                    last={i === RULES.length - 1}
                  />
                ))}
              </ol>
            </div>
          </Shell>
        </div>
      </div>
    </section>
  );
}
