import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ProfessionalServiceJsonLd } from "@/components/seo/json-ld";
import { CaseStudyBand } from "@/components/sections/case-study-band";
import { FaqSection } from "@/components/sections/faq-section";
import { CreditsCrawl } from "@/components/sections/credits-crawl";
import { Hero } from "@/components/sections/hero";
import { HowWeCanHelp } from "@/components/sections/how-we-can-help";
import { TeamRoles } from "@/components/sections/team-roles";
import { TopServProcess } from "@/components/sections/topserv-process";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { PartnerLove } from "@/components/sections/partner-love";
import { PartnerMarquee } from "@/components/sections/partner-marquee";
import { CinemaStage } from "@/components/sections/cinema-stage";
import { DisruptStatement } from "@/components/sections/disrupt-statement";
import { ServicesCallSheet } from "@/components/sections/services-call-sheet";
import { industries } from "@/lib/content";
import { generalFaqs } from "@/lib/faqs";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <ProfessionalServiceJsonLd />

      <Hero />

      <CreditsCrawl />

      <HowWeCanHelp />

      <TeamRoles />

      <TopServProcess />

      <ProcessSteps />

      <ProcessTimeline />

      <CinemaStage />

      <ServicesCallSheet />

      <DisruptStatement />

      <CaseStudyBand />

      {/* Industries */}
      <section aria-labelledby="industries-heading" className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <Reveal>
            <p className="label-mono text-brand">Who we serve</p>
            <h2 id="industries-heading" className="display mt-3 text-4xl md:text-5xl">
              Six trades. One focus.
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <li key={industry.slug}>
                <Reveal delay={Math.min(i * 0.05, 0.25)} className="h-full">
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="group flex h-full flex-col gap-2 rounded-lg border border-border bg-background p-6 transition-colors hover:border-brand"
                  >
                    <span className="display text-2xl">{industry.trade}</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {industry.description}
                    </span>
                    <span className="label-mono mt-auto flex items-center gap-1.5 pt-3 text-brand">
                      {industry.name}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PartnerLove />

      <PartnerMarquee />

      <FaqSection faqs={generalFaqs} title="Straight answers" />

      {/* CTA band */}
      <section aria-labelledby="cta-heading">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center md:py-28">
          <Reveal>
            <h2 id="cta-heading" className="display text-5xl md:text-7xl">
              Let&apos;s build your brand<span className="text-brand">.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-muted-foreground">
              A 30-minute discovery call. No pitch deck, no pressure — just a
              straight look at what would move your numbers.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="text-base">
                <a href={siteConfig.booking.discoveryCall}>Book a discovery call</a>
              </Button>
              <a
                href={`tel:${siteConfig.company.phone}`}
                className="text-base font-semibold text-foreground transition-colors hover:text-brand"
              >
                or call {siteConfig.company.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
