import type { Metadata } from "next";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { VideoSlot } from "@/components/sections/video-slot";
import { threePhases, videoSlots } from "@/lib/bf-content";

export const metadata: Metadata = {
  title: "The BrandFormance Execution Model",
  description:
    "How does TopServ actually execute BrandFormance in a home service business? The 3 phases, what we do, what you provide, and what progress looks like.",
  alternates: { canonical: "/programs-pricing/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Programs and Pricing", href: "/programs-pricing/overview" }, { name: "How It Works", href: "/programs-pricing/how-it-works" }]} />
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-14 md:py-20">
          <Reveal>
            <h1 className="display text-3xl md:text-5xl">
              The BrandFormance execution model
            </h1>
            <div className="mt-6 grid gap-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Most agencies keep their process vague on purpose, because
                vagueness hides thin work. We do the opposite. Here is exactly
                what happens, in what order, and why the order matters. The 6
                stages of the Method nest inside 3 phases, and every phase
                states what we do, what you provide, and what progress looks
                like.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="phases-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <h2 id="phases-heading" className="sr-only">
            The 3 phases
          </h2>
          <div className="grid gap-6">
            {threePhases.map((phase, i) => (
              <Reveal key={phase.n} delay={Math.min(i * 0.06, 0.2)}>
                <article className="rounded-lg border border-border bg-card p-7 md:p-9">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="display text-2xl md:text-3xl">
                      <span className="mr-3 text-brand">{phase.n}.</span>
                      {phase.name}
                    </h3>
                    <p className="label-mono text-ink-faint">
                      {phase.timing} · stages: {phase.stages}
                    </p>
                  </div>
                  <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                    {phase.covers}
                  </p>
                  <dl className="mt-6 grid gap-5 md:grid-cols-3">
                    <div>
                      <dt className="label-mono text-brand">What TopServ does</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {phase.topserv}
                      </dd>
                    </div>
                    <div>
                      <dt className="label-mono text-brand">What you provide</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {phase.client}
                      </dd>
                    </div>
                    <div>
                      <dt className="label-mono text-brand">What progress looks like</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {phase.progress}
                      </dd>
                    </div>
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Process video" className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <VideoSlot
            title={videoSlots.processWalkthrough.title}
            length={videoSlots.processWalkthrough.length}
          />
        </div>
      </section>

      <section aria-labelledby="loop-heading" className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-14 text-center md:py-20">
          <Reveal>
            <RefreshCw className="mx-auto size-8 text-brand" aria-hidden />
            <h2 id="loop-heading" className="display mt-4 text-3xl md:text-4xl">
              The loop is continuous
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Brand feeds performance. Performance data informs brand. What
              people search after seeing your content tells us what to make
              next, and what converts tells us where the brand is working.
              Neither side runs alone again.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Next step">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-12">
          <p className="max-w-xl text-xl font-semibold">
            See what actually improves when BrandFormance is working.
          </p>
          <Button asChild size="lg" className="text-base">
            <Link href="/programs-pricing/what-this-delivers">What this delivers</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
