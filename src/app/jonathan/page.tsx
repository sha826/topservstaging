import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Jonathan Bannister, Creator of BrandFormance",
  description:
    "Jonathan Bannister founded TopServ Digital in 2016 and created BrandFormance, the methodology that combines brand building with performance marketing for home service companies.",
  alternates: { canonical: "/jonathan" },
};

export default function JonathanPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About Jonathan", href: "/jonathan" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${siteConfig.url}/jonathan#person`,
          name: "Jonathan Bannister",
          jobTitle: "Founder",
          worksFor: { "@id": `${siteConfig.url}/#organization` },
          url: `${siteConfig.url}/jonathan`,
          knowsAbout: [
            "BrandFormance",
            "Home service marketing",
            "Brand building",
            "Performance marketing",
            "Video marketing",
          ],
        }}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-20 md:pt-28">
          <Reveal>
            <p className="label-mono text-brand">About Jonathan</p>
            <h1 className="display mt-4 text-5xl md:text-7xl">
              The person behind the methodology<span className="text-brand">.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Jonathan Bannister founded TopServ Digital in 2016 and created
              BrandFormance after a decade inside home service marketing,
              watching good companies rank, advertise, and still lose to the
              name the customer already knew.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="doctrine-heading" className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-14 md:py-20">
          <Reveal>
            <h2 id="doctrine-heading" className="display text-3xl md:text-4xl">
              What he stands against
            </h2>
            <div className="mt-6 grid gap-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Jonathan calls lead dependency digital heroin. Stop paying and
                the leads stop. Lose rankings and the phone slows. The industry
                sells that dependency as a service, renews it monthly, and
                calls it marketing.
              </p>
              <p>
                BrandFormance is the argument against it: build a brand the
                market knows, trusts and remembers, capture the demand that
                familiarity creates, and measure the whole thing by 1 number
                that matters, cost per booked call.
              </p>
              <p>
                He says all of this on camera, at length, on this site. Not
                because the company is about him, but because trust transfers
                from a person before it transfers to a logo. TopServ is the
                institution. Jonathan is the voice that built it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="work-heading" className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <h2 id="work-heading" className="display text-3xl md:text-4xl">
              Where the thinking lives
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-background p-6">
              <p className="label-mono text-brand">The book</p>
              <p className="display mt-2 text-2xl">F#CK Digital Marketing</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The case against renting attention, and the playbook for owning
                it. Coming to this site soon.
              </p>
            </div>
            <a
              href={siteConfig.podcast.url}
              className="rounded-lg border border-border bg-background p-6 transition-colors hover:border-brand"
            >
              <p className="label-mono text-brand">The podcast</p>
              <p className="display mt-2 text-2xl">{siteConfig.podcast.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Conversations with home service operators about what actually
                grows a company.
              </p>
            </a>
            <Link
              href="/brandformance"
              className="rounded-lg border border-border bg-background p-6 transition-colors hover:border-brand"
            >
              <p className="label-mono text-brand">The methodology</p>
              <p className="display mt-2 text-2xl">BrandFormance</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The definitive resource: 10 questions, answered in order.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="Next step">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-12">
          <p className="max-w-xl text-xl font-semibold">
            The methodology matters more than the person. Start there.
          </p>
          <Button asChild size="lg" className="text-base">
            <Link href="/brand-assessment">Get your Brand Grade</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
