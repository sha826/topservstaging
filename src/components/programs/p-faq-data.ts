/**
 * The embedded FAQ Build Spec v2 section 4 requires on Programs page 1.
 *
 * Server-safe module so the page can emit FAQPage schema from the same
 * source the accordion renders, per the pattern used on /about.
 *
 * The questions are not supplied by any document. They are written for the
 * commercial intent this page carries (KEYWORD-RESEARCH 4.4a, "home services
 * marketing agency", intent C) and answer what a buyer asks before a call.
 * Every answer is on doctrine: no prices beyond a pointer to the Pricing
 * page, no grade labels, no invented figures.
 */
export const OVERVIEW_FAQS = [
  {
    question: "What kind of marketing agency is TopServ Digital?",
    answer:
      "A home services marketing agency that runs brand building and performance marketing as 1 system rather than 2 budgets. We are not a lead vendor, an SEO shop or a media buyer. We own the whole system, including the decision about how much of each half a company actually needs.",
  },
  {
    question: "How is this different from a lead generation agency?",
    answer:
      "A lead generation agency rents you attention and bills monthly for it. The moment you stop, the calendar empties, because nothing was built that belonged to you. We build recognition in your market so demand exists before anybody searches, then capture it. The asset stays with you.",
  },
  {
    question: "Do you replace our current agency or work alongside one?",
    answer:
      "We replace it. The system only works when 1 partner is accountable for both halves and for the number they produce together. Splitting brand and performance across 2 vendors is the problem the methodology exists to fix, so recreating it would defeat the point.",
  },
  {
    question: "Who is TopServ Digital not for?",
    answer:
      "Buyers who want cheap leads fast, owners unwilling to be visible, and anyone who sees marketing strictly as a cost line. We also do not serve commercial, multifamily, developer or general contractor demand, because BrandFormance markets residential home service demand and does not translate.",
  },
  {
    question: "How does a company get started?",
    answer:
      "With the Brand Assessment. It reads how well your market actually knows you and returns a grade. The grade sets the conversation, the full assessment produces the scope, and the scope produces the program. Diagnosis first, never a menu.",
  },
] as const;
