import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/sections/faq-section";
import { industries, services } from "@/lib/content";
import { industryCopy } from "@/lib/industry-copy";
import { siteConfig } from "@/lib/site-config";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return {};
  return {
    title: `${industry.name} — Digital Marketing for ${industry.trade} Companies`,
    description: industry.description,
    alternates: { canonical: `/industries/${industry.slug}` },
    openGraph: {
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(`Marketing for ${industry.trade} Companies`)}&eyebrow=${encodeURIComponent("Industries · TopServ Digital")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) notFound();
  const copy = industryCopy[industry.slug];

  return (
    <>
      <ServiceJsonLd
        name={industry.name}
        description={industry.description}
        url={`${siteConfig.url}/industries/${industry.slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Industries", href: "/" },
          { name: industry.name, href: `/industries/${industry.slug}` },
        ]}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-20 md:pt-28">
          <Reveal>
            <p className="label-mono text-brand">Industries</p>
            <h1 className="display mt-4 max-w-3xl text-5xl md:text-6xl">
              Marketing for {industry.trade} companies
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-foreground">
              {industry.description}
            </p>
            {copy && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {copy.intro}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="text-base">
                <a href={siteConfig.booking.discoveryCall}>
                  Book a discovery call
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base">
                <Link href="/pricing">See our pricing</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {copy && (
        <section aria-labelledby="plays-heading" className="border-b border-border bg-card">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <Reveal>
              <h2 id="plays-heading" className="display text-3xl md:text-4xl">
                How we win in {industry.trade.toLowerCase()}
              </h2>
              <ul className="mt-8 grid gap-4 md:grid-cols-2">
                {copy.plays.map((play) => (
                  <li key={play} className="flex items-start gap-3">
                    <Target className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
                    <span className="text-base leading-relaxed text-muted-foreground">{play}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      <section aria-labelledby="services-for-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <h2 id="services-for-heading" className="display text-3xl">
              What we run for {industry.trade.toLowerCase()} companies
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-center justify-between rounded-md border border-border bg-background px-5 py-4 transition-colors hover:border-brand"
                  >
                    <span className="font-medium">{service.name}</span>
                    <ArrowRight
                      className="size-4 text-brand opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {copy && copy.faqs.length > 0 && (
        <FaqSection
          faqs={copy.faqs}
          title={`${industry.trade} marketing questions`}
          className="border-b-0"
        />
      )}
    </>
  );
}
