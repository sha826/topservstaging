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

// Pricing model confirmed by the TopServ team (July 2026 program lineup).
// Programs are matched to a company's BRAND EQUITY STAGE, diagnosed from
// heat-map, SEMrush, and branded-search data on the discovery call — the
// client doesn't self-select. Billed weekly; every program starts with the
// one-time $10,000 activation & onboarding in month one.
export const pricingTiers = [
  {
    slug: "establish",
    name: "Establish",
    pricePerWeek: 1000,
    stage: "Stage 1 · Unknown",
    stageDescription: "The market doesn't know you yet. Every lead is a paid fight.",
    tagline: "Get on the map, get found, and start building a name worth knowing.",
    outcome:
      "Stop renting every lead. Build the foundation that makes leads cheaper over time.",
    features: [
      "Performance-weighted media to keep the phone ringing now",
      "SEO build where the map is weak",
      "PPC + LSA lead capture",
      "Brand foundation growing underneath",
    ],
  },
  {
    slug: "amplify",
    name: "Amplify",
    pricePerWeek: 1625,
    stage: "Stage 2 · Name Recognition",
    stageDescription: "The market knows the name but doesn't yet call first.",
    tagline: "You're known. Turn that recognition into preference and take share.",
    outcome:
      "Become the name people prefer, not just recognize. Lower cost per lead as the brand carries more.",
    features: [
      "Balanced brand and performance",
      "Heavier content and video cadence",
      "PPC + LSA + Meta",
      "Reach and frequency across the market",
    ],
  },
  {
    slug: "dominate",
    name: "Dominate",
    pricePerWeek: 2375,
    stage: "Stage 3 · Household Name",
    stageDescription: "When something breaks, you're the first call. Leads cost next to nothing.",
    tagline: "Own the market. Be the default choice before anyone opens Google.",
    outcome:
      "Five Mile Famous: the brand does the heavy lifting and paid lead capture drops toward nothing.",
    features: [
      "Brand-weighted, full multichannel",
      "Maximum content and video volume",
      "PPC + LSA + Meta + YouTube + TikTok",
      "Market domination, default-choice status",
    ],
  },
] as const;

/** One-time month-one activation, identical on every program. */
export const activation = {
  name: "Onboarding",
  price: 10000,
  // Spec: covers the shoot, travel and first month of build. Never a "fee".
  summary:
    "One time, in month 1, on every program: the 2 day on-site video shoot and evergreen content library, travel, pre-shoot strategy build, editing, and the first month of build. Your weekly program takes over in month 2.",
} as const;

export const everyProgramIncludes = [
  "The full Brandformance system",
  "The two-day video shoot and an evergreen content library",
  "SEO, paid media, automation, and lead capture",
] as const;
