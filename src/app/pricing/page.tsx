import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/sections/faq-section";
import { activation, everyProgramIncludes, pricingTiers } from "@/lib/content";
import { pricingFaqs } from "@/lib/faqs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "TopServ Digital publishes its full pricing: three programs billed weekly from $1,000/week, matched to your brand equity stage, plus a one-time $10,000 activation that covers the two-day video shoot.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Pricing", href: "/pricing" },
        ]}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-20 md:pt-28">
          <Reveal>
            <p className="label-mono text-brand">Pricing</p>
            <h1 className="display mt-4 text-5xl md:text-7xl">
              Most agencies hide their numbers.
              <br />
              <span className="text-brand">We don&apos;t.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Three programs, one system, billed weekly. You don&apos;t pick a
              package off a menu: we diagnose your brand with heat-map,
              SEMrush, and branded-search data on the discovery call, place
              you on the ladder, and prescribe the program that closes your
              gap. As your brand grows, you climb.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="tiers-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 id="tiers-heading" className="sr-only">
            Programs
          </h2>
          <ul className="grid gap-4 lg:grid-cols-3">
            {pricingTiers.map((tier, i) => (
              <li key={tier.slug}>
                <Reveal delay={Math.min(i * 0.06, 0.2)} className="h-full">
                  <article className="flex h-full flex-col rounded-lg border border-border bg-card p-7">
                    <p className="label-mono text-brand">{tier.stage}</p>
                    <h3 className="display mt-2 text-4xl">{tier.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{tier.stageDescription}</p>
                    <p className="mt-5 flex items-baseline gap-2">
                      <span className="display text-5xl text-brand">
                        ${tier.pricePerWeek.toLocaleString("en-US")}
                      </span>
                      <span className="text-sm text-muted-foreground">per week</span>
                    </p>
                    <p className="mt-4 text-[15px] font-semibold leading-snug">{tier.tagline}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {tier.outcome}
                    </p>
                    <ul className="mt-5 grid gap-2.5">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6">
                      <Button asChild size="lg" className="w-full">
                        <a href={siteConfig.booking.discoveryCall}>
                          Book a discovery call
                          <ArrowRight className="size-4" aria-hidden />
                        </a>
                      </Button>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
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
            Pricing current as of August 2026. Machine-readable version:{" "}
            <a href="/pricing.md" className="underline underline-offset-2 hover:text-foreground">
              /pricing.md
            </a>
          </p>
        </div>
      </section>

      <FaqSection
        faqs={pricingFaqs}
        title="Pricing questions"
        className="border-b-0"
      />
    </>
  );
}
