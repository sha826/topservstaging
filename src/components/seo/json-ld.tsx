import { assetOrigin, siteConfig } from "@/lib/site-config";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so data can never break out of the script tag, even if a
      // future title contains "</script>".
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const { company, social } = siteConfig;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: company.address.street,
  addressLocality: company.address.city,
  addressRegion: company.address.region,
  postalCode: company.address.postalCode,
  addressCountry: company.address.country,
};

/**
 * Primary entity block — emitted once, on the homepage.
 * ProfessionalService (a LocalBusiness subtype) fits an agency with a
 * physical address better than a bare Organization.
 */
/**
 * The company node. Every other node on the site points at this @id as its
 * provider, publisher or author's employer, so it has to exist on the same
 * page as the node that references it: a reference to an @id that is not in
 * the page's graph resolves to nothing. It used to be rendered on the home
 * page alone, which left the Service nodes on /services and /industries, the
 * Article nodes on the blog, and every VideoObject pointing at a node that
 * was not there.
 *
 * Rendered site wide from the root layout now, with the WebSite node beside
 * it, per SEO-GUIDELINES 7.1.
 *
 * The @id stays /#organization. The guidelines write it /#org, but the
 * string only has to be stable and internally consistent, and every
 * reference in this file already uses /#organization. Raised, not silently
 * switched.
 */
const organizationNode = {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        alternateName: company.formerName,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: `${assetOrigin}/images/topserv-logo.png`,
        image: `${assetOrigin}${siteConfig.ogImage}`,
        telephone: company.phone,
        email: company.email,
        foundingDate: String(company.foundedYear),
        founder: {
          "@type": "Person",
          name: company.founder,
        },
        address: postalAddress,
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
        knowsAbout: [
          "HVAC marketing",
          "Plumbing marketing",
          "Roofing marketing",
          "Electrical contractor marketing",
          "Garage door marketing",
          "Pest control marketing",
          "Video marketing",
          "Local SEO",
          "Google Local Services Ads",
        ],
        sameAs: Object.values(social),
        priceRange: "$$$",
} as const;

/**
 * The site itself, as distinct from the company that publishes it.
 *
 * No potentialAction/SearchAction: there is no site search, and 7.1's iron
 * rule is that schema states only what is visibly true.
 */
const webSiteNode = {
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.metaDescription,
  inLanguage: "en-US",
  publisher: { "@id": `${siteConfig.url}/#organization` },
} as const;

/**
 * The site wide graph: 1 script, both nodes, on every page. Mounted in the
 * root layout, so page level components only ever have to reference the @ids
 * rather than restate the company.
 */
export function SiteGraphJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [organizationNode, webSiteNode],
      }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url,
        serviceType: name,
        provider: {
          "@id": `${siteConfig.url}/#organization`,
        },
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
      }}
    />
  );
}

export function FAQJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${siteConfig.url}${item.href}`,
        })),
      }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url,
        image: image || `${assetOrigin}${siteConfig.ogImage}`,
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
          "@type": "Person",
          name: authorName,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      }}
    />
  );
}

/** Every client film and case-study video becomes an indexed, citable asset. */
export function VideoJsonLd({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  embedUrl,
  duration,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate?: string;
  embedUrl: string;
  duration?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name,
        description,
        thumbnailUrl,
        uploadDate,
        embedUrl,
        duration,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      }}
    />
  );
}
