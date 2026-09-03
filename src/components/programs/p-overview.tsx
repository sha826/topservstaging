import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { builtFor, equation, notFor } from "@/lib/bf-content";
import { Eyebrow, Shell } from "@/components/programs/p-grid";
import { ContentEngineDiagram } from "@/components/programs/diagrams/d-content-engine";
import { ForcedChoiceDiagram } from "@/components/programs/diagrams/d-forced-choice";
import { CreateCaptureDiagram } from "@/components/programs/diagrams/d-create-capture";

/**
 * Programs page 1, Overview.
 *
 * SCOPE. Build Spec v2 section 4 fixes the contents: a hero statement of 2
 * to 3 paragraphs positioning against lead generation agencies, SEO only
 * vendors and performance only media buyers; the BrandFormance visual with
 * no tactics listed; the Content Engine explanation; the who this is and is
 * not for columns from section 2; an embedded FAQ; and a CTA to see how
 * BrandFormance works in practice. All present.
 *
 * ARGUMENT. Argument Spine, /programs-pricing. Problem: you have to choose
 * between an agency that builds brand and one that drives leads, and
 * whichever you pick you lose the other half. Insight: that is the wrong
 * decision, not the wrong answer. Principle: 1 partner, 1 system, both
 * halves sized against each other. Proof: the Content Engine. Outcome: you
 * stop managing vendors and start running a system somebody else operates.
 *
 * THE DISQUALIFICATION IS THE ASSET. The spine is emphatic: "Who this is
 * not for belongs on this page, stated plainly. It is the highest
 * converting thing on it." KEYWORD-RESEARCH 4.4a agrees for a different
 * reason: it is unique, quotable content no competitor publishes. So it
 * gets equal weight with the qualifying list, never a greyed out footnote,
 * and both lists are verbatim from bf-content.ts.
 *
 * NO TACTICS IN THE EQUATION, per the spec. No channel names appear in that
 * block, and no prices appear anywhere: Programs page 4 owns those.
 */

const CSS = `
@keyframes p-drift { to { transform: scale(1.06); } }
@keyframes p-lit {
  0%, 2%    { opacity: 0; }
  9%, 24%   { opacity: 1; }
  32%, 100% { opacity: 0; }
}
@keyframes p-charge {
  0%       { opacity: 0; transform: translateY(-12%); }
  8%, 86%  { opacity: 1; }
  100%     { opacity: 0; transform: translateY(400%); }
}
@media (prefers-reduced-motion: no-preference) {
  .p-drift  { animation: p-drift 22s ease-in-out infinite alternate; }
  .p-lit    { animation: p-lit 5.7s linear infinite; }
  .p-charge { animation: p-charge 5.7s cubic-bezier(0.45, 0, 0.55, 1) infinite; }
}
`;

const VENDORS = [
  {
    kind: "The lead generation agency",
    good: "Fills the calendar this month.",
    missing:
      "Nothing compounds. Stop paying and the calendar empties, and the cost of each lead climbs every year as more companies bid for the same searches.",
  },
  {
    kind: "The SEO only vendor",
    good: "Wins the ranking.",
    missing:
      "Ranking first is not being chosen. The customer still sees 5 companies and picks the 1 name that already feels familiar.",
  },
  {
    kind: "The performance only media buyer",
    good: "Reports a clean number.",
    missing:
      "The number is clean because the ceiling is fixed. Capture can only collect demand that already exists, and nobody is raising it.",
  },
];

export function POverviewHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(64%_54%_at_12%_100%,rgba(158,216,68,0.13),transparent_62%)]"
      />
      <Shell className="py-16 md:py-20">
        {/* items-stretch, so the photograph is exactly as tall as the copy
            beside it and the 2 columns finish on the same line. */}
        <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,54fr)_minmax(0,46fr)] lg:gap-14">
          <div>
            <Eyebrow>What we are</Eyebrow>
            <h1 className="display mt-6 text-[clamp(1.8rem,3.05vw,2.75rem)] leading-[1.06]">
              A home services marketing agency that will not sell you half a
              system.
            </h1>

            <p className="mt-8 max-w-[58ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
              Most agencies make you choose. Brand or leads. The people who
              make you look credible, or the people who make the phone ring.
              That is the wrong decision, not the wrong answer.
            </p>
            <p className="mt-5 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
              TopServ Digital is a home service marketing agency built around 1
              system rather than 2 budgets. Brand creates the demand,
              performance captures it, and the same partner sizes the 2 halves
              against each other on 1 number. There is no handoff because there
              is no second vendor.
            </p>
            <p className="mt-5 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
              It makes us a difficult contractor marketing agency to compare on
              a spreadsheet, because the line items are not the product.
            </p>
          </div>

          {/* The Problem beat, drawn. The still life that used to sit here
              argued nothing; this alternates so the choice never resolves,
              which is the point the copy beside it is making. */}
          <ForcedChoiceDiagram />

        </div>
      </Shell>
    </section>
  );
}

/** The Problem beat: 3 vendors, each honest about half the job. */
export function PVendors() {
  return (
    <section aria-labelledby="p-vendors-heading" className="border-b border-border bg-background">
      <Shell className="py-16 md:py-20">
        <div className="max-w-[46rem]">
          <Eyebrow>What you have been sold</Eyebrow>
          <h2
            id="p-vendors-heading"
            className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
          >
            3 kinds of vendor, each good at half the job.
          </h2>
          <p className="mt-6 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
            Search for a marketing agency for contractors and you will meet all
            3. None of them is lying to you. Each is honest about what it does
            and quiet about what it cannot do, and the gap between them is the
            part you pay for twice.
          </p>
        </div>

        {/* Copy Framework 24: Create Demand / Capture Demand, showing both
            sides at once. The cards beneath are its text equivalent. */}
        <div className="mt-10">
          <CreateCaptureDiagram />
        </div>

        <ol className="mt-4 grid gap-4 lg:grid-cols-3">
          {VENDORS.map((v) => (
            <li key={v.kind}>
              <div className="flex h-full flex-col rounded-[18px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_62%)] p-6">
                <p className="text-[1.0625rem] font-semibold leading-snug">{v.kind}</p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-foreground">
                  <span className="label-mono mr-2 text-brand">Good at</span>
                  {v.good}
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  <span className="label-mono mr-2 text-ink-faint">What it leaves</span>
                  {v.missing}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Shell>
    </section>
  );
}

/** The Principle beat. Build Spec v2 section 4: no tactics listed here. */
export function PEquation() {
  return (
    <section aria-labelledby="p-equation-heading" className="border-b border-border bg-background">
      <Shell className="py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:gap-14">
          <div>
            <Eyebrow>What we sell instead</Eyebrow>
            <h2
              id="p-equation-heading"
              className="display mt-5 max-w-[15ch] text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
            >
              1 partner. 1 system. Both halves.
            </h2>
            <p className="mt-6 max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
              How much capture a company needs to buy is a function of how well
              its market already knows the name. That is a single decision,
              made once, and it cannot be made by 2 vendors who never speak.
            </p>
          </div>

          <dl className="relative overflow-hidden rounded-[20px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_58%,#0d1015_100%)] p-6 md:p-8">
            <style>{CSS}</style>
            <span
              aria-hidden
              className="absolute bottom-9 left-[2.1rem] top-9 w-px bg-[linear-gradient(180deg,rgba(244,245,242,0.06),rgba(158,216,68,0.5))] md:left-[2.6rem]"
            />
            <span
              aria-hidden
              className="p-charge absolute left-[1.98rem] top-9 h-[24%] w-[3px] rounded-full bg-[linear-gradient(180deg,transparent,var(--brand),transparent)] opacity-0 md:left-[2.48rem]"
            />

            {equation.map((row, i) => {
              const last = i === equation.length - 1;
              return (
                <div
                  key={row.term}
                  className={`relative flex gap-4 ${
                    i === 0
                      ? "pb-5"
                      : `border-t py-5 ${
                          last ? "border-brand/30" : "border-[rgba(244,245,242,0.08)]"
                        }`
                  } ${last ? "pb-0" : ""}`}
                >
                  <span
                    aria-hidden
                    className="p-lit pointer-events-none absolute inset-y-0 left-[-0.75rem] right-[-0.75rem] rounded-[10px] bg-[linear-gradient(90deg,rgba(158,216,68,0.16),transparent_78%)] opacity-0"
                    style={{ animationDelay: `${i * 1.9}s` }}
                  />
                  <span
                    aria-hidden
                    className={`relative z-10 mt-2.5 block size-2.5 shrink-0 rounded-full ${
                      last ? "bg-brand" : "bg-[rgba(158,216,68,0.45)]"
                    }`}
                  />
                  <div className="relative z-10">
                    <dt
                      className={`display text-[clamp(1.35rem,2.4vw,2rem)] uppercase leading-none ${
                        last ? "text-brand" : "text-foreground"
                      }`}
                    >
                      {row.term}
                    </dt>
                    <dd
                      className={`mt-2.5 text-[0.9375rem] md:text-base ${
                        last ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {row.does}
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </Shell>
    </section>
  );
}

/** The Proof beat: the Content Engine, which this site runs on itself. */
export function PEngine() {
  return (
    <section aria-labelledby="p-engine-heading" className="border-b border-border bg-background">
      <Shell className="py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:items-center lg:gap-14">
          <div>
            <Eyebrow>The content engine</Eyebrow>
            <h2
              id="p-engine-heading"
              className="display mt-5 max-w-[15ch] text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
            >
              1 shoot. 7 assets. Every week.
            </h2>
            <p className="mt-6 max-w-[44ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
              Frequency is what makes a brand familiar, and frequency is
              expensive if every asset is made from scratch. It is not
              expensive if 1 long form shoot produces the whole week.
            </p>
            <p className="mt-5 max-w-[44ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
              We run it on this site before we run it on anybody else&apos;s,
              which is the only honest way to sell it.
            </p>
          </div>

          <ContentEngineDiagram />
        </div>
      </Shell>
    </section>
  );
}

/** Build Spec v2 section 2, verbatim. Equal weight to both columns. */
export function PFit() {
  return (
    <section aria-labelledby="p-fit-heading" className="border-b border-border bg-background">
      <Shell className="py-16 md:py-20">
        <div className="max-w-[46rem]">
          <Eyebrow>Who this is for</Eyebrow>
          <h2
            id="p-fit-heading"
            className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
          >
            We would rather lose you here than in month 6.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
          <div className="rounded-[18px] border border-brand/35 bg-[linear-gradient(160deg,rgba(158,216,68,0.08),rgba(13,16,21,0.7)_62%)] p-6 md:p-7">
            <p className="label-mono text-brand">Built for</p>
            <h3 className="display mt-3 max-w-[16ch] text-[clamp(1.25rem,2vw,1.7rem)] leading-[1.06]">
              Companies ready to own a market
            </h3>
            <ul className="mt-6">
              {builtFor.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3.5 border-t border-[rgba(244,245,242,0.09)] py-3.5 text-[0.9375rem] leading-relaxed text-muted-foreground"
                >
                  <span aria-hidden className="mt-2 block size-1.5 shrink-0 bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[18px] border border-[#2b323c] bg-[#0d1015] p-6 md:p-7">
            <p className="label-mono text-ink-faint">Not for</p>
            <h3 className="display mt-3 max-w-[16ch] text-[clamp(1.25rem,2vw,1.7rem)] leading-[1.06]">
              Buyers we will point elsewhere
            </h3>
            <ul className="mt-6">
              {notFor.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3.5 border-t border-[rgba(244,245,242,0.09)] py-3.5 text-[0.9375rem] leading-relaxed text-muted-foreground"
                >
                  <span aria-hidden className="mt-[0.7rem] block h-px w-3 shrink-0 bg-ink-faint" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 max-w-[58ch] text-[0.9375rem] leading-relaxed text-ink-faint">
          Roughly $1M to $10M in annual revenue is guidance rather than a gate.
          The assessment does the qualifying, and a company that reads the right
          hand column and leaves has been served properly. There is a home
          services marketing company for every one of those buyers. It is not
          this one.
        </p>
      </Shell>
    </section>
  );
}

export function PCta() {
  return (
    <section
      aria-labelledby="p-cta-heading"
      className="relative isolate overflow-hidden border-t border-border bg-background"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(64%_54%_at_18%_100%,rgba(158,216,68,0.16),transparent_62%)]"
      />
      <Shell className="py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:gap-16">
          <div>
            <Eyebrow>Next step</Eyebrow>
            <h2
              id="p-cta-heading"
              className="display mt-5 max-w-[14ch] text-[clamp(1.9rem,3.6vw,3rem)] leading-[0.98]"
            >
              You know what we are. Now see how it runs.
            </h2>
          </div>
          <div>
            <p className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
              3 phases across the first year, what we do in each, and what you
              provide. If you would rather start with where your brand sits
              today, the assessment returns a grade in minutes.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/programs-pricing/how-it-works">
                  See how it works
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base">
                <Link href="/brand-assessment">Get Your Brand Grade</Link>
              </Button>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
