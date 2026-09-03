import type { Metadata } from "next";
import { BreadcrumbJsonLd, FAQJsonLd, JsonLd } from "@/components/seo/json-ld";
import { PFaq } from "@/components/programs/p-faq";
import { OVERVIEW_FAQS } from "@/components/programs/p-faq-data";
import {
  PCta,
  PEngine,
  PEquation,
  PFit,
  POverviewHero,
  PVendors,
} from "@/components/programs/p-overview";
import { siteConfig } from "@/lib/site-config";

/**
 * Programs and Pricing 1: Overview, at /programs-pricing/overview.
 *
 * SCOPE. Build Spec v2 section 4, Programs page 1. Every element the spec
 * names is present: the 2 to 3 paragraph hero positioning against lead
 * generation agencies, SEO only vendors and performance only media buyers;
 * the BrandFormance visual with no tactics listed; the Content Engine; the
 * who this is and is not for columns from section 2; an embedded FAQ; and a
 * CTA to see how BrandFormance works in practice.
 *
 * KEYWORDS. This is the site's most important commercial target
 * (KEYWORD-RESEARCH 4.4a). Primary "home services marketing agency", 1,900
 * a month at KD 25, in the title, the H1, the first 100 words and carried
 * through the body with its secondaries: home service marketing agency,
 * home services marketing company, marketing agency for contractors,
 * contractor marketing agency. The doc's instruction is followed exactly:
 * the title leads with the keyword, then the page reframes.
 *
 * THE DISQUALIFICATION. The Argument Spine calls the "not for" list the
 * highest converting thing on this page and KEYWORD-RESEARCH calls it an SEO
 * asset no competitor publishes. It gets equal weight, never a footnote.
 *
 * THE VIDEO. The spec puts the JB Overview video on this page. It is not
 * shot, so there is no slot and no VideoObject: an empty frame promising a
 * video is worse than no video. Add the embed, VideoObject, a transcript in
 * the DOM and a custom thumbnail when the file lands.
 *
 * NO PRICES. Programs page 4 owns the floor and the activation. This page
 * points at it and states no figure.
 *
 * SEO. Indexed, canonical /programs-pricing/overview, in the sitemap. It
 * owns the primary keyword "home services marketing agency" (SEO Guidelines
 * 3.2) and its schema URLs point at this route.
 */
export const metadata: Metadata = {
  title: { absolute: "Home Services Marketing Agency That Builds Brands | TopServ" },
  description:
    "A home services marketing agency that runs brand building and performance marketing as 1 system, not 2 budgets. See what we are, and who we are not for.",
  alternates: { canonical: "/programs-pricing/overview" },
};

const URL = `${siteConfig.url}/programs-pricing/overview`;

export default function ProgramsOverviewPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Programs and Pricing", href: "/programs-pricing/overview" },
          { name: "Overview", href: "/programs-pricing/overview" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "What Is TopServ Digital",
          url: URL,
          description:
            "TopServ Digital is a home services marketing agency that runs brand building and performance marketing as 1 system rather than 2 budgets.",
          about: { "@id": `${siteConfig.url}/#organization` },
        }}
      />
      <FAQJsonLd
        items={OVERVIEW_FAQS.map((f) => ({ question: f.question, answer: f.answer }))}
      />

      {/* The problem, and what we are instead. Carries the H1. */}
      <POverviewHero />

      {/* 3 vendors, each good at half the job. */}
      <PVendors />

      {/* The equation. No tactics listed, per the spec. */}
      <PEquation />

      {/* The Proof beat: the Content Engine we run on ourselves. */}
      <PEngine />

      {/* Build Spec v2 section 2, both columns, equal weight. */}
      <PFit />

      {/* The embedded FAQ the spec requires. */}
      <PFaq />

      <PCta />
    </>
  );
}
