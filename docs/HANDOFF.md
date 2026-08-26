# Handoff

For the team continuing this build, primarily Shaw (design and front-end owner). Read `README.md` for setup and `docs/ARCHITECTURE.md` for the systems map first. The build spec is canonical and **v2 supersedes v1**: `docs/TSD_Website_Build_Specification_v2.docx`. Its non-negotiables, all implemented: no price table anywhere (the $1,000/week floor + $10,000 one-time activation are the only public numbers, never monthly, never annual), the public diagnostic is the Brand Assessment returning a GRADE only (score components and weights never appear publicly), and brand frequency is fixed at 3x weekly with geography as the scaling variable.

## Current status against the build spec

- Pages are built to spec v2: home, `/brandformance` with the 10 questions, `/method` with the 6 stages, the Programs and Pricing hub (5 pages, persistent sub navigation, unique URL per tab, stacked on mobile — the pricing page is floor + activation, deliberately no tier cards), `/brand-assessment` (grade-only; `/brand-score` 301s to it), `/jonathan`, `/about`. Copy follows the spec's standards: no em dashes, numerals, claims with proof nearby.
- Videos are placeholders. Every JB video slot renders a placeholder frame (`src/components/sections/video-slot.tsx`) holding the final position and ratio. The 3 tier 1 videos (JB Overview, Investment, What Is BrandFormance) are launch blockers per the spec. Drop-in is embed-only work; no layout changes needed.
- Brand Assessment: the capture form, throttle, and completion tracking are live. The automated scoring engine is internal (sales console, Alex's lane); the public response stays grade-only regardless.
- Booking: every conversion point links to book.topservdigital.com, which is confirmed GoHighLevel. The spec asks for GHL calendar integration at every conversion point; the current implementation is links, not embedded calendars. Embedding is open front-end work if the team wants it.
- Legacy pages (`/services/*`, `/industries/*`, `/case-studies`, `/blog`, `/about`, `/contact`, legal) are retained: they hold the 301 map from the old site and become Phase 2 raw material (`/solutions/*`, `/insights`).
- The blog pipeline is live end to end INCLUDING the Titan hop: the automation "Blog Post to New Agentic Site" is published and enabled, verified with a real article in August 2026. Completed New Blog Post tasks land as drafts in `/admin/blog` for review. Caution: tasks for Titan clients fire the same trigger — review drafts, never publish a client's article.
- The admin content system is live: testimonials, team members, project updates (zone-select locations per spec v2 §11), press releases, and timed banners, managed at `/admin/content` with version snapshots and SEO-team publish notifications. See `docs/ADMIN-CONTENT.md`. Scope note: this system, like the whole repo, serves topservdigital.com only.

## Ownership (spec section 9)

| Who | Owns |
|---|---|
| Ryan | Copy approval, positioning, final sign off, program and pricing decisions |
| JB | Voice, doctrine, on camera, final say on positioning |
| Alejandro | Site structure, SEO architecture, content strategy, all written copy |
| Shaw | Design, visual system, component library, page composition, front-end build |
| Alex | Brand Assessment and the internal scoring engine, the agentic layer, Agency Titan integration, data layer, hosting architecture |
| Video team | Filming, editing, thumbnails, hosting, delivery |

The clean line from the spec: Alejandro and Shaw own the marketing site; Alex owns anything that touches the client data object. The Brand Assessment sits on that boundary and belongs to Alex: the internal scoring engine must stay identical to the sales console version, and the public site only ever shows the grade.

## The open decisions (spec v2)

1. Which of the 6 clients can be named publicly. Owners: Ryan, JB. Blocks `/programs-pricing/success-stories`, which currently names all 6 (All Heart Heating, Spencer Air, Your New Door, Nick AC, Zen Air, C and S Air) with their revenue numbers.
2. Whether the Brand Assessment's optional inputs (revenue band, membership, trade, website) sit behind the email gate or stay on the public form. Owners: Ryan, Alex. The form ships either way; moving them is a small form change.
3. brandscore.biz custody and where the internal scoring engine lives. Owner: Alex (with Ryan). Does not block the site; the public artifact is grade-only regardless.
4. Launch date. Owner: all. Blocks everything downstream of the runbook.

Resolved by spec v2 (no longer open): the pricing page publishes NO table — the floor and activation are the only public numbers. Do not reopen this per a stale doc; v2 is canonical.

## Launch runbook, in order

1. Re-auth the Vercel CLI as alex@topservdigital.com (`vercel login` + the email link). Sessions expire; this is the account that owns the `topserv` team. Confirm every variable in `.env.example` exists in the Vercel project settings for `topserv-website`.
2. Deploy the site: `vercel deploy --prod` from the repo root. (The Titan automation is already live against this deployment; nothing to publish on their side.)
3. Update the live blog post `video-marketing-for-contractors`: restore its `/brandformance` and `/brand-assessment` internal links, which were held out pre-launch while the target pages did not exist (see the sample package README in `docs/sample-blog-video-marketing-for-contractors/`). Do it in the admin blog editor, or via the MCP `get_blog_post` then `create_blog_post` round trip.
4. DNS cutover per `LAUNCH.md`: add the domain, www to apex 301, spot-check the 301 map (including `/brand-score` → `/brand-assessment`), noindex the old Webflow staging subdomain, Search Console and Bing submissions.
5. Lighthouse pass on `/` and `/programs-pricing/pricing` (plus 1 service page and 1 blog post per `LAUNCH.md`).

## Security notes

- Rotate `AGENCY_TITAN_API_KEY` and the admin password (`ADMIN_PASSWORD`). Both were shared in plain channels during the build and must be treated as exposed.
- No secret values live in the repo. `.env.local` is gitignored (the `.env*` pattern; note that pattern also catches `.env.example`, so adjust it if you want the example file committed). `.env.example` lists every variable name with where to get each value.
- `BLOG_INGEST_KEY` grants publish rights on the public website; treat it like a password. It lives in the website env, the Content Studio env, and inside the Titan automation's auth config.
- `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS. Server only, never `NEXT_PUBLIC_*`. All tables run RLS with no policies, so leaking the anon key is harmless but the service key is total access.
- The admin panel is a single shared password with an HMAC cookie (`src/lib/admin-auth.ts`). Fine for a small team; move to real accounts before widening access.

## Known items, deliberately not fixed (audited Aug 23, 2026)

- Database migrations were applied by hand (SQL run in the Supabase dashboard); there are no migration files in the repo. `docs/ARCHITECTURE.md` section 6 documents every table and column-fallback behavior; the authoritative schema is the Supabase project itself (`smartwebsite`, ref fgdawwnlreeopvtwzjfk).

- The Problem Solvers case study repeats All Heart's "$1M+ revenue months" stat (src/lib/case-studies.ts:84). Looks like a copy-paste artifact. Verify with Ryan before launch; the claim also feeds the chat agent's proof block.
- Orphaned components kept on purpose (nothing renders them since the restructure): how-we-can-help, team-roles, services-call-sheet, disrupt-statement, case-study-band, process-timeline, and the topserv-process subtree (process-intro, process-flythrough, process-steps, video/vimeo-card). They carry known quirks (a reduced-motion hydration mismatch in process-flythrough, always-on rAF loops, and 2 different 7-step name sets). If any is revived, fix those first; the 6 stage Method in bf-content.ts is the canon.
- public/design-lab.html plus public/videos/lab and public/images/lab-o (about 8 MB) are design-audition assets, unreferenced by the app. Kept per team decision; delete before DNS cutover if repo size matters.
- The ingest key is accepted as a ?key= query parameter for connector UIs that cannot set headers. Documented tradeoff: URLs can land in logs. Prefer the Authorization header everywhere else.
- Hero stats (200+, $89M+, 50+) are literals in hero.tsx for the count-up animation; update them together with siteConfig.stats.
- Legacy pages (about, contact, case-studies, services/*, industries/*, blog MDX) still contain em dashes; the copy standard sweep for those belongs to Alejandro in the Phase 2 copy pass.
