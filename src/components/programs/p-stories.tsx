import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Shell } from "@/components/programs/p-grid";
import { ConversionPathDiagram } from "@/components/programs/diagrams/d-conversion-path";
import { GrowthBarsDiagram } from "@/components/programs/diagrams/d-growth-bars";

/**
 * Programs and Pricing 5: Success Stories.
 *
 * SCOPE. Build Spec v2 section 4, Programs page 5: the 6 client outcomes,
 * "clarity, confidence, margin and sales velocity alongside revenue", 2 to 3
 * client conversation videos at 3 to 5 minutes, and a final CTA to schedule
 * a call.
 *
 * ARGUMENT. Argument Spine section 8. Problem: every agency has case studies
 * and they all say the same thing about traffic. False assumption: results
 * are proof. Insight: a number without a starting position is not proof.
 * Principle: every story shows brand lift and performance lift together,
 * because either alone is the thing we argue against. Outcome: a visitor
 * recognizes their own business in at least 1 of these before the bottom.
 *
 * NAMES. Spec section 15, Decision 1 is unresolved, owners Ryan and JB. The
 * spine's instruction is explicit: "write this page structurally with
 * placeholders and do not let it hold up the other seven. At minimum assume
 * market and outcome without company names." That is what ships. The single
 * NAMES_CLEARED flag lives in the growth diagram.
 *
 * WHAT IS DELIBERATELY NOT HERE. The 7 part narratives are named and their
 * structure is published, but no narrative is written, because writing 6 of
 * them would mean inventing situation, strategy and brand outcome detail
 * nobody has supplied. SEO Guidelines 9.2 wants first party evidence with
 * starting context, not plausible prose. Alejandro owns that copy. The
 * client conversation videos are not shot, so there is no slot and no
 * VideoObject, matching every other page in this hub.
 *
 * SCHEMA. KEYWORD-RESEARCH 4.4e: mark each finished story as an Article, and
 * never fake Review or AggregateRating on self published case studies. No
 * story is finished, so no Article schema is emitted yet either.
 */

/** Spec v2 section 4: shown alongside revenue, never revenue alone. */
const BEYOND_REVENUE = [
  {
    k: "Clarity",
    v: "The owner can say what the company stands for in a sentence, and so can the team. That is what makes every asset after it consistent.",
  },
  {
    k: "Confidence",
    v: "Spend decisions stop being a quarterly argument, because the system explains the number before anybody changes it.",
  },
  {
    k: "Margin",
    v: "Branded demand arrives with less resistance, at a higher ticket, which shows up in what the company can charge rather than only in what it books.",
  },
  {
    k: "Sales velocity",
    v: "Recognition shortens the distance between a first call and a signed job, because the comparison happened before the search did.",
  },
];

/** The 7 parts, in the spine's order. The same 7 every time, so they compare. */
const STRUCTURE = [
  { k: "Situation", v: "What the company was before, in its own market, with its own numbers." },
  { k: "Brand problem", v: "What was actually wrong. Not the channel that underperformed, the reason it did." },
  { k: "Strategy", v: "What we decided to do about it, and what we decided not to do." },
  { k: "Demand creation", v: "What was built and how often it ran, across how much geography." },
  { k: "Demand capture", v: "What was set up to collect the demand once it existed." },
  { k: "Business outcome", v: "Revenue against its starting position, with the time it took." },
  { k: "Brand outcome", v: "Branded search, direct navigation and market recognition, reported next to the revenue rather than instead of it." },
];

export function SHero() {
  return (
    <section className="border-b border-border bg-background">
      <Shell className="py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:gap-14">
          <div>
            <Eyebrow>The proof</Eyebrow>
            <h1 className="display mt-5 text-[clamp(1.9rem,4.4vw,3.1rem)] leading-[1.02]">
              Home service marketing case studies, told with the starting
              number attached<span className="text-brand">.</span>
            </h1>
          </div>
          <div className="lg:pt-4">
            <p className="text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
              Every agency has case studies and they all say the same thing
              about traffic. Results are not proof. A number without a
              starting position is not proof either: 43 percent more traffic
              tells you nothing about whether the phone rang, or what the
              company looked like before anybody touched it.
            </p>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
              So every story here starts where the company started. Same 7
              parts, same order, every time, which is what makes 1 of them
              comparable to the next and to your own business.
            </p>
          </div>
        </div>
      </Shell>
    </section>
  );
}

/** The Proof beat: 6 outcomes, each with its starting position. */
export function SResults() {
  return (
    <section aria-labelledby="s-results-heading" className="border-b border-border bg-background">
      <Shell className="py-16 md:py-20">
        <div className="max-w-[46rem]">
          <Eyebrow>6 companies</Eyebrow>
          <h2
            id="s-results-heading"
            className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
          >
            Where each one started, and where it is now.
          </h2>
          <p className="mt-6 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
            These are home service companies in real markets, not composites.
            The growth took years, not quarters, and the time it took is part
            of the claim rather than a footnote to it.
          </p>
        </div>

        <div className="mt-10">
          <GrowthBarsDiagram />
        </div>
      </Shell>
    </section>
  );
}

/** Spec v2: clarity, confidence, margin and sales velocity beside revenue. */
export function SBeyondRevenue() {
  return (
    <section aria-labelledby="s-beyond-heading" className="border-b border-border bg-background">
      <Shell className="py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,38fr)_minmax(0,62fr)] lg:gap-14">
          <div>
            <Eyebrow>Alongside the revenue</Eyebrow>
            <h2
              id="s-beyond-heading"
              className="display mt-5 max-w-[15ch] text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
            >
              Revenue is the headline. It is not the whole result.
            </h2>
            <p className="mt-6 max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
              A company can buy revenue for a year. What it cannot buy in a
              year is a market that already knows the name, and these are the
              things that change when it does.
            </p>
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            {BEYOND_REVENUE.map((b) => (
              <div
                key={b.k}
                className="rounded-[16px] border border-[#2b323c] bg-[#0b0e13] p-5"
              >
                <dt className="label-mono text-brand">{b.k}</dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {b.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Shell>
    </section>
  );
}

/** The differentiator the spine asks for: the same 7 parts, every time. */
export function SStructure() {
  return (
    <section aria-labelledby="s-structure-heading" className="border-b border-border bg-background">
      <Shell className="py-16 md:py-20">
        <div className="max-w-[46rem]">
          <Eyebrow>How every story is told</Eyebrow>
          <h2
            id="s-structure-heading"
            className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
          >
            The same 7 parts, in the same order, every time.
          </h2>
          <p className="mt-6 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
            A case study you cannot compare to another one is an
            advertisement. Fixing the structure is what makes these
            comparable, and it is also what stops us from quietly leaving out
            the part that went badly.
          </p>
        </div>

        <ol className="mt-10 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {STRUCTURE.map((s, i) => (
            <li
              key={s.k}
              className="flex h-full flex-col rounded-[16px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_62%)] p-5"
            >
              <span
                aria-hidden
                className="label-mono flex size-8 items-center justify-center rounded-[8px] bg-[rgba(158,216,68,0.22)] text-[0.6875rem] text-[rgba(244,245,242,0.75)]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-[1.0625rem] font-semibold leading-snug">{s.k}</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                {s.v}
              </p>
            </li>
          ))}
        </ol>
      </Shell>
    </section>
  );
}

/**
 * Final CTA. The spine fixes this one: schedule a call.
 *
 * Build Spec v2 section 4 also fixes it for this page, so the primary action
 * is the call rather than the assessment, even though the conversion path
 * puts the assessment first. Both are offered and the path beside them
 * explains the order, which is the honest way to run 2 buttons without
 * turning them into the "twelve competing calls to action" section 3 warns
 * against.
 *
 * The heading no longer asserts that the visitor read all 5 pages. Plenty of
 * people will land here from search on "home service marketing case studies"
 * and never see the other 4, and telling them what they just did is the kind
 * of small dishonesty the whole page argues against.
 */
export function SCta() {
  return (
    <section aria-labelledby="s-cta-heading" className="relative isolate overflow-hidden bg-background">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_52%_at_16%_100%,rgba(158,216,68,0.14),transparent_62%)]"
      />
      <Shell className="py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,52fr)_minmax(0,48fr)] lg:items-center lg:gap-14">
          <div>
            <Eyebrow>Where this goes next</Eyebrow>
            <h2
              id="s-cta-heading"
              className="display mt-5 max-w-[18ch] text-[clamp(1.7rem,3.2vw,2.6rem)] leading-[1.02]"
            >
              The next step is a conversation, not another page
              <span className="text-brand">.</span>
            </h2>
            <p className="mt-6 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
              If 1 of these looked like your business, that is the point of
              publishing them. A call is where we find out whether it actually
              is, and what your market would take.
            </p>
            <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink-faint">
              If you would rather know where you stand before you talk to
              anybody, the assessment comes first and returns a grade.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="text-base">
                <a href="https://book.topservdigital.com">
                  Schedule a call
                  <ArrowRight aria-hidden className="ml-1 size-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base">
                <Link href="/brand-assessment">Get your Brand Grade first</Link>
              </Button>
            </div>
          </div>

          {/* Build Spec v2 section 3, the conversion path, with this page at
              the end of step 2 and the next step lit. */}
          <ConversionPathDiagram />
        </div>
      </Shell>
    </section>
  );
}
