export const siteConfig = {
  name: "TopServ Digital",
  tagline: "The home of BrandFormance",
  // The canonical entity definition. Reused verbatim in visible copy, JSON-LD,
  // and llms.txt so humans and AI systems read the same sentence.
  description:
    "TopServ Digital is the home of BrandFormance, the methodology that combines brand building with performance marketing for residential home service companies: HVAC, plumbing, roofing, electrical, garage door, and pest control contractors across the United States. Founded in 2016 and based in Frisco, Texas, the agency builds brands that create demand, captures that demand through search and paid media, and publishes transparent weekly pricing on its website.",
  // Short form for <meta name="description"> (≤160 chars).
  metaDescription:
    "The home of BrandFormance: brand building plus performance marketing for home service companies. Transparent weekly pricing. Frisco, TX, serving the U.S.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://topservdigital.com",
  ogImage: "/api/og?title=The%20Home%20of%20BrandFormance",
  company: {
    foundedYear: 2016,
    formerName: "Cornerstone Marketing Solutions",
    founder: "Jonathan Bannister",
    phone: "+1-214-429-4245",
    phoneDisplay: "(214) 429-4245",
    email: "info@topservdigital.com",
    address: {
      street: "15222 King Road, Unit 403",
      city: "Frisco",
      region: "TX",
      postalCode: "75036",
      country: "US",
    },
  },
  booking: {
    discoveryCall: "https://book.topservdigital.com/discovery-calendar",
    hvacEbook: "https://book.topservdigital.com/FDM",
  },
  podcast: {
    name: "Home Service Hustle",
    url: "https://homeservicehustle.com",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/topservdigital",
    facebook: "https://www.facebook.com/topservdigitalmarketing",
    instagram: "https://www.instagram.com/topserv_digital/",
    youtube: "https://www.youtube.com/channel/UC-QQfeDXIRff943VKBKmTUw",
    yelp: "https://www.yelp.com/biz/topserv-digital-frisco",
  },
  stats: {
    clients: "200+",
    revenueGenerated: "$89M+",
    // Founded 2016. Kept literal: computing from Date() bakes the build year
    // into prerendered pages and hydration-mismatches when the year rolls over.
    yearsInBusiness: 10,
    teamSize: "50+",
  },
};

export type SiteConfig = typeof siteConfig;
