export interface Faq {
  question: string;
  answer: string;
}

// Answers are written as self-contained 40–70 word passages an AI system can
// quote without surrounding context, each one stands alone. These render on
// the site AND feed the chat concierge's knowledge block, so they must match
// the BrandFormance build spec v2: no price table, the $1,000/week floor and
// $10,000 activation are the only public numbers (never monthly, never
// annual), the activation is never called a fee, the Brand Assessment returns
// a grade only, and the 6 stage Method is the system.

export const generalFaqs: Faq[] = [
  {
    question: "What makes TopServ Digital different from other marketing agencies?",
    answer:
      "TopServ Digital is the home of BrandFormance: brand building and performance marketing run as 1 system, instead of choosing between brand or leads. The agency has worked exclusively with home service companies since 2016, publishes its pricing anchor openly ($1,000 per week floor, $10,000 one time activation), and has generated over $89M in revenue for 200+ contractor clients.",
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
    question: "What is the Brand Assessment?",
    answer:
      "The Brand Assessment reads how strong a company's brand actually is in its market and returns 1 of 4 grades: Unknown, Name Recognition, Household Name, or Negative Equity. Each grade comes with what it means for the business and the right next step. It is the honest starting point before any program or price conversation. Get yours at topservdigital.com/brand-assessment.",
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
      "Programs start at $1,000 per week. That is the floor rate to manage the work, not a menu price. Every program begins with a one time $10,000 activation in month 1 that covers the 2 day video shoot, travel, and the first month of build; weekly billing starts in month 2. The actual number comes from your scope: market size, competitive saturation, current brand position, service area, and video scope. The assessment produces the scope, and the scope produces the price.",
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
    question: "Why don't you publish a price table?",
    answer:
      "Because a table invites you to pick a tier before anyone has diagnosed anything, and it fixes a price against a scope nobody has seen. No 2 clients in the same market price the same. We publish the honest anchor instead: the $1,000 per week floor and the one time $10,000 activation. Your scope sets your number, and the assessment sets the scope.",
  },
  {
    question: "Which program is right for my company?",
    answer:
      "You don't self-select, and that's a feature. The Brand Assessment reads your market and returns your grade; the full assessment then produces your scope, and the program is assigned by diagnosis. What a larger program buys is more geography held at the same brand frequency, never more impressions. Frequency is fixed at the floor of 3 times weekly for everyone; territory is the variable.",
  },
  {
    question: "Why is there a $10,000 activation?",
    answer:
      "The activation funds the 2 day on-site video shoot that rebuilds your entire content library, plus travel, the pre-shoot strategy build, editing, and the first month of campaign and profile build. It's the working foundation every program runs on, and it happens once, in month 1. Weekly billing starts in month 2.",
  },
];
