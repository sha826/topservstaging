import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateCover } from "@/lib/generate-cover";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { siteConfig } from "@/lib/site-config";

export const maxDuration = 60;

/**
 * Blog ingest webhook: external systems (SEO tooling, Agency Titan, Zapier,
 * n8n, internal agents) push structured posts here and they become real
 * pages with schema, sitemap entries, and OG images automatically.
 *
 * - Auth: Authorization: Bearer <BLOG_INGEST_KEY> (or x-api-key header).
 * - Idempotent: pushes upsert by slug, so re-sending updates the post.
 * - Safe by default: posts arrive as DRAFTS unless publish: true.
 * - Content is rendered as plain markdown (never MDX/JSX) on the site.
 */
const payloadSchema = z.object({
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

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
}

function authorized(req: Request): boolean {
  const key = process.env.BLOG_INGEST_KEY;
  if (!key) return false;
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const apiKey = req.headers.get("x-api-key");
  return bearer === key || apiKey === key;
}

export async function GET() {
  return Response.json({
    ok: true,
    endpoint: "POST /api/ingest/posts",
    auth: "Authorization: Bearer <key> or x-api-key: <key>",
    fields: {
      title: "required, 3-200 chars",
      content: "required, markdown, 50-100k chars",
      slug: "optional, kebab-case; derived from title if omitted; upserts by slug",
      description: "optional, SEO + card text, <=500 chars",
      coverImageUrl: "optional, absolute URL to a cover image",
      generateCover: "optional boolean, AI-generate a cover when no URL given",
      coverPrompt: "optional, prompt for the generated cover (defaults to title)",
      publish: "optional boolean, default false (arrives as draft)",
    },
  });
}

export async function POST(req: Request) {
  if (!process.env.BLOG_INGEST_KEY) {
    return Response.json({ ok: false, error: "Ingest is not configured." }, { status: 503 });
  }
  if (!authorized(req)) {
    return Response.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  const sb = getSupabaseAdmin();
  if (!sb) {
    return Response.json({ ok: false, error: "Database is not configured." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Body must be valid JSON." }, { status: 400 });
  }
  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Invalid payload.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  const p = parsed.data;
  const slug = p.slug ?? slugify(p.title);
  if (!slug) {
    return Response.json({ ok: false, error: "Could not derive a slug." }, { status: 400 });
  }

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
    return Response.json({ ok: false, error: "Database write failed." }, { status: 502 });
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");

  return Response.json({
    ok: true,
    action: existing ? "updated" : "created",
    slug,
    published: publish,
    url: `${siteConfig.url}/blog/${slug}`,
    coverImage,
    ...(coverNote ? { note: coverNote } : {}),
  });
}
