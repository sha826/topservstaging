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

// Pricing per spec v2: NO price table anywhere. The floor, the activation,
// and the scope factors live in src/lib/bf-content.ts (pricingModel).
// Program names and internal rates belong to the sales console, not the site.
