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
      "TopServ Digital publishes its pricing: three programs billed weekly, matched to your brand equity stage — Establish at $1,000/week for companies the market doesn't know yet, Amplify at $1,625/week for companies with name recognition, and Dominate at $2,375/week for companies ready to own their market. Every program starts with a one-time $10,000 activation and onboarding in month one that covers the two-day video shoot, travel, strategy build, and editing; the weekly retainer takes over in month two.",
  },
  {
    question: "How long until we see results?",
    answer:
      "Paid channels like Google Ads and Local Services Ads can produce booked jobs within weeks. Organic channels compound over months: Flow Pros Plumbing went from roughly 1,000 to over 136,500 monthly website visits in five months of SEO and content work. Every engagement reports both, so you always know what's working.",
  },
  {
    question: "What does the $10,000 activation cover?",
    answer:
      "Every TopServ program begins with a one-time $10,000 activation and onboarding in month one. It covers the two-day on-site video shoot and the evergreen content library it produces — brand film, customer testimonials, ad cuts, and recruiting video — plus travel, the pre-shoot strategy build, editing, and the first-month build. The weekly retainer takes over in month two.",
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
    question: "Which program is right for my company?",
    answer:
      "Programs map to your brand equity stage, not your revenue. Establish is for companies the market doesn't know yet, where every lead is a paid fight. Amplify is for companies with real name recognition that people don't yet call first. Dominate is for companies ready to be the default choice in their market. You don't self-select: on the discovery call the team grades your brand with heat-map, SEMrush, and branded-search data and prescribes the program that closes your gap.",
  },
  {
    question: "Why is there a $10,000 activation fee?",
    answer:
      "The activation is not a fee in a drawer: it funds the two-day on-site video shoot that rebuilds your entire content library, plus travel, the pre-shoot strategy build, editing, and the first-month build of your campaigns and profiles. It's the working foundation every program runs on, and it happens once, in month one.",
  },
];
