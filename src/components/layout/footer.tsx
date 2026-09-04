import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/icons/social";
import { siteConfig } from "@/lib/site-config";

/**
 * Site footer.
 *
 * Curated, not a sitemap dump (SEO Guidelines 6.7): the main pages, the
 * assessment, the founder page, the podcast, contact and legal. The 6
 * industry pages were removed here on request. They keep their inbound links
 * from the service pages, so nothing is orphaned, and the footer stops
 * carrying a second navigation the size of the first.
 *
 * 3 bands: the conversion band, which repeats the site's single primary CTA
 * rather than inventing a competing one (Guidelines 6.2), the link grid, and
 * the legal bar. Every column starts on the same baseline and every link uses
 * the same primitive, which is what the previous revision got wrong: 4
 * unequal columns with a second heading buried inside the third.
 */

const SOCIALS = [
  { name: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedInIcon },
  { name: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { name: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { name: "YouTube", href: siteConfig.social.youtube, Icon: YouTubeIcon },
] as const;

const COLUMNS = [
  {
    title: "Programs",
    label: "Programs and Pricing",
    links: [
      { href: "/programs-pricing/overview", label: "Overview" },
      { href: "/programs-pricing/how-it-works", label: "How It Works" },
      { href: "/programs-pricing/what-this-delivers", label: "What This Delivers" },
      { href: "/programs-pricing/pricing", label: "Pricing" },
      { href: "/programs-pricing/success-stories", label: "Success Stories" },
    ],
  },
  {
    title: "Methodology",
    label: "The methodology",
    links: [
      { href: "/brandformance", label: "BrandFormance" },
      { href: "/method", label: "The Method" },
      { href: "/brand-assessment", label: "Brand Assessment" },
      { href: "/case-studies", label: "Case Studies" },
    ],
  },
  {
    title: "Company",
    label: "Company",
    links: [
      { href: "/about", label: "About" },
      // Varied anchor: the home page says "About Jonathan" and /about says
      // "More on Jonathan", so the footer carries the entity name itself
      // (Guidelines 6.3, and 3.7 on entity consistency).
      { href: "/jonathan", label: "Jonathan Bannister" },
      { href: "/blog", label: "Blog" },
      { href: "/news", label: "News" },
      { href: "/contact", label: "Contact" },
      { href: siteConfig.podcast.url, label: `${siteConfig.podcast.name} Podcast` },
    ],
  },
] as const;

const LINK =
  "text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60";

export function Footer() {
  const { company } = siteConfig;

  return (
    <footer className="border-t border-border bg-card">
      {/* The conversion band. 1 primary CTA, 1 secondary, same pair as every
          other page ending. */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="display text-3xl leading-tight md:text-4xl">
              Find out where your brand actually stands
              <span className="text-brand">.</span>
            </p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
              The Brand Assessment returns a grade, and the grade tells you
              where your next marketing dollar should go.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/brand-assessment">
                Get your Brand Grade
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={siteConfig.booking.discoveryCall}>Book a discovery call</a>
            </Button>
          </div>
        </div>
      </div>

      {/* The link grid. 12 columns so the brand block and the 3 navs share 1
          set of gutters and 1 baseline. */}
      <div className="mx-auto grid max-w-6xl gap-x-8 gap-y-12 px-5 py-14 md:grid-cols-12">
        <div className="md:col-span-4 lg:col-span-3">
          <p className="flex items-baseline gap-1.5">
            <span className="display text-3xl leading-none text-brand-blue">TOPSERV</span>
            <span className="display text-3xl leading-none text-brand">DIGITAL</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {siteConfig.tagline}. Brand building and performance marketing run
            as 1 system for residential home service companies.
          </p>
          <ul className="mt-6 flex gap-2.5">
            {SOCIALS.map(({ name, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  aria-label={`TopServ Digital on ${name}`}
                  className="flex size-11 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                >
                  <Icon className="size-4" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {COLUMNS.map((column) => (
          <nav
            key={column.title}
            aria-label={column.label}
            className="md:col-span-4 lg:col-span-2"
          >
            <h2 className="label-mono text-brand">{column.title}</h2>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("/") ? (
                    <Link href={link.href} className={LINK}>
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className={LINK}>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="md:col-span-4 lg:col-span-3">
          <h2 className="label-mono text-brand">Visit or call</h2>
          <address className="mt-5 text-sm not-italic leading-relaxed text-muted-foreground">
            {company.address.street}
            <br />
            {company.address.city}, {company.address.region} {company.address.postalCode}
          </address>
          <p className="mt-4">
            <a
              href={`tel:${company.phone}`}
              className="text-lg font-semibold text-foreground transition-colors hover:text-brand"
            >
              {company.phoneDisplay}
            </a>
          </p>
          <p className="mt-1">
            <a href={`mailto:${company.email}`} className={LINK}>
              {company.email}
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-ink-faint">
            {/* Literal year: statically generated pages would freeze a computed
                one at build time anyway (same rationale as yearsInBusiness). */}
            © 2026 TopServ Digital. Formerly {company.formerName}.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="text-xs text-ink-faint transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-xs text-ink-faint transition-colors hover:text-foreground">
              Terms &amp; Conditions
            </Link>
            <Link href="/refund-policy" className="text-xs text-ink-faint transition-colors hover:text-foreground">
              Refund Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
