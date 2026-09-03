import { Reveal } from "@/components/motion/reveal";
import { AttentionCurve } from "@/components/visuals/attention-curve";

/**
 * The Problem beat (Build Spec v2, Home). The argument is not against
 * Google, PPC, SEO or Local Services Ads, which are tools we use. It is
 * against dependency, and the attention curve is what makes that visible
 * rather than asserted.
 */

const CONSEQUENCES = [
  {
    n: 1,
    when: "Stop paying",
    then: "The leads stop the same week. Nothing you built keeps working for you.",
  },
  {
    n: 2,
    when: "Lose rankings",
    then: "The phone slows, and a competitor you have never met takes the calls.",
  },
  {
    n: 3,
    when: "Competition rises",
    then: "Acquisition cost rises with it, every year, and you pay more for the same job.",
  },
] as const;

export function DependencyProblem() {
  return (
    <section aria-labelledby="problem-heading" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div>
          <Reveal>
            <p className="label-mono text-brand">The problem</p>
            <h2 id="problem-heading" className="display mt-3 text-4xl md:text-5xl">
              Being found is not enough anymore.
            </h2>
            <div className="mt-5 grid max-w-2xl gap-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                You can rank first, run ads, hold strong reviews and still lose
                the job. The homeowner opens 5 tabs, sees 5 companies that all
                look credible, and calls the 1 name that already feels familiar.
                That decision was made long before the search started.
              </p>
              <p>
                Rankings, PPC, Local Services Ads and purchased lead lists all
                do the same job. They capture demand that already exists. Not 1
                of them creates it, and not 1 of them makes you the company a
                homeowner thinks of first.
              </p>
            </div>
          </Reveal>
        </div>

        {/* The enemy, shown rather than asserted. */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
          <Reveal>
            <div>
              <h3 className="display text-3xl md:text-4xl">
                The enemy is <span className="text-brand">dependency</span>.
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Capture only marketing is rented. You are not building an asset,
                you are paying rent on attention that belongs to a platform.
                Here is what that costs you.
              </p>
              <ol className="mt-7 grid gap-3">
                {CONSEQUENCES.map((item) => (
                  <li
                    key={item.n}
                    className="flex gap-4 border-l-2 border-border pl-4 transition-colors hover:border-brand"
                  >
                    <span className="label-mono shrink-0 pt-1 text-ink-faint">
                      0{item.n}
                    </span>
                    <span>
                      <span className="block font-semibold">{item.when}</span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                        {item.then}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <AttentionCurve />
          </Reveal>
        </div>

        {/* The reframe. This is the sentence a visitor should be able to
            repeat to someone else after reading only this page. */}
        <Reveal delay={0.08}>
          <p className="display mt-16 max-w-5xl text-4xl leading-[1.05] md:text-6xl">
            Being found is not the same as being{" "}
            <span className="text-brand">chosen</span>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
