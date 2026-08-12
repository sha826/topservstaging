// The 7-step process deep-dive (design-lab JC "editing timeline").
// Copy is verbatim from the original site's panels; assets in
// public/images/process/.

export type DescSegment = { t: string; b?: boolean };

export type StepMedia =
  | { kind: "shots"; shots: string[]; fitWhole?: boolean }
  | { kind: "compare"; before: string; after: string; labelBefore: string; labelAfter: string }
  | { kind: "videos"; videos: { id: string; label: string }[] }
  | { kind: "mosaic"; funnel: string; ad: string; map: string };

export interface ProcessDetailStep {
  title: string;
  tone: "blue" | "green";
  desc: DescSegment[];
  ctas?: { label: string; href?: string; img?: string }[];
  media: StepMedia;
}

const IMG = "/images/process";

export const PROCESS_DETAIL: ProcessDetailStep[] = [
  {
    title: "GBP & Website Audit",
    tone: "blue",
    desc: [
      { t: "We analyze your top local competitors to identify what they’re doing right—and where YOU fall short." },
    ],
    ctas: [
      { label: "Full GBP Report", img: `${IMG}/step1-GBP-Categories.png` },
      { label: "Full Heatmap Report", img: `${IMG}/step1-Heat-Map-Problem-Solvers.png` },
    ],
    media: { kind: "shots", shots: [`${IMG}/step1-GBP-Categories.png`, `${IMG}/step1-Heat-Map-Problem-Solvers.png`] },
  },
  {
    title: "AI-Powered GBP Optimization",
    tone: "green",
    desc: [
      { t: "Using advanced AI tools, we audit competitor profiles and craft highly optimized Google Business Profile content — service descriptions, business details, profile names, and media packed with the right keywords." },
    ],
    media: {
      kind: "compare",
      before: `${IMG}/step2-Services-Before.png`,
      after: `${IMG}/step2-Screenshot-2025-01-31-at-11-20-55-AM.png`,
      labelBefore: "BEFORE",
      labelAfter: "AFTER",
    },
  },
  {
    title: "Video Marketing Strategy",
    tone: "green",
    desc: [
      { t: "A video strategy tailored to every stage of your customer’s journey — from awareness to conversion — placed across all marketing channels to maximize impact." },
    ],
    ctas: [
      { label: "Full Video Content Plan", href: "https://docs.google.com/spreadsheets/d/1VwFb1Gw9IoJTV-ank12C-KJEFrsL_cC4ex0F_SPnLf8/edit?gid=0#gid=0" },
      { label: "Full YouTube Plan", href: "https://docs.google.com/document/d/1lTtY-t3oZAniHTjtTHe7axxi8AJ8V3hEnJgLX-1Ih3c/edit?tab=t.0" },
    ],
    media: {
      kind: "videos",
      videos: [
        { id: "r_9BXvgyCUU", label: "The Problem Solvers" },
        { id: "Pg04bw3tYDc", label: "Flow Pros Plumbing" },
        { id: "J2gx3z5P_HM", label: "Your New Door" },
      ],
    },
  },
  {
    title: "Targeted Funnels & Addressable Geofencing",
    tone: "green",
    desc: [
      { t: "Strategic funnels guide customers from interest to action; addressable geofencing hyper-targets specific homes — ads on their TVs, search results, social media, and mobile devices, multiple times a day." },
    ],
    media: {
      kind: "mosaic",
      funnel: `${IMG}/step4-Step-4-Funnel.png`,
      ad: `${IMG}/step4-SLP.png`,
      map: `${IMG}/step4-Mpa.png`,
    },
  },
  {
    title: "Service & Location Pages",
    tone: "green",
    desc: [
      { t: "Dedicated pages for each key service and top location — ranking high in search, answering customer questions, and converting visitors into leads." },
    ],
    ctas: [{ label: "See Full Sitemap", href: `${IMG}/step5-Figma-Site-Map.jpg` }],
    media: { kind: "shots", shots: [`${IMG}/step5-Figma-Site-Map.jpg`], fitWhole: true },
  },
  {
    title: "Data-Driven Planning",
    tone: "green",
    desc: [
      { t: "A comprehensive year-long marketing plan built from your data, alongside a media plan of specific campaigns and platform strategies. Drag the slider: the plan vs. the cost breakdown." },
    ],
    media: {
      kind: "compare",
      before: `${IMG}/step6-Map-and-Planning.png`,
      after: `${IMG}/step6-cost-breakdown.png`,
      labelBefore: "PLANNING",
      labelAfter: "COST BREAKDOWN",
    },
  },
  {
    title: "Track – Learn – Dominate",
    tone: "blue",
    desc: [
      { t: "A three-step cycle. " },
      { t: "Track:", b: true },
      { t: " monitor performance in real time. " },
      { t: "Learn:", b: true },
      { t: " analyze the data to uncover insights. " },
      { t: "Dominate:", b: true },
      { t: " use data-driven adjustments to outperform competitors." },
    ],
    ctas: [
      { label: "SearchLight Analytics", img: `${IMG}/step7-Search-Light-Image.jpg` },
      { label: "Custom Dashboard", img: `${IMG}/step7-Topserv-Custom-Dashboard.jpg` },
    ],
    media: {
      kind: "compare",
      before: `${IMG}/step7-Search-Light-Image.jpg`,
      after: `${IMG}/step7-Topserv-Custom-Dashboard.jpg`,
      labelBefore: "SEARCHLIGHT",
      labelAfter: "CUSTOM DASHBOARD",
    },
  },
];
