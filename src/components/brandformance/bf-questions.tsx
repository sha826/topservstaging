"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { tenQuestions } from "@/lib/bf-content";
import { Eyebrow, Shell } from "@/components/brandformance/bf-grid";

/**
 * The 10 questions, as a horizontal slider. 3 cards at a time.
 *
 * CONTENT. Identical to the production /brandformance page: both render
 * `tenQuestions` from bf-content.ts, question and answer verbatim, in Build
 * Spec v2 section 4's order. Nothing is paraphrased and nothing is added.
 *
 * WHY IT PINS. v1 was a native scroll strip, so scrolling the page just went
 * past it and the cards were only reachable by swiping or clicking arrows.
 * The band now holds while the row travels: vertical scroll moves the cards
 * sideways, which is the behavior asked for in the original brief, "vertical
 * page scrolling controls horizontal movement, the page itself never scrolls
 * sideways". It is not scroll jacking. The page scrolls at its normal rate
 * and can be scrolled straight past at any speed.
 *
 * WHERE IT DOES NOT PIN. Below lg, and under reduced motion, it stays a
 * native scroll strip with working arrows. That is also the no JS render:
 * a plain scrollable row of 10 readable cards.
 *
 * The questions being visible keeps the page in line with KEYWORD-RESEARCH
 * 4.2 (each answer under an H2 written as the question) and SEO-GUIDELINES 7
 * (FAQPage schema for the 10).
 */

const CSS = `
.bfs-strip { scrollbar-width: none; -ms-overflow-style: none; scroll-behavior: smooth; }
.bfs-strip::-webkit-scrollbar { display: none; }
@media (prefers-reduced-motion: reduce) { .bfs-strip { scroll-behavior: auto; } }
`;

const CARD =
  "flex shrink-0 basis-[86%] sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]";

function Cards() {
  return (
    <>
      {tenQuestions.map((item, i) => (
        <li key={item.q} className={`${CARD} snap-start`}>
          <article className="flex w-full flex-col rounded-[18px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_62%)] p-6 md:p-7">
            <span
              aria-hidden
              className="label-mono flex size-10 items-center justify-center rounded-[10px] bg-[rgba(158,216,68,0.26)] text-[0.75rem] text-[rgba(244,245,242,0.72)]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="display mt-5 text-[clamp(1.15rem,1.5vw,1.4rem)] leading-[1.08]">
              {item.q}
            </h2>
            {/* The answer, verbatim from bf-content.ts. */}
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
              {item.a}
            </p>
          </article>
        </li>
      ))}
    </>
  );
}

function Head({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-[42rem]">
        <Eyebrow>The 10 questions</Eyebrow>
        <h2
          id="bf-questions-heading"
          className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
        >
          Answered in order, with nothing held back.
        </h2>
      </div>
      {children}
    </div>
  );
}

/** lg and up, motion allowed: the band holds and the row travels. */
function Pinned() {
  const band = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLUListElement>(null);
  const [travel, setTravel] = useState(0);
  const [at, setAt] = useState(0);
  const { scrollYProgress } = useScroll({ target: band, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  const measure = useCallback(() => {
    const el = row.current;
    if (!el) return;
    setTravel(Math.max(0, el.scrollWidth - el.clientWidth));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(tenQuestions.length - 1, Math.max(0, Math.round(v * (tenQuestions.length - 3))));
    setAt((prev) => (prev === i ? prev : i));
  });

  return (
    <div ref={band} className="relative h-[205vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Shell className="w-full">
          <Head>
            <p className="label-mono text-ink-faint">
              {String(at + 1).padStart(2, "0")} / 10
            </p>
          </Head>
          <div className="mt-10 overflow-hidden">
            <motion.ul ref={row} style={{ x }} className="flex w-full gap-4">
              <Cards />
            </motion.ul>
          </div>
        </Shell>
      </div>
    </div>
  );
}

/** Everywhere else: a native scroll strip with arrows. */
function Strip() {
  const row = useRef<HTMLUListElement>(null);
  const [at, setAt] = useState(0);
  const [ends, setEnds] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = row.current;
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
    const el = row.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 16) });
  };

  return (
    <Shell className="py-16 md:py-20">
      <Head>
        <div className="flex items-center gap-3">
          <p className="label-mono mr-2 text-ink-faint">
            {String(Math.min(at + 1, tenQuestions.length)).padStart(2, "0")} / 10
          </p>
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => nudge(d)}
              disabled={d === -1 ? ends.start : ends.end}
              aria-label={d === -1 ? "Previous questions" : "Next questions"}
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
      </Head>

      <ul
        ref={row}
        onScroll={measure}
        tabIndex={0}
        role="region"
        aria-label="The 10 questions, scroll for more"
        className="bfs-strip mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
      >
        <Cards />
      </ul>
    </Shell>
  );
}

function usePinned() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setOn(wide.matches && !still.matches);
    sync();
    wide.addEventListener("change", sync);
    still.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      still.removeEventListener("change", sync);
    };
  }, []);
  return on;
}

export function BfQuestions() {
  const pinned = usePinned();
  return (
    <section
      aria-labelledby="bf-questions-heading"
      className="relative overflow-x-clip border-b border-border bg-background"
    >
      <style>{CSS}</style>
      {pinned ? <Pinned /> : <Strip />}
    </section>
  );
}
