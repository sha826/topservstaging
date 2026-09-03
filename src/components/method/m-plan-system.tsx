/**
 * The plan and the system, drawn.
 *
 * REPLACES A PHOTOGRAPH. A studio photograph sat here and carried the
 * argument by association: an ordered wall grid, a run of identical sheets,
 * a finished stack. It read as repeatability but it never said what the
 * section says. This says it. The top panel is a plan, which is 4 budgets
 * and no order of operations. The bottom panel is a system, which is the
 * same work with a decision at the front and a return path at the back.
 *
 * IT RUNS. A charge travels the rail and each step lights as it passes, in
 * order, on a loop. Same device as the hero panel on this page, so the 2
 * moving elements on /method behave the same way. Every animated value is a
 * transform or an opacity, so nothing repaints on scroll. Reduced motion
 * stops it with step 04 left lit, which is where the eye should end.
 *
 * TEXT, NOT PIXELS. SEO Guidelines 7 (item 127) requires a visual
 * explanation to carry an HTML text equivalent. Every label here is real
 * SVG text inside a figure with a caption, so the argument is extractable
 * rather than baked into an image. No numbers appear: the budget bars are
 * lengths, never figures, per the pricing non-negotiable.
 */
const CYCLE = 5.4;

const CSS = `
@keyframes ps-lit {
  0%, 1%    { opacity: 0; }
  5%, 15%   { opacity: 1; }
  21%, 100% { opacity: 0; }
}
@keyframes ps-charge {
  0%        { opacity: 0; transform: translateY(-6%); }
  7%, 84%   { opacity: 1; }
  100%      { opacity: 0; transform: translateY(520%); }
}
@keyframes ps-ask {
  0%, 62%, 100% { opacity: 0.42; }
  76%           { opacity: 1; }
}
.ps-mono { font-family: var(--font-dm-mono), monospace; letter-spacing: 0.13em; }
.ps-disp { font-family: var(--font-bebas), sans-serif; letter-spacing: 0.02em; }
.ps-brand      { fill: var(--brand); }
.ps-brand-soft { fill: rgba(158,216,68,0.24); }
.ps-brand-mark { fill: rgba(158,216,68,0.3); }
.ps-brand-dot  { fill: rgba(158,216,68,0.45); }
.ps-brand-head { fill: rgba(158,216,68,0.7); }
.ps-return     { fill: none; stroke: rgba(158,216,68,0.45); }
.ps-ink        { fill: #0c0e12; }
@media (prefers-reduced-motion: no-preference) {
  .ps-lit    { animation: ps-lit ${CYCLE}s linear infinite; }
  .ps-charge { animation: ps-charge ${CYCLE}s cubic-bezier(0.45, 0, 0.55, 1) infinite; }
  .ps-ask    { animation: ps-ask ${CYCLE}s ease-in-out infinite; }
}
`;

/** A plan: what it names, and the column it leaves blank. */
const CHANNELS = [
  { name: "Paid search", bar: 118 },
  { name: "Local SEO", bar: 74 },
  { name: "Social", bar: 52 },
  { name: "Mailers", bar: 96 },
];

/** A system: the same work, with the decision at the front. */
const STEPS = [
  { n: "01", name: "Decide", note: "What runs, where, how often, in what order" },
  { n: "02", name: "Run", note: "3 times weekly, the same beat every week" },
  { n: "03", name: "Measure", note: "Cost per booked call" },
  { n: "04", name: "Explain", note: "Why the number moved" },
];

const FAINT = "rgba(244,245,242,0.10)";
const DIM = "rgba(244,245,242,0.55)";

export function MPlanSystem() {
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 420 580"
        className="h-auto w-full"
        role="img"
        aria-label="A plan names 4 channels and 4 budgets and leaves the order blank. A system runs 4 steps in sequence, decide, run, measure and explain, and the measurement feeds the next decision."
      >
        <style>{CSS}</style>
        <defs>
          <linearGradient id="ps-sys" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="rgba(158,216,68,0.09)" />
            <stop offset="100%" stopColor="rgba(158,216,68,0.02)" />
          </linearGradient>
          <linearGradient id="ps-rail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(244,245,242,0.06)" />
            <stop offset="100%" stopColor="rgba(158,216,68,0.5)" />
          </linearGradient>
          <linearGradient id="ps-glow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(158,216,68,0.18)" />
            <stop offset="100%" stopColor="rgba(158,216,68,0)" />
          </linearGradient>
        </defs>

        {/* ---------------- THE PLAN ---------------- */}
        <rect
          x="1"
          y="1"
          width="418"
          height="261"
          rx="18"
          fill="rgba(244,245,242,0.02)"
          stroke={FAINT}
        />
        <text x="28" y="40" className="ps-mono" fontSize="10.5" fill={DIM}>
          THE PLAN
        </text>
        <text x="28" y="76" className="ps-disp" fontSize="30" fill="#f4f5f2">
          A LIST.
        </text>

        <text x="48" y="99" className="ps-mono" fontSize="8.5" fill="rgba(244,245,242,0.38)">
          CHANNEL
        </text>
        <text x="248" y="99" className="ps-mono" fontSize="8.5" fill="rgba(244,245,242,0.38)">
          BUDGET
        </text>

        {CHANNELS.map((c, i) => {
          const top = 110 + i * 34;
          return (
            <g key={c.name}>
              <rect
                x="28"
                y={top + 4}
                width="9"
                height="9"
                rx="2"
                className="ps-brand-mark"
              />
              <text x="48" y={top + 13} fontSize="12.5" fill="rgba(244,245,242,0.8)">
                {c.name}
              </text>
              <rect x="248" y={top + 5} width="144" height="7" rx="3.5" fill={FAINT} />
              <rect
                x="248"
                y={top + 5}
                width={c.bar}
                height="7"
                rx="3.5"
                fill="rgba(244,245,242,0.26)"
              />
            </g>
          );
        })}

        {/* The column a plan never fills in. */}
        <text x="28" y="252" className="ps-ask ps-mono ps-brand" fontSize="9.5">
          NOTHING HERE SAYS WHAT RUNS FIRST.
        </text>

        {/* ---------------- THE SYSTEM ---------------- */}
        <rect
          x="1"
          y="292"
          width="418"
          height="287"
          rx="18"
          fill="url(#ps-sys)"
          stroke="rgba(158,216,68,0.22)"
        />
        <text x="28" y="326" className="ps-mono ps-brand" fontSize="10.5">
          THE SYSTEM
        </text>
        <text x="28" y="362" className="ps-disp" fontSize="30" fill="#f4f5f2">
          A LOOP.
        </text>
        <text x="28" y="381" className="ps-mono" fontSize="8.5" fill="rgba(244,245,242,0.45)">
          THE MEASUREMENT FEEDS THE NEXT DECISION.
        </text>

        {/* The rail, and the charge that runs it. */}
        <rect x="43.5" y="416" width="1" height="132" fill="url(#ps-rail)" />
        <rect
          x="42.5"
          y="416"
          width="3"
          height="22"
          rx="1.5"
          opacity="0"
          className="ps-charge ps-brand"
        />

        {STEPS.map((s, i) => {
          const top = 398 + i * 44;
          const mid = top + 18;
          const last = i === STEPS.length - 1;
          return (
            <g key={s.n}>
              <line x1="44" y1={mid} x2="68" y2={mid} stroke={FAINT} strokeWidth="1" />
              <circle cx="44" cy={mid} r="2.5" className="ps-brand-dot" />

              <rect
                x="68"
                y={top}
                width="316"
                height="36"
                rx="10"
                fill="rgba(10,13,17,0.55)"
                stroke={last ? "rgba(158,216,68,0.45)" : FAINT}
              />
              <rect
                x="68"
                y={top}
                width="316"
                height="36"
                rx="10"
                fill="url(#ps-glow)"
                opacity="0"
                className="ps-lit"
                style={{ animationDelay: `${(i * CYCLE) / STEPS.length}s` }}
              />

              <rect
                x="80"
                y={top + 8}
                width="24"
                height="20"
                rx="5"
                className={last ? "ps-brand" : "ps-brand-soft"}
              />
              <text
                x="92"
                y={top + 22}
                fontSize="9"
                textAnchor="middle"
                className={last ? "ps-mono ps-ink" : "ps-mono"}
                fill={last ? undefined : "rgba(244,245,242,0.72)"}
              >
                {s.n}
              </text>

              <text
                x="116"
                y={top + 16}
                fontSize="12.5"
                fontWeight="600"
                className={last ? "ps-brand" : undefined}
                fill={last ? undefined : "#f4f5f2"}
              >
                {s.name}
              </text>
              <text
                x="116"
                y={top + 29}
                className="ps-mono"
                fontSize="8"
                fill="rgba(244,245,242,0.5)"
              >
                {s.note.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* The return path: 04 goes back to 01, and only then does anything change. */}
        <path
          d="M384 548 H400 V416 H391"
          className="ps-return"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path d="M384 416 l7 -4 v8 z" className="ps-brand-head" />
      </svg>

      <figcaption className="mt-4 text-[0.8125rem] leading-relaxed text-ink-faint">
        A plan names the channels and the budgets. A system decides the order
        first and checks itself last.
      </figcaption>
    </figure>
  );
}
