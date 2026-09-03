import { Reveal } from "@/components/motion/reveal";
import { MarketSaturation } from "@/components/visuals/market-saturation";

/**
 * The Transformation beat (Build Spec v2, Home): from invisible to
 * Five-Mile-Famous. The concept is local market familiarity, not national
 * fame, so the service area map carries it better than a paragraph can.
 *
 * Kept short on purpose. This is a home page beat, not the Method page: the
 * argument is 2 short paragraphs, the 5 and 95 split, and the line the
 * section exists to land. The map does the rest of the work.
 *
 * Entity naming follows SEO Guidelines 3.7: Five-Mile-Famous, spelled this
 * way every time.
 */

const MOMENTS = [
  "An AC dies in July",
  "A pipe bursts at 11pm",
  "A roof leaks after a storm",
  "A panel will not reset",
] as const;

export function FiveMileFamous() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
      <Reveal>
        <div>
          <div className="grid gap-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              You do not need to be famous everywhere. You need to be famous
              where you make money: the name homeowners in your service area
              already recognize before they go looking.
            </p>
            <p>
              Own 1 zone at a frequency you can sustain, then take the next. It
              is the difference between renting attention this month and owning
              familiarity that keeps paying after the invoice stops.
            </p>
          </div>

          <div className="mt-7 border-t border-border pt-6">
            <p className="text-base leading-relaxed text-muted-foreground">
              5 percent of homeowners need a contractor this week, and every
              competitor is fighting over them. The other 95 percent will need
              1 eventually.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {MOMENTS.map((moment) => (
                <li
                  key={moment}
                  className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground"
                >
                  {moment}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg font-semibold leading-relaxed">
              The search should confirm the decision, not introduce you.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <MarketSaturation />
      </Reveal>
    </div>
  );
}
