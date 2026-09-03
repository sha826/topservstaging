"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Layers,
  Map,
  MapPin,
  Video,
} from "lucide-react";
import { Eyebrow, Shell } from "@/components/programs/p-grid";

/**
 * The 5 things that set the number, as a card slider.
 *
 * Build Spec v2 section 4, Programs page 4, "What sets the number" row. The
 * 5 factors are the spec's, verbatim in substance; the one line under each
 * explains what it actually moves.
 *
 * WHY A SLIDER. As a 2 by 2 grid the 5th card sat alone on its own row with
 * an empty space beside it. A slider has no odd row to leave hanging, and it
 * makes the set read as a sequence of considerations rather than a scorecard.
 *
 * HOW IT SLIDES. Native scroll with scroll snap, not a transform track, so
 * touch swipe, trackpad, shift-scroll and keyboard arrows all work with no
 * JS, it degrades to a plain scrollable row, and there is no width
 * arithmetic to get wrong at a breakpoint. The buttons call scrollBy. The
 * page itself never scrolls sideways: the overflow lives in the track.
 *
 * Icons are decorative and marked aria-hidden; each card's meaning is
 * carried by its heading and its line.
 */

const SETS = [
  {
    Icon: Map,
    k: "Market size",
    v: "How much geography has to be held at the frequency floor before familiarity forms.",
  },
  {
    Icon: Layers,
    k: "Competitive saturation",
    v: "How much noise is already in the map, and what it costs to be the name that is remembered inside it.",
  },
  {
    Icon: Compass,
    k: "Current brand position",
    v: "How well the market already knows you. The better it does, the less capture has to be bought.",
  },
  {
    Icon: MapPin,
    k: "Service area",
    v: "Where the work actually is, which is rarely the same shape as the city boundary.",
  },
  {
    Icon: Video,
    k: "Video scope",
    v: "How much is filmed, how often, and how many assets the content engine has to produce from it.",
  },
];

const CSS = `
.ps-track { scrollbar-width: none; -ms-overflow-style: none; scroll-behavior: smooth; }
.ps-track::-webkit-scrollbar { display: none; }
@media (prefers-reduced-motion: reduce) { .ps-track { scroll-behavior: auto; } }
`;

export function PSetsSlider() {
  const track = useRef<HTMLUListElement>(null);
  const [at, setAt] = useState(0);
  const [ends, setEnds] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : 1;
    setAt(Math.round(el.scrollLeft / step));
    setEnds({
      start: el.scrollLeft < 8,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const nudge = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 16) });
  };

  return (
    <section aria-labelledby="p-sets-heading" className="border-b border-border bg-background">
      <style>{CSS}</style>
      <Shell className="py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[42rem]">
            <Eyebrow>What moves it</Eyebrow>
            <h2
              id="p-sets-heading"
              className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
            >
              5 things set the number.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <p className="label-mono mr-2 text-ink-faint">
              {String(Math.min(at + 1, SETS.length)).padStart(2, "0")} / 0{SETS.length}
            </p>
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => nudge(d)}
                disabled={d === -1 ? ends.start : ends.end}
                aria-label={d === -1 ? "Previous factors" : "Next factors"}
                className="flex size-11 items-center justify-center rounded-full border border-[#2b323c] text-foreground transition-colors hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              >
                {d === -1 ? (
                  <ArrowLeft className="size-4" aria-hidden />
                ) : (
                  <ArrowRight className="size-4" aria-hidden />
                )}
              </button>
            ))}
          </div>
        </div>

        <ul
          ref={track}
          onScroll={measure}
          tabIndex={0}
          role="region"
          aria-label="The 5 things that set the number, scroll for more"
          className="ps-track mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          {SETS.map(({ Icon, k, v }, i) => (
            <li
              key={k}
              className="flex shrink-0 snap-start basis-[86%] sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]"
            >
              <article className="flex w-full flex-col rounded-[18px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_62%)] p-6 md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span
                    aria-hidden
                    className="flex size-11 items-center justify-center rounded-[12px] bg-[rgba(158,216,68,0.16)] text-brand"
                  >
                    <Icon className="size-5" />
                  </span>
                  <span aria-hidden className="label-mono text-[0.6875rem] text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-[1.0625rem] font-semibold leading-snug md:text-[1.125rem]">
                  {k}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {v}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
