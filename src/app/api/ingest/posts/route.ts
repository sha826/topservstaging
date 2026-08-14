import {
  ingestAuthorized,
  ingestPayloadSchema,
  ingestPost,
} from "@/lib/ingest-post";

export const maxDuration = 60;

/**
 * Blog ingest webhook: external systems (SEO tooling, Agency Titan, Zapier,
 * n8n, internal agents) push structured posts here and they become real
 * pages with schema, sitemap entries, and OG images automatically.
 * See BLOG-INGEST.md; the MCP surface at /api/mcp shares this core.
 */
export async function GET() {
  return Response.json({
    ok: true,
    endpoint: "POST /api/ingest/posts",
    auth: "Authorization: Bearer <key> or x-api-key: <key>",
    mcp: "Streamable HTTP MCP server at /api/mcp (same key)",
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
  if (!ingestAuthorized(req)) {
    return Response.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Body must be valid JSON." }, { status: 400 });
  }
  const parsed = ingestPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Invalid payload.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const result = await ingestPost(parsed.data);
  return Response.json(result.body, { status: result.status });
}
