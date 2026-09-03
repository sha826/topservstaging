import type { Metadata } from "next";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import {
  SBeyondRevenue,
  SCta,
  SHero,
  SResults,
  SStructure,
} from "@/components/programs/p-stories";
import { siteConfig } from "@/lib/site-config";

/**
 * Programs and Pricing 5: Success Stories, at
 * /programs-pricing/success-stories.
 *
 * SCOPE. Build Spec v2 section 4, Programs page 5. The 6 client outcomes,
 * clarity and confidence and margin and sales velocity shown alongside
 * revenue, and a final CTA to schedule a call.
 *
 * KEYWORDS. KEYWORD-RESEARCH 4.4e. Primary "home service marketing case
 * studies", low volume at KD 0, in the title, the H1 and the first 100
 * words. Secondary "hvac marketing case study". This is a low volume
 * commercial term the page can own outright rather than a head term to
 * fight for.
 *
 * NAMES ARE STILL AN OPEN DECISION. Spec section 15, Decision 1, owners Ryan
 * and JB. The Argument Spine instructs this page to ship anyway: "write this
 * page structurally with placeholders and do not let it hold up the other
 * seven. At minimum assume market and outcome without company names."
 * Markets and outcomes are published; names sit behind the single
 * NAMES_CLEARED flag in d-growth-bars.tsx.
 *
 * SCHEMA. KEYWORD-RESEARCH 4.4e is explicit: mark each story as an Article,
 * and never fake Review or AggregateRating on self published case studies.
 * No 7 part story is written yet, so no Article schema is emitted and no
 * review markup exists anywhere on this route. Add Article per story when
 * the narratives are written, and never add the other 2.
 *
 * THE VIDEOS. The spec places 2 to 3 client conversation videos at 3 to 5
 * minutes here. They are not shot, so there is no slot and no VideoObject,
 * matching every other page in this hub. An empty frame promising a video is
 * worse than no video.
 *
 * SEO. Indexed, canonical /programs-pricing/success-stories, in the
 * sitemap. It owns "home service marketing case studies" and its schema URLs
 * point at this route.
 */
export const metadata: Metadata = {
  title: { absolute: "Home Service Marketing Case Studies | TopServ Digital" },
  description:
    "6 home service companies, each shown with the revenue it started at, not just the revenue it reached. Same 7 part structure every time, so they compare.",
  alternates: { canonical: "/programs-pricing/success-stories" },
};

const URL = `${siteConfig.url}/programs-pricing/success-stories`;

export default function ProgramsSuccessStoriesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Programs and Pricing", href: "/programs-pricing/overview" },
          { name: "Success Stories", href: "/programs-pricing/success-stories" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Home Service Marketing Case Studies",
          url: URL,
          description:
            "Home service companies TopServ Digital has grown, each reported against its starting revenue rather than as a percentage without context.",
          about: { "@id": `${siteConfig.url}/#organization` },
        }}
      />

      {/* The Problem and Insight beats. Carries the H1. */}
      <SHero />

      {/* The Proof beat: 6 outcomes, each with its starting position drawn. */}
      <SResults />

      {/* Spec v2: clarity, confidence, margin and sales velocity. */}
      <SBeyondRevenue />

      {/* The Principle beat: the same 7 parts, so the stories compare. */}
      <SStructure />

      <SCta />
    </>
  );
}
