import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { BlogPost } from "@/lib/blog";

export interface DbPostRow {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  description: string | null;
  content: string;
  cover_image: string | null;
  published: boolean;
  published_at: string | null;
  word_count?: number | null;
  category?: string | null;
  seo_title?: string | null;
  faq?: { question: string; answer: string }[] | null;
}

// Card/sitemap projection: everything except the (potentially 100KB)
// content column — measured ~28x smaller per row.
const SUMMARY_COLS =
  "slug, title, description, cover_image, published, published_at, created_at, updated_at, word_count, category";
const SUMMARY_COLS_LEGACY =
  "slug, title, description, cover_image, published, published_at, created_at, updated_at";

function rowToPost(row: Partial<DbPostRow> & { slug: string; title: string }): BlogPost {
  const content = row.content ?? "";
  const words = row.word_count ?? (content ? content.split(/\s+/).length : 440);
  const date = (row.published_at ?? row.created_at ?? "").slice(0, 10);
  const updated = (row.updated_at ?? "").slice(0, 10);
  return {
    slug: row.slug,
    title: row.title,
    description: row.description ?? "",
    date,
    // Only surface "Updated" when it's actually a later day than publish.
    updated: updated > date ? updated : undefined,
    author: "TopServ Digital",
    category: row.category || "Insights",
    readingMinutes: Math.max(1, Math.round(words / 220)),
    content,
    coverImage: row.cover_image ?? undefined,
    seoTitle: row.seo_title ?? undefined,
    faq: row.faq && row.faq.length ? row.faq : undefined,
    source: "db",
  };
}

/**
 * Published database posts WITHOUT their content — for the index, sitemap,
 * and static params, which never render bodies. Falls back to the legacy
 * projection until the word_count column exists.
 */
export async function getDbPostSummaries(): Promise<BlogPost[]> {
  const sb = getSupabaseAdmin();
  if (!sb) return [];
  type SummaryResult = { data: unknown[] | null; error: { message?: string } | null };
  let { data, error } = (await sb
    .from("posts")
    .select(SUMMARY_COLS)
    .eq("published", true)
    .order("published_at", { ascending: false })) as SummaryResult;
  if (error && /word_count|column/i.test(error.message ?? "")) {
    ({ data, error } = (await sb
      .from("posts")
      .select(SUMMARY_COLS_LEGACY)
      .eq("published", true)
      .order("published_at", { ascending: false })) as SummaryResult);
  }
  if (error) {
    console.error("Blog summaries query failed:", error);
    return [];
  }
  return ((data as unknown as DbPostRow[]) ?? []).map(rowToPost);
}

/** Published database posts with full content (single-post reads only). */
export async function getDbPosts(): Promise<BlogPost[]> {
  const sb = getSupabaseAdmin();
  if (!sb) return [];
  const { data, error } = await sb
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error || !data) {
    if (error) console.error("Blog posts query failed:", error);
    return [];
  }
  return (data as DbPostRow[]).map(rowToPost);
}

export async function getDbPost(slug: string): Promise<BlogPost | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  const { data, error } = await sb
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  // A transient DB failure otherwise renders a live post as a silent 404.
  if (error) console.error("Blog post query failed:", slug, error);
  return data ? rowToPost(data as DbPostRow) : null;
}

/** Admin list: every database post, drafts included, no content bodies. */
export async function listAllDbPosts(): Promise<DbPostRow[]> {
  const sb = getSupabaseAdmin();
  if (!sb) return [];
  const { data, error } = await sb
    .from("posts")
    .select("id, slug, title, published, updated_at, created_at, published_at, description, cover_image")
    .order("updated_at", { ascending: false });
  if (error) console.error("Admin post list query failed:", error);
  return (data as unknown as DbPostRow[]) ?? [];
}

export async function getDbPostById(id: string): Promise<DbPostRow | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  const { data, error } = await sb.from("posts").select("*").eq("id", id).maybeSingle();
  if (error) console.error("Post-by-id query failed:", id, error);
  return (data as DbPostRow) ?? null;
}
