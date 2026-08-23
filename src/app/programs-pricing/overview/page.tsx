import type { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { BfEquation } from "@/components/sections/bf-equation";
import { FaqSection } from "@/components/sections/faq-section";
import { VideoSlot } from "@/components/sections/video-slot";
import { builtFor, notFor, videoSlots } from "@/lib/bf-content";
import { generalFaqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "What Is TopServ Digital",
  description:
    "What is TopServ Digital, and how does BrandFormance actually work for a home service company? The overview, in plain language.",
  alternates: { canonical: "/programs-pricing/overview" },
};

export default function OverviewPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Programs and Pricing", href: "/programs-pricing/overview" }, { name: "Overview", href: "/programs-pricing/overview" }]} />
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-14 md:py-20">
          <Reveal>
            <h1 className="display text-3xl md:text-5xl">What is TopServ Digital?</h1>
            <div className="mt-6 grid gap-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Most agencies force you to choose brand or leads, and that is the
                wrong decision. Lead generation agencies sell you a phone that
                rings until the budget stops. SEO vendors sell you rankings that
                a competitor or an algorithm can take back. Performance media
                buyers sell you efficiency inside a system where every year the
                clicks cost more and mean less.
              </p>
              <p>
                Performance only marketing breaks down because it captures
                demand without ever creating any. You compete for the same
                searches as everyone else, and the platform auctions you to the
                highest bidder. Brand without demand capture does not scale
                either. Familiarity that never meets a booking flow is a
                billboard, not a growth system.
              </p>
              <p>
                Home service growth requires both, run as 1 system. That is
                BrandFormance, and TopServ Digital is where it lives.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-label="Overview video" className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <VideoSlot title={videoSlots.jbOverview.title} length={videoSlots.jbOverview.length} />
        </div>
      </section>

      <section aria-labelledby="equation-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <h2 id="equation-heading" className="display text-center text-3xl md:text-4xl">
              The whole idea, in 3 lines
            </h2>
          </Reveal>
          <div className="mt-10">
            <BfEquation />
          </div>
        </div>
      </section>

      <section aria-labelledby="engine-heading" className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-14 md:py-20">
          <Reveal>
            <h2 id="engine-heading" className="display text-3xl md:text-4xl">
              The content engine
            </h2>
            <div className="mt-6 grid gap-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                We research the exact questions your customers ask before they
                buy. What does it cost. What goes wrong. Which option fits my
                house. Who should I not hire. Then we answer them on camera and
                in writing with full transparency, including the answers most
                companies in your market refuse to give.
              </p>
              <p>
                Answering the questions competitors avoid does 3 things. It
                raises trust before the first call. It raises conversion,
                because a customer who arrives educated buys with less friction.
                And it raises the efficiency of every ad dollar, because your
                spend lands on people who already believe you are the honest one
                in the market.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="fit-heading" className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <h2 id="fit-heading" className="display text-3xl md:text-4xl">
              Who this is for. And who it is not.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              We would rather disqualify you honestly than onboard you wrongly.
              If the right column describes you, we are not your agency, and
              that is fine.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-brand/40 bg-background p-7">
              <p className="label-mono text-brand">Built for</p>
              <ul className="mt-4 grid gap-3">
                {builtFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-relaxed">
                    <Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-background p-7">
              <p className="label-mono text-ink-faint">Not for</p>
              <ul className="mt-4 grid gap-3">
                {notFor.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground"
                  >
                    <X className="mt-1 size-4 shrink-0 text-ink-faint" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
            Sweet spot: roughly $1M to $10M in annual revenue, as guidance
            rather than a gate. We have worked successfully above and below it.
            The Brand Score does the actual qualifying.
          </p>
          <div className="mt-10">
            <VideoSlot
              title={videoSlots.whoThisIsNotFor.title}
              length={videoSlots.whoThisIsNotFor.length}
            />
          </div>
        </div>
      </section>

      <FaqSection faqs={generalFaqs} title="The questions we get asked" />

      <section aria-label="Next step" className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-12">
          <p className="max-w-xl text-xl font-semibold">
            See how BrandFormance works in practice.
          </p>
          <Button asChild size="lg" className="text-base">
            <Link href="/programs-pricing/how-it-works">How it works</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
