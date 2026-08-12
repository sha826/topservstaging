export interface Service {
  slug: string;
  name: string;
  shortName: string;
  description: string;
}

export interface Industry {
  slug: string;
  name: string;
  trade: string;
  description: string;
}

export const services: Service[] = [
  {
    slug: "video-marketing",
    name: "Video Marketing",
    shortName: "Video",
    description:
      "Brand films, customer testimonial videos, technician spotlights, and ad creative — produced on site for home service brands and cut for every platform.",
  },
  {
    slug: "paid-advertising",
    name: "Paid Advertising",
    shortName: "Paid Ads",
    description:
      "Google Ads, Meta, YouTube, and TikTok campaigns engineered around booked jobs and revenue, not clicks and impressions.",
  },
  {
    slug: "seo",
    name: "SEO for Home Services",
    shortName: "SEO",
    description:
      "Local and organic search that puts you in front of homeowners: service pages, location pages, and Google Business Profile optimization.",
  },
  {
    slug: "local-services-ads",
    name: "Local Services Ads (LSA)",
    shortName: "LSA",
    description:
      "Google Guaranteed leads managed end to end — profile optimization, review velocity, and dispute handling so you only pay for real jobs.",
  },
  {
    slug: "web-development",
    name: "Web Design & Development",
    shortName: "Websites",
    description:
      "Fast, conversion-focused websites built to rank and book jobs — and you own every asset outright, forever.",
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    shortName: "Social",
    description:
      "Consistent, on-brand content across the platforms your customers actually scroll, powered by your video library.",
  },
  {
    slug: "email-marketing",
    name: "Email & SMS Marketing",
    shortName: "Email",
    description:
      "Newsletters, seasonal promotions, and automated follow-up that reactivate the customer list you already paid to build.",
  },
  {
    slug: "graphic-design",
    name: "Graphic Design & Branding",
    shortName: "Design",
    description:
      "Logos, truck wraps, uniforms, and sales collateral — a brand system homeowners recognize before the technician rings the doorbell.",
  },
  {
    slug: "automation",
    name: "Marketing Automation & AI",
    shortName: "Automation",
    description:
      "AI chat, missed-call text-back, review requests, and CRM follow-up sequences that never let a lead go cold.",
  },
  {
    slug: "geofencing",
    name: "Geofencing & OTT Advertising",
    shortName: "Geofencing",
    description:
      "Addressable ads on streaming TV, mobile, and display for the exact neighborhoods and households you want to win.",
  },
];

export const industries: Industry[] = [
  {
    slug: "hvac",
    name: "HVAC Marketing",
    trade: "HVAC",
    description:
      "Where TopServ started: demand-season campaigns, maintenance-plan growth, and brand video for heating and air companies.",
  },
  {
    slug: "plumbing",
    name: "Plumbing Marketing",
    trade: "Plumbing",
    description:
      "Emergency-call capture, water-heater and repipe campaigns, and local SEO built around how homeowners actually search for plumbers.",
  },
  {
    slug: "roofing",
    name: "Roofing Marketing",
    trade: "Roofing",
    description:
      "Storm-response campaigns, inspection funnels, and the proof-heavy brand content roofing buyers need before a five-figure decision.",
  },
  {
    slug: "electrical",
    name: "Electrical Marketing",
    trade: "Electrical",
    description:
      "Service-call volume plus high-ticket work: panel upgrades, EV chargers, and generator campaigns for electrical contractors.",
  },
  {
    slug: "garage-door",
    name: "Garage Door Marketing",
    trade: "Garage Door",
    description:
      "Same-day repair capture and installation campaigns in one of the most competitive local-search categories in home services.",
  },
  {
    slug: "pest-control",
    name: "Pest Control Marketing",
    trade: "Pest Control",
    description:
      "Recurring-revenue growth: seasonal campaigns, subscription-plan funnels, and review engines for pest control operators.",
  },
];

export const pricingTiers = [
  {
    slug: "brand-builder",
    name: "BRAND Builder",
    pricePerWeek: 1250,
    revenueBand: "$1M–$2M annual revenue",
    summary:
      "The foundation system: video production, up to 10 website pages in month one plus 4 per month, monthly blog content, reputation management, GBP optimization with weekly posts, PPC & LSA management, retargeting, AI chat and follow-up, and a dedicated account manager.",
  },
  {
    slug: "brand-accelerator",
    name: "BRAND Accelerator",
    pricePerWeek: 2000,
    revenueBand: "$2M–$5M annual revenue",
    summary:
      "The growth system: everything in Builder plus up to 30 pages in month one and 10 per month, monthly vlogs, 4 blogs per month, twice-weekly GBP posts, 6 press releases per year, automated link building, the Brand Equity Domination (BED) Method, and paid media across Google, LSA, Meta, YouTube, and TikTok.",
  },
  {
    slug: "brand-dominator",
    name: "BRAND Dominator",
    pricePerWeek: 2500,
    revenueBand: "$5M–$15M annual revenue",
    summary:
      "The market-leader system: everything in Accelerator plus up to 60 pages in month one and 20 per month, 2 vlogs per month, 8 blogs per month, 4 weekly GBP posts, and 12 press releases per year.",
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    pricePerWeek: null,
    revenueBand: "$15M+ annual revenue",
    summary:
      "Custom scope for multi-location and franchise operations. One-time $10,000 start-up fee; pricing by consultation.",
  },
] as const;

export const videoIntensive = {
  name: "Two-Day Video Intensive",
  price: 15000,
  summary:
    "A fixed-price production sprint: pre-production planning call, two full on-site shoot days, and a multi-format edit package delivered in about 30 days — a lifetime asset library of brand, testimonial, and recruiting video.",
} as const;
