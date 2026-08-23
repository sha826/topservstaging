# TopServ Digital Website

The TopServ Digital marketing site, the home of BrandFormance. Built to the team build spec at `docs/TSD_Website_Build_Specification.docx` (v1.0, August 2026): a site that sells a methodology, not a list of services. Every page teaches BrandFormance, and every path leads to the Brand Score.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4, radix-ui components, Motion for animation
- Supabase (Postgres + storage): leads, page views, blog posts, chat transcripts, settings
- Anthropic Claude concierge chat via the Vercel AI SDK (model `claude-sonnet-5`, tool-calling lead capture)
- Blog: repo MDX files in `content/blog` plus a database pipeline fed by an ingest API, an MCP server, the admin panel, and the separate Content Studio app
- Resend for lead email, Gemini for AI cover images, Zod validation wherever input crosses a boundary

## Local setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in the values (the file documents each one). The site degrades gracefully: without Supabase keys leads only log to the server console, without an Anthropic key chat answers 503, so a partial env still runs.
3. `npm run dev`. The script is plain `next dev` with no port flag, so it serves on the Next default, http://localhost:3000. If 3000 is taken, Next picks the next free port and prints it.

Production build check: `npm run build`. Lint: `npm run lint`.

## Key directories

- `src/app`: all routes.
  - BrandFormance IA: `/` (home), `/brandformance` (the definitive resource, 10 questions), `/method` (the 6 stage system), `/programs-pricing` (a hub of 5 pages: overview, how-it-works, what-this-delivers, pricing, success-stories, with a persistent sub navigation), `/brand-score` (the diagnostic and primary conversion), `/jonathan` (the founder page).
  - Legacy routes kept for SEO and as Phase 2 raw material: `/services/[slug]` (10 services), `/industries/[slug]` (6 trades), `/case-studies`, `/blog`, `/about`, `/contact`, and the legal pages. They are the 301 targets mapped from the old Webflow site in `next.config.ts`.
  - `/admin`: password-protected panel (dashboard, leads, conversations, blog editor, agent prompt).
  - `/api`: chat, ingest (posts + upload), mcp, track, og, admin image routes.
- `src/components`: `sections` (home and BrandFormance page sections, including the `VideoSlot` placeholder frames), `programs` (the hub subnav), `chat` (the concierge widget), `admin` (blog editor), `seo` (JSON-LD), plus `ui`, `motion`, `layout`, `video`, `analytics`, `case-study`, `contact`, `icons`.
- `src/lib`: the data files that drive both the pages and the concierge knowledge (`bf-content.ts`, `content.ts`, `faqs.ts`, `case-studies.ts`, `site-config.ts`) and the system cores (`concierge.ts`, `ingest-post.ts`, `blog.ts`, `blog-db.ts`, `leads.ts`, `admin-auth.ts`, `supabase-admin.ts`).
- `content/blog`: repo MDX posts. Adding a `.mdx` file with frontmatter gets schema, sitemap entry, OG image, and dates automatically.
- `public`: `llms.txt`, `pricing.md`, images, self-hosted portfolio videos.
- `docs`: the build spec, `ARCHITECTURE.md`, `HANDOFF.md`, and the Agency Titan sample content package (`sample-blog-video-marketing-for-contractors`).

## Deploy

Vercel project `topserv-website` on team `topserv`. Push-to-deploy is not connected, so deploys run from the CLI:

```
vercel deploy --prod
```

The CLI must be logged in as alex@topservdigital.com (sessions expire; re-auth with `vercel login` and the email link). Every production variable named in `.env.example` must exist in the Vercel project settings; the deploy does not read `.env.local`.

## Read next

- `docs/ARCHITECTURE.md`: the systems map. How the IA, blog pipeline, concierge, Brand Score, admin panel, database, and analytics fit together, with file paths.
- `docs/HANDOFF.md`: current status against the build spec, ownership, the 4 open decisions, the launch runbook, and security notes.
- `LAUNCH.md`: the domain cutover checklist.
- `BLOG-INGEST.md`: the blog ingest API reference for external systems.
- `CONCIERGE-PROMPT.md`: generated snapshot of the chat agent's system prompt.
