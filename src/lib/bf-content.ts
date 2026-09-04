/**
 * BrandFormance site content, per Build Specification v2 (Aug 2026).
 * The spec is canonical: six stages, three phases, four public brand
 * grades (grade only, never score components or weights), six named
 * clients, the $1,000/week floor plus $10,000 activation as the only
 * public numbers (never monthly, never annual), and brand frequency
 * fixed at 3x weekly with geography as the variable. Copy standards:
 * bold, clear, direct, numerals, no em dashes.
 */

export const oneLine = "Stop Chasing Leads. Start Building a Brand Customers Choose.";

export const heroSupport =
  "TopServ Digital is the home of BrandFormance, combining brand building with performance marketing to help home service companies become the obvious choice in their markets.";

export const equation = [
  { term: "BRAND", does: "creates demand" },
  { term: "PERFORMANCE", does: "captures demand" },
  { term: "BRANDFORMANCE", does: "builds market dominance" },
] as const;

export const beforeAfter = [
  { before: "Competing on price and availability", after: "Chosen before the search begins" },
  { before: "Renting attention month to month", after: "Owning attention that compounds" },
  { before: "Interchangeable with every competitor", after: "The obvious choice in the market" },
  { before: "Marketing is a cost line", after: "Brand is an asset on the balance sheet" },
  { before: "Dependent on platforms that raise prices", after: "Independent, with falling acquisition cost" },
] as const;

export const sixStages = [
  {
    n: 1,
    name: "Position",
    what: "Clarify what the company stands for, what it stands against, and what makes it distinct.",
  },
  {
    n: 2,
    name: "Build",
    what: "Create the assets the brand requires. Video, messaging, proof, site, profiles.",
  },
  {
    n: 3,
    name: "Create Demand",
    what: "Build awareness and familiarity in the geography we can afford to own at frequency.",
  },
  {
    n: 4,
    name: "Capture Demand",
    what: "Be present when customers are ready to buy. Search, maps, Local Services, retargeting.",
  },
  {
    n: 5,
    name: "Convert",
    what: "Turn attention into revenue. Booking, speed to lead, conversion infrastructure.",
  },
  {
    n: 6,
    name: "Measure and Optimize",
    what: "Measure the complete system, then improve it. Cost per booked call is the headline number.",
  },
] as const;

export const threePhases = [
  {
    n: 1,
    name: "Strategy and Alignment",
    timing: "Months 1 to 2",
    stages: "Position, Build",
    covers:
      "Market positioning, message clarity, brand trust foundations, performance strategy alignment.",
    topserv:
      "TopServ runs the positioning work, plans the asset build, and aligns the performance strategy to the brand.",
    client: "The client provides leadership time, market truth, and the willingness to be on camera.",
    progress: "A distinct position, an approved message, and a filming plan the whole team believes in.",
  },
  {
    n: 2,
    name: "Execution and Activation",
    timing: "Months 2 to 6",
    stages: "Create Demand, Capture Demand, Convert",
    covers: "Performance channels, brand signal creation, conversion infrastructure.",
    topserv:
      "TopServ produces and distributes the brand content, activates the performance channels, and builds the conversion path.",
    client: "The client keeps operations ready for the demand and answers fast when leads arrive.",
    progress: "Consistent local reach, working capture channels, and a booking flow that converts.",
  },
  {
    n: 3,
    name: "Optimization and Scale",
    timing: "Months 6 to 12 and beyond",
    stages: "Measure and Optimize",
    covers: "Performance refinement, brand momentum compounding, scaling spend with confidence.",
    topserv:
      "TopServ measures the complete system, cuts what does not perform, and scales what does.",
    client: "The client reviews the numbers with us and plans growth against them.",
    progress: "Cost per booked call falling as brand equity builds, and spend scaling with confidence.",
  },
] as const;

/**
 * Pricing per spec v2: NO price table, ever. The site publishes the floor
 * and the activation only. Price is derived per client from scope by the
 * Growth Engine. Never publish annual or monthly figures anywhere.
 */
export const pricingModel = {
  floor: "$1,000",
  floorLine: "Programs start at $1,000 per week. That is the floor rate to manage the work. It is a floor, not a menu price.",
  activation: "$10,000",
  activationLine:
    "A one time $10,000 activation in month 1 covers the 2 day video shoot, travel, and the first month of build.",
  whatSetsTheNumber: [
    "Market size",
    "Competitive saturation",
    "Current brand position",
    "Service area",
    "Video scope",
  ],
  howReached:
    "The assessment and the research modules produce the scope. The scope produces the price. The program is assigned by diagnosis, not chosen from a menu.",
  // Spec v2 section 6: frequency is fixed at the floor of 3 times weekly at
  // every rung. Geography is the variable. Larger programs buy more
  // territory held at the same frequency, never more frequency.
  frequencyDoctrine:
    "Brand frequency is fixed: 3 times weekly, at every level. What a larger program buys is more geography held at that same frequency, never more impressions. Competitors sell more impressions. We sell more territory, owned properly.",
} as const;

/**
 * Build Spec v2 section 15, Decision 1: which of the 6 clients can be named
 * publicly is unresolved, owners Ryan and JB. Nothing on this site may
 * attribute an outcome to a named company until that lands. The Argument
 * Spine's documented fallback governs meanwhile, "at minimum assume market
 * and outcome without company names", so every public surface reads
 * anonymousClient and the names below stay internal to this file.
 *
 * Flip this 1 flag when the decision clears, and check every consumer of
 * sixClients before you do.
 */
export const namesCleared = false;

/** What a client is called publicly while its own name is not cleared. */
export const anonymousClient = "Home services company";

/** The line that explains the missing names, wherever they are withheld. */
export const namesWithheldNote =
  "Company names are withheld until each client clears theirs for publication.";

export const sixClients = [
  { client: "All Heart Heating", market: "Lancaster, CA", result: "$3.9M to $9M", detail: "131 percent growth, 23 percent CAGR" },
  { client: "Spencer Air", market: "Irving, TX", result: "$1.8M to $7M", detail: "289 percent over 9 years" },
  { client: "Your New Door", market: "Irving, TX", result: "$4M to $7M", detail: "75 percent CAGR, 99 percent SEO visibility" },
  { client: "Nick AC", market: "Hammond, LA", result: "$1.7M to $4M", detail: "94 percent growth, 25 percent CAGR" },
  { client: "Zen Air", market: "Duluth, GA", result: "$1.1M to $3.5M", detail: "154 percent growth, 20 percent CAGR" },
  { client: "C and S Air", market: "Mansfield, TX", result: "$500K to $3.5M", detail: "54 percent CAGR, ranks first in market" },
] as const;

/**
 * The public Brand Assessment returns a GRADE only (spec v2, section 5).
 * The numeric score, its components, weights, and normalization method are
 * internal to the sales console and must never appear on the site or be
 * restated in any document. The 4 grades are published in JB's book.
 */
export const brandGrades = [
  {
    grade: "Unknown",
    meaning: "Outside their own circle, nobody can find them. The market does not know the name.",
  },
  {
    grade: "Name Recognition",
    meaning: "People know the name but are not choosing it. Familiarity without preference.",
  },
  {
    grade: "Household Name",
    meaning: "Searched by name. Leads cost almost nothing.",
  },
  {
    grade: "Negative Equity",
    meaning: "Actively chosen against. Fix operations before spending on marketing.",
  },
] as const;

export const builtFor = [
  "Established home service businesses with consistent demand and constrained growth",
  "Owner led or leadership driven, willing to be visible on camera",
  "Frustrated with ads, vendors and diminishing returns",
  "Feeling price pressure despite doing quality work",
  "Beginning to understand that brand creates leverage",
  "Long term thinkers focused on enterprise value, not quick wins",
] as const;

export const notFor = [
  "Buyers looking for cheap or fast lead generation",
  "Set it and forget it marketing mindsets",
  "Owners unwilling to be visible or lead from the front",
  "Businesses that see marketing strictly as a cost",
  "Anyone expecting short term tactics to fix structural problems",
  "Commercial, multifamily, developer or general contractor buyers",
] as const;

/** The ten questions the BrandFormance page answers, in order. */
export const tenQuestions = [
  {
    q: "What is BrandFormance?",
    a: "BrandFormance is the combination of brand building and performance marketing run as 1 system. Brand creates demand by making a company known, trusted and remembered inside its market. Performance captures that demand when customers are ready to buy. Run together, they build market dominance. Run separately, each underperforms.",
  },
  {
    q: "Why was it created?",
    a: "Because home service companies were being forced to choose between brand and leads, and that is the wrong decision. Jonathan Bannister built BrandFormance after a decade of watching contractors rank first, run ads, hold strong reviews and still lose jobs to the company the customer already knew. The methodology exists to make our clients that company.",
  },
  {
    q: "What is wrong with traditional digital marketing?",
    a: "Dependency. Stop paying and the leads stop. Lose rankings and the phone slows. Competition rises and acquisition cost rises with it. Traditional digital marketing rents attention month to month and calls it growth. Nothing compounds, and the platform holds all the leverage.",
  },
  {
    q: "What is the difference between brand and performance?",
    a: "Brand marketing builds familiarity and preference before a customer needs service. Performance marketing captures customers who are searching right now. Brand answers the question of who they call. Performance answers the question of who they find. A company needs to win both answers.",
  },
  {
    q: "How does BrandFormance work?",
    a: "Brand advertising and content run at a fixed weekly frequency inside a defined geography, building familiarity the company can afford to sustain. Performance channels capture the demand that familiarity creates. The 2 sides share 1 measurement system, so brand investment is judged by what it does to performance efficiency, not by impressions.",
  },
  {
    q: "What are its core components?",
    a: "A clear market position. Video led brand content published at frequency. Paid brand distribution in the home geography. Search, maps and Local Services capture. Conversion infrastructure with speed to lead. And 1 measurement system with cost per booked call as the headline number.",
  },
  {
    q: "What business outcomes does it create?",
    a: "Branded search grows. Lead quality improves, because people who already know the company convert better and negotiate less. Cost per booked call falls as brand equity builds. Close rates rise. Over time the company owns attention it used to rent, and acquisition cost falls while competitors pay more every year.",
  },
  {
    q: "Who is it for?",
    a: "Established residential home service companies, roughly $1M to $10M in annual revenue, led by owners willing to be visible and thinking in years rather than quarters. It is not for buyers who want cheap leads fast, and it does not serve commercial, multifamily or general contractor demand.",
  },
  {
    q: "What does implementation look like?",
    a: "3 phases. Strategy and Alignment in months 1 to 2 sets the position and builds the assets. Execution and Activation from months 2 to 6 turns on demand creation, demand capture and conversion. Optimization and Scale from month 6 onward measures the complete system and scales what works.",
  },
  {
    q: "How can a contractor get started?",
    a: "Get your Brand Grade. The Brand Assessment reads how strong your brand actually is in your market and returns 1 of 4 grades, each with what it means for your business. The program and the price come from the full assessment afterward: diagnosis first, prescription second, never a menu.",
  },
] as const;

/** Tier 1 launch videos and where they live. */
export const videoSlots = {
  jbOverview: { title: "The TopServ Overview with Jonathan Bannister", length: "10 minutes", tier: 1 },
  investment: { title: "How We Think About Investment", length: "5 to 7 minutes", tier: 1 },
  whatIsBrandformance: { title: "What Is BrandFormance", length: "5 to 8 minutes", tier: 1 },
  processWalkthrough: { title: "The Process Walkthrough", length: "5 to 7 minutes", tier: 2 },
  outcomes: { title: "What Actually Improves", length: "4 to 6 minutes", tier: 2 },
  method: { title: "The Method", length: "5 to 7 minutes", tier: 2 },
  whoThisIsNotFor: { title: "Who This Is Not For", length: "2 to 3 minutes", tier: 2 },
} as const;
