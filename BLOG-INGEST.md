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

## Notes

- Content renders as plain markdown by design: external systems can never
  inject executable code into the site (verified by test).
- Idempotency makes retries safe — a duplicate webhook fire just re-writes
  the same post.
- The MCP-server wrapper for AI-driven authoring is a planned phase 2; it
  will call this same endpoint.
