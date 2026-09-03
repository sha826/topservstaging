/**
 * Five-Mile-Famous: local market saturation (Copy Framework section 24).
 *
 * Read as a service area map, not a chart. Streets, houses, a pin on the shop
 * and a radius drawn around it, because the concept is geographic: the
 * households inside the zone recognize the name, the ones outside do not.
 * An earlier revision drew an abstract dot field and it did not read as a
 * neighborhood, which is the whole point of the visual.
 *
 * Animation follows the hero orbit's language: a continuous ambient loop, no
 * scroll trigger, nothing that demands attention. A frequency wave leaves the
 * shop and travels outward, and each house brightens as it passes. That is
 * the doctrine made visible: frequency is what turns a zone familiar, 3 times
 * weekly, over and over.
 *
 * Delays are derived from each house's distance, so the wave propagates
 * outward rather than flashing at random. Positions come from the street grid
 * with a deterministic offset, never Math.random, so server and client markup
 * match.
 *
 * The animation is additive: the static state is the finished, fully legible
 * map, so reduced-motion users and any no-CSS render lose nothing.
 */

const CENTER = 150;
const OWNED_RADIUS = 84;
const SWEEP_S = 4.4;

const STREETS = [18, 42, 66, 90, 114, 138, 162, 186, 210, 234, 258, 282];

/**
 * A house on almost every corner. The offset is a fixed pattern, not noise,
 * so blocks stay legible as blocks and the markup is stable across renders.
 */
const HOUSES = STREETS.flatMap((y, row) =>
  STREETS.map((x, col) => {
    const hx = x + ((row + col) % 3) * 5 - 5;
    const hy = y + ((row * 2 + col) % 3) * 4 - 4;
    const dist = Math.hypot(hx - CENTER, hy - CENTER);
    return {
      x: +hx.toFixed(1),
      y: +hy.toFixed(1),
      dist,
      owned: dist <= OWNED_RADIUS,
      delay: +((Math.min(dist, OWNED_RADIUS) / OWNED_RADIUS) * SWEEP_S * 0.55).toFixed(2),
    };
  })
).filter((h) => h.dist > 22 && h.x > 12 && h.x < 288 && h.y > 12 && h.y < 288);

const CSS = `
@keyframes mkt-sweep {
  0%   { transform: scale(0.08); opacity: 0; }
  8%   { opacity: 0.5; }
  70%  { opacity: 0; }
  100% { transform: scale(1); opacity: 0; }
}
@keyframes mkt-lit {
  0%, 62%, 100% { opacity: 0.9; }
  10%           { opacity: 1; }
}
@keyframes mkt-core {
  0%, 100% { transform: scale(1);    opacity: 0.5; }
  50%      { transform: scale(1.3);  opacity: 0.12; }
}
.mkt-sweep, .mkt-core {
  transform-box: fill-box;
  transform-origin: center;
  will-change: transform, opacity;
}
.mkt-sweep { animation: mkt-sweep ${SWEEP_S}s cubic-bezier(0.22, 1, 0.36, 1) infinite; }
.mkt-lit   { animation: mkt-lit ${SWEEP_S}s ease-in-out infinite; }
.mkt-core  { animation: mkt-core ${SWEEP_S}s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .mkt-sweep { display: none; }
  .mkt-lit, .mkt-core { animation: none; }
}
`;

/** A roof and a wall, at map scale. Small enough to read as a house, not an icon. */
function House({ x, y, owned }: { x: number; y: number; owned: boolean }) {
  return (
    <path
      d={`M${x - 2.9} ${y} L${x} ${y - 2.9} L${x + 2.9} ${y} L${x + 2.9} ${y + 2.8} L${x - 2.9} ${y + 2.8} Z`}
      fill={owned ? "var(--brand)" : "var(--ink-faint)"}
      fillOpacity={owned ? 1 : 0.34}
    />
  );
}

export function MarketSaturation() {
  const owned = HOUSES.filter((h) => h.owned).length;

  return (
    <figure className="w-full">
      <div className="rounded-lg border border-border bg-card p-5 md:p-6">
        <style>{CSS}</style>
        <svg
          viewBox="0 0 300 300"
          role="img"
          aria-label={`A service area map. Streets of houses with a 5 mile radius drawn around the company. The ${owned} houses inside the radius recognize the name, the houses beyond it do not.`}
          className="mx-auto h-auto w-full max-w-[420px]"
        >
          <defs>
            <clipPath id="mkt-frame">
              <rect x="6" y="6" width="288" height="288" rx="8" />
            </clipPath>
          </defs>

          <g clipPath="url(#mkt-frame)">
            <rect x="6" y="6" width="288" height="288" fill="var(--background)" />

            {/* The street grid. 2 arterials run through the shop. */}
            <g stroke="var(--border)" strokeWidth="1">
              {STREETS.map((v) => (
                <line key={`v${v}`} x1={v} y1="6" x2={v} y2="294" />
              ))}
              {STREETS.map((h) => (
                <line key={`h${h}`} x1="6" y1={h} x2="294" y2={h} />
              ))}
            </g>
            <g stroke="var(--border)" strokeWidth="3" strokeOpacity="0.9">
              <line x1="150" y1="6" x2="150" y2="294" />
              <line x1="6" y1="150" x2="294" y2="150" />
            </g>

            {/* The zone that is held at frequency. */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={OWNED_RADIUS}
              fill="var(--brand)"
              fillOpacity="0.07"
              stroke="var(--brand)"
              strokeWidth="1.5"
            />
            <circle
              className="mkt-sweep"
              cx={CENTER}
              cy={CENTER}
              r={OWNED_RADIUS}
              fill="none"
              stroke="var(--brand)"
              strokeWidth="2"
              aria-hidden
            />

            {HOUSES.map((h, i) =>
              h.owned ? (
                <g
                  key={i}
                  className="mkt-lit"
                  style={{ animationDelay: `${h.delay}s` }}
                >
                  <House x={h.x} y={h.y} owned />
                </g>
              ) : (
                <House key={i} x={h.x} y={h.y} owned={false} />
              )
            )}

            {/* The radius, stated as a radius, on a diagonal so the label
                clears both the pin and the houses. */}
            <line
              x1={CENTER}
              y1={CENTER}
              x2={CENTER + OWNED_RADIUS * 0.707}
              y2={CENTER - OWNED_RADIUS * 0.707}
              stroke="var(--brand)"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
            <text
              x={CENTER}
              y={CENTER - OWNED_RADIUS - 9}
              textAnchor="middle"
              fill="var(--brand)"
              fontSize="11"
              fontFamily="var(--font-dm-mono), monospace"
              letterSpacing="1.6"
            >
              5 MILES
            </text>

            {/* The shop, pinned to its own corner. */}
            <circle
              className="mkt-core"
              cx={CENTER}
              cy={CENTER}
              r="14"
              fill="none"
              stroke="var(--brand-blue-hot)"
              strokeWidth="1.5"
              aria-hidden
            />
            <path
              d={`M${CENTER} ${CENTER + 9} C${CENTER - 9} ${CENTER - 3} ${CENTER - 7} ${CENTER - 13} ${CENTER} ${CENTER - 13} C${CENTER + 7} ${CENTER - 13} ${CENTER + 9} ${CENTER - 3} ${CENTER} ${CENTER + 9} Z`}
              fill="var(--brand-blue-hot)"
            />
            <circle cx={CENTER} cy={CENTER - 6} r="2.6" fill="var(--background)" />
          </g>

          <rect
            x="6"
            y="6"
            width="288"
            height="288"
            rx="8"
            fill="none"
            stroke="var(--border)"
          />
        </svg>
      </div>

      <figcaption className="mt-4 text-base leading-relaxed text-muted-foreground">
        Inside the radius you are the name they already know. Outside it you are
        a search result like everyone else.
      </figcaption>
    </figure>
  );
}
