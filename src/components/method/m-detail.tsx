import Image from "next/image";
import Link from "next/link";
import { Eyebrow, Shell } from "@/components/method/m-grid";

/**
 * The canonical definition of Five-Mile-Famous.
 *
 * KEYWORD-RESEARCH 5 assigns "five mile famous" to the Method page, and SEO
 * Guidelines 12.2 requires the same treatment BrandFormance gets on its own
 * page: a 40 to 60 word quotable definition, written once, kept stable,
 * marked with DefinedTerm and reused verbatim wherever the site defines it.
 *
 * 53 words. The gist is documented (SEO Guidelines: "famous where you make
 * money, not everywhere") and the spelling of the term is fixed by SEO
 * Guidelines 7's entity list: Five-Mile-Famous, hyphenated. The sentence
 * itself is written for this page and is not lifted from a document.
 */
export const FMF_DEFINITION =
  "Five-Mile-Famous is brand recognition concentrated inside the geography a company actually serves. Not famous everywhere, famous where the work is. When a name is already familiar within that radius, it is chosen before the search begins, and the cost of winning each job falls instead of climbing.";

export function MFiveMile() {
  return (
    <section aria-labelledby="m-fmf-heading" className="border-b border-border bg-background">
      <Shell className="py-14 md:py-16">
        <div className="rounded-[20px] border border-brand/30 bg-[linear-gradient(160deg,rgba(158,216,68,0.07),rgba(13,16,21,0.7)_60%)] p-7 md:p-10">
          <h2 id="m-fmf-heading" className="label-mono text-brand">
            Five-Mile-Famous
          </h2>
          <p className="mt-6 max-w-[46ch] text-[clamp(1.1rem,1.9vw,1.5rem)] font-semibold leading-[1.35] tracking-[-0.01em] text-foreground">
            {FMF_DEFINITION}
          </p>
          <p className="mt-6 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-faint">
            It is the outcome the 6 stages exist to produce, and it is why
            geography is the variable in a program while frequency is not.
          </p>
        </div>
      </Shell>
    </section>
  );
}


/**
 * Why a system rather than a plan.
 *
 * This is the Argument Spine's False Assumption beat for this page: a
 * methodology is marketing language for the same work everyone else does.
 * It is also where the documented secondaries live, because they are what
 * this section is actually about: home service marketing strategy, a
 * marketing system for home service companies, an HVAC marketing plan, and
 * demand generation vs demand capture (KEYWORD-RESEARCH 4.3).
 *
 * A demand generation and demand capture pair sat here in an earlier pass
 * and was removed: stages 03 and 04 are those 2 jobs, so it was the same
 * content told twice.
 *
 * THE PHOTOGRAPH. A production studio: an ordered wall grid, a run of
 * identical sheets laid out in sequence, a finished stack. It carries the
 * argument the section makes, which is repeatability, and it is the studio
 * the work is made in rather than anything from the client's world. No
 * people, no legible text, no logos. Local file, no runtime dependency on
 * any generator.
 */
export function MSystem() {
  return (
    <section aria-labelledby="m-system-heading" className="border-b border-border bg-background">
      <Shell className="py-14 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:gap-14 xl:gap-16">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[18px] lg:aspect-[4/5]">
            <Image
              src="/images/method/production-run.webp"
              alt="A production studio: an ordered grid of cards on the wall, a run of identical printed sheets laid out in sequence on the table, and a stack of finished editions."
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <Eyebrow>Why a method at all</Eyebrow>
            <h2
              id="m-system-heading"
              className="display mt-5 max-w-[16ch] text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
            >
              A plan is a list. A system decides.
            </h2>
            <p className="mt-6 max-w-[64ch] text-[1rem] leading-relaxed text-muted-foreground md:text-[1.0625rem]">
              Most companies do not lack a home service marketing strategy.
              They have one, and it is a list. An HVAC marketing plan usually
              names the channels for the next quarter, sets a budget against
              each, and leaves the hard question unanswered: what runs, where,
              at what frequency, and in what order. A marketing plan for HVAC
              company growth names the tactics. It does not decide between
              them.
            </p>
            <p className="mt-4 max-w-[64ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
              A marketing system for home service companies answers that
              question the same way every month, and can be checked when it
              does not. That is the whole difference between the 6 stages below
              and a plan you rewrite every time results disappoint. A plan
              changes when the number moves. A system explains why the number
              moved before you change anything.
            </p>

            <p className="mt-6 max-w-[64ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
              Demand generation vs demand capture is not a choice between 2
              budgets. Capture has a ceiling set by the demand that already
              exists, and generation is what raises the ceiling. Run capture
              alone and the cost of each job climbs every year as more
              companies bid for the same finite set of searches.
            </p>
          </div>
        </div>
      </Shell>
    </section>
  );
}

/**
 * The Proof beat.
 *
 * ARGUMENT SPINE, /method: "Every stage names its metric. Cost per booked
 * call falls across twelve months. That is the claim we are held to." The
 * spec puts the same sentence in section 4: cost per booked call is the
 * headline number. No figure appears, because none is published.
 */
export function MMetric() {
  return (
    <section aria-labelledby="m-metric-heading" className="border-b border-border bg-background">
      <Shell className="py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,34fr)_minmax(0,66fr)] lg:gap-14">
          <div>
            <Eyebrow>The measurement</Eyebrow>
            <h2
              id="m-metric-heading"
              className="display mt-5 max-w-[15ch] text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
            >
              1 number we are held to.
            </h2>
          </div>
          <div>
            <p className="max-w-[64ch] text-[1rem] leading-relaxed text-muted-foreground md:text-[1.0625rem]">
              Cost per booked call. Not impressions, not clicks, not rankings.
              1 number applied to brand and performance together, because a
              system that measures its halves separately can always show you a
              winning half while the business stands still.
            </p>
            <p className="mt-4 max-w-[64ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
              It falls across 12 months as brand equity builds, while the phone
              gets busier. That is the claim, and it is falsifiable, which is
              the point of publishing it rather than a dashboard.{" "}
              <Link
                href="/programs-pricing/what-this-delivers"
                className="text-brand underline underline-offset-4"
              >
                What this delivers
              </Link>{" "}
              sets out what improves in the first 90 days and what does not
              happen in the first 30.
            </p>
          </div>
        </div>
      </Shell>
    </section>
  );
}
