import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/json-ld";
import { BfEquation } from "@/components/sections/bf-equation";
import { VideoSlot } from "@/components/sections/video-slot";
import { tenQuestions, videoSlots } from "@/lib/bf-content";

export const metadata: Metadata = {
  title: "What Is BrandFormance?",
  description:
    "BrandFormance is brand building and performance marketing run as 1 system for home service companies. Brand creates demand, performance captures it, together they build market dominance. The definitive resource for the term.",
  alternates: { canonical: "/brandformance" },
};

export default function BrandformancePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "BrandFormance", href: "/brandformance" },
        ]}
      />
      <FAQJsonLd items={tenQuestions.map((x) => ({ question: x.q, answer: x.a }))} />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-20 md:pt-28">
          <Reveal>
            <p className="label-mono text-brand">The category</p>
            <h1 className="display mt-4 text-5xl md:text-7xl">
              BrandFormance<span className="text-brand">.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Brand building and performance marketing, run as 1 system for
              home service companies. This page is the definitive resource for
              the term: 10 questions, answered in order, with nothing held
              back.
            </p>
          </Reveal>
          <div className="mt-12">
            <BfEquation />
          </div>
        </div>
      </section>

      <section aria-label="What is BrandFormance video" className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <VideoSlot
            title={videoSlots.whatIsBrandformance.title}
            length={videoSlots.whatIsBrandformance.length}
          />
        </div>
      </section>

      <section aria-label="The ten questions">
        <div className="mx-auto max-w-3xl px-5 py-14 md:py-20">
          <ol className="grid gap-12">
            {tenQuestions.map((item, i) => (
              <li key={item.q}>
                <Reveal>
                  <article>
                    <p className="label-mono text-ink-faint">
                      Question {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="display mt-2 text-2xl md:text-3xl">{item.q}</h2>
                    <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{item.a}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label="Next step" className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-12">
          <p className="max-w-xl text-xl font-semibold">
            See the 6 stage system that puts BrandFormance to work.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="text-base">
              <Link href="/method">The Method</Link>
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
