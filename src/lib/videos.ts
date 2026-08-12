export interface PortfolioVideo {
  id: string;
  title: string;
  client: string;
  trade: string;
  kind: string;
  uploadDate: string;
  embedUrl: string;
  thumbnail: string;
}

function yt(id: string, rest: Omit<PortfolioVideo, "id" | "embedUrl" | "thumbnail">): PortfolioVideo {
  return {
    id,
    ...rest,
    embedUrl: `https://www.youtube.com/embed/${id}`,
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  };
}

// Verified live videos from TopServ's client channels (titles and upload
// dates pulled from YouTube, Aug 2026).
export const portfolioVideos: PortfolioVideo[] = [
  yt("_l9EU1eXza4", {
    title: "Why Our Customers Keep Coming Back | Flow Pros Plumbing",
    client: "Flow Pros Plumbing",
    trade: "Plumbing",
    kind: "Customer testimonial film",
    uploadDate: "2024-12-23",
  }),
  yt("IDMA6lnKITI", {
    title: "Why Over 100 Neighbors Trust Sugar Land Premier Roofing for Their Roofs!",
    client: "Sugar Land Premier Roofing",
    trade: "Roofing",
    kind: "Social proof film",
    uploadDate: "2025-01-16",
  }),
  yt("iyHKJUvPEEs", {
    title: "45 Years of Trust: Why Chisholm Plumbing Air Electric is Greer's Trusted Home Service Expert",
    client: "Chisholm Plumbing, Heating & Air Conditioning",
    trade: "Plumbing · HVAC · Electrical",
    kind: "Brand story film",
    uploadDate: "2024-08-20",
  }),
  yt("4hYU9yjk6V4", {
    title: "Our HVAC Story in Clackamas, OR: A Commitment to Home Comfort and Safety | Ultimate Comfort",
    client: "Ultimate Comfort",
    trade: "HVAC",
    kind: "Brand story film",
    uploadDate: "2024-04-04",
  }),
  yt("r_9BXvgyCUU", {
    title: "How Brandon Fixed My Texas Home's AC Nightmare!",
    client: "The Problem Solvers",
    trade: "HVAC",
    kind: "Customer testimonial film",
    uploadDate: "2025-01-21",
  }),
  yt("NBoTeGaq410", {
    title: "Meet The Problem Solvers: Your Go-To Team for Electrical Repairs & Upgrades!",
    client: "The Problem Solvers",
    trade: "Electrical",
    kind: "Team spotlight film",
    uploadDate: "2025-01-20",
  }),
];
