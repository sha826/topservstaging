"use client";

import { motion, type Variants } from "motion/react";
import { equation } from "@/lib/bf-content";

/**
 * The category visual: 2 systems combining (Copy Framework section 24).
 *
 * Colour carries the argument across the whole page. Green is brand, which
 * creates demand. Blue is performance, which captures it. Where they merge is
 * BrandFormance, and the composition is weighted so the merge is obviously
 * the point: the 2 inputs sit side by side, the result spans both.
 *
 * Sized to sit in a column beside its argument rather than to fill a full
 * width section, so the result figure never outgrows the page's own H1.
 *
 * Orchestrated with motion/react on scroll, matching Reveal's viewport
 * convention (once, -80px). The inputs arrive from opposite sides, the
 * connectors draw, the merge node flares, then the result rises. After the
 * entrance, 2 ambient loops keep it alive: energy flowing down each connector
 * and a slow gradient sweep across the wordmark, the same specular language
 * as the hero headline.
 *
 * Text is real HTML throughout, so the equation stays crawlable and
 * extractable per SEO Guidelines 5.7. The SVG only draws the relationship.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const CSS = `
@keyframes bfx-flow  { to { stroke-dashoffset: -28; } }
@keyframes bfx-sweep { 0%, 100% { background-position: 0% 0; } 50% { background-position: 100% 0; } }
@keyframes bfx-halo  { 0%, 100% { opacity: 0.45; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.18); } }
.bfx-flow {
  stroke-dasharray: 3 11;
  animation: bfx-flow 1.5s linear infinite;
}
.bfx-word {
  background-image: linear-gradient(100deg, var(--brand) 0%, var(--brand-blue-hot) 42%, var(--brand) 88%);
  background-size: 230% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: bfx-sweep 9s ease-in-out infinite;
}
.bfx-halo {
  transform-box: fill-box;
  transform-origin: center;
  animation: bfx-halo 3.2s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .bfx-flow { animation: none; }
  .bfx-word { animation: none; background-position: 0 0; }
  .bfx-halo { animation: none; }
}
`;

const panelLeft: Variants = {
  hidden: { opacity: 0, x: -28, y: 8 },
  show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};
const panelRight: Variants = {
  hidden: { opacity: 0, x: 28, y: 8 },
  show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};
const result: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.975 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: EASE_OUT, delay: 0.5 },
  },
};
const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 0.8, ease: EASE_OUT, delay: 0.28 }, opacity: { duration: 0.2, delay: 0.28 } },
  },
};

function InputPanel({
  index,
  term,
  does,
  tone,
  variants,
}: {
  index: string;
  term: string;
  does: string;
  tone: "brand" | "blue";
  variants: Variants;
}) {
  const green = tone === "brand";
  return (
    <motion.div
      variants={variants}
      className={`relative overflow-hidden rounded-xl border px-5 py-6 md:px-6 md:py-7 ${
        green
          ? "border-brand/35 bg-brand/[0.06]"
          : "border-brand-blue/35 bg-brand-blue/[0.08]"
      }`}
    >
      {/* Top accent: the channel this panel feeds into the merge. */}
      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 h-px ${green ? "bg-brand" : "bg-brand-blue-hot"}`}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(120% 90% at 50% -20%, ${
            green ? "color-mix(in srgb, var(--brand) 18%, transparent)" : "color-mix(in srgb, var(--brand-blue) 22%, transparent)"
          }, transparent 70%)`,
        }}
      />
      <p className={`label-mono relative ${green ? "text-brand" : "text-brand-blue-hot"}`}>
        {index}
      </p>
      <p
        className={`display relative mt-1.5 text-2xl md:text-3xl ${
          green ? "text-brand" : "text-brand-blue-hot"
        }`}
      >
        {term}
      </p>
      <p className="relative mt-1.5 text-sm text-muted-foreground">{does}</p>
    </motion.div>
  );
}

export function BrandPerformanceVisual() {
  const [brand, performance, combined] = equation;

  return (
    <motion.figure
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="w-full"
    >
      <style>{CSS}</style>

      <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
        <InputPanel
          index="01"
          term={brand.term}
          does={brand.does}
          tone="brand"
          variants={panelLeft}
        />
        <InputPanel
          index="02"
          term={performance.term}
          does={performance.does}
          tone="blue"
          variants={panelRight}
        />
      </div>

      {/* Two streams converging. Decorative: the relationship it draws is
          stated in the panels above and the result below. */}
      <svg
        aria-hidden
        viewBox="0 0 800 120"
        className="h-12 w-full md:h-16"
        preserveAspectRatio="none"
      >
        {[
          { d: "M200 0 C200 62 400 54 400 118", stroke: "var(--brand)" },
          { d: "M600 0 C600 62 400 54 400 118", stroke: "var(--brand-blue-hot)" },
        ].map((line) => (
          <g key={line.d}>
            <motion.path
              variants={drawPath}
              d={line.d}
              fill="none"
              stroke={line.stroke}
              strokeWidth="1.5"
              opacity="0.45"
            />
            {/* Energy travelling toward the merge, continuously. */}
            <motion.path
              variants={drawPath}
              className="bfx-flow"
              d={line.d}
              fill="none"
              stroke={line.stroke}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        ))}
        <circle className="bfx-halo" cx="400" cy="118" r="9" fill="var(--brand)" opacity="0.5" />
        <circle cx="400" cy="118" r="4" fill="var(--brand-hot)" />
      </svg>

      {/* The result: the merge the 2 panels feed, and the only block here
          that spans the full column. */}
      <motion.div
        variants={result}
        className="relative overflow-hidden rounded-xl border border-brand/50 px-5 py-8 text-center md:px-8 md:py-10"
        style={{
          backgroundImage:
            "linear-gradient(100deg, color-mix(in srgb, var(--brand) 13%, transparent), color-mix(in srgb, var(--brand-blue) 15%, transparent))",
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(70% 120% at 50% 0%, color-mix(in srgb, var(--brand) 20%, transparent), transparent 68%)",
          }}
        />
        <p className="label-mono relative text-brand">The result</p>
        <p className="display bfx-word relative mt-2 text-[clamp(1.75rem,4.2vw,2.75rem)] leading-[0.96]">
          {combined.term}
        </p>
        <p className="relative mt-3 text-base text-foreground md:text-lg">
          {combined.does}
        </p>
      </motion.div>

      <figcaption className="sr-only">
        Brand creates demand. Performance captures demand. Combined, they build
        market dominance.
      </figcaption>
    </motion.figure>
  );
}
