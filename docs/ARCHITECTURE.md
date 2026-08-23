# Architecture

Systems map for the TopServ Digital website. Every claim here is grounded in the code; file paths are given so you can verify. The build spec (`docs/TSD_Website_Build_Specification.docx`) is canonical for content and structure; section numbers below refer to it.

## 1. BrandFormance information architecture

The site sells the methodology. Page content is data-driven: `src/lib/bf-content.ts` holds the spec's canonical content (the one line, the equation, the 6 stages, 3 phases, programs, 6 clients, Brand Score components and grades, the 10 questions, the video slot map) and the pages render from it, so copy edits happen in 1 place.

| Route | Implements | Spec section |
|---|---|---|
| `/` | Home, 8 sections: Hero (with the CreditsCrawl marquee), Problem, Category (BfEquation visual), Transformation (before/after), Method (SixStages), Proof (ProofClients 6-client band, extended with the CinemaStage film reel, PartnerLove video testimonials, and PartnerMarquee logos), Founder, Closing CTA. `src/app/page.tsx` | 4, Home |
| `/brandformance` | The definitive resource: the 10 questions in order (`tenQuestions`), rendered visibly and as FAQPage JSON-LD, plus the What Is BrandFormance video slot | 4, BrandFormance |
| `/method` | The 6 stage system from `sixStages`, plus the Method video slot | 4, The Method |
| `/programs-pricing` | Navigation hub, not a page: the root redirects to `/programs-pricing/overview`. 5 pages in fixed order (overview, how-it-works, what-this-delivers, pricing, success-stories) under a shared layout (`src/app/programs-pricing/layout.tsx`). The sub navigation persists across all 5: `src/components/programs/subnav.tsx`, pill active state, unique URL per tab, stacked buttons on mobile | 4, Programs pages 1 to 5 |
| `/brand-score` | The diagnostic: 6 weighted components and 4 grades from `bf-content.ts`, plus the capture form (section 4 below) | 5 |
| `/jonathan` | About Jonathan, thought leadership connected to TSD | 3 |

JB videos are placeholder frames: `src/components/sections/video-slot.tsx` holds the exact position, ratio, and framing ("in production" label) so the video team can drop in embeds without layout work. The slot map with tiers and lengths is `videoSlots` in `bf-content.ts`. Tier 1 (JB Overview on the overview page, Investment at the top of the pricing page, What Is BrandFormance on `/brandformance`) are launch blockers per spec section 6.

Legacy routes are retained for SEO and as Phase 2 raw material: `/services/[slug]` (10), `/industries/[slug]` (6), `/case-studies` (hub + 3), `/blog`, `/about`, `/contact`, legal pages. They are the targets of the 301 map from the old Webflow site in `next.config.ts`, which also maps the old `/pricing` to `/programs-pricing/pricing`. Spec Phase 2 reshapes these into `/solutions/*` and `/insights`.

## 2. Blog content pipeline

Two post sources merge at render time: repo MDX files in `content/blog/*.mdx` (read-only, parsed by `src/lib/blog.ts`) and database posts in the Supabase `posts` table (`src/lib/blog-db.ts`). Database post bodies render as plain markdown (JSX and HTML neutralized); repo files keep full MDX.

The core is `src/lib/ingest-post.ts`, shared by every write surface:

- Zod payload (`ingestPayloadSchema`): title, content, optional slug, description, coverImageUrl, generateCover, coverPrompt, publish, category, seoTitle, faq array, format, overrideRepoPost.
- Merge semantics, not replace: omitted fields keep their current values, `publish` omitted keeps the current state (new posts arrive as drafts), and `published_at` is never reset, so republishing keeps the original date.
- `format: "html"` converts rich-text bodies to markdown at ingest via turndown with the GFM plugin; script, style, iframe, object, and embed tags never survive. This is what Agency Titan sends.
- Covers: an explicit external `coverImageUrl` is downloaded and re-hosted in our storage (`fetchAndStoreImage` in `src/lib/upload-image.ts`, with an SSRF guard and WebP recompression) so expiring source URLs never go stale; `generateCover` produces one with Gemini (`src/lib/generate-cover.ts`).
- Guardrails: slugs are normalized through the same slugifier the admin uses; a slug that collides with a repo MDX post is refused (409) unless `overrideRepoPost` is passed; a database without the newer columns falls back to a legacy row shape.
- Affected paths revalidate on every write (`/blog`, the post, the sitemap).

Write surfaces, all authorized by the shared `BLOG_INGEST_KEY` (Bearer header, `x-api-key`, or `?key=`, timing-safe compare):

- Webhook: `POST /api/ingest/posts` (`GET` self-documents the fields). See `BLOG-INGEST.md`.
- Image upload: `POST /api/ingest/upload`, multipart `file` field, returns a public URL for covers or markdown bodies.
- MCP server: `/api/mcp` (streamable HTTP via mcp-handler), 4 tools backed by the same core: `create_blog_post`, `list_blog_posts`, `get_blog_post` (returns the post in the same field names create accepts, for edit-and-resubmit), `delete_blog_post`.
- Admin editor: `/admin/blog` lists database posts (CRUD) beside read-only repo posts; the editor (`src/components/admin/post-form.tsx` + `markdown-editor.tsx`) has image upload, Gemini cover generation, and a draft preview at `/admin/blog/[id]/preview` that renders exactly as the public blog will, behind admin auth.

Content Studio: a separate app at `../BlogApp` (Vercel project `content-studio`, deployed at content-studio-plum-five.vercel.app). Its composer mirrors the ingest payload 1 to 1 (header fields, markdown body, structured FAQ, featured image upload) and relays server-side through its own `/api/send` using `TARGET_SITE_URL` + `BLOG_INGEST_KEY`, so the ingest key never reaches a browser. What Alejandro builds there is exactly what the Titan automation sends.

Agency Titan integration status:

- Their side exists and runs: a "New Blog Post" process (3 stages) and a published "Blog Writing" automation that chains generate_text and generate_image actions (Topic Research, Title, Meta Description, Content Writing, Featured Image, Alt Text, Slug) to fill the task's blog fields.
- Our side is authored and ready: a creation script (session scratchpad material, not in this repo) that POSTs to Titan's automation-authoring API and creates "Publish Blog to TopServ Website" as an unpublished draft. Its design: trigger `process.instance_completed` scoped to the New Blog Post process; 1 `http_request` action, `POST https://topserv-website.vercel.app/api/ingest/posts` with bearer auth (`BLOG_INGEST_KEY`), a JSON body built from field shortcodes (`{{task.blog_title}}`, `{{task.blog_post_slug}}`, `{{task.blog_description}}`, `{{task.blog_content}}`, `{{task.blog_featured_image.url}}`), `format: "html"`, `publish: false` (drafts for review), 60 second timeout, fail on error status. Publishing that draft is a launch runbook step (`docs/HANDOFF.md`).
- Test fixture: `docs/sample-blog-video-marketing-for-contractors/` is a portable Titan-to-website content package with expected schema output and acceptance checks.

## 3. Chat concierge

- Prompt: `src/lib/concierge.ts`. The system prompt has 2 halves. The behavioral head (`DEFAULT_CONCIERGE_HEAD`: identity, priorities, weekly-pricing rule, discovery playbook, style rules) is admin-editable: an override stored in the Supabase `settings` table under key `concierge_head` replaces it at runtime (edited at `/admin/agent`, read by the chat route with a 30 second cache). The knowledge half is always composed from the site's data files (`bf-content.ts`, `content.ts`, `faqs.ts`, `case-studies.ts`, `site-config.ts`) and cannot be overridden, so facts never drift from the pages. `composeConcierge` also strips em dashes from the whole composed prompt. `CONCIERGE-PROMPT.md` at the repo root is a generated snapshot.
- Route: `src/app/api/chat/route.ts`. Model `claude-sonnet-5` (env `CHAT_MODEL`); a direct Anthropic key takes precedence, otherwise the AI Gateway string (explicit key or Vercel OIDC). One tool, `captureLead`: 15 fields including verbatim attribution and pain points, executed through `deliverLead` (`src/lib/leads.ts`), which writes the Supabase `leads` table and emails the team via Resend, each best-effort. Best-effort per-IP throttle of 20 requests per minute, in-memory per instance. After each turn the full transcript upserts to the `conversations` table keyed by a client-generated `conversationId`, with a `lead_captured` flag, so the team can grade the agent at `/admin/conversations`.
- Widget: `src/components/chat/chat-widget.tsx`, mounted in the root layout through `chat-widget-lazy.tsx` (the real bundle loads on first tap, or when a saved session exists). Conversation persists in sessionStorage.

## 4. Brand Score

The site's primary conversion (spec section 5: "the most important functional element on the site").

- Page: `src/app/brand-score/page.tsx` renders the 6 weighted components and the 4 grades from `bf-content.ts` (canonical definitions; the site must not invent its own).
- Capture form: `src/app/brand-score/actions.ts` (`requestBrandScore` server action). Honeypot field (`fax`), best-effort per-IP throttle of 5 requests per 10 minutes, name + company + market required, email or phone required. Delivers through the same `deliverLead` pipeline with source `contact-form` and attribution "Brand Score request form". On success it writes a completion event row (`path: /brand-score/completed`) into `page_views`, the primary conversion metric per spec section 12.
- The automated public engine is not built yet; it plugs in behind this same form once open decision 3 (public data vs social login) lands. The working design is a 6 component engine matching the spec weights, with DataForSEO and Google PageSpeed feeding the 4 API-computed components (website strength, reputation, visibility, consistency) and a Claude assessment for the 2 AI-assessed ones (social media, market positioning). It must stay identical to the sales console version; Alex owns it (spec section 9).

## 5. Admin panel

- Auth: `src/lib/admin-auth.ts`. Password login (`ADMIN_PASSWORD`, timing-safe compare) sets an HMAC-signed cookie (`topserv_admin`, signed with `ADMIN_SESSION_SECRET`, 7 day expiry). `requireAdmin()` guards every page; the API routes `/api/admin/generate-image` and `/api/admin/upload-image` check `isAdmin()` themselves. Robots disallow `/admin` and the layout is noindexed.
- Sections: dashboard (`/admin`: views today and 7 days, lead count, post count, a 14 day bar chart, top pages, recent leads), `/admin/leads` (full table + CSV export), `/admin/conversations` (chat transcript viewer with lead-captured badges), `/admin/blog` (section 2 above), `/admin/agent` (edit or reset the concierge behavioral head).

## 6. Data (Supabase)

Server access goes exclusively through `src/lib/supabase-admin.ts` (service-role key, returns null when unconfigured so every caller degrades gracefully). RLS is enabled on all tables with no policies, so the anon key can read nothing; only the service role reaches data.

| Table | Purpose |
|---|---|
| `leads` | Chat + form leads. Base columns plus discovery columns (`attribution`, `pain_points`, `marketing_spend`, `decision_role`); `src/lib/lead-store.ts` falls back to the base row if a database predates them |
| `page_views` | Pageview beacon rows + the `/brand-score/completed` event |
| `settings` | Key-value; currently `concierge_head` |
| `posts` | Database blog posts. Base columns plus migration columns (`word_count`, `category`, `seo_title`, `faq`); `ingest-post.ts` and `blog-db.ts` fall back if absent |
| `conversations` | 1 row per chat conversation, transcript JSONB replaced each turn |

Storage: public bucket `blog`, paths `covers/` (generated covers) and `uploads/` (editor and ingest uploads), immutable cache headers, WebP recompression on the way in.

## 7. Analytics

- Beacon: `src/components/analytics/track-pageview.tsx` sends `navigator.sendBeacon` (fetch keepalive fallback) to `POST /api/track`, which inserts path, referrer, and user agent into `page_views`. It always answers 204, swallows every error, and excludes `/admin` at both ends.
- Events: the Brand Score completion event (section 4) rides the same table under a synthetic path.
- The admin dashboard reads this table directly. Spec section 12 targets (2 minute average time on page, 3+ pages per session, video completion) are not instrumented yet; only page-level and Brand Score completion tracking exist.
