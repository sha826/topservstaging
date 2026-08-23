export interface Faq {
  question: string;
  answer: string;
}

// Answers are written as self-contained 40–70 word passages an AI system can
// quote without surrounding context, each one stands alone. These render on
// the site AND feed the chat concierge's knowledge block, so they must match
// the BrandFormance build spec: weekly pricing only, onboarding never called
// a fee, Brand Score as the diagnostic, the 6 stage Method.

export const generalFaqs: Faq[] = [
  {
    question: "What makes TopServ Digital different from other marketing agencies?",
    answer:
      "TopServ Digital is the home of BrandFormance: brand building and performance marketing run as 1 system, instead of choosing between brand or leads. The agency has worked exclusively with home service companies since 2016, publishes its full weekly pricing on its website, and has generated over $89M in revenue for 200+ contractor clients.",
  },
  {
    question: "What is BrandFormance?",
    answer:
      "BrandFormance is TopServ's methodology: brand creates demand by making a company known, trusted and remembered in its market, performance captures that demand when customers are ready to buy, and together they build market dominance. Run separately, each underperforms. The full explanation lives at topservdigital.com/brandformance.",
  },
  {
    question: "How does TopServ Digital grow a home service company?",
    answer:
      "Through the 6 stage BrandFormance Method, in order: Position (clarify what the company stands for), Build (create the video, messaging and proof assets), Create Demand (brand advertising at frequency in the home geography), Capture Demand (search, maps, Local Services, retargeting), Convert (booking and speed to lead), and Measure and Optimize, where cost per booked call is the headline number.",
  },
  {
    question: "What is the Brand Score?",
    answer:
      "The Brand Score is a 6 component diagnostic of how strong a company's brand actually is in its market: website strength, social media, online reputation, brand visibility, digital consistency, and market positioning, scored against the local competitive set. It produces a score out of 100 and a grade, and the grade places a company in the right program. Get it at topservdigital.com/brand-score.",
  },
  {
    question: "Which industries does TopServ Digital serve?",
    answer:
      "TopServ Digital serves six home service trades: HVAC, plumbing, roofing, electrical, garage door, and pest control companies. HVAC is the agency's original specialty, it started as an HVAC-focused agency in 2016, and every strategy is adapted to how each trade's customers actually buy.",
  },
  {
    question: "Where is TopServ Digital located, and do you work nationwide?",
    answer:
      "TopServ Digital is headquartered at 15222 King Road, Unit 403, Frisco, Texas 75036, and works with home service companies across the United States. Video shoots are done on site at the client's location, wherever that is.",
  },
  {
    question: "How much does TopServ Digital cost?",
    answer:
      "TopServ Digital publishes its pricing: 3 programs billed weekly, matched to your brand equity stage. Establish at $1,000 per week for companies the market doesn't know yet, Amplify at $1,625 per week for companies with name recognition, and Dominate at $2,375 per week for companies ready to own their market. Every program starts with a one time $10,000 onboarding in month 1 that covers the 2 day video shoot, travel, strategy build, and editing; the weekly program takes over in month 2.",
  },
  {
    question: "How long until we see results?",
    answer:
      "Paid channels like Google Ads and Local Services Ads can produce booked jobs within weeks. Brand equity compounds over months: as more people search the company by name, lead quality rises and cost per booked call falls. Flow Pros Plumbing went from roughly 1,000 to over 136,500 monthly website visits in 5 months of SEO and content work. Every engagement reports both.",
  },
];

export const pricingFaqs: Faq[] = [
  {
    question: "Why does TopServ Digital publish its pricing?",
    answer:
      "Three reasons: clarity saves everyone time, published numbers attract the right-fit clients and filter the wrong ones, and trust drives results, it's hard to ask contractors for transparency in a partnership while hiding your own prices. Most agencies in the home services space don't publish pricing; TopServ does.",
  },
  {
    question: "Why is pricing billed weekly instead of monthly?",
    answer:
      "Weekly billing matches how the work actually runs: brand advertising is bought at a weekly frequency floor, content ships weekly, and reporting runs against weekly delivery. It also keeps the number honest, a year is 52 weeks, and quoting weekly means the figure is true from the first conversation.",
  },
  {
    question: "Which program is right for my company?",
    answer:
      "Programs map to your brand equity stage, not your revenue. Establish is for companies the market doesn't know yet, Amplify is for companies with name recognition that people don't yet call first, and Dominate is for companies ready to be the default choice. You don't self-select: the Brand Score, a 6 component diagnostic run against your market, places you in the program, and the team confirms the placement with real market data on the strategy call.",
  },
  {
    question: "Why is there a $10,000 onboarding?",
    answer:
      "The onboarding funds the 2 day on-site video shoot that rebuilds your entire content library, plus travel, the pre-shoot strategy build, editing, and the first month of campaign and profile build. It's the working foundation every program runs on, and it happens once, in month 1.",
  },
];
