import type { Metadata } from "next";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { PHowCta, PHowHero, PLoop, POwes, PPhases } from "@/components/programs/p-how";
import { siteConfig } from "@/lib/site-config";

/**
 * Programs and Pricing 2: How It Works, at /programs-pricing/how-it-works.
 *
 * SCOPE. Build Spec v2 section 4, Programs page 2. The 3 phases with their
 * timings and stages, and for each one what TopServ does, what the client
 * provides and what progress looks like, plus the workflow showing brand
 * feeding performance and performance data informing brand.
 *
 * KEYWORDS. Primary "how brandformance works" (KEYWORD-RESEARCH 4.4b) in the
 * title, the H1, the first 100 words and the slug. Secondary "what does a
 * marketing agency do for contractors" is carried in the body.
 *
 * THE CLIENT'S OBLIGATIONS have their own section because the Argument Spine
 * says softening them is how the physical layer starves later.
 *
 * THE VIDEO. The spec places the Process Walkthrough video here. It is not
 * shot, so there is no slot and no VideoObject. Add the embed, VideoObject,
 * a transcript in the DOM and a custom thumbnail when the file lands.
 *
 * SEO. Indexed, canonical /programs-pricing/how-it-works, in the sitemap.
 * It owns the primary keyword "how brandformance works" (SEO Guidelines 3.2)
 * and its schema URLs point at this route.
 */
export const metadata: Metadata = {
  title: { absolute: "How BrandFormance Works: 3 Phases, 12 Months | TopServ" },
  description:
    "How BrandFormance works month by month: 3 phases, what we do in each, what you provide, and what should be true by the end of it.",
  alternates: { canonical: "/programs-pricing/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Programs and Pricing", href: "/programs-pricing/overview" },
          { name: "How It Works", href: "/programs-pricing/how-it-works" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "How BrandFormance Works",
          url: `${siteConfig.url}/programs-pricing/how-it-works`,
          description:
            "The 3 phases of a BrandFormance program: Strategy and Alignment, Execution and Activation, Optimization and Scale.",
          about: { "@id": `${siteConfig.url}/#organization` },
        }}
      />

      <PHowHero />
      <PPhases />
      <PLoop />
      <POwes />
      <PHowCta />
    </>
  );
}
