"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Eyebrow, Shell } from "@/components/brandformance/bf-grid";

/**
 * The Proof beat, as a deck that is dealt while the section holds.
 *
 * ARGUMENT SPINE, /brandformance: "It has a name, a method, a measurement
 * standard and a book behind it. The definition on this page is the one the
 * industry will cite, because we wrote it first." That beat sits between the
 * Principle (the definition block above) and the Plan (the 10 questions
 * below), which is where the spine puts it.
 *
 * WHY A DECK. As a 2 by 2 grid these read as 4 equal footnotes. Fanned, they
 * read as 1 hand of evidence with a card on top, which is closer to what they
 * are: 4 things that only mean something held together. Each card pivots
 * around a point below the deck, so advancing is a bend rather than a slide.
 *
 * WHY IT PINS. v1 ran the deck on a timer, so scrolling did nothing to it.
 * v2 drove it from the section's own passage, which dealt all 4 cards in the
 * time it took the section to cross the viewport: correct in principle, and
 * far too fast to read any of them. The band now holds while it deals, so
 * each card gets a real beat of scroll and the last one keeps the frame
 * until the section releases. Ordinary scrolling drives it, nothing is
 * jacked, and the page can be scrolled straight past at any speed.
 *
 * WHERE IT DOES NOT PIN. Below lg, and whenever reduced motion is set, there
 * is no deck and no pin at all: the 4 cards are simply stacked and every one
 * is readable at once. That is also the no JS render.
 *
 * All 4 cards are always in the DOM and in the accessibility tree, in source
 * order, so a screen reader gets the full hand either way.
 */

const PROOF = [
  {
    label: "A name",
    body: "We named it and defined it. The industry has other names for the overlap, performance branding among them. Ours is written once and kept stable so it can be cited, including by the models people now ask instead of searching.",
  },
  {
    label: "A method",
    body: "6 stages, each with an objective, the work inside it, what it produces and the metric it is judged on. If any of those 4 is missing it is a diagram, not a method.",
    href: "/method",
    hrefLabel: "See the 6 stages",
  },
  {
    label: "A measurement standard",
    body: "Cost per booked call. 1 number, applied to brand and performance together, falling as brand equity builds. It is falsifiable, which is the point of publishing it.",
  },
  {
    label: "A book",
    body: "Jonathan Bannister wrote F#CK Digital Marketing before any of this was sold as a program. The doctrine was written down first and the company was built to deliver it.",
    href: "/jonathan",
    hrefLabel: "More on Jonathan",
  },
];

/** Where each card takes the top of the deck, as a share of the pin. */
const STOPS = [0.2, 0.42, 0.64];

const CSS = `
.bfp-card { transition: transform 620ms cubic-bezier(0.22, 1, 0.36, 1), opacity 460ms ease; }
.bfp-dot  { transition: background-color 240ms ease, width 320ms cubic-bezier(0.22, 1, 0.36, 1); }
@media (prefers-reduced-motion: reduce) {
  .bfp-card, .bfp-dot { transition: none; }
}
`;

function Card({ i, deck }: { i: number; deck?: boolean }) {
  const p = PROOF[i];
  return (
    <div
      className={`flex flex-col rounded-[18px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_62%)] p-6 md:p-7 ${
        deck ? "h-[19rem] shadow-[0_30px_64px_-28px_rgba(0,0,0,0.95)] sm:h-[15rem]" : ""
      }`}
    >
      <span
        aria-hidden
        className="label-mono flex size-9 items-center justify-center rounded-[9px] bg-[rgba(158,216,68,0.26)] text-[0.75rem] text-[rgba(244,245,242,0.72)]"
      >
        {String(i + 1).padStart(2, "0")}
      </span>
      <p className="mt-4 text-[1.0625rem] font-semibold leading-snug md:text-[1.125rem]">
        {p.label}
      </p>
      <p className="mt-2.5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
        {p.body}
      </p>
      {p.href ? (
        <Link
          href={p.href}
          className="label-mono mt-auto inline-flex min-h-[44px] items-center pt-3 text-brand underline underline-offset-4"
        >
          {p.hrefLabel}
        </Link>
      ) : null}
    </div>
  );
}

function Intro() {
  return (
    <div>
      <Eyebrow>Why this is a category</Eyebrow>
      <h2
        id="bf-proof-heading"
        className="display mt-5 max-w-[16ch] text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
      >
        A slogan cannot be checked. This can.
      </h2>
      <p className="mt-6 max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
        Every agency claims a proprietary approach. The difference between a
        category and a coat of paint is whether an outsider can inspect it,
        argue with it, and hold you to it.
      </p>
    </div>
  );
}

/** The deck pins and deals. lg and up, motion allowed. */
function Deck() {
  const ref = useRef<HTMLDivElement>(null);
  const last = useRef(0);
  const [dealt, setDealt] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let i = 0;
    while (i < STOPS.length && v >= STOPS[i]) i += 1;
    if (i === last.current) return;
    last.current = i;
    setDealt(i);
    setPicked(null);
  });

  const active = picked ?? dealt;

  return (
    <div ref={ref} className="relative h-[195vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Shell className="w-full">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,38fr)_minmax(0,62fr)] lg:gap-14">
            <Intro />

            <div>
              <ol className="relative h-[19rem] sm:h-[15rem]" aria-label="What makes BrandFormance a category">
                {PROOF.map((p, i) => {
                  // Depth 0 is on top. Each card behind swings further around
                  // a pivot below the deck, which is the bend.
                  const d = (i - active + PROOF.length) % PROOF.length;
                  return (
                    <li
                      key={p.label}
                      className="bfp-card absolute inset-x-0 top-0"
                      style={{
                        transform: `rotate(${d * -4.2}deg) translateY(${d * -15}px) scale(${1 - d * 0.038})`,
                        transformOrigin: "50% 148%",
                        opacity: d === 0 ? 1 : Math.max(0.14, 0.58 - (d - 1) * 0.2),
                        zIndex: PROOF.length - d,
                        pointerEvents: d === 0 ? "auto" : "none",
                      }}
                    >
                      <Card i={i} deck />
                    </li>
                  );
                })}
              </ol>

              <div className="mt-7 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {PROOF.map((p, i) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setPicked(i)}
                      aria-label={`Show ${p.label}`}
                      aria-current={i === active}
                      className="group flex h-11 items-center px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                    >
                      <span
                        className={`bfp-dot block h-1 rounded-full ${
                          i === active
                            ? "w-8 bg-brand"
                            : "w-3 bg-[rgba(244,245,242,0.22)] group-hover:bg-[rgba(244,245,242,0.45)]"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="label-mono ml-auto text-ink-faint">
                  {`${String(active + 1).padStart(2, "0")} / ${String(PROOF.length).padStart(2, "0")}`}
                </p>
              </div>
            </div>
          </div>
        </Shell>
      </div>
    </div>
  );
}

/** No deck, no pin: all 4 readable at once. */
function Stack() {
  return (
    <Shell className="py-16 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,38fr)_minmax(0,62fr)] lg:gap-14">
        <Intro />
        <ol className="grid gap-3 sm:grid-cols-2">
          {PROOF.map((p, i) => (
            <li key={p.label}>
              <Card i={i} />
            </li>
          ))}
        </ol>
      </div>
    </Shell>
  );
}

/** The deck needs width and permission to move. */
function useDeck() {
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

export function BfProof() {
  const deck = useDeck();
  return (
    <section
      aria-labelledby="bf-proof-heading"
      className="relative isolate overflow-x-clip border-b border-border bg-background"
    >
      <style>{CSS}</style>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_52%_at_10%_100%,rgba(158,216,68,0.13),transparent_62%)]"
      />
      {deck ? <Deck /> : <Stack />}
    </section>
  );
}
