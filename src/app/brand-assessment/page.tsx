import type { Metadata } from "next";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { BrandAssessmentForm } from "@/components/sections/brand-assessment-form";
import { Eyebrow, Measure, Shell } from "@/components/assessment/a-grid";
import { GradeSlotDiagram } from "@/components/assessment/d-grade-slot";
import { brandGrades } from "@/lib/bf-content";
import { siteConfig } from "@/lib/site-config";

/**
 * The Brand Assessment, rebuilt at /brand-assessment.
 *
 * SCOPE. Build Spec v2 section 5, rewritten in v2 specifically to separate 2
 * objects that must never be conflated: the public Brand Assessment, which
 * returns a GRADE, and the internal scoring engine, which returns a number
 * and lives in the sales console. This page is the public one.
 *
 * WHAT MAY NEVER APPEAR HERE, per spec section 5.2 and KEYWORD-RESEARCH 4.5:
 * the numeric score, the 6 components, the weights, or the normalization
 * method. Not in copy, not in metadata, not in schema, not in alt text, not
 * in a JSON payload. The words "Brand Score" appear nowhere on the public
 * site at all (SEO Guidelines 1.4). Nothing on this route breaks that, and
 * no future edit should either.
 *
 * KEYWORDS. KEYWORD-RESEARCH 4.5. Primary "brand assessment for home service
 * companies", descriptive rather than head volume, with "brand equity
 * assessment" and "how strong is my brand" as secondaries. The doc is
 * explicit that this is a conversion page first and a ranking page second,
 * and that "what is brand equity" belongs to a content hub article that
 * funnels here rather than to this page.
 *
 * ALIGNMENT. Every section uses the same Shell and the same left edge, and
 * body copy uses Measure inside it. This is the rule /about arrived at
 * after its own misalignment: several containers of different widths produce
 * several different left edges. There is 1 container on this page.
 *
 * OPEN CONFLICT, RAISED AND NOT RESOLVED. CLAUDE.md records it and this page
 * is where it becomes visible. KEYWORD-RESEARCH 4.5 requires the 4 grade
 * labels verbatim as "No Brand Equity, Name Recognition, Household Name,
 * Negative Brand Equity", and Build Spec v2 agrees. `src/lib/bf-content.ts`
 * still carries "Unknown" and "Negative Equity" from the older revision.
 * This page renders from bf-content, so it currently shows the older 2
 * labels. That is deliberate: the instruction is to raise the conflict with
 * Ryan and Alejandro, never to silently change the data. Fix bf-content once
 * and both this route and production correct together.
 *
 * SEO. Indexed, canonical /brand-assessment, in the sitemap. It owns the
 * primary keyword "brand assessment for home service companies" (SEO
 * Guidelines 3.2) and its schema URLs point at this route.
 */
export const metadata: Metadata = {
  title: { absolute: "Brand Assessment for Home Service Companies | TopServ" },
  description:
    "A brand equity assessment for home service companies. It returns 1 of 4 grades with what each means for your business, and the right next step. Never a number.",
  alternates: { canonical: "/brand-assessment" },
};

const URL = `${siteConfig.url}/brand-assessment`;

export default function BrandAssessmentPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Brand Assessment", href: "/brand-assessment" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Brand Assessment for Home Service Companies",
          url: URL,
          description:
            "A brand equity assessment for home service companies that returns 1 of 4 grades with what each means for the business.",
          about: { "@id": `${siteConfig.url}/#organization` },
        }}
      />

      {/* HERO. Copy left, the result graphic right, on the page's 1 grid. */}
      <section className="border-b border-border bg-background">
        <Shell className="pb-16 pt-28 md:pb-20 md:pt-32">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,52fr)_minmax(0,48fr)] lg:items-center lg:gap-14">
            <div>
              <Eyebrow>The assessment</Eyebrow>
              <h1 className="display mt-6 text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.02]">
                How strong is your brand<span className="text-brand">?</span>
              </h1>
              <Measure>
                <p className="mt-7 text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
                  Not how strong it feels. How strong it reads in your market.
                  This is a brand equity assessment for home service companies,
                  and it returns 1 of 4 honest answers about where you actually
                  stand.
                </p>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
                  Each grade comes with a consequence for how you should spend
                  your next marketing dollar. If the honest answer is fix
                  operations before marketing, that is the answer you get.
                </p>
              </Measure>
            </div>

            <GradeSlotDiagram />
          </div>
        </Shell>
      </section>

      {/* THE 4 GRADES. Every company in a market sits in exactly 1. */}
      <section aria-labelledby="grades-heading" className="border-b border-border bg-background">
        <Shell className="py-16 md:py-20">
          <Eyebrow>The 4 grades</Eyebrow>
          <h2
            id="grades-heading"
            className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
          >
            Every company in your market sits in exactly 1 of these.
          </h2>
          <Measure>
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
              Straight from the book. They are categories, not positions on a
              scale, which is why the answer is a grade and not a figure.
            </p>
          </Measure>

          <ol className="mt-10 grid gap-3 md:grid-cols-2">
            {brandGrades.map((g, i) => (
              <li key={g.grade}>
                <div className="flex h-full flex-col rounded-[16px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_62%)] p-6">
                  <span aria-hidden className="label-mono text-[0.6875rem] text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="display mt-4 text-[clamp(1.15rem,2vw,1.5rem)] leading-tight">
                    {g.grade}
                  </p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {g.meaning}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Shell>
      </section>

      {/* THE FORM. Same Shell, same left edge as everything above it. */}
      <section aria-labelledby="form-heading" className="bg-background">
        <Shell className="py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:gap-14">
            <div>
              <Eyebrow>Get your grade</Eyebrow>
              <h2
                id="form-heading"
                className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
              >
                Tell us where you compete.
              </h2>
              <Measure>
                <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
                  We read your brand the way your market reads it and send your
                  grade within 2 business days.
                </p>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
                  The optional details sharpen the grade and give the strategy
                  call a head start. Skip them and you still get a grade.
                </p>
              </Measure>
            </div>

            <BrandAssessmentForm />
          </div>
        </Shell>
      </section>
    </>
  );
}
