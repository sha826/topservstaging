import type { Metadata } from "next";
import { CalendarCheck, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to TopServ Digital: (214) 429-4245, info@topservdigital.com, or book a discovery call. Located at 15222 King Road, Unit 403, Frisco, TX 75036.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { company } = siteConfig;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-20 md:pt-28">
          <Reveal>
            <p className="label-mono text-brand">Contact</p>
            <h1 className="display mt-4 text-5xl md:text-7xl">
              Let&apos;s talk<span className="text-brand">.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Send a message below, call us directly, or skip the back-and-forth
              and grab a time on the calendar.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Contact options">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <h2 className="display text-3xl">Send a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We reply within one business day.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-4">
              <div className="rounded-lg border border-brand/40 bg-card p-6">
                <CalendarCheck className="size-5 text-brand" aria-hidden />
                <h2 className="label-mono mt-4 text-muted-foreground">Fastest path</h2>
                <p className="mt-2 text-base font-semibold">
                  30-minute discovery call — we&apos;ll come having already
                  looked at your market.
                </p>
                <Button asChild className="mt-4 w-full">
                  <a href={siteConfig.booking.discoveryCall}>Book a discovery call</a>
                </Button>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <Phone className="size-5 text-brand" aria-hidden />
                <h2 className="label-mono mt-4 text-muted-foreground">Call or text</h2>
                <a
                  href={`tel:${company.phone}`}
                  className="mt-2 block text-lg font-semibold transition-colors hover:text-brand"
                >
                  {company.phoneDisplay}
                </a>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <Mail className="size-5 text-brand" aria-hidden />
                <h2 className="label-mono mt-4 text-muted-foreground">Email</h2>
                <a
                  href={`mailto:${company.email}`}
                  className="mt-2 block text-lg font-semibold break-all transition-colors hover:text-brand"
                >
                  {company.email}
                </a>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <MapPin className="size-5 text-brand" aria-hidden />
                <h2 className="label-mono mt-4 text-muted-foreground">Office</h2>
                <address className="mt-2 text-lg font-semibold not-italic leading-snug">
                  {company.address.street}
                  <br />
                  {company.address.city}, {company.address.region}{" "}
                  {company.address.postalCode}
                </address>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
