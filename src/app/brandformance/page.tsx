import type { Metadata } from "next";
import { BreadcrumbJsonLd, FAQJsonLd, JsonLd } from "@/components/seo/json-ld";
import { BfQuestions } from "@/components/brandformance/bf-questions";
import { BfCta } from "@/components/brandformance/bf-cta";
import { BfDefinition, BfHero, BF_DEFINITION } from "@/components/brandformance/bf-hero";
import {
  BfCost,
  BfPhases,
  BfTransformation,
} from "@/components/brandformance/bf-detail";
import { BfProof } from "@/components/brandformance/bf-proof";
import { tenQuestions } from "@/lib/bf-content";
import { siteConfig } from "@/lib/site-config";

/**
 * BrandFormance, served at /brandformance.
 *
 * SCOPE. Build Spec v2 section 3: "the definitive resource for the term".
 * Section 4 fixes the content: it answers 10 questions in order, and carries
 * the What Is BrandFormance video. Both are honoured exactly. The order of
 * the questions is the spec's and is not rearranged for design.
 *
 * ARGUMENT. Argument Spine, /brandformance. Problem: every agency sells the
 * same tools under different names. False assumption: marketing is a set of
 * channels I buy. Insight: channels are components, the missing thing is the
 * operating system. Principle: BrandFormance is that system. Proof: it has a
 * name, a method, a measurement standard and a book. Outcome: you stop
 * renting attention and start owning it. CTA: see the method.
 *
 * KEYWORDS. Primary "brandformance" (KEYWORD-RESEARCH 4.2), carried in the
 * title, the H1, the first 100 words, an H2 and the slug. Every documented
 * secondary and supporting term is present in the body copy and was verified
 * against the rendered HTML, not assumed: brandformance marketing, what is
 * brandformance, brand vs performance marketing, brand marketing vs
 * performance marketing, brandformance for home services, performance
 * branding, demand creation, demand capture.
 *
 * THE 10 QUESTIONS. On the page, in the spec's order, as a horizontal
 * slider of 10 cards, 3 at a time. Question and answer are verbatim from
 * bf-content.ts, which is the same source the production /brandformance
 * page renders, so the 2 pages carry identical copy for all 10.
 *
 * Because the questions are visible again, the page is back in line with
 * KEYWORD-RESEARCH 4.2 (each answer under an H2 written as the question)
 * and SEO-GUIDELINES 7 (FAQPage schema for the 10), and both are restored
 * here. An earlier pass had to override both.
 *
 * THE DEFINITION. SEO Guidelines 12.2 requires a 40 to 60 word quotable
 * definition at the top, marked with DefinedTerm and reused verbatim. There
 * is exactly 1 string, BF_DEFINITION, and it feeds the visible block, the
 * DefinedTerm description and the OG description. At promotion it also goes
 * into bf-content.ts and llms.txt.
 *
 * NOT HERE, ON PURPOSE. No prices beyond a link to the Pricing page, which
 * owns the floor and the activation. No brand grade labels: /brand-assessment
 * owns those, and the label set is still open between the 2 v2 revisions.
 *
 * THE VIDEO. Build Spec v2 section 4 puts the What Is BrandFormance video on
 * this page. It is not shot yet, so there is no slot and no VideoObject: an
 * empty frame promising a video is worse than no video. When the file lands,
 * add the embed plus VideoObject, transcript in the DOM and a custom
 * thumbnail, per the SEO Guidelines 13 video row.
 *
 * SEO. Indexed, canonical /brandformance, in the sitemap. It owns the
 * primary keyword "brandformance" (SEO Guidelines 3.2) and its schema URLs
 * point at this route.
 */
export const metadata: Metadata = {
  title: { absolute: "BrandFormance: Brand + Performance = Dominance | TopServ" },
  description:
    "BrandFormance is brand building and performance marketing run as 1 system. Brand creates demand, performance captures it, together they build dominance.",
  alternates: { canonical: "/brandformance" },
  openGraph: {
    title: "BrandFormance: Brand + Performance = Dominance",
    description: BF_DEFINITION,
  },
};

const URL = `${siteConfig.url}/brandformance`;

export default function BrandFormancePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "BrandFormance", href: "/brandformance" },
        ]}
      />
      <FAQJsonLd items={tenQuestions.map((t) => ({ question: t.q, answer: t.a }))} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "BrandFormance",
          url: URL,
          description: BF_DEFINITION,
          about: {
            "@type": "DefinedTerm",
            name: "BrandFormance",
            description: BF_DEFINITION,
            inDefinedTermSet: {
              "@type": "DefinedTermSet",
              name: "BrandFormance",
              url: URL,
            },
          },
        }}
      />
      {/* The category, the insight, and the equation. */}
      <BfHero />

      {/* The canonical definition. */}
      <BfDefinition />

      {/* The Outcome beat: what actually changes. Build Spec v2 section 1. */}
      <BfTransformation />

      {/* The Proof beat, between the Principle and the Plan. */}
      <BfProof />

      {/* The 10 questions, in the spec's order, as a slider. */}
      <BfQuestions />

      {/* The 3 phases, Build Spec v2 section 4. */}
      <BfPhases />

      {/* What sets the number. No figures here, see the note in bf-detail. */}
      <BfCost />

      <BfCta />
    </>
  );
}
