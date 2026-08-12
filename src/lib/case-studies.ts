export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  trade: string;
  location?: string;
  timeline?: string;
  headline: string;
  problem: string;
  approach: string[];
  stats: CaseStudyStat[];
  outcome: string;
  /** Entries in lib/videos.ts to embed as the client's films. */
  videoIds?: string[];
}

// Facts sourced from TopServ's published case studies (fetched Aug 2026).
export const caseStudies: CaseStudy[] = [
  {
    slug: "flow-pros-plumbing",
    client: "Flow Pros Plumbing",
    trade: "Plumbing",
    timeline: "September 2024 – March 2025",
    headline: "From 1,000 to 136,500+ monthly visits in five months",
    problem:
      "When Flow Pros partnered with TopServ in September 2024, their online presence was minimal — roughly 1,000 website visits a month, leaving most of their 15-mile service area untouched.",
    approach: [
      "Full website and Google Business Profile audit",
      "Local SEO overhaul: GBP optimization, site structure, and metadata built around service + location searches",
      "Content targeting underserved local keywords",
      "Off-page campaign: guest posts, industry forums, and tiered link building",
      "Customer testimonial video production",
    ],
    stats: [
      { value: "136,500+", label: "monthly site visits, up from ~1,000" },
      { value: "21 → 35", label: "domain authority (Semrush)" },
      { value: "5 months", label: "from kickoff to result" },
    ],
    outcome:
      "Flow Pros' Google Business Profile now leads its 15-mile radius for core plumbing keywords, with a surge in phone calls, form submissions, and booked appointments.",
    videoIds: ["_l9EU1eXza4"],
  },
  {
    slug: "all-heart",
    client: "All Heart Heating, Cooling & Plumbing",
    trade: "HVAC · Plumbing",
    location: "Lancaster, CA",
    headline: "Back-to-back million-dollar months in 2024",
    problem:
      "All Heart's digital presence wasn't producing: unoptimized SEO, an underused Google Business Profile, and no strategic paid advertising meant reduced leads in a highly competitive market.",
    approach: [
      "New conversion-focused website with SEO foundation",
      "Google Business Profile rebuild: description, photos, reviews, service areas",
      "Targeted paid advertising for high-value leads",
      "Video program: customer testimonials, technician spotlights, educational content, and a brand story film",
    ],
    stats: [
      { value: "$1M+", label: "revenue months, back to back, in 2024" },
      { value: "GBP", label: "calls, clicks, and direction requests all up" },
    ],
    outcome:
      "TopServ's program significantly boosted All Heart's online presence and lead generation, with measurable gains in calls, website clicks, and direction requests from their Google Business Profile.",
  },
  {
    slug: "the-problem-solvers",
    client: "The Problem Solvers",
    trade: "HVAC · Plumbing · Roofing · Electrical",
    location: "San Antonio, TX",
    headline: "A four-trade brand built to dominate San Antonio",
    problem:
      "A trusted multi-trade provider with real growth potential, held back by limited digital strategy: unoptimized SEO, an underutilized Google Business Profile, no strategic paid ads, and no video marketing to build trust at scale.",
    approach: [
      "TopServ's full 7-step process: GBP & website audit through Track–Learn–Dominate",
      "AI-powered GBP optimization plus dedicated service and location pages",
      "Funnel-stage video content strategy",
      "Addressable geofencing: connected TV, search, display, and Meta ads targeted to specific rooftops",
      "SearchLight real-time reporting dashboard",
    ],
    stats: [
      { value: "$1M+", label: "revenue months, back to back, in 2024" },
      { value: "4 trades", label: "one brand, one growth system" },
    ],
    outcome:
      "The Problem Solvers' GMB profile saw a noticeable increase in calls, website clicks, and direction requests, with lead generation up across all four trades.",
    videoIds: ["r_9BXvgyCUU", "NBoTeGaq410"],
  },
];
