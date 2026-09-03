import type { Metadata } from "next";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { MCta } from "@/components/method/m-cta";
import {
  FMF_DEFINITION,
  MFiveMile,
  MMetric,
  MSystem,
} from "@/components/method/m-detail";
import { MHero } from "@/components/method/m-hero";
import { MStages } from "@/components/method/m-stages";
import { sixStages } from "@/lib/bf-content";
import { siteConfig } from "@/lib/site-config";

/**
 * The BrandFormance Method, served at /method.
 *
 * SCOPE. Build Spec v2 section 3: "the six stage system". Section 4 fixes
 * the 6 stages and what happens in each. Both are honoured exactly and the
 * order is the spec's.
 *
 * ARGUMENT. Argument Spine, /method. Problem: every agency has a proprietary
 * process and most are a diagram with no teeth. False assumption: a
 * methodology is marketing language for the same work. Insight: a real
 * method says what happens, in what order, what it produces and how you know
 * it worked. Principle: 6 stages, nothing decorative. Proof: cost per booked
 * call, falling across 12 months. Outcome: the contractor can see the whole
 * machine before buying it. CTA: see what this delivers.
 *
 * KEYWORDS. Primary "brandformance method" (KEYWORD-RESEARCH 4.3) in the
 * title, the H1, the first 100 words and the slug. Secondaries and
 * supporting terms carried in body copy: home service marketing strategy,
 * marketing system for home service companies, hvac marketing plan, demand
 * generation vs demand capture. Each of the 6 stages has its own H2.
 *
 * FIVE-MILE-FAMOUS. KEYWORD-RESEARCH 5 assigns the term to this page, so it
 * carries the canonical definition block per SEO Guidelines 12.2, marked
 * with DefinedTerm and spelled per the entity list in Guidelines 7.
 *
 * SCHEMA. SEO Guidelines 7.2 is explicit for this page: WebPage plus an
 * ItemList of the 6 stages, naming each exactly as on-page, and HowTo is NOT
 * used because this is a methodology rather than instructions. VideoObject
 * lands with the Method video, which is not shot.
 *
 * WHAT IS DELIBERATELY NOT HERE. The 3 phases belong to Programs page 2,
 * How It Works. Outcome signals belong to Programs page 3, What This
 * Delivers. The frequency and geography doctrine is taught on
 * /brandformance and inside stage 03. Each of those sat on this page to
 * satisfy the 1,500 word floor in SEO Guidelines 5. Ryan released the floor
 * for this page, so they are gone: nothing here is making weight.
 *
 * OPEN, AND FLAGGED. The Argument Spine asks for a metric per stage. No
 * document supplies one for stages 1 to 5. The stage cards carry the
 * documented progress signals instead; see the note in m-stages.tsx.
 *
 * SEO. Indexed, canonical /method, in the sitemap. It owns the primary
 * keyword "brandformance method" (SEO Guidelines 3.2) and its schema URLs
 * point at this route.
 */
export const metadata: Metadata = {
  title: { absolute: "The BrandFormance Method: 6 Stages | TopServ" },
  description:
    "The BrandFormance method in full: 6 stages, what each one produces, and how you know it worked. Cost per booked call is the number we are held to.",
  alternates: { canonical: "/method" },
  openGraph: {
    title: "The BrandFormance Method: 6 Stages",
    description: FMF_DEFINITION,
  },
};

const URL = `${siteConfig.url}/method`;

export default function MethodPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "The Method", href: "/method" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "The BrandFormance Method",
          url: URL,
          description:
            "The BrandFormance method in 6 stages: Position, Build, Create Demand, Capture Demand, Convert, Measure and Optimize.",
          about: {
            "@type": "DefinedTerm",
            name: "Five-Mile-Famous",
            description: FMF_DEFINITION,
            inDefinedTermSet: {
              "@type": "DefinedTermSet",
              name: "BrandFormance",
              url: `${siteConfig.url}/brandformance`,
            },
          },
          mainEntity: {
            "@type": "ItemList",
            name: "The 6 stages of the BrandFormance Method",
            itemListOrder: "https://schema.org/ItemListOrderAscending",
            numberOfItems: sixStages.length,
            itemListElement: sixStages.map((s) => ({
              "@type": "ListItem",
              position: s.n,
              name: s.name,
              description: s.what,
            })),
          },
        }}
      />

      {/* Problem, insight, and the whole machine before the reader scrolls. */}
      <MHero />

      {/* False assumption: a methodology is language for the same work. */}
      <MSystem />

      {/* The 6 stages. Each an H2, each with what it produces and its signal. */}
      <MStages />

      {/* The outcome the stages exist to produce. This page owns the term. */}
      <MFiveMile />

      {/* The Proof beat: 1 number, falling across 12 months. */}
      <MMetric />

      <MCta />
    </>
  );
}
