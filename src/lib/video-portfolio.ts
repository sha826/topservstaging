// The film portfolio (design-lab M4 "cinema stage"). Muted teasers live in
// public/videos/portfolio/. Posters are named by YouTube id: the previous
// names carried the client's company name, and the poster path is emitted as
// thumbnailUrl in VideoObject schema, which carries no third party names.
// Only films with a WORKING full-length YouTube
// version are listed — the three All-Heart films (testimonial, brand story,
// Good Heart) were removed because their YouTube uploads were deleted or
// made private upstream (confirmed 404 via oEmbed). Their teasers remain in
// public/videos/portfolio/ — if the client re-uploads the full films, add
// them back here with name/client/teaser/poster/youtubeId/uploadDate.
// Upload dates verified via YouTube.

export interface PortfolioFilm {
  name: string;
  client: string;
  teaser: string;
  poster?: string;
  youtubeId?: string;
  uploadDate?: string;
}

const DIR = "/videos/portfolio";

export const PORTFOLIO_FILMS: PortfolioFilm[] = [
  {
    name: "Why Our Customers Keep Coming Back",
    client: "Flow Pros Plumbing",
    teaser: `${DIR}/Flow-Pros-Vidoe-Customer.mp4`,
    poster: `${DIR}/film-_l9EU1eXza4.jpg`,
    youtubeId: "_l9EU1eXza4",
    uploadDate: "2024-12-23",
  },
  {
    name: "45 Years of Trust",
    client: "Chisholm Plumbing, Heating & Air",
    teaser: `${DIR}/Chisholm-Story-Brand.mp4`,
    poster: `${DIR}/film-iyHKJUvPEEs.jpg`,
    youtubeId: "iyHKJUvPEEs",
    uploadDate: "2024-08-20",
  },
  {
    name: "Why 100+ Neighbors Trust Us",
    client: "Sugar Land Premier Roofing",
    teaser: `${DIR}/Sugarland-Roofing.mp4`,
    poster: `${DIR}/film-IDMA6lnKITI.jpg`,
    youtubeId: "IDMA6lnKITI",
    uploadDate: "2025-01-16",
  },
  {
    name: "Our HVAC Story",
    client: "Ultimate Comfort",
    teaser: `${DIR}/Brand-Video-ULtimate-Comfort.mp4`,
    poster: `${DIR}/film-4hYU9yjk6V4.jpg`,
    youtubeId: "4hYU9yjk6V4",
    uploadDate: "2024-04-04",
  },
  {
    name: "Welcome to TopServ Digital",
    client: "TopServ Digital",
    teaser: `${DIR}/Welcome-Video-v2-Selects.mp4`,
    poster: `${DIR}/film-Cnjs_7JFt9k.jpg`,
    youtubeId: "Cnjs_7JFt9k",
    uploadDate: "2025-02-03",
  },
];
