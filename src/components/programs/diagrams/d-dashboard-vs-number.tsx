"use client";

/**
 * A dashboard, against 1 number. For the What This Delivers hero.
 *
 * The Argument Spine's Problem beat for this page: "you have been promised
 * results before and got a dashboard instead." The visual states it directly
 * rather than gesturing at it with a photograph of a shelf.
 *
 * NO VALUES APPEAR ON EITHER SIDE. The dim tiles carry metric names and a
 * redaction bar where a figure would sit, because inventing plausible
 * impression counts would be exactly the fabricated evidence
 * IMAGE-GUIDELINES 4.1 forbids. The bright tile names the number this page
 * is held to and leaves it empty for the same reason: the baseline is set in
 * the client's own first 90 days.
 *
 * The vanity metrics named here are the ones the copy already dismisses.
 * They are not attributed to any vendor or client.
 */

const CSS = `
@keyframes dvn-dim   { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.78; } }
@keyframes dvn-focus { 0%, 100% { box-shadow: 0 0 0 0 rgba(158,216,68,0); } 50% { box-shadow: 0 0 30px 0 rgba(158,216,68,0.22); } }
@media (prefers-reduced-motion: no-preference) {
  .dvn-dim   { animation: dvn-dim 5.2s ease-in-out infinite; }
  .dvn-focus { animation: dvn-focus 4s ease-in-out infinite; }
}
`;

const VANITY = [
  "Impressions",
  "Clicks",
  "Sessions",
  "Reach",
  "Keyword rankings",
  "Engagement rate",
];

export function DashboardVsNumberDiagram() {
  return (
    <figure className="relative flex min-h-[22rem] flex-col overflow-hidden rounded-[24px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_62%)] p-5 md:p-6 lg:min-h-0">
      <style>{CSS}</style>

      <p className="label-mono text-ink-faint">What you were shown last time</p>

      {/* The dashboard. Names without values, because the values were never
          the point and inventing them would be a fabricated claim. */}
      <ul className="dvn-dim mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {VANITY.map((v) => (
          <li
            key={v}
            className="rounded-[10px] border border-[rgba(244,245,242,0.09)] bg-[#0b0e13] p-3"
          >
            <p className="label-mono text-[0.5625rem] leading-tight text-ink-faint">{v}</p>
            <span
              aria-hidden
              className="mt-2 block h-2.5 w-3/4 rounded-full bg-[repeating-linear-gradient(115deg,rgba(244,245,242,0.16)_0_5px,transparent_5px_10px)]"
            />
          </li>
        ))}
      </ul>

      <p
        aria-hidden
        className="label-mono mt-5 flex items-center gap-3 text-ink-faint"
      >
        <span className="h-px flex-1 bg-border" />
        Instead
        <span className="h-px flex-1 bg-border" />
      </p>

      {/* The 1 number, named and deliberately empty. */}
      <div className="dvn-focus mt-5 flex-1 rounded-[16px] border border-brand/45 bg-[linear-gradient(150deg,rgba(158,216,68,0.12),rgba(13,16,21,0.75)_70%)] p-5">
        <p className="label-mono text-brand">The number we are held to</p>
        <p className="display mt-3 text-[clamp(1.25rem,2.2vw,1.7rem)] leading-tight">
          Cost per booked call
        </p>
        <p className="mt-3 text-[0.875rem] leading-relaxed text-muted-foreground">
          1 number, across both halves, tracked for 12 months. It is blank
          here because your baseline is measured in your first 90 days, not
          borrowed from somebody else&apos;s account.
        </p>
      </div>

      <figcaption className="sr-only">
        A dashboard of impressions, clicks, sessions, reach, keyword rankings
        and engagement rate cannot be wrong. A single cost per booked call,
        measured across brand and performance together, can be. That is why it
        is the one we publish.
      </figcaption>
    </figure>
  );
}
