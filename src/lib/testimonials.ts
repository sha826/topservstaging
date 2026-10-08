export interface Testimonial {
  name: string;
  company?: string;
  quote: string;
}

// Verbatim quotes only — pulled from TopServ's published testimonials page.
export const testimonials: Testimonial[] = [
  {
    name: "Michael Harrison",
    quote:
      "Impeccable service, they are quick to get back with us and answer any questions that we have. Anything that we have asked of them, whether it be changes to our logo, website, business form, promotional items uniforms has been handled in a friendly, courteous, & timely manner. If it were up to me TopServ would be kept a secret because they truly have the ability to make your business grow. If you want to expand your business, TopServ Digital is the answer!",
  },
];

export interface VideoTestimonial {
  name: string;
  company: string;
  youtubeId: string;
  title: string;
  uploadDate: string;
}

// The original homepage's "Partner love" section: on-camera testimonials
// hosted on TopServ's own YouTube channel (IDs verified live Aug 2026).
export const videoTestimonials: VideoTestimonial[] = [
  {
    name: "Dylan Rucker",
    company: "All Heart",
    youtubeId: "ggp0uduHS8s",
    title: "All Heart Heating, Cooling, Plumbing - Testimonial",
    uploadDate: "2025-07-30",
  },
  {
    name: "Maddie Studstill",
    company: "Flow Pros Plumbing",
    youtubeId: "n7uzximDssk",
    title: "Flow Pros Plumbing - Testimonials",
    uploadDate: "2025-07-30",
  },
];

export interface Partner {
  file: string;
  name: string;
}

// The original homepage's "Meet Our Valued Partners" logo set (10 clients).
// -sm.webp variants are 128px-tall (display is 64px @2x); originals kept
// alongside for future large uses.
/**
 * The full logo roster. Nothing renders this today: the home page band
 * shows homePartners below instead. Kept because the files are in the repo
 * and a future surface may want the whole set.
 */
export const partners: Partner[] = [
  { file: "eagle-point-sm.webp", name: "EaglePoint" },
  { file: "hawkins-sm.webp", name: "Hawkins" },
  { file: "cs-air-sm.webp", name: "C&S Air" },
  { file: "all-heart-sm.webp", name: "All Heart Heating, Cooling & Plumbing" },
  { file: "problem-solvers-sm.webp", name: "The Problem Solvers" },
  { file: "golden-plumbing-sm.webp", name: "Golden Plumbing" },
  { file: "doggone-good-sm.webp", name: "Doggone Good" },
  { file: "mission-accomplished-sm.webp", name: "Mission Accomplished" },
  { file: "kings-window-sm.webp", name: "Kings Window Services" },
  { file: "sugar-land-premier-sm.webp", name: "Sugar Land Premier Roofing" },
];

/**
 * The logos the home page band shows, in order, each once.
 *
 * This is a chosen 5, not the whole partner list above, which stays as the
 * full roster other surfaces can draw on.
 *
 * 4 of the 5 have no logo file in the repo yet. The band renders only the
 * entries whose file is actually present, so it stays correct rather than
 * showing broken images, and each one appears the moment its file lands in
 * public/images/partners/ with no code change.
 */
/**
 * The 5 partner companies the home page names, with the trade each one
 * states on its own logo. Nothing here is inferred: "window services",
 * "the comfort control people", "air conditioning & heating since 1960",
 * "electric" and "septic" are printed on the marks themselves.
 *
 * NO REVENUE FIGURES. The 6 rows in sixClients carry real before and after
 * numbers, and they belong to 6 different clients: All Heart Heating, Your
 * New Door, Nick AC, Zen Air, C and S Air, and Spencer Air. Only Spencer is
 * in both lists. Putting those figures on these names would credit each
 * company with another company's revenue, so this list carries none, and
 * sixClients is untouched and ready for the day the real figures arrive.
 */
export interface PartnerCompany {
  name: string;
  trade: string;
}

export const homePartnerCompanies: PartnerCompany[] = [
  { name: "King's Window Services", trade: "Window services" },
  { name: "All Seasons", trade: "Heating and air" },
  { name: "Spencer", trade: "Air conditioning and heating" },
  { name: "Watt's Right Electric", trade: "Electrical" },
  { name: "LilyPad Septic", trade: "Septic" },
];

export const homePartners: Partner[] = [
  { file: "kings-window-sm.webp", name: "King's Window Services" },
  { file: "all-seasons-sm.webp", name: "All Seasons" },
  { file: "spencer-sm.webp", name: "Spencer" },
  { file: "watts-right-sm.webp", name: "Watt's Right" },
  { file: "lilypad-sm.webp", name: "Lilypad" },
];
