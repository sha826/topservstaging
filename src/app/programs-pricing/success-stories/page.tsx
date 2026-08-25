import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { ProofClients } from "@/components/sections/proof-clients";
import { VideoSlot } from "@/components/sections/video-slot";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "BrandFormance Success Stories",
  description:
    "Has BrandFormance worked for companies like mine? 6 home service companies, real revenue numbers, real markets. No vanity metrics.",
  alternates: { canonical: "/programs-pricing/success-stories" },
};

export default function SuccessStoriesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Programs and Pricing", href: "/programs-pricing/overview" }, { name: "Success Stories", href: "/programs-pricing/success-stories" }]} />
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-14 md:py-20">
          <Reveal>
            <h1 className="display text-3xl md:text-5xl">
              Has this worked for companies like mine?
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              6 companies, 6 markets, real revenue. We show growth alongside
              clarity, confidence, margin and sales velocity, because a revenue
              number without context is a vanity metric, and we do not publish
              those.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="clients-heading" className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <h2 id="clients-heading" className="sr-only">
            Client results
          </h2>
          <ProofClients />
        </div>
      </section>

      <section aria-labelledby="conversations-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <h2 id="conversations-heading" className="display text-3xl md:text-4xl">
              Hear it from the owners
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Real conversations with the people who made the investment. Not
              testimonials, conversations: what they were afraid of, what
              changed, and what they would tell another owner.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <VideoSlot title="Client conversation 1" length="3 to 5 minutes" />
            <VideoSlot title="Client conversation 2" length="3 to 5 minutes" />
          </div>
        </div>
      </section>

      <section aria-label="Next step">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-12">
          <p className="max-w-xl text-xl font-semibold">
            Ready to talk about your market?
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="text-base">
              <a href={siteConfig.booking.discoveryCall}>Schedule a call</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="/brand-assessment">Get your Brand Grade first</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
