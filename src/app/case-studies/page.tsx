import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case Studies — Real Numbers From Real Clients",
  description:
    "TopServ Digital case studies with actual data: Flow Pros Plumbing's 1,000 → 136,500 monthly visits in five months, All Heart's million-dollar months, and more.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Case Studies", href: "/case-studies" },
        ]}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-20 md:pt-28">
          <Reveal>
            <p className="label-mono text-brand">Case studies</p>
            <h1 className="display mt-4 text-5xl md:text-7xl">
              Numbers, not adjectives<span className="text-brand">.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              What actually happened when home service companies ran the
              TopServ system — with the baseline, the work, and the result.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="All case studies">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <ul className="grid gap-5">
            {caseStudies.map((study, i) => (
              <li key={study.slug}>
                <Reveal delay={Math.min(i * 0.06, 0.2)}>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="group grid gap-6 rounded-lg border border-border bg-card p-7 transition-colors hover:border-brand md:grid-cols-[1.5fr_1fr] md:p-8"
                  >
                    <div>
                      <p className="label-mono text-muted-foreground">
                        {study.client} · {study.trade}
                        {study.location ? ` · ${study.location}` : ""}
                      </p>
                      <h2 className="display mt-3 text-3xl leading-tight">{study.headline}</h2>
                      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                        {study.problem}
                      </p>
                      <span className="label-mono mt-5 inline-flex items-center gap-2 text-brand">
                        Read the case study
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                      </span>
                    </div>
                    <dl className="grid content-center gap-5 border-t border-border pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                      {study.stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col-reverse">
                          <dt className="mt-0.5 text-sm text-muted-foreground">{stat.label}</dt>
                          <dd className="display text-3xl text-brand">{stat.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
