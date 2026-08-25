import type { Faq } from "@/lib/faqs";

export interface ServiceCopy {
  intro: string;
  deliverables: string[];
  faqs: Faq[];
}

// Keyed by service slug from content.ts.
export const serviceCopy: Record<string, ServiceCopy> = {
  "video-marketing": {
    intro:
      "Video is the one asset your competitors can't copy — nobody else has your technicians, your customers, or your story. TopServ produces broadcast-quality video on site at your shop and on your trucks, then deploys it everywhere your buyers look: your website, Google, YouTube, social feeds, and ads. It's the engine of everything else we run.",
    deliverables: [
      "Brand story film that makes homeowners choose you before they call anyone else",
      "Customer testimonial videos shot with your real customers, on camera",
      "Technician spotlight reels that sell trust — and double as recruiting assets",
      "Ad creative cut for Google, Meta, YouTube, and TikTok placements",
      "Educational content that answers the questions your buyers search",
      "Every file delivered to you — the asset library is yours for life",
    ],
    faqs: [
      {
        question: "How much does video production cost with TopServ Digital?",
        answer:
          "Video production is included in every TopServ program (billed weekly, from $1,000/week), and every program begins with a one-time $10,000 activation that covers the two-day on-site shoot: a full library of brand, testimonial, ad, and recruiting video that feeds every channel from day one.",
      },
      {
        question: "Why should a home service company invest in video?",
        answer:
          "Home services run on trust: a homeowner is letting a stranger into their house. Video builds that trust before the first call — real technicians, real customers, real work — and one shoot feeds your website, Google Business Profile, social channels, and ad campaigns for months.",
      },
      {
        question: "Who owns the video content TopServ produces?",
        answer:
          "You do. Every video TopServ produces is delivered to you as a permanent asset library — if we ever part ways, the footage, edits, and rights stay with your company.",
      },
    ],
  },
  "paid-advertising": {
    intro:
      "Clicks don't pay your techs — booked jobs do. TopServ runs Google, Meta, YouTube, and TikTok campaigns wired to call tracking and your CRM, so every dollar of spend is judged by the revenue it produced. And because we produce your video, your ads use creative no competitor can match.",
    deliverables: [
      "Google Search campaigns built around your highest-margin services",
      "Meta and YouTube campaigns powered by your own video creative",
      "Retargeting that stays in front of homeowners who visited but didn't book",
      "Call tracking and conversion wiring down to booked jobs and revenue",
      "Weekly optimization and honest reporting — spend, cost per lead, cost per booked job",
      "Landing pages matched to each campaign, built to convert",
    ],
    faqs: [
      {
        question: "How is TopServ different from other PPC agencies?",
        answer:
          "Two things: creative and accounting. TopServ produces professional video for your ads instead of recycling stock footage, and reports performance in booked jobs and revenue — not clicks and impressions — so you always know exactly what your ad spend bought.",
      },
      {
        question: "How fast does paid advertising produce leads?",
        answer:
          "Paid search and Local Services Ads are the fastest channels in home services marketing — campaigns typically start producing calls within the first few weeks, while SEO and content compound behind them for the long term.",
      },
    ],
  },
  seo: {
    intro:
      "When a homeowner searches \"AC repair near me,\" you're either on that first screen or you don't exist. TopServ builds local search dominance the compounding way: a technically sound site, service and location pages for every job you want, an optimized Google Business Profile, and content that answers what your buyers actually ask.",
    deliverables: [
      "Dedicated pages for every service and every city you serve",
      "Google Business Profile optimization with weekly posts and review strategy",
      "Technical SEO: site speed, structure, and schema markup done right",
      "Content targeting the local keywords your competitors ignore",
      "Authority building: link campaigns and press releases",
      "Transparent reporting — rankings, traffic, calls, and booked jobs",
    ],
    faqs: [
      {
        question: "How long does SEO take for a home service company?",
        answer:
          "Meaningful movement typically shows in three to six months, and it compounds from there. Flow Pros Plumbing went from roughly 1,000 to over 136,500 monthly website visits in five months of TopServ's SEO and content program, with domain authority up from 21 to 35.",
      },
      {
        question: "What's included in TopServ's SEO service?",
        answer:
          "Every TopServ program includes SEO: new service and location pages added monthly, Google Business Profile optimization with weekly posts, blog content, technical fixes, link building on higher tiers, and reporting tied to calls and booked jobs.",
      },
    ],
  },
  "local-services-ads": {
    intro:
      "Local Services Ads put you at the very top of Google with a Google Guaranteed badge — and you pay per lead, not per click. They're also easy to waste money on. TopServ manages the whole system: profile strength, review velocity, response time, and disputing every junk lead so you only pay for real opportunities.",
    deliverables: [
      "LSA profile setup and Google Guaranteed screening",
      "Review velocity strategy — the #1 LSA ranking factor",
      "Lead dispute management so spam and out-of-area calls don't bill you",
      "Bid and budget strategy by service and season",
      "LSA + PPC + SEO coordination so channels reinforce instead of cannibalize",
    ],
    faqs: [
      {
        question: "Are Local Services Ads worth it for home service companies?",
        answer:
          "Usually yes — LSAs appear above regular ads and organic results, carry Google's own trust badge, and charge per lead instead of per click. The catch is management: without active review strategy and lead disputing, costs creep up fast. That management layer is exactly what TopServ runs.",
      },
      {
        question: "What's the difference between LSA and regular Google Ads?",
        answer:
          "Local Services Ads sit at the very top of the page, charge per lead, and require Google's background-check screening; regular Google Ads charge per click and give you more control over targeting and creative. Most TopServ clients run both, coordinated so they capture different buyers.",
      },
    ],
  },
  "web-development": {
    intro:
      "Your website is your best salesperson or your biggest leak. TopServ builds fast, conversion-focused sites engineered for how home service customers buy: click-to-call everywhere, proof up front, service and location pages that rank. Built on modern tech, not a fragile page builder — and you own it outright.",
    deliverables: [
      "Conversion-first design: click-to-call, booking, and proof above the fold",
      "Service and location page architecture that ranks locally",
      "Modern, fast stack with schema markup and AI-search readiness built in",
      "Your video content integrated throughout, not stock photos",
      "Ongoing pages every month as part of your plan — sites grow, not stagnate",
      "100% ownership: your domain, your site, your content, always",
    ],
    faqs: [
      {
        question: "Do I own my website if I leave TopServ?",
        answer:
          "Yes. Your domain, website, content, and tracking assets belong to your company, full stop. Asset lock-in is the most common horror story contractors tell about marketing agencies — TopServ's position is that everything we build for you is yours.",
      },
      {
        question: "How many pages does TopServ build?",
        answer:
          "It scales with your program: month one builds out the pages your market gap demands, then new service and location pages are added every month. New pages target new services and locations, which is how sites keep gaining ground.",
      },
    ],
  },
  "social-media-marketing": {
    intro:
      "Social media won't book many jobs directly — but it decides whether homeowners recognize your name when they need you. TopServ keeps your feeds alive with your real content: video clips from your shoots, job-site wins, team spotlights, and reviews, published consistently without you lifting a finger.",
    deliverables: [
      "Content calendar built from your video library and job-site material",
      "Consistent publishing across Facebook, Instagram, and YouTube",
      "Short-form cuts of your brand and testimonial films",
      "Community management guidance for reviews and comments",
      "Paid social amplification for the content that performs",
    ],
    faqs: [
      {
        question: "Does social media actually matter for a home service company?",
        answer:
          "As a brand channel, yes: homeowners check your pages before they call, and an active feed with real technicians and real customers reads as a real company. Social also feeds the retargeting audiences your paid campaigns convert. Dead feeds cost trust; TopServ keeps yours alive with content from your own shoots.",
      },
    ],
  },
  "email-marketing": {
    intro:
      "Your customer list is the cheapest revenue you'll ever generate — those people already trust you. TopServ runs newsletters, seasonal campaigns, and automated follow-up that turn one-time repairs into maintenance plans, reviews, and repeat work.",
    deliverables: [
      "Monthly newsletter with your content, offers, and wins",
      "Seasonal campaigns timed to your trade's demand curve",
      "Automated follow-up: post-job thank-you, review requests, maintenance reminders",
      "List hygiene and segmentation so the right message hits the right customer",
      "Sales-letter campaigns on larger-scope programs",
    ],
    faqs: [
      {
        question: "Is email marketing still worth it for contractors?",
        answer:
          "It's one of the highest-ROI channels a home service company has, because it reactivates customers you already paid to acquire. Maintenance reminders, seasonal tune-up offers, and review requests to past customers produce booked jobs at a fraction of the cost of new-customer advertising.",
      },
    ],
  },
  "graphic-design": {
    intro:
      "Brand is what makes a homeowner pick your truck out of traffic and your ad out of a feed. TopServ's design team builds the visual system around your trade: logo, trucks, uniforms, yard signs, and every piece of collateral your sales process touches.",
    deliverables: [
      "Logo and brand identity built for the trades — legible on a truck at 40mph",
      "Truck wrap design that turns your fleet into rolling billboards",
      "Uniforms, yard signs, door hangers, and leave-behinds",
      "Sales collateral: proposals, service agreements, financing one-pagers",
      "Digital assets matched to your ads and website",
    ],
    faqs: [
      {
        question: "Why does branding matter for a home service company?",
        answer:
          "Because homeowners choose the company they recognize. A consistent brand across trucks, uniforms, ads, and your website compounds every marketing dollar you spend — the ad works harder because the homeowner has already seen the truck in the neighborhood.",
      },
    ],
  },
  automation: {
    intro:
      "Speed to lead decides who wins the job: the first company to respond usually books it. TopServ builds the automation layer that answers instantly — AI chat on your site, missed-call text-back, review requests, and follow-up sequences — so no lead ever goes cold because someone was on a roof.",
    deliverables: [
      "AI chat that qualifies visitors and captures lead details 24/7",
      "Missed-call text-back so after-hours callers get an instant response",
      "Automated review requests after every completed job",
      "Follow-up sequences for quotes that haven't closed",
      "CRM pipeline wiring so every lead is tracked to booked or lost",
    ],
    faqs: [
      {
        question: "What marketing automation does a home service company need first?",
        answer:
          "Missed-call text-back and automated review requests — both pay for themselves immediately. The average home service company misses a large share of inbound calls during peak season; an instant text response saves jobs that would have gone to the next listing, and steady reviews power both LSA and local SEO rankings.",
      },
    ],
  },
  geofencing: {
    intro:
      "Addressable geofencing puts your ads on the TVs, phones, and browsers of the exact households you want — a neighborhood where you just replaced a roof, homes above a certain value, or your competitor's customer base. TopServ plans, produces, and runs the whole system, with your video as the creative.",
    deliverables: [
      "Household-level targeting: draw the neighborhoods, we reach the rooftops",
      "Connected TV placements running your brand film in local living rooms",
      "Display and mobile retargeting that follows the household, not the cookie",
      "Job-site radius campaigns — advertise to the whole street after every install",
      "Reporting on reach, frequency, and the response lift in targeted areas",
    ],
    faqs: [
      {
        question: "What is addressable geofencing for home services?",
        answer:
          "Addressable geofencing targets advertising to specific physical households — streaming TV, mobile, and display ads delivered to the rooftops you choose. For home service companies it means advertising an entire neighborhood right after finishing a job there, when the neighbors have already seen your truck.",
      },
    ],
  },
};
