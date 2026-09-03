import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Page-wide motion primitives, mounted once by the page.
 *
 * HARD RULE, learned the hard way on this page: scroll-driven animation on
 * this site never touches opacity. A keyframe of `from { opacity: 0 }` with
 * `both` fill leaves everything below the fold invisible at rest, which is
 * the same defect as a Framer `initial` state serialising to opacity 0, and
 * it fails SEO Guidelines 10.1. These animate transform only, so every word
 * is present and readable before, during and after.
 *
 *   .rise      content nudges up as it enters. Transform only.
 *   .mark-x    a rule draws left to right. Decorative only.
 *   .mark-y    a rule draws top to bottom. Decorative only.
 *   .mark-line an SVG rule draws along its path. Decorative only.
 *   .pick      one mark grows and is chosen out of a field. Decorative only.
 *   .pick-ring the ring that lands around it. Decorative only.
 *   .dim       the surrounding field recedes. Decorative only.
 */
export function AboutStyles() {
  return (
    <style>{`
@keyframes ab-rise  { from { transform: translateY(18px); } }
@keyframes ab-markx { from { transform: scaleX(0); } }
@keyframes ab-marky { from { transform: scaleY(0); } }
@keyframes ab-line  { from { stroke-dashoffset: 1; } }
@keyframes ab-pick  { from { transform: scale(0.34); opacity: 0.35; } }
@keyframes ab-dim   { from { opacity: 1; } }
@keyframes ab-ring  { from { transform: scale(0.2); opacity: 0; } }
@supports (animation-timeline: view()) {
  .mark-line { stroke-dasharray: 1; stroke-dashoffset: 0; }
  .rise   { animation: ab-rise linear both; animation-timeline: view(); animation-range: entry 2% cover 20%; }
  .mark-x { animation: ab-markx linear both; animation-timeline: view(); animation-range: entry 8% cover 30%; transform-origin: left center; }
  .mark-y { animation: ab-marky linear both; animation-timeline: view(); animation-range: entry 8% cover 34%; transform-origin: top center; }
  .mark-line { animation: ab-line linear both; animation-timeline: view(); animation-range: entry 8% cover 32%; }
  .pick      { animation: ab-pick linear both; animation-timeline: view(); animation-range: entry 22% cover 55%; transform-box: fill-box; transform-origin: center; }
  .pick-ring { animation: ab-ring linear both; animation-timeline: view(); animation-range: entry 30% cover 62%; transform-box: fill-box; transform-origin: center; }
  .dim       { animation: ab-dim linear both; animation-timeline: view(); animation-range: entry 22% cover 55%; }
}
@media (prefers-reduced-motion: reduce) {
  .rise, .mark-x, .mark-y, .mark-line, .pick, .pick-ring, .dim { animation: none; }
}
    `}</style>
  );
}

/**
 * The master grid for /about.
 *
 * v1 of this page let every section pick its own width: some ran at
 * max-w-6xl, others at a centred max-w-[800px]. Two centred containers of
 * different widths produce two different left edges, which is why the page
 * never felt aligned. These 2 primitives exist so that cannot happen again.
 *
 * Widths come from Build Spec v2 section 9, which is explicit: content width
 * maximum 1200 pixels, text sections maximum 800.
 *
 *   Shell    the master container. Every section that has content uses it.
 *   Measure  a reading column INSIDE Shell. Left aligned, never centred, so
 *            body copy shares its left edge with every section heading.
 *
 * Full-bleed imagery is allowed to break Shell. Content is not.
 */

export function Shell({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1200px] px-6 md:px-10 lg:px-12", className)}>
      {children}
    </Tag>
  );
}

/**
 * The single inner grid. v4 let sections pick their own first column: most
 * used 20rem, the institution used 26rem, and the gaps varied, so one
 * section's content column started 6rem further right than the rest. That
 * was the misalignment. Every section now uses this.
 */
export function Cols({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-10 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Measure({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("max-w-[68ch]", className)}>{children}</div>;
}

/**
 * Section eyebrow. Carries its own contrast rules per ground, because brand
 * green fails WCAG on the light ground (roughly 2.9:1) and must never be used
 * for text there. On light it becomes near-black at 60 percent, roughly
 * 5.7:1. See the tonal strategy note in the page file.
 */
export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "label-mono",
        tone === "dark" ? "text-brand" : "text-background/60",
        className
      )}
    >
      {children}
    </p>
  );
}
