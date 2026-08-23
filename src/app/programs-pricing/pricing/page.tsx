import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/sections/faq-section";
import { VideoSlot } from "@/components/sections/video-slot";
import { videoSlots } from "@/lib/bf-content";
import { activation, everyProgramIncludes, pricingTiers } from "@/lib/content";
import { pricingFaqs } from "@/lib/faqs";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "BrandFormance Investment Structure",
  description:
    "How much does BrandFormance actually cost? 3 programs billed weekly from $1,000 per week, assigned by Brand Score diagnosis, plus a one time $10,000 onboarding.",
  alternates: { canonical: "/programs-pricing/pricing" },
};

// Poster art per program (design-lab T6): gradient wash + title tint.
const POSTER: Record<string, { bg: string; title: string }> = {
  establish: {
    bg: "bg-[linear-gradient(170deg,#0d1b2c,#0c0e12_58%,rgba(14,125,193,0.24))]",
    title: "text-[#7fc3ec]",
  },
  amplify: {
    bg: "bg-[linear-gradient(170deg,#16210b,#0c0e12_58%,rgba(158,216,68,0.22))]",
    title: "text-brand",
  },
  dominate: {
    bg: "bg-[linear-gradient(170deg,#101820,#0c0e12_58%,rgba(61,155,217,0.18))]",
    title: "text-foreground",
  },
};

const AFFECTS_PRICING = [
  "Market size",
  "Competitive saturation",
  "Current brand position",
  "Service area",
  "Video scope",
] as const;

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
              Most agencies hide their numbers.
              <span className="text-brand"> We don&apos;t.</span>
            </h1>
            <div className="mt-6 grid gap-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                There are cheaper agencies, and for some businesses they are the
                right call. What they sell is a channel. What this replaces is a
                video production company, a media buyer, an SEO vendor, a
                content team and the internal hire who was supposed to manage
                them all. 1 system, 1 team, 1 number to hold us to.
              </p>
              <p>
                You do not pick a program off this page. The Brand Score places
                you in one. That is a feature: the program matches the actual
                state of your brand in your market, not your appetite on the
                day you signed.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="tiers-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 id="tiers-heading" className="sr-only">
            Programs
          </h2>
          <ul className="grid items-center gap-6 lg:grid-cols-[1fr_1.12fr_1fr]">
            {pricingTiers.map((tier, i) => {
              const featured = tier.slug === "amplify";
              const art = POSTER[tier.slug];
              return (
                <li
                  key={tier.slug}
                  className={cn(featured && "order-first lg:order-none lg:z-10")}
                >
                  <Reveal delay={Math.min(i * 0.08, 0.2)} className="h-full">
                    <article
                      className={cn(
                        "group relative flex h-full flex-col overflow-hidden rounded-xl border p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl",
                        art.bg,
                        featured
                          ? "border-brand/55 shadow-[0_24px_70px_rgba(158,216,68,0.10),0_30px_80px_rgba(0,0,0,0.5)] lg:scale-[1.04]"
                          : "border-border"
                      )}
                    >
                      {featured && (
                        <span className="label-mono absolute left-1/2 top-0 -translate-x-1/2 rounded-b-md bg-brand px-4 py-1.5 !text-[10px] font-bold text-primary-foreground">
                          Most prescribed
                        </span>
                      )}
                      <p
                        className={cn(
                          "min-h-[34px] text-center text-[13px] italic text-muted-foreground",
                          featured && "mt-4"
                        )}
                      >
                        {tier.tagline}
                      </p>
                      <h3
                        className={cn(
                          "display mt-2 text-center text-5xl leading-[0.94]",
                          art.title
                        )}
                      >
                        {tier.name}
                      </h3>
                      <p className="label-mono mt-2 text-center !text-[10px] tracking-[0.2em] text-ink-faint">
                        {tier.stage}
                      </p>
                      <p className="display mt-5 text-center text-[3.2rem] leading-none">
                        ${tier.pricePerWeek.toLocaleString("en-US")}
                        <span className="font-sans text-sm text-muted-foreground"> /week</span>
                      </p>
                      <p className="mt-4 min-h-[62px] text-center text-sm leading-relaxed text-muted-foreground">
                        {tier.outcome}
                      </p>
                      <ul className="mt-4 grid gap-2.5 border-t border-foreground/10 pt-4">
                        {tier.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-foreground/90"
                          >
                            <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-6">
                        <Button
                          asChild
                          size="lg"
                          variant={featured ? "default" : "outline"}
                          className="w-full text-base"
                        >
                          <Link href="/brand-score">
                            Get your Brand Score
                            <ArrowRight className="size-4" aria-hidden />
                          </Link>
                        </Button>
                      </div>
                      <p className="mt-5 text-center font-sans text-[10px] uppercase leading-relaxed tracking-[0.06em] text-ink-faint">
                        A TopServ Digital production · 2 day video shoot ·
                        $10,000 onboarding · BrandFormance throughout
                      </p>
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.08)_50%,transparent_60%)] transition-transform duration-700 group-hover:translate-x-[120%]"
                      />
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <Reveal className="mt-8">
            <article className="rounded-lg border border-brand/40 bg-card p-7 md:flex md:items-center md:justify-between md:gap-8">
              <div>
                <h3 className="display text-3xl">{activation.name}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {activation.summary}
                </p>
              </div>
              <div className="mt-6 shrink-0 md:mt-0 md:text-right">
                <p className="display text-5xl text-brand">
                  ${activation.price.toLocaleString("en-US")}
                </p>
                <p className="label-mono mt-1 text-muted-foreground">one time · every program</p>
              </div>
            </article>
          </Reveal>

          <Reveal className="mt-8">
            <div className="rounded-lg border border-border p-6">
              <p className="label-mono text-ink-faint">Every program includes</p>
              <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
                {everyProgramIncludes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="size-4 shrink-0 text-brand" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <p className="mt-8 text-sm text-ink-faint">
            Pricing is quoted weekly, published weekly and billed weekly, 52
            weeks a year. Pricing current as of August 2026. Machine-readable
            version:{" "}
            <a href="/pricing.md" className="underline underline-offset-2 hover:text-foreground">
              /pricing.md
            </a>
          </p>
        </div>
      </section>

      <section aria-labelledby="affects-heading" className="border-b border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
          <Reveal>
            <h2 id="affects-heading" className="display text-2xl md:text-3xl">
              What affects pricing
            </h2>
            <ul className="mt-5 grid gap-3">
              {AFFECTS_PRICING.map((item) => (
                <li key={item} className="flex items-center gap-3 text-base">
                  <Check className="size-4 shrink-0 text-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
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
            See companies who made the investment and won.
          </p>
          <Button asChild size="lg" className="text-base">
            <Link href="/programs-pricing/success-stories">Success stories</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
