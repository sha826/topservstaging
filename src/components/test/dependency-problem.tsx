import { Reveal } from "@/components/motion/reveal";

/**
 * The Problem beat (Build Spec v2, Home). The argument is not against
 * Google, PPC, SEO or Local Services Ads, which are tools we use. It is
 * against dependency. The section closes on the reframe the whole site
 * turns on: being found is not the same as being chosen.
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
        <div className="max-w-3xl">
          <Reveal>
            <p className="label-mono text-brand">The problem</p>
            <h2 id="problem-heading" className="display mt-3 text-4xl md:text-5xl">
              Being found is not enough anymore.
            </h2>
            <div className="mt-6 grid gap-4 text-lg leading-relaxed text-muted-foreground">
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

        <Reveal delay={0.08}>
          <div className="mt-12 border-t border-border pt-10">
            <h3 className="display text-2xl md:text-3xl">
              The enemy is <span className="text-brand">dependency</span>.
            </h3>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Capture only marketing is rented. You are not building an asset,
              you are paying rent on attention that belongs to a platform. Here
              is what that costs you.
            </p>
          </div>
        </Reveal>

        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {CONSEQUENCES.map((item, i) => (
            <li key={item.n} className="h-full">
              <Reveal delay={Math.min(0.12 + i * 0.06, 0.3)} className="h-full">
                <div className="flex h-full flex-col gap-2 rounded-lg border border-border bg-card p-6">
                  <span className="label-mono text-ink-faint">0{item.n}</span>
                  <span className="display text-2xl">{item.when}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {item.then}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* The reframe. This is the sentence a visitor should be able to
            repeat to someone else after reading only this page. */}
        <Reveal delay={0.1}>
          <p className="display mt-12 max-w-4xl text-3xl leading-tight md:text-5xl">
            Being found is not the same as being{" "}
            <span className="text-brand">chosen</span>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
