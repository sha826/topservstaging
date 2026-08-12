import type { Faq } from "@/lib/faqs";

export interface IndustryCopy {
  intro: string;
  plays: string[];
  faqs: Faq[];
}

// Keyed by industry slug from content.ts.
export const industryCopy: Record<string, IndustryCopy> = {
  hvac: {
    intro:
      "HVAC is where TopServ started in 2016, and it's still the trade we know deepest. Heating and air is brutally seasonal, review-driven, and won or lost on local search — so we build systems that bank demand in the peaks and keep techs busy in the shoulders.",
    plays: [
      "Demand-season campaigns that scale spend when the first heat wave or cold snap hits",
      "Maintenance-plan funnels that turn one-time repairs into recurring revenue",
      "Technician spotlight videos that pre-sell trust before the visit",
      "Service + suburb page architecture that owns \"AC repair near me\" across your map",
      "Shoulder-season plays: IAQ, duct cleaning, and tune-up campaigns",
    ],
    faqs: [
      {
        question: "How much should an HVAC company spend on marketing?",
        answer:
          "A common benchmark for growth-mode home service companies is 5–10% of annual revenue. A $3M HVAC company investing at that level is spending $150K–$300K a year — TopServ's Amplify program at $1,625/week (about $84K/year) sits inside that range with video production included.",
      },
      {
        question: "What marketing works best for HVAC companies?",
        answer:
          "The compounding stack: Google Business Profile and local SEO for high-intent searches, Local Services Ads and PPC for immediate volume, review velocity to win the comparison, and brand video to be the name homeowners already trust when the AC dies. Seasonality decides the mix month to month.",
      },
    ],
  },
  plumbing: {
    intro:
      "Plumbing marketing is a race: when water is on the floor, the homeowner calls whoever shows up first with proof they're legit. TopServ builds plumbing brands that win both the emergency call and the planned job — repipes, water heaters, remodels — with local search dominance and video proof.",
    plays: [
      "Emergency-intent capture: LSA, call-first ads, and instant response automation",
      "Water heater, repipe, and slab-leak campaign funnels for high-ticket work",
      "Google Business Profile dominance across your service radius",
      "Customer testimonial films — proof that closes the comparison shopper",
      "Review engine tuned for volume and recency",
    ],
    faqs: [
      {
        question: "How do plumbing companies get more emergency calls?",
        answer:
          "Own the moment of panic: Local Services Ads and top-of-page search ads for emergency keywords, a Google Business Profile with strong recent reviews, click-to-call everything, and automation that answers instantly — because the homeowner with water on the floor calls the next number if you miss.",
      },
      {
        question: "What results has TopServ produced for plumbing companies?",
        answer:
          "Flow Pros Plumbing grew from roughly 1,000 to over 136,500 monthly website visits in five months with TopServ's SEO and content program, with domain authority up from 21 to 35 and their Google Business Profile leading a 15-mile radius for core plumbing keywords.",
      },
    ],
  },
  roofing: {
    intro:
      "A roof is a five-figure decision made by a homeowner who's terrified of getting burned — and often pitched by three storm-chasers the same week. Roofing marketing is proof marketing: TopServ builds the video, reviews, and local presence that make you the safe choice, plus storm-response systems for when the hail hits.",
    plays: [
      "Storm-response playbook: rapid campaigns targeted to affected zip codes",
      "Proof-heavy brand video: real crews, real installs, real homeowners on camera",
      "Free-inspection funnels with follow-up automation for slow-burn deals",
      "Neighborhood geofencing after every install — the whole street sees your work",
      "Financing-forward landing pages that make the number less scary",
    ],
    faqs: [
      {
        question: "How do roofing companies stand out from storm chasers?",
        answer:
          "Local proof: an established Google Business Profile with years of reviews, video of your actual crews on actual local roofs, a physical address, and a brand homeowners have seen before the storm. That's exactly the asset base TopServ builds — it's hard to fake and impossible to fly in.",
      },
    ],
  },
  electrical: {
    intro:
      "Electrical runs two businesses at once: service calls that need speed, and high-ticket projects — panel upgrades, EV chargers, generators — that need education and trust. TopServ builds marketing that feeds both sides, with campaigns matched to each buying journey.",
    plays: [
      "Service-call capture: LSA, local SEO, and review velocity",
      "EV charger and generator campaign funnels for the project pipeline",
      "Educational video that de-mystifies panel upgrades and sells safety",
      "Landing pages by project type, wired to quote requests",
      "Email campaigns that turn service customers into project customers",
    ],
    faqs: [
      {
        question: "How do electricians market high-ticket services like EV chargers?",
        answer:
          "Separate them from service-call marketing: dedicated landing pages, educational video that answers cost and safety questions, targeted campaigns to the homeowners likely to buy, and follow-up automation for quotes still deciding. TopServ builds that project pipeline alongside your service-call engine.",
      },
    ],
  },
  "garage-door": {
    intro:
      "Garage door is one of the most cutthroat categories in local search — flooded with lead resellers and fake listings. Winning it takes a legitimate, dominant local presence: a real brand, a fortress Google Business Profile, and same-day response systems. That's the system TopServ builds.",
    plays: [
      "Same-day repair capture: emergency keywords, LSA, click-to-call ads",
      "GBP defense: verified, review-rich, photo-heavy profile that outranks the fakes",
      "Spring/opener repair funnels plus new-door installation campaigns",
      "Video proof: real techs and real installs, versus the lead-gen mills",
      "Instant-response automation — missed calls are lost jobs in this trade",
    ],
    faqs: [
      {
        question: "Why is garage door marketing so competitive?",
        answer:
          "Because lead resellers and fake \"local\" listings flood the category, buying up search real estate and selling the same homeowner to multiple companies. Beating them takes what they can't fake: a legitimate Google Business Profile with deep review history, real local video proof, and instant response. That's the moat TopServ builds.",
      },
    ],
  },
  "pest-control": {
    intro:
      "Pest control's superpower is recurring revenue — the quarterly plan customer worth 10x the one-time job. TopServ builds pest brands around subscription growth: seasonal demand capture, plan-first offers, and the trust content that gets a stranger's company welcomed into the house.",
    plays: [
      "Seasonal campaign calendar: termites, mosquitoes, rodents — each in its window",
      "Plan-first funnels that sell the subscription, not the one-off spray",
      "Trust video: real technicians, safety practices, family- and pet-friendly framing",
      "Local SEO by pest and by city across your coverage map",
      "Review and referral automation that compounds the customer base",
    ],
    faqs: [
      {
        question: "How do pest control companies grow recurring revenue?",
        answer:
          "Sell the plan, not the spray: lead with quarterly-plan offers in ads and on landing pages, price the one-time job to make the plan obvious, and use automated follow-up to convert one-time customers after the service. Marketing that optimizes for plan starts instead of raw leads changes the economics of the whole company.",
      },
    ],
  },
};
