import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ProfessionalServiceJsonLd } from "@/components/seo/json-ld";
import { BfEquation } from "@/components/sections/bf-equation";
import { CinemaStage } from "@/components/sections/cinema-stage";
import { CreditsCrawl } from "@/components/sections/credits-crawl";
import { Hero } from "@/components/sections/hero";
import { PartnerLove } from "@/components/sections/partner-love";
import { PartnerMarquee } from "@/components/sections/partner-marquee";
import { ProofClients } from "@/components/sections/proof-clients";
import { SixStages } from "@/components/sections/six-stages";
import { beforeAfter } from "@/lib/bf-content";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <ProfessionalServiceJsonLd />

      <Hero />

      <CreditsCrawl />

      {/* Problem: being found is not enough anymore */}
      <section aria-labelledby="problem-heading" className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <Reveal>
            <p className="label-mono text-brand">The problem</p>
            <h2 id="problem-heading" className="display mt-3 text-4xl md:text-5xl">
              Being found is not enough anymore.
            </h2>
            <div className="mt-6 grid gap-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                You can rank first, run ads, hold strong reviews, and still lose
                the job. The customer sees 5 companies and picks the 1 they
                already know. Rankings, PPC, Local Services Ads and lead lists
                capture demand. None of them create it, and none of them make
                you the name a homeowner trusts before the search begins.
              </p>
              <p>
                Worse, capture-only marketing is rented. Stop paying and the
                leads stop. Competition rises and acquisition cost rises with
                it. That dependency is the real enemy, and more spend on the
                same channels does not fix it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Category: meet BrandFormance */}
      <section aria-labelledby="category-heading" className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <Reveal>
            <p className="label-mono text-brand">The category</p>
            <h2 id="category-heading" className="display mt-3 text-4xl md:text-5xl">
              Meet BrandFormance.
            </h2>
          </Reveal>
          <div className="mt-10">
            <BfEquation />
          </div>
          <Reveal className="mt-8 text-center">
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="/brandformance">
                The definitive resource
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Transformation: from invisible to Five Mile Famous */}
      <section aria-labelledby="transformation-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <Reveal>
            <p className="label-mono text-brand">The transformation</p>
            <h2 id="transformation-heading" className="display mt-3 text-4xl md:text-5xl">
              From invisible to Five Mile Famous.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Five Mile Famous means the market around your trucks knows you,
              trusts you and remembers you before anything breaks. Local
              familiarity is the asset. Here is what changes when you own it.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-3">
            {beforeAfter.map((row, i) => (
              <Reveal key={row.before} delay={Math.min(i * 0.05, 0.25)}>
                <div className="grid items-center gap-2 rounded-lg border border-border bg-card px-6 py-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
                  <p className="text-base text-muted-foreground">{row.before}</p>
                  <ArrowRight className="hidden size-4 text-brand md:block" aria-hidden />
                  <p className="text-base font-semibold">{row.after}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Method: the six stages */}
      <section aria-labelledby="method-heading" className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <Reveal>
            <p className="label-mono text-brand">The Method</p>
            <h2 id="method-heading" className="display mt-3 text-4xl md:text-5xl">
              6 stages. 1 system.
            </h2>
          </Reveal>
          <div className="mt-10">
            <SixStages />
          </div>
          <Reveal className="mt-8">
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="/method">
                See the full Method
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Proof */}
      <section aria-labelledby="proof-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <Reveal>
            <p className="label-mono text-brand">Proof</p>
            <h2 id="proof-heading" className="display mt-3 text-4xl md:text-5xl">
              Companies that stopped renting attention.
            </h2>
          </Reveal>
          <div className="mt-10">
            <ProofClients />
          </div>
          <Reveal className="mt-8">
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="/programs-pricing/success-stories">
                The full stories
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <CinemaStage />

      <PartnerLove />

      <PartnerMarquee />

      {/* Founder */}
      <section aria-labelledby="founder-heading" className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="md:flex md:items-end md:justify-between md:gap-10">
            <Reveal>
              <p className="label-mono text-brand">The founder</p>
              <h2 id="founder-heading" className="display mt-3 max-w-2xl text-4xl md:text-5xl">
                Meet the creator of BrandFormance.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Jonathan Bannister built TopServ Digital in 2016 and spent the
                decade since proving that home service companies grow fastest
                when brand and performance run as 1 system. The methodology is
                his. The institution is TopServ.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="mt-8 shrink-0 md:mt-0">
              <Button asChild size="lg" variant="outline" className="text-base">
                <Link href="/jonathan">
                  About Jonathan
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section aria-labelledby="cta-heading">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center md:py-28">
          <Reveal>
            <h2 id="cta-heading" className="display text-5xl md:text-7xl">
              How strong is your brand<span className="text-brand">?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-muted-foreground">
              6 components, 1 score, 1 grade. Find out where you actually stand
              in your market, and which program closes the gap.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/brand-score">Get Your Brand Score</Link>
              </Button>
              <Link
                href="/programs-pricing/overview"
                className="text-base font-semibold text-foreground transition-colors hover:text-brand"
              >
                or see the programs first
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
