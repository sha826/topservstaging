/**
 * The JB video set, by placement.
 *
 * Titles, upload dates and durations were read from YouTube itself rather
 * than retyped, so the VideoObject markup states what is actually true of
 * each file. The YouTube descriptions are the platform's boilerplate, so
 * each description here is written to say what the video is; it is the only
 * field not taken from the source.
 *
 * The numeric prefixes the files carry on YouTube, "1 - Manifesto", are
 * production ordering and are not public language. The visible title and
 * the schema both use the clean name.
 */
export interface JbVideo {
  /** YouTube id. The embed and the thumbnail are both derived from it. */
  id: string;
  /** Shown beside the player and used as VideoObject name. */
  title: string;
  /** VideoObject description. Says what the video is, nothing more. */
  description: string;
  /** ISO date, from YouTube. */
  uploadDate: string;
  /** ISO 8601 duration, from YouTube's lengthSeconds. */
  duration: string;
}

export const jbVideos = {
  manifesto: {
    id: "e2PqGfC7EeE",
    title: "Manifesto",
    description:
      "Jonathan Bannister on why TopServ Digital exists and what it refuses to do: the case for building a brand customers choose instead of renting attention.",
    uploadDate: "2026-09-10",
    duration: "PT1M46S",
  },
  fiveMileFamous: {
    id: "__T-NEnQ4Pk",
    title: "Five Mile Famous",
    description:
      "What it means for a home service company to be the name its own market already knows, and why that radius is the one that pays.",
    uploadDate: "2026-09-10",
    duration: "PT49S",
  },
  homeClose: {
    id: "MdDKH5kVJSU",
    title: "The Case for Building a Brand",
    description:
      "The closing argument of the TopServ Digital home page: what changes for a contractor who stops chasing leads and starts building a brand.",
    uploadDate: "2026-09-10",
    duration: "PT56S",
  },
  whatIsBrandformance: {
    id: "M7ZUzpjYRZ8",
    title: "What Is BrandFormance",
    description:
      "BrandFormance explained: brand building and performance marketing run as 1 system, where brand creates the demand and performance captures it.",
    uploadDate: "2026-09-10",
    duration: "PT1M51S",
  },
  whoThisIsNotFor: {
    id: "2NPWV5qhxAc",
    title: "Who TopServ Is Not For",
    description:
      "The companies TopServ Digital turns down, and why saying so up front saves everyone a sales process that was never going to work.",
    uploadDate: "2026-09-10",
    duration: "PT48S",
  },
  betterCustomers: {
    id: "lSSY8HPLufw",
    title: "Better Customers, Not More Leads",
    description:
      "Why the goal is a better customer rather than a bigger pile of leads, and what that changes about how the work is measured.",
    uploadDate: "2026-09-17",
    duration: "PT1M9S",
  },
  assessment: {
    id: "aec4UPlvDrM",
    title: "The Brand Assessment",
    description:
      "What the Brand Assessment reads, what it returns, and why the answer is a grade with a consequence rather than a number.",
    uploadDate: "2026-09-10",
    duration: "PT58S",
  },
  thankYouPreCall: {
    id: "5MfJ2cnkT8E",
    title: "What Happens Next",
    description:
      "What to expect after requesting a Brand Grade: how the assessment is run and what the conversation afterwards covers.",
    uploadDate: "2026-09-10",
    duration: "PT1M42S",
  },
  whyTopservExists: {
    id: "kDCFsPjdoaI",
    title: "Why TopServ Exists",
    description:
      "Jonathan Bannister on the problem TopServ Digital was built to solve for residential home service companies.",
    uploadDate: "2026-09-10",
    duration: "PT1M11S",
  },
  fckDigitalMarketing: {
    id: "7hSdkkalWB0",
    title: "F#ck Digital Marketing",
    description:
      "Jonathan Bannister's case against the way digital marketing is sold to contractors, and what he argues should replace it.",
    uploadDate: "2026-09-10",
    duration: "PT1M0S",
  },
} as const satisfies Record<string, JbVideo>;

/**
 * The 2 case study films. They belong on /case-studies, which is built and
 * waiting for them, but they are NOT published: both name a client on
 * camera, and whether any client may be named publicly is still Ryan's
 * call, the same decision namesCleared in bf-content.ts is waiting on.
 *
 * Flip caseStudyFilmsCleared to true when Ryan confirms and the section
 * appears. Nothing else needs changing.
 *
 *   Watt's Right case study     youtu.be/FkPt_Ar1XjQ   2026-09-10  PT59S
 *   Spencer Air Conditioning    youtu.be/pCZ8xnk0z18   2026-09-10  PT57S
 */
// On for review, so Ryan can watch both films in place. Set back to false
// before the domain is connected unless he has confirmed by then.
export const caseStudyFilmsCleared = true;

export const heldForNameClearance = {
  wattsRightCaseStudy: {
    id: "FkPt_Ar1XjQ",
    title: "Watt's Right Case Study",
    description:
      "A case study film on the work TopServ Digital ran for an electrical contractor.",
    uploadDate: "2026-09-10",
    duration: "PT59S",
  },
  spencerCaseStudy: {
    id: "pCZ8xnk0z18",
    title: "Spencer Air Conditioning",
    description:
      "A case study film on the work TopServ Digital ran for a heating and air contractor.",
    uploadDate: "2026-09-10",
    duration: "PT57S",
  },
} as const satisfies Record<string, JbVideo>;
