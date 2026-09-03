"use client";

/**
 * The menu we do not publish. For the Pricing hero.
 *
 * The Argument Spine is emphatic about this page: "make the absence of a
 * table the argument, not an omission. Every competitor sells from a menu. A
 * menu means the price was set before they looked at you. That is the
 * strongest line on the page and it should not be buried."
 *
 * So the hero shows the artifact being refused. It replaces a generated
 * still life of drafting instruments, which gestured at precision without
 * arguing anything.
 *
 * NOT A PRICE TABLE, AND IT MUST NEVER BECOME ONE. There is not a single
 * numeral in this component. Where a figure would sit there is a redaction
 * bar, the whole group is struck through, and it is labelled as what other
 * agencies publish. Build Spec v2 section 4 forbids a table outright, and
 * SEO Guidelines 1.3 permits the floor and the activation only in the
 * anchors section further down this page. Do not add a number, a range, a
 * tier name or a currency symbol here.
 */

const CSS = `
@keyframes dnm-strike { 0%, 8% { transform: scaleX(0); } 26%, 82% { transform: scaleX(1); } 100% { transform: scaleX(1); } }
@keyframes dnm-fade   { 0%, 20% { opacity: 0.75; } 46%, 100% { opacity: 0.3; } }
@keyframes dnm-tick   { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
@media (prefers-reduced-motion: no-preference) {
  .dnm-strike { animation: dnm-strike 6.5s ease-in-out infinite; transform-origin: left; }
  .dnm-fade   { animation: dnm-fade 6.5s ease-in-out infinite; }
  .dnm-tick   { animation: dnm-tick 2.6s ease-in-out infinite; }
}
`;

/** Deliberately unnamed and unpriced. Placeholders, not products. */
const FAKE_TIERS = ["Tier 1", "Tier 2", "Tier 3"];

export function NoMenuDiagram() {
  return (
    <figure className="relative flex min-h-[22rem] flex-col overflow-hidden rounded-[24px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_62%)] p-5 md:p-6 lg:min-h-0">
      <style>{CSS}</style>

      <p className="label-mono text-ink-faint">What every other agency publishes</p>

      {/* The menu, redacted and struck. No figure exists to read. */}
      <div className="relative mt-4">
        <ul className="dnm-fade grid grid-cols-3 gap-2">
          {FAKE_TIERS.map((t) => (
            <li
              key={t}
              className="rounded-[12px] border border-[rgba(244,245,242,0.1)] bg-[#0b0e13] p-3"
            >
              <p className="label-mono text-[0.5625rem] text-ink-faint">{t}</p>
              <span
                aria-hidden
                className="mt-3 block h-5 w-full rounded-[5px] bg-[repeating-linear-gradient(115deg,rgba(244,245,242,0.18)_0_6px,transparent_6px_12px)]"
              />
              <span aria-hidden className="mt-3 block h-1.5 w-4/5 rounded-full bg-[rgba(244,245,242,0.08)]" />
              <span aria-hidden className="mt-1.5 block h-1.5 w-3/5 rounded-full bg-[rgba(244,245,242,0.08)]" />
              <span aria-hidden className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-[rgba(244,245,242,0.08)]" />
            </li>
          ))}
        </ul>
        <span
          aria-hidden
          className="dnm-strike absolute left-0 top-1/2 block h-[2px] w-full origin-left rounded-full bg-brand"
        />
      </div>

      <p aria-hidden className="label-mono mt-5 flex items-center gap-3 text-ink-faint">
        <span className="h-px flex-1 bg-border" />
        We publish none of it
        <span className="h-px flex-1 bg-border" />
      </p>

      <div className="mt-5 flex-1 rounded-[16px] border border-brand/45 bg-[linear-gradient(150deg,rgba(158,216,68,0.12),rgba(13,16,21,0.75)_70%)] p-5">
        <p className="label-mono flex items-center gap-2.5 text-brand">
          <span aria-hidden className="dnm-tick block size-2 rounded-full bg-brand" />
          What we publish instead
        </p>
        <p className="display mt-3 text-[clamp(1.15rem,2vw,1.5rem)] leading-tight">
          A floor, an activation, and how the rest is worked out
        </p>
        <p className="mt-3 text-[0.875rem] leading-relaxed text-muted-foreground">
          A published table means the price was set before anybody looked at
          your business. Both of our figures are below, and neither is a tier.
        </p>
      </div>

      <figcaption className="sr-only">
        Other agencies publish a tier menu. TopServ Digital publishes no price
        table: a floor rate, a one time activation, and the inputs that set
        everything else.
      </figcaption>
    </figure>
  );
}
