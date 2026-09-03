/**
 * About page Q&A content, kept in a server-safe module.
 *
 * This deliberately does NOT live in about-faq.tsx. That file is a client
 * component, and a non-function export crossing the client boundary reaches a
 * server component as a client reference proxy rather than as the array, so
 * the page could not map over it to emit FAQPage schema. Splitting the data
 * out lets the accordion stay interactive while the schema stays server
 * rendered.
 *
 * SEO Guidelines 8.3 wants a Q&A layer on every major page; 8.1 wants
 * answer-first paragraphs a model can lift and be correct. Questions are
 * brand and entity navigational, matching KEYWORD-RESEARCH 4.6 (primary
 * "topserv digital", intent N). They do not compete with /brandformance,
 * which owns "what is brandformance" and answers 10 questions of its own, so
 * the BrandFormance answer here stays short and hands off.
 *
 * Every fact is sourced from site-config.ts, bf-content.ts and the production
 * /jonathan page. No prices: those belong to the Pricing page. The revenue
 * band is spec v2 section 2 buyer guidance, not a price.
 */
export const ABOUT_FAQS = [
  {
    question: "What is TopServ Digital?",
    answer:
      "A marketing and brand building company for residential home service businesses, and the home of BrandFormance. We run brand building and performance marketing as 1 system rather than as 2 budgets, with video production as the engine of the work.",
  },
  {
    question: "Who does TopServ work with?",
    answer:
      "Established home service companies in HVAC, plumbing, roofing, electrical, garage door and pest control. Roughly $1M to $10M in annual revenue is guidance rather than a gate. The common thread is an owner willing to be visible and thinking in years rather than quarters.",
  },
  {
    question: "What makes TopServ different?",
    answer:
      "Most agencies sell channels. We sell the system that decides what runs, where, at what frequency and in what order, and we are measured on 1 number: cost per booked call. We also publish who we are not for, because the wrong fit costs a client a year.",
  },
  {
    question: "What is BrandFormance?",
    answer:
      "The methodology we built and named. Brand creates demand by making a company known and trusted in its market. Performance captures that demand when customers are ready to buy. Run together they build market dominance. The full explanation lives on the BrandFormance page.",
  },
  {
    question: "How do I get started?",
    answer:
      "With the Brand Assessment. It reads how well your market actually knows you and returns your Brand Grade. The grade sets the conversation, the full assessment produces the scope, and the scope produces the program. Diagnosis first, never a menu.",
  },
] as const;
