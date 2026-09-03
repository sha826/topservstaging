import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Shell } from "@/components/programs/p-grid";
import { CostDirectionCards } from "@/components/programs/diagrams/d-cost-curve";
import { DashboardVsNumberDiagram } from "@/components/programs/diagrams/d-dashboard-vs-number";
import { OwnerShiftDiagram } from "@/components/programs/diagrams/d-owner-shift";
import { NinetyRailDiagram } from "@/components/programs/diagrams/d-ninety-rail";

/**
 * Programs and Pricing 3: What This Delivers.
 *
 * SCOPE. Build Spec v2 section 4, Programs page 3: "a business impact page,
 * not a teaching page". It opens with a reality check on what does NOT
 * happen in the first 30 days, then what improves in the first 90, specific
 * and defensible, with no revenue guarantee. Then why branded demand
 * converts better than unbranded, then cost per booked call as the claim we
 * are held to, then what changes for the owner. That order is the spec's.
 *
 * ARGUMENT. Argument Spine, /programs-pricing/what-this-delivers. Problem:
 * you have been promised results before and got a dashboard instead. False
 * assumption: good marketing shows results in 30 days. Insight: the timeline
 * is not a hedge, it is physics. Outcome: the same budget produces more,
 * instead of costing more every year to stand still.
 *
 * NO NUMBERS ARE INVENTED. Nothing here states a revenue figure, a
 * percentage or a multiple. The only quantity is time, which the spec
 * supplies, and cost per booked call is named as a direction rather than a
 * value. The Outcomes video the spec places here is not shot, so there is no
 * slot and no VideoObject.
 */

const NOT_YET = [
  "A flood of booked jobs. Familiarity has not been built yet, and capture alone is the thing that already stopped working.",
  "A cheaper cost per booked call. It moves as brand equity builds, and in month 1 there is none to speak of.",
  "A finished library. The first shoot is 1 shoot. The compounding starts when the run does.",
  "A verdict. 30 days is long enough to know the work is happening and far too short to know what it produced.",
];

export function PDeliversHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(64%_54%_at_12%_100%,rgba(158,216,68,0.13),transparent_62%)]"
      />
      <Shell className="py-16 md:py-20">
        <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,54fr)_minmax(0,46fr)] lg:gap-14">
          <div>
            <Eyebrow>What this delivers</Eyebrow>
            <h1 className="display mt-6 text-[clamp(1.85rem,3.9vw,3.5rem)] leading-[1.03]">
              Marketing results for home service companies, stated in the order
              they arrive.
            </h1>

            <p className="mt-8 max-w-[60ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
              You have been promised results before and got a dashboard
              instead. So this page starts with what does not happen, then what
              does, then the 1 number we are held to. No revenue guarantee
              appears anywhere on it, because we cannot honestly make one.
            </p>
            <p className="mt-5 max-w-[60ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
              The timeline is not a hedge. Brand equity compounds, and anyone
              promising revenue in 30 days is selling capture, which is the
              thing you already have and which already stopped working.
            </p>
          </div>

          {/* The Problem beat, drawn: a dashboard against the 1 number.
              Neither side carries a value, because inventing one would be
              the fabricated evidence IMAGE-GUIDELINES 4.1 forbids. */}
          <DashboardVsNumberDiagram />

        </div>
      </Shell>
    </section>
  );
}

/** Said first, per the spec. */
export function PNotYet() {
  return (
    <section aria-labelledby="p-notyet-heading" className="border-b border-border bg-background">
      <Shell className="py-16 md:py-20">
        <div className="max-w-[46rem]">
          <Eyebrow>The first 30 days</Eyebrow>
          <h2
            id="p-notyet-heading"
            className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
          >
            4 things that will not have happened yet.
          </h2>
          <p className="mt-6 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
            We would rather set this expectation now than manage a
            disappointment in month 2.
          </p>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {NOT_YET.map((t, i) => (
            <li key={t}>
              <div className="flex h-full gap-4 rounded-[18px] border border-[#2b323c] bg-[#0d1015] p-6">
                <span
                  aria-hidden
                  className="label-mono mt-0.5 shrink-0 text-[0.6875rem] text-ink-faint"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{t}</p>
              </div>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}

export function PNinety() {
  return (
    <section aria-labelledby="p-ninety-heading" className="border-b border-border bg-background">
      <Shell className="py-16 md:py-20">
        <div className="max-w-[46rem]">
          <Eyebrow>The first 90 days</Eyebrow>
          <h2
            id="p-ninety-heading"
            className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
          >
            4 things that should be true, and are checkable.
          </h2>
        </div>

        <div className="mt-10">
          <NinetyRailDiagram />
        </div>
      </Shell>
    </section>
  );
}

/**
 * Why branded demand converts better, and the number itself.
 *
 * Reorganised to cards. The 2 directions carry small sparklines rather than
 * 1 large plot, and the prose under each is cut to the claim: the long
 * paragraphs that used to sit beside the chart repeated what the shapes
 * already showed.
 */
export function PNumber() {
  return (
    <section aria-labelledby="p-number-heading" className="border-b border-border bg-background">
      <Shell className="py-16 md:py-20">
        <div className="max-w-[46rem]">
          <Eyebrow>The number</Eyebrow>
          <h2
            id="p-number-heading"
            className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
          >
            Cost per booked call, falling across 12 months.
          </h2>
          <p className="mt-6 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
            Branded demand converts better than unbranded. Somebody who
            already recognizes the name books faster, negotiates less and
            accepts a higher ticket, because the comparison happened before
            the search did.
          </p>
        </div>

        {/* IMAGE-GUIDELINES 4.4: this sits beside the claim we are held to,
            so it carries no value of any kind. */}
        <div className="mt-10">
          <CostDirectionCards />
        </div>

        <div className="mt-4 rounded-[16px] border border-[#2b323c] bg-[#0d1015] p-5 md:p-6">
          <p className="label-mono text-ink-faint">Why we publish it</p>
          <p className="mt-3 max-w-[74ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
            Because it is falsifiable. A dashboard of impressions cannot be
            wrong. A single number applied to brand and performance together,
            tracked across 12 months, can be. Branded search and direct
            navigation are reported next to it rather than in a separate deck.
          </p>
        </div>
      </Shell>
    </section>
  );
}

export function POwner() {
  return (
    <section aria-labelledby="p-owner-heading" className="border-b border-border bg-background">
      <Shell className="py-16 md:py-20">
        <div className="max-w-[46rem]">
          <Eyebrow>What changes for you</Eyebrow>
          <h2
            id="p-owner-heading"
            className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
          >
            The same budget produces more, instead of costing more to stand
            still.
          </h2>
          <p className="mt-6 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
            None of this is a revenue promise. It is a change in what the week
            actually asks of you, which is the part an owner feels before the
            number moves.
          </p>
        </div>

        <div className="mt-10">
          <OwnerShiftDiagram />
        </div>
      </Shell>
    </section>
  );
}

export function PDeliversCta() {
  return (
    <section
      aria-labelledby="p-del-cta-heading"
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
              id="p-del-cta-heading"
              className="display mt-5 text-[clamp(1.9rem,3.6vw,3rem)] leading-[0.98]"
            >
              You know what it produces. Now understand the investment.
            </h2>
          </div>
          <div>
            <p className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
              There is no price table, and there is a reason for that. The next
              page sets out the floor, what the activation covers, and the 5
              things that move the number.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/programs-pricing/pricing">
                  Understand the investment
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
