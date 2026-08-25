import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/sections/faq-section";
import { VideoSlot } from "@/components/sections/video-slot";
import { pricingModel, videoSlots } from "@/lib/bf-content";
import { pricingFaqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "BrandFormance Investment Structure",
  description:
    "How BrandFormance pricing works: programs start at $1,000 per week plus a one time $10,000 activation. Price is derived from your scope by diagnosis, never chosen from a menu.",
  alternates: { canonical: "/programs-pricing/pricing" },
};

export default function ProgramsPricingPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Programs and Pricing", href: "/programs-pricing/overview" }, { name: "Pricing", href: "/programs-pricing/pricing" }]} />
      <section aria-label="Investment video" className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <VideoSlot title={videoSlots.investment.title} length={videoSlots.investment.length} />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-14 md:py-20">
          <Reveal>
            <h1 className="display text-3xl md:text-5xl">
              Priced from your scope.
              <span className="text-brand"> Not from a menu.</span>
            </h1>
            <div className="mt-6 grid gap-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                We do not publish a price table, and that is deliberate. A
                table invites you to pick a tier before anyone has diagnosed
                anything, and it fixes a price against a scope nobody has
                seen. Your market, your competition, your current brand
                position and your service area set the scope. The scope sets
                the price. No 2 clients in the same market price the same.
              </p>
              <p>
                What we publish instead is the honest anchor: the floor and
                the activation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="anchor-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-16">
          <h2 id="anchor-heading" className="sr-only">
            The floor and the activation
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <article className="flex h-full flex-col rounded-xl border border-brand/50 bg-card p-8">
                <p className="label-mono text-brand">The floor</p>
                <p className="display mt-4 text-6xl">
                  {pricingModel.floor}
                  <span className="font-sans text-base text-muted-foreground"> /week</span>
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {pricingModel.floorLine}
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="flex h-full flex-col rounded-xl border border-border bg-card p-8">
                <p className="label-mono text-brand">The activation</p>
                <p className="display mt-4 text-6xl">
                  {pricingModel.activation}
                  <span className="font-sans text-base text-muted-foreground"> one time</span>
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {pricingModel.activationLine} Weekly billing starts in month 2.
                </p>
              </article>
            </Reveal>
          </div>
          <Reveal className="mt-6">
            <p className="text-sm text-ink-faint">
              How it is said: a thousand a week, plus a one time ten thousand
              to get started. Pricing is quoted weekly and billed weekly.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="sets-heading" className="border-b border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
          <Reveal>
            <h2 id="sets-heading" className="display text-2xl md:text-3xl">
              What sets the number
            </h2>
            <ul className="mt-5 grid gap-3">
              {pricingModel.whatSetsTheNumber.map((item) => (
                <li key={item} className="flex items-center gap-3 text-base">
                  <Check className="size-4 shrink-0 text-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {pricingModel.howReached}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display text-2xl md:text-3xl">
              More territory. Same frequency.
            </h2>
            <p className="mt-5 flex items-start gap-3 text-base leading-relaxed text-muted-foreground">
              <MapPin className="mt-1 size-5 shrink-0 text-brand" aria-hidden />
              <span>{pricingModel.frequencyDoctrine}</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="replaces-heading" className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
          <Reveal>
            <h2 id="replaces-heading" className="display text-2xl md:text-3xl">
              What it replaces
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              There are cheaper agencies, and for some businesses they are the
              right call. What they sell is a channel. What this replaces is a
              video production company, a media buyer, an SEO vendor, a
              content team and the internal hire who was supposed to manage
              them all. 1 system, 1 team, 1 number to hold us to.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display text-2xl md:text-3xl">When this is not a fit</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              If you are shopping for the cheapest lead source, this is not it.
              If you want a tactic that fixes this quarter, this is not that
              either. And if nobody in your leadership will get on camera, the
              system cannot work, because the market cannot trust a company it
              never sees. We say this here so neither of us spends a call
              finding it out.
            </p>
          </Reveal>
        </div>
      </section>

      <FaqSection faqs={pricingFaqs} title="Pricing questions" />

      <section aria-label="Next step" className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-12">
          <p className="max-w-xl text-xl font-semibold">
            Start with your grade. The scope conversation comes after.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="text-base">
              <Link href="/brand-assessment">
                Get Your Brand Grade
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="/programs-pricing/success-stories">Success stories</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
