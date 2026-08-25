import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { BrandAssessmentForm } from "@/components/sections/brand-assessment-form";
import { brandGrades } from "@/lib/bf-content";

export const metadata: Metadata = {
  title: "Get Your Brand Grade",
  description:
    "The Brand Assessment reads how strong your home service brand actually is in its market and returns 1 of 4 grades, with what it means for your business and the right next step.",
  alternates: { canonical: "/brand-assessment" },
};

export default function BrandAssessmentPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Brand Assessment", href: "/brand-assessment" },
        ]}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-20 md:pt-28">
          <Reveal>
            <p className="label-mono text-brand">The assessment</p>
            <h1 className="display mt-4 text-5xl md:text-7xl">
              How strong is your brand<span className="text-brand">?</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Not how strong it feels. How strong it reads in your market.
              The Brand Assessment returns your Brand Grade: 1 of 4 honest
              answers about where your company actually stands, each with a
              consequence for how you should spend your next marketing
              dollar. A grade with a consequence beats a number without
              context.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="grades-heading" className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <h2 id="grades-heading" className="display text-3xl md:text-4xl">
              The 4 grades
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Straight from the book. Every company in your market sits in
              exactly 1 of these.
            </p>
          </Reveal>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {brandGrades.map((g, i) => (
              <li key={g.grade} className="h-full">
                <Reveal delay={Math.min(i * 0.05, 0.2)} className="h-full">
                  <div className="flex h-full flex-col gap-2 rounded-lg border border-border bg-background p-6">
                    <span className="display text-2xl">{g.grade}</span>
                    <p className="text-sm leading-relaxed text-muted-foreground">{g.meaning}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal className="mt-6">
            <p className="max-w-2xl text-sm text-muted-foreground">
              Your grade comes with what it means for your business and the
              right next step. If the honest answer is fix operations before
              marketing, that is the answer you get.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="form-heading" className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:py-20 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <h2 id="form-heading" className="display text-3xl md:text-4xl">
              Get your grade
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Tell us who you are and where you compete. We read your brand
              the way your market reads it and send your grade within 2
              business days.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The optional details sharpen the grade and give the strategy
              call a head start. Skip them and you still get a grade.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <BrandAssessmentForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
