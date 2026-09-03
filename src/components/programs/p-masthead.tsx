"use client";

import { usePathname } from "next/navigation";
import { Eyebrow, Shell } from "@/components/programs/p-grid";

/**
 * The hub masthead.
 *
 * Build Spec v2 section 3 calls Programs and Pricing "a navigation hub, not
 * a page", and the 5 pages are meant to be read in order. A single static
 * masthead repeated on all 5 said that once and then said nothing, while
 * stacking a second header above each page's own H1.
 *
 * So it is per page. The left column is the hub identity, which does not
 * move, and the right column carries the step marker and that page's Problem
 * beat from the Argument Spine. The problem line is the argument the page is
 * about to answer, which is the one thing worth saying above an H1 that is
 * already about to say the rest.
 *
 * Not an h1 and not an h2: each page owns its own heading. This is a
 * masthead, so the copy is a paragraph and the rail is decorative.
 */

const CSS = `
@keyframes pm-fill  { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes pm-in    { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes pm-pulse { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.35); } }
@media (prefers-reduced-motion: no-preference) {
  .pm-fill  { animation: pm-fill 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; transform-origin: left; }
  .pm-in    { animation: pm-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .pm-pulse { animation: pm-pulse 2.8s ease-in-out infinite; }
}
`;

type Page = { n: number; eyebrow: string; problem: string };

/** Problem beats verbatim in substance from ARGUMENT-SPINE sections 4 to 8. */
const PAGES: Record<string, Page> = {
  "/programs-pricing/overview": {
    n: 1,
    eyebrow: "The choice you are being offered",
    problem:
      "You have to choose between an agency that builds brand and one that drives leads, and whichever you pick you lose the other half.",
  },
  "/programs-pricing/how-it-works": {
    n: 2,
    eyebrow: "What happens after you sign",
    problem:
      "Agencies go quiet once the contract is signed, and you find out in month 4 whether anything actually happened.",
  },
  "/programs-pricing/what-this-delivers": {
    n: 3,
    eyebrow: "What you were promised last time",
    problem:
      "You have been promised results before and got a dashboard instead.",
  },
  "/programs-pricing/pricing": {
    n: 4,
    eyebrow: "Why nobody will tell you",
    problem:
      "Nobody will tell you what this costs until you sit through a pitch, and when they do it is a number they made up for you.",
  },
  "/programs-pricing/success-stories": {
    n: 5,
    eyebrow: "Why case studies stopped working",
    problem:
      "Every agency has case studies and they all say the same thing about traffic, without ever saying where the company started.",
  },
};

const TOTAL = 5;

const FALLBACK: Page = {
  n: 1,
  eyebrow: "Programs and pricing",
  problem:
    "5 pages, in order. What we are, how it works, what it delivers, what it costs, and the proof.",
};

export function PMasthead() {
  const pathname = usePathname();
  const page = PAGES[pathname] ?? FALLBACK;

  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background">
      <style>{CSS}</style>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(66%_56%_at_88%_10%,rgba(158,216,68,0.14),transparent_64%)]"
      />
      <Shell className="pb-9 pt-28 md:pt-32">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:items-end lg:gap-14">
          <div>
            <Eyebrow>Programs and pricing</Eyebrow>
            <p className="display mt-4 max-w-[14ch] text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.02]">
              The BrandFormance program<span className="text-brand">.</span>
            </p>
          </div>

          {/* The step marker and this page's problem. Keyed on pathname so it
              replays the entrance on navigation between tabs. */}
          <div key={pathname} className="pm-in lg:pb-1">
            <p className="label-mono flex items-center gap-2.5 text-ink-faint">
              <span aria-hidden className="pm-pulse block size-1.5 rounded-full bg-brand" />
              <span className="text-foreground">{String(page.n).padStart(2, "0")}</span>
              <span aria-hidden>/</span>
              <span>{String(TOTAL).padStart(2, "0")}</span>
              <span aria-hidden className="mx-1 h-px w-6 bg-border" />
              {page.eyebrow}
            </p>

            <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
              {page.problem}
            </p>

            {/* Progress through the 5 pages. Decorative: the marker above
                states the same position as real text. */}
            <span
              aria-hidden
              className="mt-6 flex h-px w-full max-w-[26rem] overflow-hidden bg-border"
            >
              <span
                className="pm-fill block h-full bg-brand"
                style={{ width: `${(page.n / TOTAL) * 100}%` }}
              />
            </span>
          </div>
        </div>
      </Shell>
    </section>
  );
}
