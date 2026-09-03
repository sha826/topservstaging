/**
 * The equation, as a continuous loop, with all 3 terms present at once.
 *
 * THE IDEA. Build Spec v2 section 1 is an equation, so the panel shows the
 * whole equation at all times: BRAND, PERFORMANCE and the sum they produce.
 * The motion is what connects them rather than what reveals them. A charge
 * runs down the rail through the 2 inputs and lands on BRANDFORMANCE, which
 * lights as it arrives. The category name keeps "Brand" in cream and
 * "Formance" in brand green so the portmanteau is visible in the letterforms.
 *
 * THE FIELD. Behind it, 2 signals that are the argument in miniature. Brand
 * is a slow wide wave that never stops. Performance is a sharp pulse train
 * that fires and drops. They run at different speeds and never sync, which
 * is the point: one works between purchases, the other only at the moment of
 * one. Each is tiled twice and translated by exactly half its width, so the
 * loop is seamless with no JS driving it.
 *
 * HOW IT IS BUILT. No animation library and no Lottie payload. Every moving
 * value is a transform or an opacity, so this stays on the compositor and
 * costs nothing on scroll, which matters because a hero animation runs while
 * the rest of the page is being scrolled.
 *
 * ACCESSIBILITY. The 3 terms are a plain <dl> in normal flow. Nothing is
 * hidden, nothing is revealed, and no term depends on the animation to be
 * read, so the no JS render and the reduced motion render are the same
 * complete equation. Reduced motion also drops the decorative field, leaving
 * the equation on a clean ground.
 */

const CSS = `
.eqs-field {
  position: absolute; inset: 0; overflow: hidden; border-radius: inherit; pointer-events: none;
  -webkit-mask-image: linear-gradient(to right, transparent 20%, #000 58%);
  mask-image: linear-gradient(to right, transparent 20%, #000 58%);
}
.eqs-run, .eqs-glow { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .eqs-run  { animation: eqs-run 4.6s cubic-bezier(0.45, 0, 0.55, 1) infinite; }
  .eqs-glow { animation: eqs-glow 4.6s ease-in-out infinite; }
  .eqs-wave  { animation: eqs-drift 14s linear infinite; }
  .eqs-pulse { animation: eqs-drift 3.4s linear infinite; }
}
@media (prefers-reduced-motion: reduce) {
  .eqs-field { display: none; }
}

/* The charge travels the rail. 16% tall, so a full pass is 525% of itself. */
@keyframes eqs-run {
  0%        { opacity: 0; transform: translateY(-10%); }
  10%, 72%  { opacity: 1; }
  88%, 100% { opacity: 0; transform: translateY(525%); }
}
@keyframes eqs-glow {
  0%, 62%   { opacity: 0;    transform: scale(0.8); }
  80%       { opacity: 0.85; transform: scale(1.04); }
  100%      { opacity: 0;    transform: scale(0.92); }
}
@keyframes eqs-drift { to { transform: translateX(-50%); } }
`;

/** One tiled signal. Drawn twice so translating by half is seamless. */
function Signal({
  d,
  className,
  stroke,
  width,
  opacity,
}: {
  d: string;
  className: string;
  stroke: string;
  width: number;
  opacity: number;
}) {
  return (
    <g className={className} style={{ opacity }}>
      <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" />
      <g transform="translate(600 0)">
        <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" />
      </g>
    </g>
  );
}

const WAVE =
  "M0 60 C 50 60, 50 12, 100 12 S 150 60, 200 60 S 250 12, 300 12 S 350 60, 400 60 S 450 12, 500 12 S 550 60, 600 60";
const PULSE =
  "M0 60 H 34 V 20 H 40 V 60 H 96 V 20 H 102 V 60 H 158 V 20 H 164 V 60 H 220 V 20 H 226 V 60 H 282 V 20 H 288 V 60 H 344 V 20 H 350 V 60 H 406 V 20 H 412 V 60 H 468 V 20 H 474 V 60 H 530 V 20 H 536 V 60 H 600";

function Term({
  term,
  does,
  sum,
}: {
  term: string;
  does: string;
  sum?: boolean;
}) {
  return (
    <div className="relative pl-11">
      {sum ? (
        <span
          aria-hidden
          className="eqs-glow pointer-events-none absolute -left-6 top-1/2 h-[9rem] w-[18rem] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(158,216,68,0.4),transparent)] blur-2xl"
        />
      ) : null}
      <dt className="display relative text-[clamp(1.35rem,2.4vw,2rem)] uppercase leading-none">
        {sum ? (
          <>
            <span className="text-foreground">Brand</span>
            <span className="text-brand">Formance</span>
          </>
        ) : (
          <span className="text-foreground">{term}</span>
        )}
      </dt>
      <dd
        className={`relative mt-2.5 text-[0.9375rem] md:text-base ${
          sum ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {does}
      </dd>
    </div>
  );
}

function Node({ op, accent }: { op: string; accent?: boolean }) {
  return (
    <div aria-hidden className="relative h-8 py-5">
      <span
        className={`absolute left-0 top-0 flex size-7 items-center justify-center rounded-full font-mono text-[0.875rem] ${
          accent
            ? "border border-brand/40 bg-[#0b0e13] text-brand"
            : "border border-[#2b323c] bg-[#0b0e13] text-ink-faint"
        }`}
      >
        {op}
      </span>
    </div>
  );
}

export function BfEquationStage() {
  return (
    <div className="relative overflow-hidden rounded-[20px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_58%,#0d1015_100%)] p-6 md:p-8">
      <style>{CSS}</style>

      {/* The 2 signals. Decorative: the terms carry the meaning. */}
      <div aria-hidden className="eqs-field">
        <svg
          viewBox="0 0 600 80"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-[13%] h-[22%] w-full"
        >
          <Signal d={WAVE} className="eqs-wave" stroke="#f4f5f2" width={1.4} opacity={0.13} />
        </svg>
        <svg
          viewBox="0 0 600 80"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-[46%] h-[18%] w-full"
        >
          <Signal d={PULSE} className="eqs-pulse" stroke="#9ed844" width={1.6} opacity={0.2} />
        </svg>
      </div>

      <dl className="relative">
        {/* The rail the 2 inputs sit on, and the charge that runs it. */}
        <span
          aria-hidden
          className="absolute bottom-8 left-[0.875rem] top-3 w-px bg-[linear-gradient(180deg,rgba(244,245,242,0.06),rgba(244,245,242,0.16),rgba(158,216,68,0.45))]"
        />
        <span
          aria-hidden
          className="eqs-run absolute left-[0.8125rem] top-3 h-[16%] w-[3px] rounded-full bg-[linear-gradient(180deg,transparent,var(--brand),transparent)]"
        />

        <Term term="Brand" does="creates demand" />
        <Node op="+" />
        <Term term="Performance" does="captures demand" />
        <Node op="=" accent />
        <Term term="BrandFormance" does="builds market dominance" sum />
      </dl>
    </div>
  );
}
