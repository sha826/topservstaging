/**
 * Rented vs owned attention (Copy Framework section 24).
 *
 * A conceptual diagram, not a data chart. There are deliberately NO numbers
 * and no axis values: the repo holds no measured series for this, and
 * inventing one would put a fabricated statistic on the page. The shape is
 * the argument. Rented attention tracks spend and ends with it. Owned
 * attention compounds and survives it.
 *
 * The 2 lines draw themselves on a continuous loop, so the viewer watches the
 * rented line collapse at the cutoff while the owned line keeps climbing
 * through it. That reveal is the whole point, and a static chart hands both
 * endings over at once.
 *
 * pathLength="1" normalizes each path to 1 unit, so a single dashoffset
 * keyframe draws both curves regardless of their real lengths. The animation
 * is additive: the static state is the finished chart, so reduced-motion
 * users see the complete picture immediately.
 */

const CYCLE_S = 7.5;

const CSS = `
@keyframes atc-draw {
  0%        { stroke-dashoffset: 1; opacity: 1; }
  46%       { stroke-dashoffset: 0; opacity: 1; }
  90%       { stroke-dashoffset: 0; opacity: 1; }
  98%, 100% { stroke-dashoffset: 0; opacity: 0; }
}
@keyframes atc-cut {
  0%, 30%   { opacity: 0; }
  42%       { opacity: 1; }
  90%       { opacity: 1; }
  98%, 100% { opacity: 0; }
}
.atc-line {
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  animation: atc-draw ${CYCLE_S}s ease-in-out infinite;
  will-change: stroke-dashoffset;
}
.atc-owned { animation-delay: 0.45s; }
.atc-cut { animation: atc-cut ${CYCLE_S}s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .atc-line, .atc-cut { animation: none; opacity: 1; stroke-dashoffset: 0; }
}
`;

export function AttentionCurve() {
  return (
    <figure className="w-full">
      <div className="rounded-lg border border-border bg-card p-6 md:p-8">
        <style>{CSS}</style>
        <svg
          viewBox="0 0 720 300"
          role="img"
          aria-label="Rented attention rises while you pay and falls away when spending stops. Owned attention builds more slowly and keeps compounding after spending stops."
          className="h-auto w-full"
        >
          {/* axes */}
          <line x1="48" y1="252" x2="690" y2="252" stroke="var(--border)" strokeWidth="1" />
          <line x1="48" y1="28" x2="48" y2="252" stroke="var(--border)" strokeWidth="1" />

          {/* the moment spend stops, revealed as the rented line reaches it */}
          <g className="atc-cut">
            <line
              x1="430"
              y1="28"
              x2="430"
              y2="252"
              stroke="var(--ink-faint)"
              strokeWidth="1"
              strokeDasharray="4 5"
            />
            <text
              x="438"
              y="46"
              fill="var(--ink-faint)"
              fontSize="13"
              fontFamily="var(--font-dm-mono), monospace"
            >
              spend stops
            </text>
          </g>

          {/* Owned: slow start, compounding, unaffected by the cutoff */}
          <path
            className="atc-line atc-owned"
            pathLength={1}
            d="M48 246 C160 240 250 224 330 196 C420 164 500 118 690 44"
            fill="none"
            stroke="var(--brand)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Rented: fast rise, plateau, collapse at the cutoff */}
          <path
            className="atc-line"
            pathLength={1}
            d="M48 246 C110 150 170 120 240 116 C320 112 380 118 430 120 C452 168 470 226 500 248"
            fill="none"
            stroke="var(--ink-faint)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <text x="600" y="34" fill="var(--brand)" fontSize="15" fontWeight="600">
            Owned
          </text>
          <text x="240" y="102" fill="var(--ink-faint)" fontSize="15" fontWeight="600">
            Rented
          </text>
          <text
            x="48"
            y="278"
            fill="var(--ink-faint)"
            fontSize="12"
            fontFamily="var(--font-dm-mono), monospace"
          >
            TIME
          </text>
        </svg>
      </div>

      <figcaption className="mt-4 grid gap-3 sm:grid-cols-2">
        <span className="flex items-baseline gap-2.5 text-sm leading-relaxed text-muted-foreground">
          <span aria-hidden className="mt-1.5 h-0.5 w-5 shrink-0 bg-ink-faint" />
          <span>
            <strong className="font-semibold text-foreground">Rented.</strong> Ads
            and purchased leads work while the invoice clears, then stop. Nothing
            you paid for stays yours.
          </span>
        </span>
        <span className="flex items-baseline gap-2.5 text-sm leading-relaxed text-muted-foreground">
          <span aria-hidden className="mt-1.5 h-0.5 w-5 shrink-0 bg-brand" />
          <span>
            <strong className="font-semibold text-foreground">Owned.</strong>{" "}
            Familiarity accumulates. It is slower to start and it keeps working
            after the spend, which is why acquisition cost falls over time.
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
