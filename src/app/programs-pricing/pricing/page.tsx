import type { Metadata } from "next";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import {
  PAnchors,
  PHowPriced,
  PNotFit,
  PPricingCta,
  PPricingHero,
} from "@/components/programs/p-pricing";
import { PSetsSlider } from "@/components/programs/p-sets-slider";
import { siteConfig } from "@/lib/site-config";

/**
 * Programs and Pricing 4: Pricing.
 *
 * SCOPE. Build Spec v2 section 4, Programs page 4, which the spec rewrote in
 * v2 and prefaced with "Do not build from the v1.0 price table". This page
 * publishes the floor and the activation and nothing else, then what sets
 * the number, how it is reached, what it replaces, and when it is not a fit.
 *
 * THE 2 ANCHORS LIVE HERE AND ONLY HERE. SEO Guidelines 1.3 permits
 * $1,000 per week and the $10,000 activation only where the Pricing page
 * spec places them. Every other page on the site links here instead of
 * quoting a figure, and this page states no monthly and no annual number,
 * per the 48 and 52 week rule.
 *
 * KEYWORDS. Primary "home service marketing pricing" (KEYWORD-RESEARCH
 * 4.4d) in the title, the H1, the first 100 words and the slug. Secondaries
 * "how much does a marketing agency cost" and "digital marketing agency
 * pricing" are carried in the body.
 *
 * THE VIDEO. The Investment video belongs at the top of this page and is not
 * shot. Its v2 script explains why we price from scope and must not state a
 * price. No slot and no VideoObject until it lands.
 *
 * SEO. Indexed, canonical /programs-pricing/pricing, in the sitemap. No
 * price figure appears in the title or the meta description, per Guidelines
 * 1.3.
 */
export const metadata: Metadata = {
  title: { absolute: "Pricing: How the BrandFormance Program Is Priced | TopServ" },
  description:
    "Home service marketing pricing without a table. We publish a floor and an activation, then price from scope: the assessment produces it, and diagnosis comes first.",
  alternates: { canonical: "/programs-pricing/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Programs and Pricing", href: "/programs-pricing/overview" },
          { name: "Pricing", href: "/programs-pricing/pricing" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Pricing",
          url: `${siteConfig.url}/programs-pricing/pricing`,
          description:
            "How a BrandFormance program is priced: a published floor, a one time activation, and a number derived from scope rather than chosen from a menu.",
          about: { "@id": `${siteConfig.url}/#organization` },
        }}
      />

      <PPricingHero />
      <PAnchors />
      <PSetsSlider />
      <PHowPriced />
      <PNotFit />
      <PPricingCta />
    </>
  );
}
