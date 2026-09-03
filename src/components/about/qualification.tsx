import { builtFor, notFor } from "@/lib/bf-content";
import { Shell } from "@/components/about/page-grid";

/**
 * Who this is for, and who it is not.
 *
 * WHY THIS IS ITS OWN SECTION. v5 folded the qualification and the
 * institution into one split composition, and the result was a single band
 * carrying 12 list items, 2 headings, a founder portrait, 2 paragraphs, 2
 * figures and a link. It read as one long wall of content. They are now 2
 * sections with one job each, and this one is only ever a shortlist against
 * a shortlist.
 *
 * GROUND. v6 put this on the light ground for tonal variety and it fought
 * the design system, which globals.css states plainly is "dark cinematic,
 * single committed theme". It is dark again. Variety now comes from
 * composition and from where the brand green light sits, never from
 * flipping the page to a different theme.
 *
 * THE 2 PANELS. Both lists come verbatim from bf-content.ts, which carries
 * Build Spec v2 section 2. The spec is emphatic that the disqualifying half
 * must survive review: "It is acceptable and expected for the wrong buyer to
 * feel disqualified. That is the site working as designed. Do not soften
 * it." So the halves get equal width and equal type, side by side. Only the
 * accent separates them: one panel is lit in brand green, the other is not.
 * The disqualifying panel is never greyed below AA.
 *
 * Motion is CSS view-timeline only, transform based, so this section costs
 * nothing on scroll and degrades to the finished state with no JS.
 */

function Panel({
  label,
  heading,
  items,
  accent,
}: {
  label: string;
  heading: string;
  items: readonly string[];
  accent?: boolean;
}) {
  return (
    <div
      className={`rise relative overflow-hidden rounded-[18px] p-6 md:p-8 ${
        accent
          ? "border border-brand/35 bg-[linear-gradient(160deg,rgba(158,216,68,0.08),rgba(13,16,21,0.7)_62%)]"
          : "border border-[#2b323c] bg-[#0d1015]"
      }`}
    >
      {accent ? (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,var(--brand),transparent_72%)]"
        />
      ) : null}

      <p className={`label-mono ${accent ? "text-brand" : "text-ink-faint"}`}>
        {label}
      </p>
      <h3 className="display mt-3 max-w-[16ch] text-[clamp(1.35rem,2.2vw,1.9rem)] leading-[1.04]">
        {heading}
      </h3>

      <ul className="mt-7 grid gap-px">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3.5 border-t border-[rgba(244,245,242,0.09)] py-3.5 text-[0.9375rem] leading-relaxed text-muted-foreground"
          >
            <span
              aria-hidden
              className={
                accent
                  ? "mt-2 block size-1.5 shrink-0 bg-brand"
                  : "mt-[0.7rem] block h-px w-3 shrink-0 bg-ink-faint"
              }
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Qualification() {
  return (
    <section
      aria-labelledby="qualification-heading"
      className="relative isolate overflow-hidden border-b border-border bg-background"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(66%_54%_at_92%_96%,rgba(158,216,68,0.16),transparent_62%)]"
      />

      <Shell className="py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-end lg:gap-14">
          <div>
            <p className="label-mono flex items-center gap-2.5 text-[rgba(244,245,242,0.85)]">
              <span aria-hidden className="block size-2 rounded-full bg-brand" />
              Who this is for
            </p>
            <h2
              id="qualification-heading"
              className="display mt-5 text-[clamp(1.9rem,4vw,3.25rem)] leading-[0.96] md:max-w-[16ch]"
            >
              The assessment does the qualifying.
            </h2>
          </div>

          {/* The revenue guidance sits with the heading rather than trailing
              the lists, where it read as a footnote nobody reaches. */}
          <p className="text-[0.9375rem] leading-relaxed text-ink-faint lg:pb-2">
            <span aria-hidden className="mark-x mb-4 block h-px w-10 bg-brand" />
            Roughly $1M to $10M in annual revenue is guidance rather than a gate.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
          <Panel
            label="Built for"
            heading="Companies ready to own a market"
            items={builtFor}
            accent
          />
          <Panel
            label="Not for"
            heading="Buyers we will point elsewhere"
            items={notFor}
          />
        </div>
      </Shell>
    </section>
  );
}
