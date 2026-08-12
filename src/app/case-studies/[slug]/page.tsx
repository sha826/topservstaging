import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd, VideoJsonLd } from "@/components/seo/json-ld";
import { VideoFacade } from "@/components/video/video-facade";
import {
  ActHeader,
  ApproachList,
  CascadeHeadline,
  SmartStat,
} from "@/components/case-study/case-study-bits";
import { caseStudies } from "@/lib/case-studies";
import { portfolioVideos, type PortfolioVideo } from "@/lib/videos";
import { siteConfig } from "@/lib/site-config";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return {
    title: `${study.client} Case Study — ${study.headline}`,
    description: study.problem,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(study.headline)}&eyebrow=${encodeURIComponent(`Case Study · ${study.client}`)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();
  const videos = (study.videoIds ?? [])
    .map((id) => portfolioVideos.find((v) => v.id === id))
    .filter((v): v is PortfolioVideo => Boolean(v));
  const related = caseStudies.filter((s) => s.slug !== study.slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Case Studies", href: "/case-studies" },
          { name: study.client, href: `/case-studies/${study.slug}` },
        ]}
      />
      {videos.map((v) => (
        <VideoJsonLd
          key={v.id}
          name={v.title}
          description={`${v.kind} produced by TopServ Digital for ${v.client}.`}
          thumbnailUrl={v.thumbnail}
          uploadDate={v.uploadDate}
          embedUrl={v.embedUrl}
        />
      ))}

      {/* Hero: blueprint backdrop + count-up stats */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="grid-drift pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 md:pt-28">
          <Reveal>
            <p className="label-mono text-brand">
              Case study · {study.client}
              {study.location ? ` · ${study.location}` : ""}
              {study.timeline ? ` · ${study.timeline}` : ""}
            </p>
          </Reveal>
          <CascadeHeadline
            text={study.headline}
            className="display mt-4 max-w-3xl text-5xl md:text-6xl"
          />
          <Reveal delay={0.35}>
            <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-3">
              {study.stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="display text-4xl text-brand md:text-5xl">
                    <SmartStat value={stat.value} />
                  </dd>
                  <dt className="mt-1 text-sm text-muted-foreground">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Act I — the starting line */}
      <section aria-labelledby="problem-heading" className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <ActHeader act="Act I" title="The starting line" headingId="problem-heading" />
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {study.problem}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Act II — what we ran */}
      <section aria-labelledby="approach-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <ActHeader act="Act II" title="What we ran" headingId="approach-heading" />
          <ApproachList items={[...study.approach]} />
        </div>
      </section>

      {/* Act III — where it landed */}
      <section aria-labelledby="outcome-heading" className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <ActHeader act="Act III" title="Where it landed" headingId="outcome-heading" />
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {study.outcome}
            </p>
          </Reveal>
          {videos.length > 0 && (
            <Reveal delay={0.2}>
              <div className={`relative mt-10 ${videos.length > 1 ? "max-w-4xl" : "max-w-2xl"}`}>
                <div
                  aria-hidden
                  className="absolute -inset-8 z-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(14,125,193,0.26),transparent_70%)] blur-2xl"
                />
                <div className="relative z-10">
                  <p className="label-mono mb-4 text-brand">
                    The film{videos.length > 1 ? "s" : ""} we made together
                  </p>
                  <div className={videos.length > 1 ? "grid gap-6 md:grid-cols-2" : ""}>
                    {videos.map((v) => (
                      <VideoFacade key={v.id} video={v} />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* More proof */}
      <section aria-labelledby="related-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <p className="label-mono text-brand">More proof</p>
            <h2 id="related-heading" className="display mt-2 text-3xl">
              Other campaigns, same system
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {related.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08} className="h-full">
                <Link
                  href={`/case-studies/${s.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-border bg-card p-7 transition-colors hover:border-brand"
                >
                  <p className="label-mono text-muted-foreground">
                    {s.client}
                    {s.location ? ` · ${s.location}` : ""}
                  </p>
                  <h3 className="display mt-3 text-2xl">{s.headline}</h3>
                  <span className="label-mono mt-auto flex items-center gap-2 pt-4 text-brand">
                    Read the case study
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

      {/* CTA */}
      <section aria-labelledby="cs-cta-heading">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center">
          <Reveal>
            <h2 id="cs-cta-heading" className="display text-4xl md:text-5xl">
              Your market. Your version of this<span className="text-brand">.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              We&apos;ll look at your radius before the call and tell you what
              the same system would target first.
            </p>
            <div className="mt-7">
              <Button asChild size="lg" className="text-base">
                <a href={siteConfig.booking.discoveryCall}>
                  Book a discovery call
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
