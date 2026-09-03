"use client";

/**
 * The broken system, for the Overview hero.
 *
 * The Argument Spine's Problem beat for this page: "you have to choose
 * between an agency that builds brand and one that drives leads, and
 * whichever you pick you lose the other half."
 *
 * THE SHAPE IS THE ARGUMENT, AND IT PAYS OFF LATER. This draws the same
 * circuit the How It Works page draws, except here it is cut open at the top
 * and the bottom. Each half is a real arc, energy runs along it, and the
 * energy dies at the break instead of coming back round. A visitor who reads
 * page 1 and then page 2 sees the identical ring close, which is the whole
 * hub argument in 2 pictures: 2 vendors leave a circuit that never closes,
 * 1 partner closes it.
 *
 * NOTHING LEGIBLE IS EVER DIMMED. An earlier version alternated the 2
 * options by dropping one card to a quarter opacity, which read as a half
 * loaded card and put unreadable text on the site's most important
 * commercial page. The alternation now moves through the arcs, which carry
 * no text, while every word on the panel stays at full contrast.
 *
 * Green is brand, blue is performance, matching every other visual in the
 * hub. Pure CSS and inline SVG, so the hero stays a server component and the
 * animation costs no JavaScript.
 */

const CSS = `
@keyframes dfc-run   { to { stroke-dashoffset: -44; } }
@keyframes dfc-lit-a { 0%, 38% { opacity: 0.85; } 50%, 88% { opacity: 0.12; } 100% { opacity: 0.85; } }
@keyframes dfc-lit-b { 0%, 38% { opacity: 0.12; } 50%, 88% { opacity: 0.85; } 100% { opacity: 0.12; } }
@keyframes dfc-break { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
@keyframes dfc-tick  { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }

.dfc-run   { stroke-dasharray: 5 17; animation: dfc-run 1.8s linear infinite; }
.dfc-lit-a { animation: dfc-lit-a 7s ease-in-out infinite; }
.dfc-lit-b { animation: dfc-lit-b 7s ease-in-out infinite; }
.dfc-break { animation: dfc-break 2.6s ease-in-out infinite; }
.dfc-tick  { animation: dfc-tick 2.4s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .dfc-run, .dfc-lit-a, .dfc-lit-b, .dfc-break, .dfc-tick { animation: none; }
  .dfc-lit-a, .dfc-lit-b { opacity: 0.5; }
}
`;

/** Left half, 100 to 260 degrees. Right half, 280 to 80. 20 degree breaks. */
const LEFT = "M 141.2 266.4 A 108 108 0 0 1 141.2 53.6";
const RIGHT = "M 178.8 53.6 A 108 108 0 0 1 178.8 266.4";

const HALVES = [
  {
    tag: "Option A",
    k: "Builds brand",
    v: "Makes you look credible. Cannot show you revenue.",
    tone: "text-brand",
    ring: "border-brand/40",
    dot: "bg-brand",
  },
  {
    tag: "Option B",
    k: "Drives leads",
    v: "Makes the phone ring. Hits a ceiling nobody raises.",
    tone: "text-brand-blue-hot",
    ring: "border-brand-blue/40",
    dot: "bg-brand-blue-hot",
  },
];

export function ForcedChoiceDiagram() {
  return (
    <figure className="relative flex min-h-[22rem] flex-col overflow-hidden rounded-[24px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_62%)] p-5 md:p-6 lg:min-h-0">
      <style>{CSS}</style>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(72%_52%_at_50%_0%,rgba(158,216,68,0.1),transparent_68%)]"
      />

      <p className="label-mono relative flex items-center gap-2.5 text-ink-faint">
        <span aria-hidden className="dfc-tick block size-2 rounded-full bg-brand" />
        The choice you are offered
      </p>

      <div className="relative flex flex-1 items-center justify-center py-2">
        <svg
          viewBox="0 0 320 320"
          className="w-full max-w-[17.5rem]"
          role="img"
          aria-label="A circuit cut open at the top and the bottom. The brand half and the performance half each run on their own and neither closes the loop."
        >
          {/* Left half: brand. */}
          <g className="dfc-lit-a">
            <path d={LEFT} fill="none" stroke="var(--brand)" strokeWidth="16" opacity="0.14" strokeLinecap="round" />
          </g>
          <path d={LEFT} fill="none" stroke="var(--brand)" strokeWidth="2.5" opacity="0.55" strokeLinecap="round" />
          <path className="dfc-run" d={LEFT} fill="none" stroke="var(--brand-hot)" strokeWidth="3.5" strokeLinecap="round" />

          {/* Right half: performance. */}
          <g className="dfc-lit-b">
            <path d={RIGHT} fill="none" stroke="var(--brand-blue)" strokeWidth="16" opacity="0.18" strokeLinecap="round" />
          </g>
          <path d={RIGHT} fill="none" stroke="var(--brand-blue-hot)" strokeWidth="2.5" opacity="0.55" strokeLinecap="round" />
          <path className="dfc-run" d={RIGHT} fill="none" stroke="var(--brand-blue-hot)" strokeWidth="3.5" strokeLinecap="round" />

          {/* The 2 breaks, where the energy stops. */}
          <g className="dfc-break" stroke="var(--ink-faint)" strokeWidth="2" strokeLinecap="round">
            <line x1="150" y1="44" x2="170" y2="63" />
            <line x1="170" y1="44" x2="150" y2="63" />
            <line x1="150" y1="257" x2="170" y2="276" />
            <line x1="170" y1="257" x2="150" y2="276" />
          </g>

          <text
            x="160"
            y="152"
            textAnchor="middle"
            className="display"
            fill="var(--foreground)"
            fontSize="22"
          >
            Half a system
          </text>
          <text
            x="160"
            y="176"
            textAnchor="middle"
            className="label-mono"
            fill="var(--ink-faint)"
            fontSize="10"
          >
            Whichever one you pick
          </text>
        </svg>
      </div>

      {/* The 2 halves, named. Always at full contrast. */}
      <div className="relative grid gap-2.5 sm:grid-cols-2">
        {HALVES.map((h) => (
          <div key={h.tag} className={`rounded-[14px] border ${h.ring} bg-[#0b0e13] p-4`}>
            <p className={`label-mono flex items-center gap-2 text-[0.5625rem] ${h.tone}`}>
              <span aria-hidden className={`block size-1.5 rounded-full ${h.dot}`} />
              {h.tag}
            </p>
            <p className="mt-2 text-[0.9375rem] font-semibold leading-snug">{h.k}</p>
            <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground">{h.v}</p>
          </div>
        ))}
      </div>

      <figcaption className="relative mt-4 border-t border-[rgba(244,245,242,0.1)] pt-4 text-[0.875rem] leading-relaxed text-muted-foreground">
        Both halves are real and both run. Neither one closes the loop, which
        is why the same money buys less every year.
      </figcaption>
    </figure>
  );
}
