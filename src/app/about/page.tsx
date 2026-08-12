import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "TopServ Digital was founded in 2016 by Jonathan Bannister, a former police officer turned entrepreneur. Ten years of marketing for the trades, based in Frisco, TX.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const { company } = siteConfig;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-20 md:pt-28">
          <Reveal>
            <p className="label-mono text-brand">About</p>
            <h1 className="display mt-4 text-5xl md:text-7xl">
              A decade in the trades<span className="text-brand">.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-foreground">
              {siteConfig.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="story-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <h2 id="story-heading" className="display text-4xl">
              The story
            </h2>
            <div className="mt-6 max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                {company.founder} spent his early career as a police officer
                before teaching himself app development and digital marketing.
                In {company.foundedYear} he founded {company.formerName},
                an agency specializing in marketing for HVAC companies — and
                spent the next decade inside the trades, learning how home
                service businesses actually win work.
              </p>
              <p>
                In 2024 the agency rebranded as TopServ Digital, doubling down
                on the thing that sets it apart: professional video production
                as the engine of a contractor&apos;s entire marketing system.
                Today the team serves HVAC, plumbing, roofing, electrical,
                garage door, and pest control companies across the United
                States, and Jonathan hosts the {siteConfig.podcast.name}{" "}
                podcast, interviewing the operators building the industry&apos;s
                best companies.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="about-cta">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center">
          <Reveal>
            <h2 id="about-cta" className="display text-5xl">
              Meet us on a call<span className="text-brand">.</span>
            </h2>
            <div className="mt-7">
              <Button asChild size="lg" className="text-base">
                <a href={siteConfig.booking.discoveryCall}>Book a discovery call</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
