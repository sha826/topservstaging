import { createMcpHandler } from "mcp-handler";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  ingestAuthorized,
  ingestPayloadSchema,
  ingestPost,
} from "@/lib/ingest-post";
import { getFilePosts } from "@/lib/blog";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { siteConfig } from "@/lib/site-config";

export const maxDuration = 60;

/**
 * Remote MCP server for the blog content pipeline (phase 2 of the ingest
 * system): AI agents and MCP clients manage posts through tools backed by
 * the same core as the /api/ingest/posts webhook. Auth is the shared
 * BLOG_INGEST_KEY, sent as a Bearer header (preferred) or ?key= param.
 */
const json = (data: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
});

const handler = createMcpHandler((server) => {
  server.registerTool(
    "create_blog_post",
    {
      title: "Create or update a blog post",
      description:
        "Create a blog post on the TopServ website, or update an existing one (posts upsert by slug, keeping the same URL). Content is markdown (GFM tables/lists/links supported; HTML and JSX are neutralized). Posts arrive as DRAFTS for review in the admin panel unless publish is true. Set generateCover to true for an AI-generated 16:9 cover.",
      inputSchema: ingestPayloadSchema,
    },
    async (args) => {
      const result = await ingestPost(args);
      return json(result.body);
    }
  );

  server.registerTool(
    "list_blog_posts",
    {
      title: "List blog posts",
      description:
        "List posts on the TopServ blog: database posts (drafts and published, manageable via these tools) and repo MDX posts (read-only files).",
      inputSchema: z.object({
        limit: z.number().int().min(1).max(200).optional().describe("Max database posts to return (default 50)"),
      }),
    },
    async ({ limit }) => {
      const sb = getSupabaseAdmin();
      if (!sb) return json({ ok: false, error: "Database is not configured." });
      const { data } = await sb
        .from("posts")
        .select("slug, title, published, updated_at")
        .order("updated_at", { ascending: false })
        .limit(limit ?? 50);
      return json({
        ok: true,
        databasePosts: data ?? [],
        filePosts: getFilePosts().map((p) => ({
          slug: p.slug,
          title: p.title,
          readOnly: true,
        })),
      });
    }
  );

  server.registerTool(
    "get_blog_post",
    {
      title: "Get a blog post",
      description:
        "Fetch a database blog post by slug, including its full markdown content, so it can be reviewed or edited and re-submitted with create_blog_post.",
      inputSchema: z.object({
        slug: z.string().regex(/^[a-z0-9-]+$/).max(80),
      }),
    },
    async ({ slug }) => {
      const sb = getSupabaseAdmin();
      if (!sb) return json({ ok: false, error: "Database is not configured." });
      const { data } = await sb
        .from("posts")
        .select("slug, title, description, content, cover_image, published, published_at, updated_at")
        .eq("slug", slug)
        .maybeSingle();
      if (!data) return json({ ok: false, error: `No database post with slug "${slug}".` });
      return json({ ok: true, url: `${siteConfig.url}/blog/${slug}`, post: data });
    }
  );

  server.registerTool(
    "delete_blog_post",
    {
      title: "Delete a blog post",
      description:
        "Permanently delete a database blog post by slug. Repo MDX posts cannot be deleted through this tool. This cannot be undone.",
      inputSchema: z.object({
        slug: z.string().regex(/^[a-z0-9-]+$/).max(80),
      }),
    },
    async ({ slug }) => {
      const sb = getSupabaseAdmin();
      if (!sb) return json({ ok: false, error: "Database is not configured." });
      const { data } = await sb.from("posts").select("id").eq("slug", slug).maybeSingle();
      if (!data) return json({ ok: false, error: `No database post with slug "${slug}".` });
      await sb.from("posts").delete().eq("id", data.id);
      revalidatePath("/blog");
      revalidatePath(`/blog/${slug}`);
      revalidatePath("/sitemap.xml");
      return json({ ok: true, deleted: slug });
    }
  );
});

// Static-key gate in front of the MCP handler.
const authed = (req: Request) => {
  if (!process.env.BLOG_INGEST_KEY) {
    return Response.json({ error: "MCP is not configured." }, { status: 503 });
  }
  if (!ingestAuthorized(req)) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }
  return handler(req);
};

export { authed as GET, authed as POST, authed as DELETE };
