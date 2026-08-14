# Blog Ingest API

Push structured blog posts into the site from any external system (SEO
tooling, Agency Titan, Zapier, n8n, custom scripts). Pushed posts become
real pages with Article schema, sitemap entries, OG images, and admin-panel
management automatically. This is the pilot for scaling the same pipeline
to client sites.

## Endpoint

```
POST https://topserv-website.vercel.app/api/ingest/posts
Content-Type: application/json
Authorization: Bearer <BLOG_INGEST_KEY>      (or header: x-api-key: <key>)
```

`GET` on the same URL returns this field reference as JSON.
The key lives in `.env.local` / Vercel env `BLOG_INGEST_KEY`. Treat it like
a password: whoever holds it can publish to the website.

## Payload

| Field | Required | Notes |
|---|---|---|
| `title` | yes | 3–200 chars |
| `content` | yes | **Markdown** (GFM: tables, lists, links). HTML/JSX is neutralized, never executed. 50–100k chars |
| `slug` | no | kebab-case. Derived from title if omitted. **Pushes upsert by slug** — re-sending the same slug updates the post in place, same URL |
| `description` | no | SEO meta + card text, ≤500 chars |
| `coverImageUrl` | no | Absolute URL to a cover (2:1 displays best) |
| `generateCover` | no | `true` = AI-generate a cover when no URL given |
| `coverPrompt` | no | Prompt for the generated cover (defaults to title) |
| `publish` | no | **Default `false`: posts arrive as drafts** for review in `/admin/blog`. `true` publishes immediately |

## Response

```json
{ "ok": true, "action": "created", "slug": "my-post", "published": false,
  "url": "https://topservdigital.com/blog/my-post", "coverImage": null }
```

Errors: `401` bad key · `400` invalid payload (with per-field `issues`) ·
`503` not configured · `502` database/cover failure.

## Example

```bash
curl -X POST https://topserv-website.vercel.app/api/ingest/posts \
  -H "Authorization: Bearer $BLOG_INGEST_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "How Plano HVAC Companies Win Summer",
    "description": "A market-level look at seasonal demand capture.",
    "content": "## The short version\n\nMarkdown body here...",
    "generateCover": true,
    "publish": false
  }'
```

## Workflow for the content team

1. SEO research produces the article (any tool that can send a webhook/HTTP
   request works — map its output fields to the payload above).
2. Push with `publish: false` (or omit it): the post lands as a **draft**.
3. Review it in `/admin/blog` (edit anything, regenerate the cover), then
   tick Published — or push again with `"publish": true` to go straight out.
4. Published posts appear on `/blog` within ~1 minute, with schema, sitemap,
   and OG image handled.

## MCP server (for AI agents and MCP clients)

The same pipeline is exposed as a remote MCP server (Streamable HTTP):

```
https://topserv-website.vercel.app/api/mcp
```

Same key, sent as a Bearer header. Four tools: `create_blog_post` (upserts,
drafts by default, optional AI cover), `list_blog_posts`, `get_blog_post`
(returns full markdown for edit-and-resubmit), `delete_blog_post`.

**Claude Code:**
```bash
claude mcp add topserv-blog --transport http \
  https://topserv-website.vercel.app/api/mcp \
  --header "Authorization: Bearer <BLOG_INGEST_KEY>"
```

**Claude Desktop / stdio-only clients** (via mcp-remote):
```json
{ "topserv-blog": { "command": "npx", "args": ["-y", "mcp-remote",
  "https://topserv-website.vercel.app/api/mcp",
  "--header", "Authorization: Bearer <BLOG_INGEST_KEY>"] } }
```

**Connector UIs that only accept a URL**: append the key as a query param —
`https://topserv-website.vercel.app/api/mcp?key=<BLOG_INGEST_KEY>` — noting
that URLs can end up in logs, so prefer the header form where possible.

## Notes

- Content renders as plain markdown by design: external systems can never
  inject executable code into the site (verified by test).
- Idempotency makes retries safe — a duplicate webhook fire just re-writes
  the same post.
- Webhook and MCP share one core (`src/lib/ingest-post.ts`), so behavior is
  identical whichever door the content comes through — and the whole module
  is portable to client sites.
