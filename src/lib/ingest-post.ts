import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateCover } from "@/lib/generate-cover";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { siteConfig } from "@/lib/site-config";

/**
 * Core of the blog content pipeline, shared by the webhook route
 * (/api/ingest/posts) and the MCP server (/api/mcp): validate a structured
 * post, upsert it by slug (drafts by default), optionally generate a cover,
 * and revalidate the affected pages.
 */
export const ingestPayloadSchema = z.object({
  title: z.string().trim().min(3).max(200),
  content: z.string().min(50).max(100_000),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "lowercase letters, digits, and hyphens only")
    .max(80)
    .optional(),
  description: z.string().trim().max(500).optional(),
  coverImageUrl: z.string().url().max(1000).optional(),
  generateCover: z.boolean().optional(),
  coverPrompt: z.string().max(600).optional(),
  publish: z.boolean().optional(),
});
export type IngestPayload = z.infer<typeof ingestPayloadSchema>;

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
}

export interface IngestResult {
  status: number;
  body: Record<string, unknown>;
}

export async function ingestPost(p: IngestPayload): Promise<IngestResult> {
  const sb = getSupabaseAdmin();
  if (!sb) return { status: 503, body: { ok: false, error: "Database is not configured." } };

  const slug = p.slug ?? slugify(p.title);
  if (!slug) return { status: 400, body: { ok: false, error: "Could not derive a slug." } };

  const { data: existing } = await sb
    .from("posts")
    .select("id, published_at, cover_image")
    .eq("slug", slug)
    .maybeSingle();

  // Cover priority: explicit URL > AI-generated (when asked) > existing.
  let coverImage: string | null = p.coverImageUrl ?? existing?.cover_image ?? null;
  let coverNote: string | undefined;
  if (!p.coverImageUrl && p.generateCover) {
    const gen = await generateCover(p.coverPrompt ?? p.title);
    if (gen.url) coverImage = gen.url;
    else coverNote = `Cover generation failed (${gen.error}); post saved without it.`;
  }

  const publish = p.publish === true;
  const row = {
    slug,
    title: p.title,
    description: p.description ?? null,
    content: p.content.replace(/\r\n/g, "\n"),
    cover_image: coverImage,
    published: publish,
    published_at: publish ? (existing?.published_at ?? new Date().toISOString()) : null,
    updated_at: new Date().toISOString(),
  };

  const { error } = existing
    ? await sb.from("posts").update(row).eq("id", existing.id)
    : await sb.from("posts").insert(row);
  if (error) {
    console.error("Ingest upsert failed:", error);
    return { status: 502, body: { ok: false, error: "Database write failed." } };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");

  return {
    status: 200,
    body: {
      ok: true,
      action: existing ? "updated" : "created",
      slug,
      published: publish,
      url: `${siteConfig.url}/blog/${slug}`,
      coverImage,
      ...(coverNote ? { note: coverNote } : {}),
    },
  };
}

/** Shared static-key check for the ingest surfaces. */
export function ingestAuthorized(req: Request): boolean {
  const key = process.env.BLOG_INGEST_KEY;
  if (!key) return false;
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const apiKey = req.headers.get("x-api-key");
  const urlKey = new URL(req.url).searchParams.get("key");
  return bearer === key || apiKey === key || urlKey === key;
}
