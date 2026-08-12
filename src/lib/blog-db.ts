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
}

function rowToPost(row: DbPostRow): BlogPost {
  const words = row.content.split(/\s+/).length;
  return {
    slug: row.slug,
    title: row.title,
    description: row.description ?? "",
    date: (row.published_at ?? row.created_at).slice(0, 10),
    updated: row.updated_at.slice(0, 10),
    author: "TopServ Digital",
    category: "Insights",
    readingMinutes: Math.max(1, Math.round(words / 220)),
    content: row.content,
    coverImage: row.cover_image ?? undefined,
    source: "db",
  };
}

/** Published database posts, mapped to the shared BlogPost shape. */
export async function getDbPosts(): Promise<BlogPost[]> {
  const sb = getSupabaseAdmin();
  if (!sb) return [];
  const { data, error } = await sb
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error || !data) return [];
  return (data as DbPostRow[]).map(rowToPost);
}

export async function getDbPost(slug: string): Promise<BlogPost | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  const { data } = await sb
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return data ? rowToPost(data as DbPostRow) : null;
}

/** Admin: every database post, drafts included. */
export async function listAllDbPosts(): Promise<DbPostRow[]> {
  const sb = getSupabaseAdmin();
  if (!sb) return [];
  const { data } = await sb
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });
  return (data as DbPostRow[]) ?? [];
}

export async function getDbPostById(id: string): Promise<DbPostRow | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  const { data } = await sb.from("posts").select("*").eq("id", id).maybeSingle();
  return (data as DbPostRow) ?? null;
}
