import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Shell } from "@/components/programs/p-grid";
import { NoMenuDiagram } from "@/components/programs/diagrams/d-no-menu";
import { PriceInputsDiagram } from "@/components/programs/diagrams/d-price-inputs";

/**
 * Programs and Pricing 4: Pricing.
 *
 * THE MOST DOCTRINE SENSITIVE PAGE ON THE SITE. Build Spec v2 section 4 was
 * rewritten in v2 specifically for this page and says plainly: "Do not build
 * from the v1.0 price table." What it publishes is exactly 2 figures and
 * nothing else:
 *
 *   the floor        programs start at $1,000 per week, a floor rate to
 *                    manage the work, not a menu price
 *   the activation   a one time $10,000 in month 1, covering the 2 day video
 *                    shoot, travel, and the first month of build
 *
 * SEO Guidelines 1.3 permits the 2 anchors only where the Pricing page spec
 * places them, which is here and nowhere else on the site. Every other page
 * links here rather than quoting a number.
 *
 * WHAT NEVER APPEARS, on this page or any other: a monthly figure, an annual
 * figure, or a price table. The 48 and 52 week rule exists so nobody
 * publishes the wrong annual, and the resolution is that neither annual is
 * ever published. A monthly number invites a prospect to multiply by 12 and
 * be wrong in both directions.
 *
 * The rest is the spec's own rows: what sets the number, how the number is
 * reached, what it replaces, and when it is not a fit. The last of those
 * exists to disqualify price shoppers, and it is not softened.
 *
 * The Investment video belongs at the top of this page. It is not shot, so
 * there is no slot and no VideoObject. Its script changes under v2: it
 * explains why we price from scope, and it must not state a price.
 */

const ANCHOR_CSS = `
@keyframes pa-sweep { 0%, 100% { background-position: 0% 0; } 50% { background-position: 100% 0; } }
@keyframes pa-rule  { 0%, 100% { opacity: 0.35; transform: scaleX(0.82); } 50% { opacity: 1; transform: scaleX(1); } }
.pa-figure {
  background-image: linear-gradient(100deg, var(--brand) 0%, var(--brand-hot) 44%, var(--brand) 88%);
  background-size: 230% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
@media (prefers-reduced-motion: no-preference) {
  .pa-figure { animation: pa-sweep 9s ease-in-out infinite; }
  .pa-rule   { animation: pa-rule 4.2s ease-in-out infinite; transform-origin: left; }
}
`;

const NOT_FIT = [
  "You are shopping on price. There is always a cheaper number, and it buys the half of the system that already stopped working.",
  "You want tactics, not a system. A program assigned by diagnosis is the opposite of a menu you pick from.",
  "You are thinking in quarters. Brand equity compounds, and the first 2 quarters are where the compounding is paid for rather than collected.",
];

export function PPricingHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(64%_54%_at_12%_100%,rgba(158,216,68,0.13),transparent_62%)]"
      />
      <Shell className="py-16 md:py-20">
        <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,54fr)_minmax(0,46fr)] lg:gap-14">
          <div>
            <Eyebrow>The investment</Eyebrow>
            <h1 className="display mt-6 text-[clamp(1.85rem,3.75vw,3.375rem)] leading-[1.04]">
              Home service marketing pricing, without a price table.
            </h1>

            <p className="mt-8 max-w-[60ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
              We publish a floor and an activation, and nothing else. Not
              because the number is embarrassing, but because a published tier
              invites a company to pick one before anybody has diagnosed
              anything, which is the exact behavior the assessment exists to
              prevent.
            </p>
            <p className="mt-5 max-w-[60ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
              It would also fix a price against a scope we have not seen. No 2
              companies in the same market price the same, because no 2 start
              from the same brand position.
            </p>
          </div>

          {/* The artifact we refuse, struck through, against what we do
              publish. The Argument Spine calls the absence of a table the
              strongest line on this page, so it is drawn rather than
              mentioned. Not a single numeral appears in it. */}
          <NoMenuDiagram />

          </div>
      </Shell>
    </section>
  );
}

/** The only 2 published figures on the entire site. */
export function PAnchors() {
  return (
    <section aria-labelledby="p-anchors-heading" className="border-b border-border bg-background">
      <Shell className="py-16 md:py-20">
        <div className="max-w-[46rem]">
          <Eyebrow>What we publish</Eyebrow>
          <h2
            id="p-anchors-heading"
            className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
          >
            2 numbers, and they are both honest anchors.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[18px] border border-brand/35 bg-[linear-gradient(160deg,rgba(158,216,68,0.08),rgba(13,16,21,0.7)_62%)] p-7 md:p-8">
            <style>{ANCHOR_CSS}</style>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_10%_0%,rgba(158,216,68,0.16),transparent_66%)]"
            />
            <p className="label-mono relative text-brand">The floor</p>
            <p className="display pa-figure relative mt-4 text-[clamp(2.5rem,6.5vw,4.25rem)] leading-[0.94]">
              $1,000
            </p>
            <p className="relative mt-1 text-[1.0625rem] font-semibold text-foreground">
              per week
            </p>
            <span
              aria-hidden
              className="pa-rule relative mt-5 block h-px w-full max-w-[12rem] bg-brand/60"
            />
            <p className="relative mt-5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
              That is the floor rate to manage the work, not a menu price and
              not a tier. Programs start there and are sized from scope. It is
              the honest bottom of the range rather than a headline designed to
              get you on a call.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[18px] border border-[#2b323c] bg-[#0d1015] p-7 md:p-8">
            <p className="label-mono text-ink-faint">The activation</p>
            <p className="display mt-4 text-[clamp(2.5rem,6.5vw,4.25rem)] leading-[0.94]">
              $10,000
            </p>
            <p className="mt-1 text-[1.0625rem] font-semibold text-muted-foreground">
              one time, month 1
            </p>
            <span aria-hidden className="mt-5 block h-px w-full max-w-[12rem] bg-border" />
            <p className="mt-5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
              Charged in month 1. It covers the 2 day video shoot, the travel,
              and the first month of build. It is what turns a strategy
              document into assets that exist, and it happens once.
            </p>
          </div>
        </div>

        <p className="mt-8 max-w-[64ch] text-[0.9375rem] leading-relaxed text-ink-faint">
          You will not find a monthly figure or an annual one here, on a call,
          or in a proposal. A monthly number invites you to multiply by 12 and
          be wrong in both directions, because year 1 and every year after it
          bill differently. We will give you the real number for your program
          once there is a scope to attach it to.
        </p>
      </Shell>
    </section>
  );
}

/** How the number is reached, and what it replaces. */
export function PHowPriced() {
  return (
    <section aria-labelledby="p-howpriced-heading" className="border-b border-border bg-background">
      <Shell className="py-16 md:py-20">
        <div className="max-w-[46rem]">
          <Eyebrow>How the number is reached</Eyebrow>
          <h2
            id="p-howpriced-heading"
            className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
          >
            Diagnosis first. The price comes after.
          </h2>
        </div>

        <div className="mt-10">
          <PriceInputsDiagram />
        </div>

        <div className="mt-4 grid gap-4">
          <div className="rounded-[18px] border border-[#2b323c] bg-[#0d1015] p-6 md:p-7">
            <p className="label-mono text-ink-faint">What it replaces</p>
            <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
              A brand agency and a performance agency, or an internal hire and
              the vendors around them. We are not the cheapest line item
              available and we are not trying to be. We are 1 line that
              replaces several, held to 1 number.
            </p>
          </div>
        </div>
      </Shell>
    </section>
  );
}

export function PNotFit() {
  return (
    <section aria-labelledby="p-notfit-heading" className="border-b border-border bg-background">
      <Shell className="py-16 md:py-20">
        <div className="max-w-[46rem]">
          <Eyebrow>When it is not a fit</Eyebrow>
          <h2
            id="p-notfit-heading"
            className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
          >
            3 reasons to close this page.
          </h2>
          <p className="mt-6 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
            Said plainly, because finding out in month 4 costs you a year and
            costs us a reference.
          </p>
        </div>

        <ul className="mt-10 border-t border-[rgba(244,245,242,0.09)]">
          {NOT_FIT.map((t) => (
            <li
              key={t}
              className="flex max-w-[70ch] items-start gap-4 border-b border-[rgba(244,245,242,0.09)] py-4 text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base"
            >
              <span aria-hidden className="mt-[0.7rem] block h-px w-3 shrink-0 bg-ink-faint" />
              {t}
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}

export function PPricingCta() {
  return (
    <section
      aria-labelledby="p-pricing-cta-heading"
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
              id="p-pricing-cta-heading"
              className="display mt-5 text-[clamp(1.9rem,3.6vw,3rem)] leading-[0.98]"
            >
              The number starts with a diagnosis.
            </h2>
          </div>
          <div>
            <p className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
              The Brand Assessment reads how well your market actually knows
              you and returns a grade. The grade sets the conversation, the
              full assessment produces the scope, and the scope produces the
              price.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/brand-assessment">
                  Get Your Brand Grade
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base">
                <Link href="/programs-pricing/success-stories">See the success stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
