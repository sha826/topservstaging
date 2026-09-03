"use client";

import { motion, type Variants } from "motion/react";

/**
 * The BrandFormance loop.
 *
 * THIS IS A SPEC DELIVERABLE, not a decoration. Build Spec v2 section 4,
 * Programs page 2: the page "carries the Process Walkthrough video and a
 * workflow diagram showing brand feeding performance and performance data
 * informing brand". The Argument Spine repeats it as this page's Proof beat:
 * "a diagram showing the two halves feeding each other rather than running
 * in parallel". It is also the BrandFormance Flywheel named in Copy
 * Framework section 24. Until now the section made the argument in prose and
 * the diagram did not exist.
 *
 * The shape is the argument. Two halves side by side would draw parallel
 * lines, which is the thing the copy says it is not. A circuit only closes
 * because the return path exists, so the return path is drawn as heavily as
 * the forward one and the flow never stops moving.
 *
 * Green is brand, blue is performance, matching the home page visual.
 *
 * No numbers appear. The centre states a direction, which is what the copy
 * claims, and never a value. Per SEO Guidelines 5.7 the relationship is
 * restated as real HTML text in the cards beside it.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const CSS = `
@keyframes dfw-flow { to { stroke-dashoffset: -32; } }
@keyframes dfw-halo { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.85; transform: scale(1.12); } }
.dfw-flow { stroke-dasharray: 4 12; animation: dfw-flow 1.6s linear infinite; }
.dfw-halo { transform-box: fill-box; transform-origin: center; animation: dfw-halo 3.4s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .dfw-flow, .dfw-halo { animation: none; }
}
`;

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, ease: EASE_OUT, delay },
      opacity: { duration: 0.2, delay },
    },
  }),
};

const node: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT, delay },
  }),
};

/** Brand to performance across the top, performance back to brand beneath. */
const FORWARD = "M 128 136 C 190 64, 350 64, 412 136";
const RETURN = "M 412 184 C 350 256, 190 256, 128 184";

export function FlywheelDiagram() {
  return (
    <motion.figure
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="rounded-[20px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_62%)] p-4 md:p-6"
    >
      <style>{CSS}</style>

      <svg
        viewBox="0 0 540 320"
        className="w-full"
        role="img"
        aria-label="Brand feeds performance, and performance data feeds back into brand, forming a closed circuit."
      >
        <defs>
          <marker
            id="dfw-arrow-brand"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--brand)" />
          </marker>
          <marker
            id="dfw-arrow-blue"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--brand-blue-hot)" />
          </marker>
        </defs>

        <text
          x="270"
          y="30"
          textAnchor="middle"
          className="label-mono"
          fill="var(--brand)"
          fontSize="11"
        >
          Familiarity lowers the cost of capture
        </text>

        {/* Forward path: brand lowers the cost of capture. */}
        <motion.path
          custom={0.15}
          variants={draw}
          d={FORWARD}
          fill="none"
          stroke="var(--brand)"
          strokeWidth="1.5"
          opacity="0.4"
          markerEnd="url(#dfw-arrow-brand)"
        />
        <motion.path
          custom={0.15}
          variants={draw}
          className="dfw-flow"
          d={FORWARD}
          fill="none"
          stroke="var(--brand)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Return path: capture data tells brand what to make next. */}
        <motion.path
          custom={0.45}
          variants={draw}
          d={RETURN}
          fill="none"
          stroke="var(--brand-blue-hot)"
          strokeWidth="1.5"
          opacity="0.4"
          markerEnd="url(#dfw-arrow-blue)"
        />
        <motion.path
          custom={0.45}
          variants={draw}
          className="dfw-flow"
          d={RETURN}
          fill="none"
          stroke="var(--brand-blue-hot)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <text
          x="270"
          y="300"
          textAnchor="middle"
          className="label-mono"
          fill="var(--brand-blue-hot)"
          fontSize="11"
        >
          Capture data says what to make next
        </text>

        {/* The 2 halves. The ring is a stroke, so nothing is drawn over the
            label, and the sublabel sits clear of the ring entirely. */}
        <motion.g custom={0.05} variants={node} style={{ transformOrigin: "88px 160px" }}>
          <circle
            className="dfw-halo"
            cx="88"
            cy="160"
            r="50"
            fill="none"
            stroke="var(--brand)"
            strokeWidth="1"
            opacity="0.28"
          />
          <circle cx="88" cy="160" r="42" fill="#0b0e13" stroke="var(--brand)" strokeWidth="1.75" />
          <text x="88" y="166" textAnchor="middle" fill="var(--brand)" fontSize="16" fontWeight="700">
            Brand
          </text>
          <text x="88" y="232" textAnchor="middle" className="label-mono" fill="var(--ink-faint)" fontSize="10">
            Creates demand
          </text>
        </motion.g>

        <motion.g custom={0.3} variants={node} style={{ transformOrigin: "452px 160px" }}>
          <circle
            className="dfw-halo"
            cx="452"
            cy="160"
            r="50"
            fill="none"
            stroke="var(--brand-blue-hot)"
            strokeWidth="1"
            opacity="0.3"
          />
          <circle cx="452" cy="160" r="42" fill="#0b0e13" stroke="var(--brand-blue-hot)" strokeWidth="1.75" />
          <text x="452" y="166" textAnchor="middle" fill="var(--brand-blue-hot)" fontSize="14" fontWeight="700">
            Performance
          </text>
          <text x="452" y="232" textAnchor="middle" className="label-mono" fill="var(--ink-faint)" fontSize="10">
            Captures demand
          </text>
        </motion.g>

        {/* What closing the circuit produces. A direction, never a value. */}
        <motion.g custom={0.8} variants={node} style={{ transformOrigin: "270px 160px" }}>
          <rect
            x="186"
            y="138"
            width="168"
            height="44"
            rx="12"
            fill="#0d1015"
            stroke="rgba(158,216,68,0.35)"
          />
          <text x="270" y="156" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontWeight="600">
            Each half makes
          </text>
          <text x="270" y="172" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontWeight="600">
            the other cheaper
          </text>
        </motion.g>

      </svg>

      <figcaption className="sr-only">
        A closed circuit rather than 2 parallel tracks. Brand creates demand
        and the familiarity it builds lowers what capture costs. Performance
        captures demand and the data it returns decides what the next round of
        brand content is made about. Each half makes the other cheaper.
      </figcaption>
    </motion.figure>
  );
}
