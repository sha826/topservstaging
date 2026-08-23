import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/icons/social";
import { industries } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

const SOCIALS = [
  { name: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedInIcon },
  { name: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { name: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { name: "YouTube", href: siteConfig.social.youtube, Icon: YouTubeIcon },
] as const;

export function Footer() {
  const { company } = siteConfig;

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <p className="flex items-baseline gap-1.5">
            <span className="display text-3xl leading-none text-brand-blue">TOPSERV</span>
            <span className="display text-3xl leading-none text-brand">DIGITAL</span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {siteConfig.description}
          </p>
          <ul className="mt-6 flex gap-3">
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

        <nav aria-label="Programs and Pricing">
          <h2 className="label-mono text-brand">Programs &amp; Pricing</h2>
          <ul className="mt-4 space-y-2.5">
            {[
              { href: "/programs-pricing/overview", label: "Overview" },
              { href: "/programs-pricing/how-it-works", label: "How It Works" },
              { href: "/programs-pricing/what-this-delivers", label: "What This Delivers" },
              { href: "/programs-pricing/pricing", label: "Pricing" },
              { href: "/programs-pricing/success-stories", label: "Success Stories" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring/60"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Industries">
          <h2 className="label-mono text-brand">Industries</h2>
          <ul className="mt-4 space-y-2.5">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring/60"
                >
                  {industry.name}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="label-mono mt-8 text-brand">Company</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/brandformance" className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring/60">
                BrandFormance
              </Link>
            </li>
            <li>
              <Link href="/method" className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring/60">
                The Method
              </Link>
            </li>
            <li>
              <Link href="/programs-pricing/overview" className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring/60">
                Programs &amp; Pricing
              </Link>
            </li>
            <li>
              <Link href="/brand-score" className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring/60">
                Brand Score
              </Link>
            </li>
            <li>
              <Link href="/case-studies" className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring/60">
                Case Studies
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring/60">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring/60">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring/60">
                Contact
              </Link>
            </li>
            <li>
              <a href={siteConfig.podcast.url} className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring/60">
                {siteConfig.podcast.name} Podcast
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="label-mono text-brand">Visit or call</h2>
          <address className="mt-4 text-sm not-italic leading-relaxed text-muted-foreground">
            {company.address.street}
            <br />
            {company.address.city}, {company.address.region} {company.address.postalCode}
          </address>
          <p className="mt-4 text-sm">
            <a href={`tel:${company.phone}`} className="font-semibold text-foreground transition-colors hover:text-brand">
              {company.phoneDisplay}
            </a>
          </p>
          <p className="mt-1 text-sm">
            <a href={`mailto:${company.email}`} className="text-muted-foreground transition-colors hover:text-foreground">
              {company.email}
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5">
          <p className="text-xs text-ink-faint">
            {/* Literal year: statically generated pages would freeze a computed
                one at build time anyway (same rationale as yearsInBusiness). */}
            © 2026 TopServ Digital. Formerly {company.formerName}.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-4">
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
          <p className="label-mono text-ink-faint">Built on video. Backed by strategy.</p>
        </div>
      </div>
    </footer>
  );
}
