import type { Metadata } from "next";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import {
  PDeliversCta,
  PDeliversHero,
  PNinety,
  PNotYet,
  PNumber,
  POwner,
} from "@/components/programs/p-delivers";
import { siteConfig } from "@/lib/site-config";

/**
 * Programs and Pricing 3: What This Delivers.
 *
 * SCOPE. Build Spec v2 section 4, Programs page 3, in the spec's order: what
 * does not happen in the first 30 days said first, what improves in 90,
 * why branded demand converts better, cost per booked call as the claim we
 * are held to, and what changes for the owner.
 *
 * KEYWORDS. Primary "marketing results for home service companies"
 * (KEYWORD-RESEARCH 4.4c) in the title, the H1, the first 100 words and the
 * slug. Secondaries "how long does marketing take to work" and "cost per
 * booked call" are carried in the body.
 *
 * NO GUARANTEE, NO INVENTED FIGURES. The spec is explicit that this page
 * makes no revenue guarantee. The only quantities are the spec's own
 * timeframes; cost per booked call is named as a direction, never a value.
 *
 * THE VIDEO. The Outcomes video belongs here and is not shot, so there is no
 * slot and no VideoObject.
 *
 * SEO. Indexed, canonical /programs-pricing/what-this-delivers, in the
 * sitemap. It owns "marketing results for home service companies".
 */
export const metadata: Metadata = {
  title: { absolute: "Marketing Results for Home Service Companies | TopServ" },
  description:
    "What a BrandFormance program delivers, in order: what does not happen in 30 days, what improves in 90, and the 1 number we are held to across 12 months.",
  alternates: { canonical: "/programs-pricing/what-this-delivers" },
};

export default function WhatThisDeliversPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Programs and Pricing", href: "/programs-pricing/overview" },
          { name: "What This Delivers", href: "/programs-pricing/what-this-delivers" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "What This Delivers",
          url: `${siteConfig.url}/programs-pricing/what-this-delivers`,
          description:
            "Marketing results for home service companies: what does not happen in the first 30 days, what improves in the first 90, and cost per booked call across 12 months.",
          about: { "@id": `${siteConfig.url}/#organization` },
        }}
      />

      <PDeliversHero />
      <PNotYet />
      <PNinety />
      <PNumber />
      <POwner />
      <PDeliversCta />
    </>
  );
}
