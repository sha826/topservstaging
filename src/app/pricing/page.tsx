import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/sections/faq-section";
import { activation, everyProgramIncludes, pricingTiers } from "@/lib/content";
import { pricingFaqs } from "@/lib/faqs";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "TopServ Digital publishes its full pricing: three programs billed weekly from $1,000/week, matched to your brand equity stage, plus a one-time $10,000 activation that covers the two-day video shoot.",
  alternates: { canonical: "/pricing" },
};

// Poster art per program (design-lab T6): gradient wash + title tint.
const POSTER: Record<
  string,
  { bg: string; title: string }
> = {
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
            <p className="label-mono text-brand">Pricing · Now showing</p>
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
                          <a href={siteConfig.booking.discoveryCall}>
                            Book a discovery call
                            <ArrowRight className="size-4" aria-hidden />
                          </a>
                        </Button>
                      </div>
                      <p className="mt-5 text-center font-sans text-[8.5px] uppercase leading-relaxed tracking-[0.06em] text-foreground/40">
                        A TopServ Digital production · two-day video shoot ·
                        $10,000 activation · Brandformance throughout
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
