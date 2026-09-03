import type { Metadata } from "next";
import { BreadcrumbJsonLd, FAQJsonLd, JsonLd } from "@/components/seo/json-ld";
import { ContentSlot } from "@/components/content/content-slot";
import { AboutCta } from "@/components/about/about-cta";
import { AboutFaq } from "@/components/about/about-faq";
import { AboutStyles } from "@/components/about/page-grid";
import { BeliefHero } from "@/components/about/belief-hero";
import { ABOUT_FAQS } from "@/components/about/faq-data";
import { Principles } from "@/components/about/principles";
import { Institution } from "@/components/about/institution";
import { Qualification } from "@/components/about/qualification";
import { WhyWeExist } from "@/components/about/why-we-exist";
import { siteConfig } from "@/lib/site-config";

/**
 * About TopServ Digital, served at /about.
 *
 * SCOPE. 6 sections, roughly 1,100 words. This page establishes who TopServ
 * is, why it exists, what it believes, who it is for, how it partners, what
 * is behind it, and what to do next. BrandFormance itself, the 6 stage
 * method, pricing and implementation are taught on their own pages and are
 * linked, never repeated here. Build Spec v2 defines this page in 3 words:
 * "institution, not personality."
 *
 * ARGUMENT ORDER. Copy Framework 16 overrides the conventional about shape:
 * begin with the BELIEF, never with company history. History arrives inside
 * section 05. There is no Argument Spine entry for /about; the spine covers
 * the other 8 pages, so the framework governs here.
 *
 * WHAT v5 MERGED. The reframe and its explanation were 2 sections rendering
 * 1 argument, so they are now one continuous narrative (FoundChosen). Built
 * for, Not for and the institution were 3 stacked bands with no relationship,
 * so they are now one split composition (Selection) where the qualification
 * scrolls against a pinned institutional anchor. 8 sections became 7.
 *
 * GRID. Every content section uses Shell (max 1200, Build Spec 9) and the
 * shared Cols primitive. v4 let sections choose their own first column, and
 * the institution used 26rem against everyone else's 20rem, which is why the
 * page looked misaligned. Only photographs break the Shell now.
 *
 * TONE. dark, dark, LIGHT, dark stage, dark ǀ LIGHT split, LIGHT, dark. No 2
 * adjacent sections share a mode. Brand green measures roughly 2.9:1 on the
 * light ground, so there it is used only for rules and marks, never text.
 *
 * IMAGES. 2 generated photographs and 1 real portrait. No home imagery: this
 * page is about TopServ, not about what its clients own.
 *
 * SEO. Indexed, canonical /about, in the sitemap. Organization schema is
 * omitted here on purpose: ProfessionalServiceJsonLd claims @id
 * "#organization" on the home page, and a second claim would split the
 * entity. This page references it instead, via about @id.
 */
export const metadata: Metadata = {
  title: { absolute: "About TopServ Digital | The Home of BrandFormance" },
  description:
    "TopServ Digital is the home of BrandFormance. We believe home service companies deserve better than another lead generation agency. Here is why we exist.",
  alternates: { canonical: "/about" },
};

// Hosts a registry content slot, same convention as the production About page.
export const revalidate = 300;

export default function AboutPage() {
  return (
    <>
      <AboutStyles />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About TopServ Digital",
          url: `${siteConfig.url}/about`,
          description: siteConfig.description,
          about: { "@id": `${siteConfig.url}/#organization` },
        }}
      />
      <FAQJsonLd
        items={ABOUT_FAQS.map((f) => ({ question: f.question, answer: f.answer }))}
      />

      {/* 01 THE BELIEF. Carries the single H1. */}
      <BeliefHero />

      {/* 02 WHY WE EXIST. Typography only. */}
      <WhyWeExist />

      {/* 03 THE 6 RULES. A pinned 2 column composition: the heading and one
          studio photograph hold on the left while the 6 rules arrive in
          sequence on the right and a brand green light grows behind them.
          The page's signature moment. */}
      <Principles />

      {/* 04 WHO THIS IS FOR. The 2 shortlists, side by side, light ground. */}
      <Qualification />

      {/* 05 THE INSTITUTION. Jonathan and the company, on their own. */}
      <Institution />

      {/* 06 QUESTIONS AND THE NEXT STEP. Real team entries render above it
          the moment the admin has any. */}
      <ContentSlot type="team_member" />
      <AboutFaq />
      <AboutCta />
    </>
  );
}
