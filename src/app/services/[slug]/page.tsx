import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/sections/faq-section";
import { industries, services } from "@/lib/content";
import { serviceCopy } from "@/lib/service-copy";
import { siteConfig } from "@/lib/site-config";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} for Home Service Companies`,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(service.name)}&eyebrow=${encodeURIComponent("Services · TopServ Digital")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const copy = serviceCopy[service.slug];

  return (
    <>
      <ServiceJsonLd
        name={service.name}
        description={service.description}
        url={`${siteConfig.url}/services/${service.slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/" },
          { name: service.name, href: `/services/${service.slug}` },
        ]}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-20 md:pt-28">
          <Reveal>
            <p className="label-mono text-brand">Services</p>
            <h1 className="display mt-4 max-w-3xl text-5xl md:text-6xl">{service.name}</h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-foreground">
              {service.description}
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
                <Link href="/programs-pricing/pricing">See our pricing</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {copy && (
        <section aria-labelledby="included-heading" className="border-b border-border bg-card">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <Reveal>
              <h2 id="included-heading" className="display text-3xl md:text-4xl">
                What&apos;s included
              </h2>
              <ul className="mt-8 grid gap-4 md:grid-cols-2">
                {copy.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
                    <span className="text-base leading-relaxed text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      <section aria-labelledby="trades-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <h2 id="trades-heading" className="display text-3xl">
              Built for your trade
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Every engagement is shaped around the trade it serves — see how{" "}
              {service.shortName.toLowerCase()} fits your industry.
            </p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="label-mono inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 transition-colors hover:border-brand hover:text-brand"
                  >
                    {industry.trade}
                    <ArrowRight className="size-3.5" aria-hidden />
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
          title={`${service.shortName} questions`}
          className="border-b-0"
        />
      )}
    </>
  );
}
