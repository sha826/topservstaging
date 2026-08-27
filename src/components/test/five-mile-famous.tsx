import { Reveal } from "@/components/motion/reveal";

/**
 * The Transformation beat (Build Spec v2, Home): from invisible to
 * Five-Mile-Famous. The concept is local market familiarity, not national
 * fame. A homeowner should recognize the company before anything breaks, so
 * the search confirms a decision rather than starting one.
 *
 * Entity naming follows SEO Guidelines section 3.7: Five-Mile-Famous, spelled
 * this way every time.
 */

const MOMENTS = [
  "An AC dies in July",
  "A pipe bursts at 11pm",
  "A roof starts leaking after a storm",
  "A panel trips and will not reset",
] as const;

export function FiveMileFamous() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
      <Reveal>
        <div className="grid gap-4 text-lg leading-relaxed text-muted-foreground">
          <p>
            You do not need to be famous everywhere. You need to be famous
            where you make money. A home service company does not win by
            reaching the whole country. It wins by being the name the right
            homeowners in the right service area already recognize.
          </p>
          <p>
            That is what we call becoming Five-Mile-Famous. Own 1 zone
            properly, at a frequency you can sustain, then take the next 1. It
            is the difference between buying attention this month and owning
            familiarity that keeps paying after the invoice stops.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="rounded-lg border border-border bg-card p-7 md:p-8">
          <h3 className="display text-2xl">When the moment arrives</h3>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Roughly 5 percent of homeowners need a contractor this week. Every
            competitor fights over them. The other 95 percent will need 1
            eventually, and whoever they already know wins that job before it
            exists.
          </p>
          <ul className="mt-6 grid gap-2.5">
            {MOMENTS.map((moment) => (
              <li
                key={moment}
                className="flex items-baseline gap-3 text-base text-foreground"
              >
                <span aria-hidden className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" />
                {moment}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-border pt-5 text-base font-semibold leading-relaxed">
            The search should confirm the decision, not introduce you for the
            first time.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
