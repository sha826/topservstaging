import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { VideoSlot } from "@/components/sections/video-slot";
import { sixStages, videoSlots } from "@/lib/bf-content";

export const metadata: Metadata = {
  title: "The Method: The 6 Stage BrandFormance System",
  description:
    "The 6 stage system behind BrandFormance: Position, Build, Create Demand, Capture Demand, Convert, Measure and Optimize. In order, with what happens at each stage.",
  alternates: { canonical: "/method" },
};

export default function MethodPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "The Method", href: "/method" },
        ]}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-20 md:pt-28">
          <Reveal>
            <p className="label-mono text-brand">The Method</p>
            <h1 className="display mt-4 text-5xl md:text-7xl">
              6 stages. 1 system<span className="text-brand">.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              BrandFormance runs in a fixed order, because the order is the
              point. Position before you build. Build before you create demand.
              Create demand before you capture it. Skip a stage and the ones
              after it underperform, which is exactly what happens to companies
              that start with ads.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="stages-heading">
        <div className="mx-auto max-w-3xl px-5 py-14 md:py-20">
          <h2 id="stages-heading" className="sr-only">
            The 6 stages
          </h2>
          <ol className="grid gap-6">
            {sixStages.map((stage) => (
              <li key={stage.n}>
                <Reveal>
                  <article className="rounded-lg border border-border bg-card p-7">
                    <p className="label-mono text-brand">Stage {stage.n}</p>
                    <h3 className="display mt-2 text-3xl">{stage.name}</h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {stage.what}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="famous-heading" className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-3xl px-5 py-14 text-center md:py-20">
          <Reveal>
            <p className="label-mono text-brand">The transformation</p>
            <h2 id="famous-heading" className="display mt-3 text-4xl md:text-5xl">
              Five Mile Famous
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              You do not need the internet to know you. You need the 5 miles
              around your trucks to know you: known, trusted and remembered
              inside the market you can afford to own at frequency. That is
              what the 6 stages build, and it is why the geography comes before
              the budget.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <VideoSlot title="Five Mile Famous" length="3 to 4 minutes" />
            <VideoSlot title="Being Found Is Not Being Chosen" length="3 to 4 minutes" />
          </div>
        </div>
      </section>

      <section aria-label="Method video" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <VideoSlot title={videoSlots.method.title} length={videoSlots.method.length} />
        </div>
      </section>

      <section aria-label="Next step" className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-12">
          <p className="max-w-xl text-xl font-semibold">
            See how the 6 stages become a program for your company.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="text-base">
              <Link href="/programs-pricing/overview">Programs and Pricing</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="/brand-assessment">Get your Brand Grade</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
