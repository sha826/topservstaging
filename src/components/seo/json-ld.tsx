import { siteConfig } from "@/lib/site-config";

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
export function ProfessionalServiceJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        alternateName: company.formerName,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: `${siteConfig.url}/images/topserv-logo.png`,
        image: `${siteConfig.url}${siteConfig.ogImage}`,
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
        image: image || `${siteConfig.url}${siteConfig.ogImage}`,
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
