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
| `description` | no | SEO meta + card text, ≤500 chars. Omitted = keep current; send `""` to clear |
| `coverImageUrl` | no | Absolute http(s) URL to a cover (2:1 displays best). Omitted = keep current |
| `generateCover` | no | `true` = AI-generate a cover when no URL given |
| `coverPrompt` | no | Prompt for the generated cover (defaults to title) |
| `publish` | no | **New posts default to draft** for review in `/admin/blog`. On updates, omitted = keep the current publish state; `true` publishes immediately |
| `category` | no | Eyebrow label on cards and the article header (default "Insights"), ≤60 chars |
| `seoTitle` | no | Meta/tab title when it should differ from the on-page H1, ≤200 chars |
| `faq` | no | Array of `{ "question", "answer" }` (max 20). Rendered as a visible "Frequently asked questions" section **and** FAQPage JSON-LD from the same data — do not repeat the FAQs inside `content` |
| `overrideRepoPost` | no | Safety latch: pushes whose slug matches a built-in repo post are refused (they'd replace it site-wide) unless this is `true` |

**Image upload**: `POST /api/ingest/upload` (same key, multipart form with a
`file` field, PNG/JPEG/WebP/GIF ≤10MB) returns `{ "url": ... }`. Use it for
`coverImageUrl` or for images inside markdown bodies. Files are recompressed
to WebP and hosted on the site's storage, so pushed URLs never go stale.

**Updates MERGE, they don't replace**: re-pushing a slug with only `title` +
`content` keeps the existing description, cover, publish state, and original
publish date. Partial re-pushes are always safe.

## Response

```json
{ "ok": true, "action": "created", "slug": "my-post", "id": "<uuid>",
  "published": false, "url": "https://topservdigital.com/blog/my-post",
  "adminUrl": "https://topservdigital.com/admin/blog/<uuid>",
  "coverImage": null,
  "note": "Draft: the public url goes live on publish; review it at adminUrl." }
```

Drafts can be previewed before publishing at
`/admin/blog/<id>/preview` (admin login required).

Errors: `401` bad key · `400` invalid payload (with per-field `issues`) ·
`409` slug belongs to a repo post (see `overrideRepoPost`) ·
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

## Agency Titan wiring (verified against api.agencytitan.com/v1/openapi.json)

Titan is an agency-ops platform (clients, tasks, tickets, automations) — it
has no blog CMS. Posts are fired at this site from a **Titan automation**:

1. **Credential**: create a Titan API key (`at_...`) under
   Settings → System → API & MCP if the automation needs API access. For the
   push itself, the automation only needs OUR ingest key.
2. **Automation shape**: trigger (scheduled, a task reaching a stage, a
   custom-object record created, or a manual button) → optional
   `generate_text` AI step (stores output in a context variable) →
   **`http_request` action** that POSTs to
   `https://topservdigital.com/api/ingest/posts` with header
   `Authorization: Bearer <BLOG_INGEST_KEY>` and a JSON body built from
   `{{...}}` shortcodes (task fields or generated variables) matching the
   payload table above.
3. **Recommended content home in Titan**: a "Blog Post" custom object or a
   task type with fields for title, slug, description, markdown body, and
   publish flag — the SEO team fills it, the automation pushes it.
4. **Safe by default**: push drafts (omit `publish`), review at
   `/admin/blog`, publish from there — or let Titan send `"publish": true`
   at the scheduled moment. Retries are safe: our upserts are idempotent
   and merge.
5. **Alternative (agent path)**: Titan's MCP (`api.agencytitan.com/v1/mcp`,
   flow: `agencytitan_start` → scoped tools) can pair with OUR MCP
   (`/api/mcp`) so an agent reads content from Titan and creates posts here.
   Good for ad-hoc work; use the automation for the scheduled pipeline.

Titan limits: REST 600 req/min per tenant, MCP 240 req/min per agency —
irrelevant at blog volumes. Titan's outbound event webhooks
(Settings → System → Webhooks, HMAC `X-AT-Signature`) ship THEIR event
envelope, not our payload shape; prefer the automation `http_request`,
which sends exactly the JSON above.

## Notes

- Content renders as plain markdown by design: external systems can never
  inject executable code into the site (verified by test).
- Idempotency makes retries safe — a duplicate webhook fire just re-writes
  the same post.
- Webhook and MCP share one core (`src/lib/ingest-post.ts`), so behavior is
  identical whichever door the content comes through — and the whole module
  is portable to client sites.
