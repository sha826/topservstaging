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
export const partners: Partner[] = [
  { file: "eagle-point.png", name: "EaglePoint" },
  { file: "hawkins.png", name: "Hawkins" },
  { file: "cs-air.png", name: "C&S Air" },
  { file: "all-heart.png", name: "All Heart Heating, Cooling & Plumbing" },
  { file: "problem-solvers.png", name: "The Problem Solvers" },
  { file: "golden-plumbing.png", name: "Golden Plumbing" },
  { file: "doggone-good.webp", name: "Doggone Good" },
  { file: "mission-accomplished.avif", name: "Mission Accomplished" },
  { file: "kings-window.webp", name: "Kings Window Services" },
  { file: "sugar-land-premier.png", name: "Sugar Land Premier Roofing" },
];
