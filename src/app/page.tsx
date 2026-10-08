import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { CinemaStage } from "@/components/sections/cinema-stage";
import { Hero } from "@/components/sections/hero";
import { PartnerLove } from "@/components/sections/partner-love";
import { PartnerMarquee } from "@/components/sections/partner-marquee";
import { ProofClients } from "@/components/sections/proof-clients";
import { SixStages } from "@/components/sections/six-stages";
import { BeforeAfterTable } from "@/components/sections/before-after-table";
import { DependencyProblem } from "@/components/sections/dependency-problem";
import { FiveMileFamous } from "@/components/sections/five-mile-famous";
import { BrandPerformanceVisual } from "@/components/visuals/brand-performance";
import { CustomerJourney } from "@/components/visuals/customer-journey";
import { homeProofSections } from "@/lib/bf-content";
import { JbVideoFigure } from "@/components/video/jb-video-figure";
import { jbVideos } from "@/lib/jb-videos";

/**
 * The home page, served at /.
 *
 * Built to Build Spec v2 (Home) and the Argument Spine's 8 beats: Problem,
 * False Assumption, Insight, Principle, Proof, Plan, Transformation, Outcome,
 * then 1 call to action. The home page is not a summary of the site, it is
 * the argument in miniature.
 *
 * Promoted from the /test preview route: noindex is gone, the canonical is
 * "/", and it owns the primary keyword "topserv digital" (SEO Guidelines 3.2).
 *
 * Organization schema is site wide now, emitted once from the root layout
 * so every page carries the node its other schema references. It used to be
 * rendered here and only here; no route should emit a second block against
 * the "/#organization" id.
 */
export const metadata: Metadata = {
  // Absolute: the root layout appends "| TopServ Digital" via its template,
  // and the home page formula already leads with the brand.
  title: { absolute: "TopServ Digital | The Home of BrandFormance" },
  description:
    "Rankings and ads capture demand, they do not create it. TopServ Digital is the home of BrandFormance, the system that makes contractors the obvious choice.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  // Which switchable proof sections are on, in page order. Drives both what
  // renders and the alternating background tint below.
  const proofRun = (
    [
      homeProofSections.videoTestimonials ? "testimonials" : null,
      homeProofSections.partnerMarquee ? "marquee" : null,
    ] as const
  ).filter((s): s is "testimonials" | "marquee" => s !== null);

  return (
    <>

      {/* 1. HERO. Carries the single H1, the one line, the supporting line,
          and the 2 CTAs the conversion path allows. */}
      <Hero />

      {/* 1b. THE MANIFESTO. Straight under the hero: the page has just made
          its claim in text, and this is JB making it on camera. */}
      <section aria-labelledby="manifesto-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <Reveal className="text-center">
            <p className="label-mono text-brand">The manifesto</p>
            <h2 id="manifesto-heading" className="display mt-3 text-3xl md:text-4xl">
              Why we build brands, not lead lists.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="mt-10">
            <JbVideoFigure video={jbVideos.manifesto} />
          </Reveal>
        </div>
      </section>

      {/* 2. PROBLEM */}
      <DependencyProblem />

      {/* 3. CATEGORY */}
      <section aria-labelledby="category-heading" className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:items-center lg:gap-14">
            <Reveal>
              <p className="label-mono text-brand">The category</p>
              <h2 id="category-heading" className="display mt-3 text-4xl md:text-5xl">
                Meet BrandFormance.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                TopServ Digital does not compete as another digital marketing
                agency. We created a category, and it exists because home
                service companies were being told to choose between building a
                brand and generating leads. That is the wrong decision. Run as
                1 system, each side makes the other cheaper.
              </p>

              <div className="mt-8">
                <Button asChild size="lg" className="text-base">
                  <Link href="/brandformance">
                    Discover BrandFormance
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <BrandPerformanceVisual />
            </Reveal>
          </div>

          {/* Where each half of the methodology actually acts. This is the
              teaching visual the whole argument rests on. */}
          <div className="mt-20 border-t border-border pt-14">
            <Reveal>
              <h3 className="display text-3xl md:text-4xl">
                Where each half does its work
              </h3>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                A homeowner does not go from stranger to customer in one step.
                They move through 9 stages, and brand and performance act at
                opposite ends of that path.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="mt-10">
              <CustomerJourney />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. TRANSFORMATION */}
      <section aria-labelledby="transformation-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <Reveal>
            <p className="label-mono text-brand">The transformation</p>
            <h2 id="transformation-heading" className="display mt-3 text-4xl md:text-5xl">
              From invisible to Five-Mile-Famous.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Familiarity is built inside a radius you can afford to hold at
              frequency, not sprayed across a city you cannot. The map is the
              variable. The frequency is not.
            </p>
          </Reveal>

          <div className="mt-10">
            <FiveMileFamous />
          </div>

          <Reveal delay={0.08} className="mt-12">
            <JbVideoFigure video={jbVideos.fiveMileFamous} eyebrow="On camera" />
          </Reveal>

          <div className="mt-14">
            <Reveal>
              <h3 className="display text-3xl md:text-4xl">What actually changes</h3>
            </Reveal>
            <div className="mt-6 rounded-lg border border-border bg-card">
              <BeforeAfterTable />
            </div>
          </div>
        </div>
      </section>

      {/* 5. METHOD */}
      <section aria-labelledby="method-heading" className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <Reveal>
            <p className="label-mono text-brand">The Method</p>
            <h2 id="method-heading" className="display mt-3 text-4xl md:text-5xl">
              6 stages. 1 system.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              The BrandFormance Method is a system, not a service list. Each
              stage feeds the next, and the last 1 pays for the first. Cost per
              booked call is the number we are held to.
            </p>
          </Reveal>

          <div className="mt-10">
            <SixStages />
          </div>

          <Reveal className="mt-8">
            <Link
              href="/method"
              className="inline-flex items-center gap-2 text-base font-semibold text-foreground transition-colors hover:text-brand"
            >
              See how the 6 stages work
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 6. PROOF. Real client outcomes only. Revenue before and after, in
          named markets, with the growth rate beside it so no number stands
          without context. */}
      <section aria-labelledby="proof-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <Reveal>
            <p className="label-mono text-brand">Proof</p>
            <h2 id="proof-heading" className="display mt-3 text-4xl md:text-5xl">
              Companies that stopped renting attention.
            </h2>
            {/* This line used to promise revenue before and after, which was
                true of the 6 figure rows that used to render here. The band
                now names 5 companies and carries no figures, so the promise
                went with them. Copy is Alejandro's, and this is a holding
                line written to stop the page claiming something it no longer
                shows. */}
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              The home service companies we build brands for, across the
              trades where the work runs.
            </p>
          </Reveal>

          <div className="mt-10">
            <ProofClients />
          </div>

          <Reveal className="mt-8">
            <Link
              href="/programs-pricing/success-stories"
              className="inline-flex items-center gap-2 text-base font-semibold text-foreground transition-colors hover:text-brand"
            >
              Read the full stories
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Proof continued: the films we made, the clients on camera, and the
          companies we work with. Each renders its own section and heading.

          The last 2 are switchable (homeProofSections in bf-content.ts). The
          run alternates tinted and untinted bands, so the tint is assigned
          here from whichever sections are actually on instead of each one
          hardcoding its own. CinemaStage above is untinted, so the first
          surviving band takes the tint and they alternate from there. Switch
          either off and the remaining bands still alternate. */}
      {/* The film reel. Hidden by the filmReel flag; CinemaStage renders an
          untinted section, and the run below starts tinted whether or not
          this one is present, so removing it cannot leave 2 untinted bands
          against each other. */}
      {homeProofSections.filmReel && <CinemaStage />}
      {proofRun.map((section, i) =>
        section === "testimonials" ? (
          <PartnerLove key={section} tinted={i % 2 === 0} />
        ) : (
          <PartnerMarquee key={section} tinted={i % 2 === 0} />
        ),
      )}

      {/* 7. FOUNDER. Connects JB's thought leadership to TopServ without
          turning the page into a profile. */}
      <section aria-labelledby="founder-heading" className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] md:items-center md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
            <Reveal>
              <p className="label-mono text-brand">The founder</p>
              <h2 id="founder-heading" className="display mt-3 max-w-2xl text-4xl md:text-5xl">
                Meet the creator of BrandFormance.
              </h2>
              <div className="mt-5 grid max-w-2xl gap-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Jonathan Bannister founded TopServ Digital in 2016 and spent
                  the decade since watching good companies rank, advertise and
                  still lose to the name the customer already knew. He built
                  BrandFormance so his clients would be that name.
                </p>
                <p>
                  He calls lead dependency digital heroin, and he argues
                  against it in public. The methodology is his. The institution
                  is TopServ.
                </p>
              </div>
              <Link
                href="/jonathan"
                className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-foreground transition-colors hover:text-brand"
              >
                About Jonathan
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Reveal>

            {/* The portrait is the same authentic photograph /jonathan uses,
                not a second shoot and not a generated stand-in (Image
                Guidelines 4.1). It is below the fold, so no priority. */}
            <Reveal delay={0.08}>
              <figure className="overflow-hidden rounded-lg border border-border">
                <Image
                  src="/images/jonathan/jonathan-bannister.webp"
                  alt="Jonathan Bannister, founder of TopServ Digital and creator of BrandFormance"
                  width={1800}
                  height={1202}
                  sizes="(min-width: 1024px) 26rem, (min-width: 768px) 20rem, 100vw"
                  className="h-full w-full object-cover"
                />
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 8. CLOSING CTA. The single destination the whole page points at. */}
      {/* 8b. THE CLOSE, before the ask. */}
      <section aria-labelledby="home-close-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <Reveal className="text-center">
            <p className="label-mono text-brand">The close</p>
            <h2 id="home-close-heading" className="display mt-3 text-3xl md:text-4xl">
              The argument, in 1 minute.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="mt-10">
            <JbVideoFigure video={jbVideos.homeClose} />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="cta-heading">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center md:py-28">
          <Reveal>
            <h2 id="cta-heading" className="display text-5xl md:text-7xl">
              How strong is your brand<span className="text-brand">?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              The Brand Assessment reads how well your market actually knows
              you, and returns your Brand Grade with what it means for your
              business. Diagnosis first. The program comes after.
            </p>
            <div className="mt-9 flex justify-center">
              <Button asChild size="lg" className="text-base">
                <Link href="/brand-assessment">
                  Get Your Brand Grade
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
