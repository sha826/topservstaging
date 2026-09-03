"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/**
 * The shape of a program, drawn.
 *
 * REPLACES A PHOTOGRAPH. A studio table sat in this column and was asked to
 * carry all 6 rules at once by association. It carried none of them. This
 * carries the 2 that are concrete and checkable, which are the 2 the rest of
 * the page is held to:
 *
 *   02  Frequency is fixed. 3 times weekly at every level, so the input
 *       track is a flat pulse train that never changes amplitude.
 *   03  1 number we are held to. Cost per booked call falls while the phone
 *       gets busier, so the 2 output tracks diverge from a constant input.
 *
 * That divergence is rule 06 without saying it: an owned asset is the only
 * thing that makes outputs improve while the input holds still.
 *
 * IT DRAWS WITH THE LIST. `draw` is the section's own scroll progress, so the
 * diagram fills in as the 6 rules arrive on the right, one track handing off
 * to the next. The environment developing with the list is already this
 * section's design intent; the photograph was the one element outside it.
 *
 * NOTHING IS EVER MISSING. Every track renders twice: a faint ghost at full
 * length that is always present, and a brand green overlay whose pathLength
 * is driven. That satisfies the page's hard rule, which is that scroll driven
 * animation here never leaves content invisible at rest. Below lg, under
 * reduced motion, and with no JS at all, `draw` is a constant 1 and the
 * diagram is simply finished.
 *
 * COLOUR VIA CSS, NOT ATTRIBUTES. Brand green arrives through classes rather
 * than fill="var(--brand)" so the token resolves the same way it does
 * everywhere else on the site and the file has no colour literals.
 *
 * NO FIGURES. Both axes are unlabelled by design. Cost per booked call has no
 * published value and none is invented here: the tracks state direction,
 * never magnitude.
 */

const X0 = 28;
const X1 = 452;
const PULSES = 12;

/** A flat pulse train: 12 identical beats, identical spacing, identical height. */
function pulseTrain(base: number, height: number) {
  const w = (X1 - X0) / PULSES;
  let d = `M${X0} ${base}`;
  for (let i = 0; i < PULSES; i++) {
    d += ` h${(w * 0.3).toFixed(2)} V${base - height} h${(w * 0.16).toFixed(2)} V${base} h${(w * 0.54).toFixed(2)}`;
  }
  return d;
}

/**
 * The 3 tracks, on one shared 12 month axis. `from` and `to` are positions in
 * the section's scroll, so the input draws first and the 2 outputs follow it.
 */
const TRACKS = [
  {
    label: "Frequency, fixed",
    note: "3 times weekly",
    labelY: 34,
    base: 96,
    d: pulseTrain(96, 40),
    end: null,
    from: 0,
    to: 0.4,
  },
  {
    label: "Booked calls",
    note: "Rising",
    labelY: 130,
    base: 212,
    d: "M28 208 C 140 206, 210 194, 280 176 S 400 150, 452 144",
    end: { x: 452, y: 144 },
    from: 0.26,
    to: 0.76,
  },
  {
    label: "Cost per booked call",
    note: "Falling",
    labelY: 246,
    base: 330,
    d: "M28 262 C 140 264, 210 276, 280 294 S 400 318, 452 324",
    end: { x: 452, y: 324 },
    from: 0.4,
    to: 1,
  },
];

const CSS = `
.rf-mono { font-family: var(--font-dm-mono), monospace; letter-spacing: 0.13em; }
.rf-label { fill: rgba(244,245,242,0.55); }
.rf-axis { fill: rgba(244,245,242,0.4); }
.rf-note { fill: var(--brand); opacity: 0.85; }
.rf-rule { stroke: rgba(244,245,242,0.09); }
.rf-ghost { fill: none; stroke: rgba(244,245,242,0.16); }
.rf-live { fill: none; stroke: var(--brand); }
.rf-dot { fill: var(--brand); }
`;

function Track({ track, draw }: { track: (typeof TRACKS)[number]; draw: MotionValue<number> }) {
  const length = useTransform(draw, [track.from, track.to], [0, 1]);
  return (
    <g>
      <text x={X0} y={track.labelY} className="rf-mono rf-label" fontSize="10">
        {track.label.toUpperCase()}
      </text>
      <text
        x={X1}
        y={track.labelY}
        className="rf-mono rf-note"
        fontSize="10"
        textAnchor="end"
      >
        {track.note.toUpperCase()}
      </text>

      <line x1={X0} y1={track.base} x2={X1} y2={track.base} className="rf-rule" strokeWidth="1" />
      <path d={track.d} className="rf-ghost" strokeWidth="1.5" strokeLinejoin="round" />
      <motion.path
        d={track.d}
        className="rf-live"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength: length }}
      />
      {track.end ? <circle cx={track.end.x} cy={track.end.y} r="3.5" className="rf-dot" /> : null}
    </g>
  );
}

export function RulesFigure({ draw }: { draw: MotionValue<number> }) {
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 480 360"
        className="h-auto w-full"
        role="img"
        aria-label="Three tracks across 12 months. Frequency is a flat pulse train, 3 times weekly, unchanged from month 1 to month 12. Booked calls rise. Cost per booked call falls."
      >
        <style>{CSS}</style>

        {TRACKS.map((t) => (
          <Track key={t.label} track={t} draw={draw} />
        ))}

        <text x={X0} y="352" className="rf-mono rf-axis" fontSize="9">
          MONTH 1
        </text>
        <text x={X1} y="352" className="rf-mono rf-axis" fontSize="9" textAnchor="end">
          MONTH 12
        </text>
      </svg>

      <figcaption className="mt-4 text-[0.8125rem] leading-relaxed text-[rgba(244,245,242,0.6)]">
        The input never changes. The 2 numbers that answer to it move in
        opposite directions.
      </figcaption>
    </figure>
  );
}
