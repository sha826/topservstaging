import type { NextConfig } from "next";

// 301 map from the old Webflow site's URLs. Old legal-page URLs are preserved
// as-is (same slugs exist here), so they need no entries.
const OLD_SERVICE_SLUGS: Record<string, string> = {
  "video-marketing-for-home-service-companies": "video-marketing",
  "paid-advertising-for-home-service-companies": "paid-advertising",
  "graphic-design-solutions-for-home-service-companies": "graphic-design",
  "web-development-for-home-service-companies": "web-development",
  "email-marketing-for-home-service-companies": "email-marketing",
  "seo-services-for-home-service-companies": "seo",
  "social-media-marketing-for-home-service-companies": "social-media-marketing",
  "automation-solutions-for-home-service-companies": "automation",
  "local-services-ads-lsa-for-home-service-companies": "local-services-ads",
  "geofencing-marketing-for-home-service-companies": "geofencing",
};

const TRADES = ["hvac", "plumbing", "roofing", "electrical", "garage-door", "pest-control"];

const CASE_STUDY_SLUGS: Record<string, string> = {
  "all-heart-case-study": "all-heart",
  "flow-pros-case-study": "flow-pros-plumbing",
  "the-problem-solvers-case-study": "the-problem-solvers",
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
      },
    ],
  },
  async redirects() {
    return [
      ...Object.entries(OLD_SERVICE_SLUGS).map(([oldSlug, newSlug]) => ({
        source: `/services/${oldSlug}`,
        destination: `/services/${newSlug}`,
        permanent: true,
      })),
      ...TRADES.map((trade) => ({
        source: `/digital-marketing-services/digital-marketing-for-${trade}-companies`,
        destination: `/industries/${trade}`,
        permanent: true,
      })),
      // Case studies existed at both nested and top-level URLs.
      ...Object.entries(CASE_STUDY_SLUGS).flatMap(([oldSlug, newSlug]) => [
        {
          source: `/about/case-studies/${oldSlug}`,
          destination: `/case-studies/${newSlug}`,
          permanent: true,
        },
        {
          source: `/${oldSlug}`,
          destination: `/case-studies/${newSlug}`,
          permanent: true,
        },
      ]),
      { source: "/about/case-studies", destination: "/case-studies", permanent: true },
      { source: "/about/team", destination: "/about", permanent: true },
      { source: "/topserv-digital-testimonials", destination: "/about", permanent: true },
      { source: "/spotlight", destination: "/about", permanent: true },
      // BrandFormance restructure: pricing lives inside the Programs hub now.
      { source: "/pricing", destination: "/programs-pricing/pricing", permanent: true },
      // Spec v2: the public diagnostic is the Brand Assessment (grade only).
      { source: "/brand-score", destination: "/brand-assessment", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
