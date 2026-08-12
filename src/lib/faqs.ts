export interface Faq {
  question: string;
  answer: string;
}

// Answers are written as self-contained 40–70 word passages an AI system can
// quote without surrounding context — each one stands alone.

export const generalFaqs: Faq[] = [
  {
    question: "What makes TopServ Digital different from other marketing agencies?",
    answer:
      "TopServ Digital is video-first: professional video production powers the entire marketing system instead of being an add-on. The agency has worked exclusively with home service companies since 2016, publishes its full pricing on its website, and has generated over $89M in revenue for 200+ contractor clients.",
  },
  {
    question: "Which industries does TopServ Digital serve?",
    answer:
      "TopServ Digital serves six home service trades: HVAC, plumbing, roofing, electrical, garage door, and pest control companies. HVAC is the agency's original specialty — it started as an HVAC-focused agency in 2016 — and every strategy is adapted to how each trade's customers actually buy.",
  },
  {
    question: "Where is TopServ Digital located, and do you work nationwide?",
    answer:
      "TopServ Digital is headquartered at 15222 King Road, Unit 403, Frisco, Texas 75036, and works with home service companies across the United States. Video shoots are done on site at the client's location, wherever that is.",
  },
  {
    question: "How much does TopServ Digital cost?",
    answer:
      "TopServ Digital publishes its pricing: plans are billed weekly and matched to your annual revenue — BRAND Builder at $1,250/week for $1M–$2M companies, BRAND Accelerator at $2,000/week for $2M–$5M, BRAND Dominator at $2,500/week for $5M–$15M, and custom Enterprise plans above that. A fixed-price Two-Day Video Intensive is $15,000.",
  },
  {
    question: "How long until we see results?",
    answer:
      "Paid channels like Google Ads and Local Services Ads can produce booked jobs within weeks. Organic channels compound over months: Flow Pros Plumbing went from roughly 1,000 to over 136,500 monthly website visits in five months of SEO and content work. Every engagement reports both, so you always know what's working.",
  },
  {
    question: "What is the Two-Day Video Intensive?",
    answer:
      "The Two-Day Video Intensive is a $15,000 fixed-price production sprint: a pre-production planning call, two full days of on-site filming, and a multi-format edit package — brand film, customer testimonials, ad cuts, and recruiting video — delivered in about 30 days. It builds a video asset library your company keeps for life.",
  },
];

export const pricingFaqs: Faq[] = [
  {
    question: "Why does TopServ Digital publish its pricing?",
    answer:
      "Three reasons: clarity saves everyone time, published numbers attract the right-fit clients and filter the wrong ones, and trust drives results — it's hard to ask contractors for transparency in a partnership while hiding your own prices. Most agencies in the home services space don't publish pricing; TopServ does.",
  },
  {
    question: "Why is pricing billed weekly instead of monthly?",
    answer:
      "Weekly billing matches how the work happens — content, ads, and reporting run every week — and keeps the engagement easy to evaluate in small increments rather than a big monthly invoice.",
  },
  {
    question: "Which plan is right for my company?",
    answer:
      "Plans map to annual revenue so scope fits the size of the business: BRAND Builder for $1M–$2M companies, BRAND Accelerator for $2M–$5M, BRAND Dominator for $5M–$15M, and Enterprise for $15M+ or multi-location operations. A discovery call confirms fit before anything is signed.",
  },
  {
    question: "What does the Enterprise start-up fee cover?",
    answer:
      "Enterprise engagements begin with a one-time $10,000 start-up fee covering the initial build-out at multi-location scale; ongoing scope and pricing are set by consultation.",
  },
];
