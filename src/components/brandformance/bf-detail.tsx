import Link from "next/link";
import { beforeAfter, threePhases } from "@/lib/bf-content";
import { Eyebrow, Shell } from "@/components/brandformance/bf-grid";

/**
 * The 4 supporting sections, all sourced from bf-content.ts.
 *
 * WHY THESE. The slider carries the 10 answers and nothing else, which left
 * the page at 1,340 words against SEO-GUIDELINES 5's 2,000 floor for this
 * page. Everything below is existing spec content that was not yet on the
 * page, so the gap closes without inventing copy:
 *
 *   Transformation   beforeAfter, Build Spec v2 section 1, "the
 *                    transformation the site sells". The Outcome beat of the
 *                    Argument Spine, which the page was missing.
 *   The first year   threePhases, Build Spec v2 section 4. Answer 09
 *                    summarises this in 1 sentence; this is the detail.
 *   What sets it     Build Spec v2 section 4, Programs page 4, the "What
 *                    sets the number" row, verbatim list.
 *
 * NO FIGURES, DELIBERATELY, AND A CONFLICT TO RAISE. KEYWORD-RESEARCH 4.2
 * says the cost answer here should state the floor. SEO-GUIDELINES 1.3 says
 * the floor and the activation "may appear only where the Pricing page spec
 * places them". The tighter rule wins until somebody rules otherwise, so
 * this section names what moves the price and links to Pricing without
 * printing either anchor. Alejandro should settle it.
 */

const CARD = "rounded-[14px] border border-[#2b323c] bg-[#0b0e13] p-5";

/** Build Spec v2 section 1. The Outcome beat. */
export function BfTransformation() {
  return (
    <section
      aria-labelledby="bf-transformation-heading"
      className="border-b border-border bg-background"
    >
      <Shell className="py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,34fr)_minmax(0,66fr)] lg:gap-14">
          <div>
            <Eyebrow>The transformation</Eyebrow>
            <h2
              id="bf-transformation-heading"
              className="display mt-5 max-w-[15ch] text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
            >
              What actually changes.
            </h2>
            <p className="mt-6 max-w-[40ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
              Posed as brand vs performance marketing, it looks like a budget
              choice. It is not. BrandFormance marketing changes your position
              in the market, and your cost base falls instead of climbing.
            </p>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-[#2b323c]">
            <div className="grid grid-cols-2 gap-px bg-[rgba(244,245,242,0.08)]">
              <p className="label-mono bg-[#0b0e13] px-5 py-3.5 text-ink-faint">
                Renting attention
              </p>
              <p className="label-mono bg-[#0b0e13] px-5 py-3.5 text-brand">
                Owning attention
              </p>
              {beforeAfter.map((row) => (
                <div key={row.before} className="contents">
                  <p className="bg-[#0b0e13] px-5 py-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {row.before}
                  </p>
                  <p className="bg-[linear-gradient(160deg,rgba(158,216,68,0.06),rgba(13,16,21,0.9))] px-5 py-4 text-[0.9375rem] leading-relaxed text-foreground">
                    {row.after}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

/** Build Spec v2 section 4, the 3 phases. Answer 09 only summarises these. */
export function BfPhases() {
  return (
    <section aria-labelledby="bf-phases-heading" className="border-b border-border bg-background">
      <Shell className="py-14 md:py-16">
        <div className="max-w-[42rem]">
          <Eyebrow>The first year</Eyebrow>
          <h2
            id="bf-phases-heading"
            className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
          >
            What the work looks like, month by month.
          </h2>
        </div>

        <ol className="mt-10 grid gap-4 lg:grid-cols-3">
          {threePhases.map((p) => (
            <li key={p.n}>
              <div className={`${CARD} flex h-full flex-col`}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="label-mono text-brand">
                    {String(p.n).padStart(2, "0")}
                  </span>
                  <span className="label-mono text-ink-faint">{p.timing}</span>
                </div>
                <p className="display mt-4 text-[clamp(1.15rem,1.7vw,1.4rem)] leading-[1.08]">
                  {p.name}
                </p>
                <div className="mt-5 grid gap-3.5 text-[0.875rem] leading-relaxed text-muted-foreground">
                  <p>{p.topserv}</p>
                  <p>{p.client}</p>
                </div>
                <dl className="mt-5 border-t border-[rgba(244,245,242,0.09)] pt-4 text-[0.875rem] leading-relaxed">
                  <dt className="label-mono text-brand">Progress</dt>
                  <dd className="mt-1.5 text-foreground">{p.progress}</dd>
                </dl>
              </div>
            </li>
          ))}
        </ol>
      </Shell>
    </section>
  );
}

/** Build Spec v2 section 4, Programs page 4, "What sets the number". */
const SETS = [
  "Market size",
  "Competitive saturation",
  "Current brand position",
  "Service area",
  "Video scope",
];

export function BfCost() {
  return (
    <section aria-labelledby="bf-cost-heading" className="border-b border-border bg-background">
      <Shell className="py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,34fr)_minmax(0,66fr)] lg:gap-14">
          <div>
            <Eyebrow>The investment</Eyebrow>
            <h2
              id="bf-cost-heading"
              className="display mt-5 max-w-[15ch] text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
            >
              What sets the number.
            </h2>
          </div>

          <div>
            <p className="max-w-[64ch] text-[1rem] leading-relaxed text-muted-foreground md:text-[1.0625rem]">
              There is no price table, and that is deliberate. A published tier
              invites a company to pick one before anybody has diagnosed
              anything, which is the exact behavior the assessment exists to
              prevent. It is also why the brand marketing vs performance
              marketing split cannot be priced from a menu: the balance between
              the 2 halves is different in every market. The assessment produces
              the scope. The scope produces the price. 5 things move it:
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {SETS.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-[#2b323c] bg-[#0b0e13] px-4 py-2 text-[0.875rem] text-muted-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>

            <p className="mt-7 max-w-[64ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
              No 2 companies in the same market price the same, because no 2
              start from the same brand position.{" "}
              <Link
                href="/programs-pricing/pricing"
                className="text-brand underline underline-offset-4"
              >
                How the program is priced
              </Link>{" "}
              sets out the floor and what it covers.
            </p>
          </div>
        </div>
      </Shell>
    </section>
  );
}
