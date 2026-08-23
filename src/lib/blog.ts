import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  category: string;
  readingMinutes: number;
  content: string;
  /** Public URL of a cover image (database posts only). */
  coverImage?: string;
  /** Meta/tab title when it differs from the on-page H1 (database posts). */
  seoTitle?: string;
  /** Structured FAQ rendered as a visible section + FAQPage JSON-LD. */
  faq?: { question: string; answer: string }[];
  /** Where the post lives: repo MDX file or the admin-managed database. */
  source?: "file" | "db";
}

function parseFile(filePath: string, slug: string): BlogPost {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).length;
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    updated: data.updated ? String(data.updated) : undefined,
    author: String(data.author ?? "TopServ Digital"),
    category: String(data.category ?? "Insights"),
    readingMinutes: Math.max(1, Math.round(words / 220)),
    content,
  };
}

export function getFilePosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      ...parseFile(path.join(BLOG_DIR, file), file.replace(/\.mdx$/, "")),
      source: "file" as const,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function getFilePost(slug: string): BlogPost | null {
  // Guard against path traversal in the dynamic segment.
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return { ...parseFile(filePath, slug), source: "file" };
}

/**
 * Hybrid catalog: repo MDX posts plus published admin-managed database
 * posts, newest first. On a slug collision the database post wins.
 * Summaries only — content bodies are fetched per-post by getPost.
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const { getDbPostSummaries } = await import("@/lib/blog-db");
  const db = await getDbPostSummaries();
  const dbSlugs = new Set(db.map((p) => p.slug));
  return [...db, ...getFilePosts().filter((p) => !dbSlugs.has(p.slug))].sort(
    (a, b) => (a.date < b.date ? 1 : -1)
  );
}

// React cache: generateMetadata and the page component both call this per
// request; dedupe to a single DB round trip.
export const getPost = cache(async (slug: string): Promise<BlogPost | null> => {
  const { getDbPost } = await import("@/lib/blog-db");
  return (await getDbPost(slug)) ?? getFilePost(slug);
});
