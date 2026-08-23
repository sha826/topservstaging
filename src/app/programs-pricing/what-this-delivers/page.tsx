import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { VideoSlot } from "@/components/sections/video-slot";
import { videoSlots } from "@/lib/bf-content";

export const metadata: Metadata = {
  title: "BrandFormance Outcomes in Practice",
  description:
    "What actually improves in a home service business when BrandFormance is working. Honest expectations, the first 90 days, and the number we are held to.",
  alternates: { canonical: "/programs-pricing/what-this-delivers" },
};

const NINETY_DAYS = [
  "A market position your whole company can say out loud, and content that proves it",
  "Brand advertising running at frequency inside the geography you can afford to own",
  "Capture channels aligned to the brand: search, maps, Local Services, retargeting",
  "A conversion path measured end to end, from first view to booked call",
  "A baseline for cost per booked call, so every later month has a number to beat",
] as const;

export default function WhatThisDeliversPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Programs and Pricing", href: "/programs-pricing/overview" }, { name: "What This Delivers", href: "/programs-pricing/what-this-delivers" }]} />
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-14 md:py-20">
          <Reveal>
            <h1 className="display text-3xl md:text-5xl">First, the honest part</h1>
            <div className="mt-6 grid gap-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Here is what does not happen in the first 30 days: your revenue
                does not transform. Anyone who promises that is selling you a
                spike, and spikes are what got the industry into the lead
                dependency problem in the first place.
              </p>
              <p>
                The early work builds the message, the assets, the tracking and
                the distribution system that everything later depends on. That
                is the honest sequence. What follows is what you can actually
                expect, and none of it is a revenue guarantee.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="ninety-heading" className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-3xl px-5 py-14 md:py-20">
          <Reveal>
            <h2 id="ninety-heading" className="display text-3xl md:text-4xl">
              What improves in the first 90 days
            </h2>
          </Reveal>
          <ol className="mt-8 grid gap-4">
            {NINETY_DAYS.map((item, i) => (
              <Reveal key={item} delay={Math.min(i * 0.05, 0.25)}>
                <li className="flex items-start gap-4 rounded-lg border border-border bg-background p-5">
                  <span className="label-mono mt-0.5 text-brand">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-base leading-relaxed">{item}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="quality-heading" className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
          <Reveal>
            <h2 id="quality-heading" className="display text-2xl md:text-3xl">
              How lead quality improves
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Branded demand converts better than unbranded, and it is not
              close. A customer who searches your name has already chosen you
              and is looking for a phone number. A customer who searches the
              service is comparing 5 companies and shopping the price. As brand
              equity builds, more of your pipeline arrives already convinced:
              higher close rates, less negotiation, better jobs.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display text-2xl md:text-3xl">
              How performance efficiency improves
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Cost per booked call falls as brand equity builds. This is the
              claim we make and the number we are held to. Familiar names get
              clicked more, so ads cost less. Familiar names convert more, so
              every click is worth more. The same budget books more calls every
              quarter the brand compounds, while unbranded competitors pay the
              auction price forever.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="owner-heading" className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-3xl px-5 py-14 md:py-20">
          <Reveal>
            <h2 id="owner-heading" className="display text-3xl md:text-4xl">
              What changes for the owner
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Visibility: you see the complete system, not a channel report.
              Control: you know which lever moves which number. Confidence in
              spend: every dollar has a job and a measurement. And the ability
              to plan: growth stops being a hope tied to this month&apos;s lead
              flow and becomes a trajectory you can build hiring and trucks
              against.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Outcomes video" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <VideoSlot title={videoSlots.outcomes.title} length={videoSlots.outcomes.length} />
        </div>
      </section>

      <section aria-label="Next step">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-12">
          <p className="max-w-xl text-xl font-semibold">
            Ready to understand the investment?
          </p>
          <Button asChild size="lg" className="text-base">
            <Link href="/programs-pricing/pricing">See the pricing</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
