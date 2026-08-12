import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { caseStudies } from "@/lib/case-studies";

export function CaseStudyBand() {
  const [featured, ...rest] = caseStudies;

  return (
    <section aria-labelledby="results-heading" className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <p className="label-mono text-brand">Proof</p>
          <h2 id="results-heading" className="display mt-3 text-4xl md:text-5xl">
            Numbers, not adjectives
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <article className="mt-10 rounded-lg border border-brand/40 bg-background p-7 md:p-10">
            <p className="label-mono text-muted-foreground">
              {featured.client} · {featured.trade}
              {featured.timeline ? ` · ${featured.timeline}` : ""}
            </p>
            <h3 className="display mt-3 max-w-2xl text-3xl md:text-4xl">{featured.headline}</h3>
            <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-3">
              {featured.stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="display text-4xl text-brand md:text-5xl">{stat.value}</dd>
                  <dt className="mt-1 text-sm text-muted-foreground">{stat.label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {featured.outcome}
            </p>
            <Link
              href={`/case-studies/${featured.slug}`}
              className="label-mono mt-6 inline-flex items-center gap-2 text-brand transition-colors hover:text-brand-hot"
            >
              Read the full case study
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </article>
        </Reveal>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((study, i) => (
            <Reveal key={study.slug} delay={0.15 + i * 0.05} className="h-full">
              <Link
                href={`/case-studies/${study.slug}`}
                className="group flex h-full flex-col rounded-lg border border-border bg-background p-7 transition-colors hover:border-brand"
              >
                <p className="label-mono text-muted-foreground">
                  {study.client}
                  {study.location ? ` · ${study.location}` : ""}
                </p>
                <h3 className="display mt-3 text-2xl">{study.headline}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {study.outcome}
                </p>
                <span className="label-mono mt-auto flex items-center gap-2 pt-4 text-brand">
                  Read more
                  <ArrowRight
                    className="size-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
