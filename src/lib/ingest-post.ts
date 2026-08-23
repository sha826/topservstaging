import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import TurndownService from "turndown";
import { gfm } from "@truto/turndown-plugin-gfm";
import { generateCover } from "@/lib/generate-cover";
import { getFilePosts } from "@/lib/blog";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { fetchAndStoreImage } from "@/lib/upload-image";
import { siteConfig } from "@/lib/site-config";

/** Rich-text (HTML) bodies from external systems become clean markdown. */
function htmlToMarkdown(html: string): string {
  const td = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });
  td.use(gfm);
  // Scripts/styles never survive; the markdown renderer neutralizes any
  // remaining HTML at display time as the second line of defense.
  td.remove(["script", "style", "iframe", "object", "embed"]);
  return td.turndown(html).replace(/\r\n/g, "\n");
}

/**
 * Core of the blog content pipeline, shared by the webhook route
 * (/api/ingest/posts) and the MCP server (/api/mcp): validate a structured
 * post, upsert it by slug (drafts by default), optionally generate a cover,
 * and revalidate the affected pages.
 */
export const ingestPayloadSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "title must be at least 3 characters")
    .max(200, "title must be 200 characters or fewer"),
  content: z
    .string()
    .min(50, "content must be at least 50 characters")
    .max(100_000, "content must be 100,000 characters or fewer"),
  /** "html" converts the body to markdown at ingest (for rich-text sources like Agency Titan). */
  format: z.enum(["markdown", "html"]).optional(),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "slug may only use lowercase letters, digits, and hyphens")
    .max(80, "slug must be 80 characters or fewer")
    .optional(),
  description: z
    .string()
    .trim()
    .max(500, "description must be 500 characters or fewer")
    .nullable()
    .optional(),
  coverImageUrl: z
    .string()
    .url("coverImageUrl must be an absolute URL")
    .regex(/^https?:\/\//, "coverImageUrl must be http(s)")
    .max(1000)
    .nullable()
    .optional(),
  generateCover: z.boolean().optional(),
  coverPrompt: z.string().max(600, "coverPrompt must be 600 characters or fewer").optional(),
  publish: z.boolean().optional(),
  /** Eyebrow/category label shown on cards and the article header. */
  category: z.string().trim().max(60, "category must be 60 characters or fewer").nullable().optional(),
  /** Meta/tab title when it should differ from the on-page H1. */
  seoTitle: z.string().trim().max(200, "seoTitle must be 200 characters or fewer").nullable().optional(),
  /** Structured FAQ: rendered as a visible section AND FAQPage JSON-LD. */
  faq: z
    .array(
      z.object({
        question: z.string().trim().min(3).max(300, "each FAQ question must be 300 characters or fewer"),
        answer: z.string().trim().min(3).max(2000, "each FAQ answer must be 2000 characters or fewer"),
      })
    )
    .max(20, "at most 20 FAQ entries")
    .optional(),
  /** Required to intentionally replace a repo MDX post with the same slug. */
  overrideRepoPost: z.boolean().optional(),
});
export type IngestPayload = z.infer<typeof ingestPayloadSchema>;

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
}

/** Fallback rendering when the faq column doesn't exist yet. */
function faqToMarkdown(faq: { question: string; answer: string }[]): string {
  return [
    "## Frequently asked questions",
    ...faq.map((f) => `### ${f.question}\n\n${f.answer}`),
  ].join("\n\n");
}

export interface IngestResult {
  status: number;
  body: Record<string, unknown>;
}

export async function ingestPost(p: IngestPayload): Promise<IngestResult> {
  const sb = getSupabaseAdmin();
  if (!sb) return { status: 503, body: { ok: false, error: "Database is not configured." } };

  // Normalize provided slugs through the same slugifier the admin uses, so
  // "--weird--" inputs can't create URLs an admin edit would later change.
  const slug = slugify(p.slug ?? p.title);
  if (!slug) return { status: 400, body: { ok: false, error: "Could not derive a slug." } };

  // Guardrail: a database post with a repo MDX post's slug REPLACES that
  // vetted post site-wide once published. Require an explicit override.
  if (!p.overrideRepoPost && getFilePosts().some((f) => f.slug === slug)) {
    return {
      status: 409,
      body: {
        ok: false,
        error: `Slug "${slug}" belongs to an existing repo post; publishing would replace it site-wide. Pick another slug, or pass overrideRepoPost: true to do this intentionally.`,
      },
    };
  }

  // select("*") so this read never breaks on databases that predate the
  // optional columns (category, seo_title, faq, word_count).
  const { data: existing, error: readError } = (await sb
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()) as {
    data: {
      id: string;
      published: boolean;
      published_at: string | null;
      cover_image: string | null;
      description: string | null;
      category?: string | null;
      seo_title?: string | null;
      faq?: { question: string; answer: string }[] | null;
    } | null;
    error: { message?: string } | null;
  };
  if (readError) {
    console.error("Ingest read failed:", readError);
    return { status: 503, body: { ok: false, error: "Could not read the current post state; try again." } };
  }

  // Cover priority: explicit URL > AI-generated (when asked) > existing.
  // External URLs are downloaded and re-hosted in our storage, so covers
  // from expiring sources (Titan attachments) never go stale.
  let coverImage: string | null = p.coverImageUrl ?? existing?.cover_image ?? null;
  let coverNote: string | undefined;
  const sbHost = (() => {
    try {
      return new URL(process.env.SUPABASE_URL ?? "").host;
    } catch {
      return "";
    }
  })();
  const coverHost = (() => {
    try {
      return p.coverImageUrl ? new URL(p.coverImageUrl).host : "";
    } catch {
      return "";
    }
  })();
  if (p.coverImageUrl && (!sbHost || coverHost !== sbHost)) {
    const hosted = await fetchAndStoreImage(p.coverImageUrl);
    if (hosted.url) coverImage = hosted.url;
    else coverNote = `Cover could not be re-hosted (${hosted.error}); using the original URL.`;
  }
  if (!p.coverImageUrl && p.generateCover) {
    const gen = await generateCover(p.coverPrompt ?? p.title);
    if (gen.url) coverImage = gen.url;
    else coverNote = `Cover generation failed (${gen.error}); post saved without it.`;
  }

  // MERGE semantics, not replace: omitting a field keeps its current value.
  // - publish omitted -> keep the post's current state (new posts: draft)
  // - published_at is never destroyed, so republishing keeps the original date
  // - description/category/seoTitle/faq omitted -> keep existing
  const publish = p.publish ?? existing?.published ?? false;
  let content: string;
  if (p.format === "html") {
    try {
      content = htmlToMarkdown(p.content);
    } catch (e) {
      // Pathological nesting can blow the converter's stack; fail clean.
      console.error("HTML conversion failed:", e);
      return {
        status: 400,
        body: { ok: false, error: "The HTML content could not be converted. Simplify the markup or send markdown." },
      };
    }
    if (content.trim().length < 50) {
      return {
        status: 400,
        body: { ok: false, error: "After HTML conversion the content is under 50 characters. Send a real article body." },
      };
    }
  } else {
    content = p.content.replace(/\r\n/g, "\n");
  }
  const faq = p.faq !== undefined ? p.faq : (existing?.faq ?? null);
  const baseRow = {
    slug,
    title: p.title,
    // null and omitted both mean "keep current" (send "" to clear).
    description: p.description != null ? p.description : (existing?.description ?? null),
    content,
    cover_image: coverImage,
    published: publish,
    published_at: publish
      ? (existing?.published_at ?? new Date().toISOString())
      : (existing?.published_at ?? null),
    updated_at: new Date().toISOString(),
  };

  // Full tier: structured columns (added by migration). Legacy tier: for a
  // database that predates them, inline the FAQ into the markdown so the
  // visible content is never lost, and drop only the metadata extras.
  const fullRow = {
    ...baseRow,
    word_count: content.split(/\s+/).length,
    category: p.category != null ? p.category : (existing?.category ?? null),
    seo_title: p.seoTitle != null ? p.seoTitle : (existing?.seo_title ?? null),
    faq: faq && faq.length ? faq : null,
  };
  const legacyRow =
    faq && faq.length
      ? { ...baseRow, content: `${content.trimEnd()}\n\n${faqToMarkdown(faq)}` }
      : baseRow;
  let usedLegacy = false;

  const isMissingColumn = (e: { code?: string; message?: string } | null) =>
    !!e && (e.code === "PGRST204" || /column/i.test(e.message ?? ""));

  let id: string | undefined = existing?.id;
  if (existing) {
    let { error } = await sb.from("posts").update(fullRow).eq("id", existing.id);
    if (isMissingColumn(error)) {
      usedLegacy = true;
      ({ error } = await sb.from("posts").update(legacyRow).eq("id", existing.id));
    }
    if (error) {
      console.error("Ingest upsert failed:", error);
      return { status: 502, body: { ok: false, error: "Database write failed." } };
    }
  } else {
    let { data, error } = await sb.from("posts").insert(fullRow).select("id").single();
    if (isMissingColumn(error)) {
      usedLegacy = true;
      ({ data, error } = await sb.from("posts").insert(legacyRow).select("id").single());
    }
    // Concurrent first pushes: the loser of the race retries as an update,
    // full row first so structured fields survive on migrated databases.
    if (error && error.code === "23505") {
      const { data: raced } = await sb.from("posts").select("id").eq("slug", slug).maybeSingle();
      if (raced) {
        let { error: updErr } = await sb.from("posts").update(fullRow).eq("id", raced.id);
        if (isMissingColumn(updErr)) {
          ({ error: updErr } = await sb.from("posts").update(legacyRow).eq("id", raced.id));
        }
        if (!updErr) {
          data = raced as { id: string };
          error = null;
        }
      }
    }
    if (error) {
      console.error("Ingest upsert failed:", error);
      return { status: 502, body: { ok: false, error: "Database write failed." } };
    }
    id = (data as { id: string }).id;
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");

  const notes: string[] = [];
  if (coverNote) notes.push(coverNote);
  if (usedLegacy) {
    notes.push(
      "Database predates the structured columns: FAQ was inlined into the content and category/seoTitle were dropped. Run the posts migration to enable them."
    );
  }
  if (!publish) notes.push("Draft: the public url goes live on publish; review it at adminUrl.");

  return {
    status: 200,
    body: {
      ok: true,
      action: existing ? "updated" : "created",
      slug,
      id,
      published: publish,
      url: `${siteConfig.url}/blog/${slug}`,
      adminUrl: `${siteConfig.url}/admin/blog/${id}`,
      coverImage,
      ...(notes.length ? { note: notes.join(" ") } : {}),
    },
  };
}

/** Shared static-key check for the ingest surfaces (timing-safe). */
export function ingestAuthorized(req: Request): boolean {
  const key = process.env.BLOG_INGEST_KEY;
  if (!key) return false;
  const candidates = [
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, ""),
    req.headers.get("x-api-key"),
    new URL(req.url).searchParams.get("key"),
  ];
  const expected = Buffer.from(key);
  return candidates.some((c) => {
    if (!c) return false;
    const buf = Buffer.from(c);
    return buf.length === expected.length && timingSafeEqual(buf, expected);
  });
}
