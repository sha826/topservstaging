import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Deliberate AI-crawler policy: search and answer-engine bots are explicitly
// welcomed (visibility in AI answers is a business goal), listed by name so
// the policy is a documented choice rather than an accident of an empty file.
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // /api/og stays fetchable — it renders every page's social card.
        allow: ["/", "/api/og"],
        disallow: ["/api/", "/admin"],
      },
      ...AI_CRAWLERS.map((bot) => ({
        userAgent: bot,
        allow: "/" as const,
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
