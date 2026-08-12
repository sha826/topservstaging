import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/sections/faq-section";
import { pricingTiers, videoIntensive } from "@/lib/content";
import { pricingFaqs } from "@/lib/faqs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "TopServ Digital publishes its full pricing: weekly plans from $1,250/week matched to your revenue, plus a $15,000 fixed-price Two-Day Video Intensive.",
  alternates: { canonical: "/pricing" },
};

function formatPrice(pricePerWeek: number | null) {
  if (pricePerWeek === null) return "Custom";
  return `$${pricePerWeek.toLocaleString("en-US")}`;
}

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
              TopServ Digital publishes its full pricing. Plans are billed
              weekly and matched to your annual revenue, so the scope always
              fits the size of your business. Our goal is not to be the
              cheapest agency — it&apos;s to be the most valuable growth partner
              you&apos;ll ever work with.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="tiers-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 id="tiers-heading" className="sr-only">
            Plans
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {pricingTiers.map((tier, i) => (
              <li key={tier.slug}>
                <Reveal delay={Math.min(i * 0.06, 0.2)} className="h-full">
                  <article className="flex h-full flex-col rounded-lg border border-border bg-card p-7">
                    <h3 className="display text-3xl">{tier.name}</h3>
                    <p className="label-mono mt-1 text-muted-foreground">{tier.revenueBand}</p>
                    <p className="mt-5 flex items-baseline gap-2">
                      <span className="display text-5xl text-brand">
                        {formatPrice(tier.pricePerWeek)}
                      </span>
                      {tier.pricePerWeek !== null && (
                        <span className="text-sm text-muted-foreground">per week</span>
                      )}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {tier.summary}
                    </p>
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
                <h3 className="display text-3xl">{videoIntensive.name}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {videoIntensive.summary}
                </p>
              </div>
              <div className="mt-6 shrink-0 md:mt-0 md:text-right">
                <p className="display text-5xl text-brand">
                  ${videoIntensive.price.toLocaleString("en-US")}
                </p>
                <p className="label-mono mt-1 text-muted-foreground">fixed price</p>
              </div>
            </article>
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
