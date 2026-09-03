/**
 * The customer journey (Copy Framework section 24), with the 9 stages named
 * exactly as the framework names them.
 *
 * This is the page's central teaching visual: it shows WHERE each half of the
 * methodology acts. Brand works the long stretch before anyone searches.
 * Performance works the short window when they do. Most agencies sell only
 * the blue band, which is the whole argument in 1 picture.
 *
 * A pulse travels the 9 stages in order, on the same continuous ambient loop
 * as the other visuals, so the sequence reads as a progression rather than a
 * row of dots. Delay is derived from stage index. The animation is additive:
 * the static state is the full, legible journey.
 *
 * Built as an ordered list so the sequence survives without CSS and reads
 * correctly to assistive tech. The horizontal track is a desktop enhancement.
 */

const STAGES = [
  { name: "Unaware", phase: "brand" },
  { name: "Exposed", phase: "brand" },
  { name: "Familiar", phase: "brand" },
  { name: "Trust", phase: "brand" },
  { name: "Search", phase: "performance" },
  { name: "Recognition", phase: "performance" },
  { name: "Choice", phase: "performance" },
  { name: "Customer", phase: "both" },
  { name: "Advocate", phase: "both" },
] as const;

const DOT: Record<string, string> = {
  brand: "bg-brand",
  performance: "bg-brand-blue-hot",
  both: "bg-foreground",
};

const TEXT: Record<string, string> = {
  brand: "text-brand",
  performance: "text-brand-blue-hot",
  both: "text-foreground",
};

const CYCLE_S = 6.6;
const STEP_S = 0.34;

const CSS = `
@keyframes cj-pulse {
  0%, 48%, 100% { transform: scale(1);   opacity: 1; }
  8%            { transform: scale(1.7); opacity: 1; }
}
@keyframes cj-ring {
  0%       { transform: scale(0.8); opacity: 0; }
  8%       { opacity: 0.5; }
  30%,100% { transform: scale(2.6); opacity: 0; }
}
.cj-dot, .cj-ring { will-change: transform, opacity; }
.cj-dot  { animation: cj-pulse ${CYCLE_S}s ease-in-out infinite; }
.cj-ring { animation: cj-ring ${CYCLE_S}s ease-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .cj-dot { animation: none; }
  .cj-ring { display: none; }
}
`;

export function CustomerJourney() {
  return (
    <figure className="w-full">
      <style>{CSS}</style>

      {/* Band labels: which half of the methodology is working, and when. */}
      <div className="grid gap-3 sm:grid-cols-2">
        <p className="rounded-md border border-brand/40 bg-brand/[0.07] px-4 py-3 text-sm leading-relaxed">
          <strong className="font-semibold text-brand">Brand creates demand</strong>
          <span className="mt-0.5 block text-muted-foreground">
            Stages 1 to 4, months or years before anyone searches.
          </span>
        </p>
        <p className="rounded-md border border-brand-blue/40 bg-brand-blue/[0.09] px-4 py-3 text-sm leading-relaxed">
          <strong className="font-semibold text-brand-blue-hot">
            Performance captures demand
          </strong>
          <span className="mt-0.5 block text-muted-foreground">
            Stages 5 to 7, the few hours when they are ready to buy.
          </span>
        </p>
      </div>

      <ol className="mt-8 grid gap-x-2 gap-y-4 sm:grid-cols-3 lg:grid-cols-9">
        {STAGES.map((stage, i) => {
          const delay = `${(i * STEP_S).toFixed(2)}s`;
          return (
            <li key={stage.name} className="relative flex items-center gap-3 lg:block">
              {/* Connector rail, desktop only. */}
              <span
                aria-hidden
                className={`hidden lg:block lg:absolute lg:left-0 lg:right-0 lg:top-[7px] lg:h-px ${
                  i === STAGES.length - 1 ? "lg:hidden" : ""
                } ${stage.phase === "brand" ? "bg-brand/35" : stage.phase === "performance" ? "bg-brand-blue/40" : "bg-border"}`}
              />
              <span className="relative z-10 block size-3.5 shrink-0">
                {/* Expanding ring as the pulse reaches this stage. */}
                <span
                  aria-hidden
                  className={`cj-ring absolute inset-0 rounded-full ${DOT[stage.phase]}`}
                  style={{ animationDelay: delay }}
                />
                <span
                  aria-hidden
                  className={`cj-dot absolute inset-0 rounded-full ring-4 ring-background ${DOT[stage.phase]}`}
                  style={{ animationDelay: delay }}
                />
              </span>
              <span className="lg:mt-3 lg:block">
                <span className="label-mono text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`block text-sm font-semibold ${TEXT[stage.phase]}`}>
                  {stage.name}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      <figcaption className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Most agencies sell you stages 5 to 7 and call it marketing. That window
        is where every competitor is already bidding, and it is the only place
        they compete. The job is won earlier, in stages 1 to 4, which is the
        part almost nobody is buying.
      </figcaption>
    </figure>
  );
}
