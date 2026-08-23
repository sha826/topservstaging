# Handoff

For the team continuing this build, primarily Shaw (design and front-end owner). Read `README.md` for setup and `docs/ARCHITECTURE.md` for the systems map first. The build spec (`docs/TSD_Website_Build_Specification.docx`) is canonical; section numbers below refer to it.

## Current status against the build spec

- Phase 1 pages are built to spec: home with the 8 specified sections, `/brandformance` with the 10 questions, `/method` with the 6 stages, the Programs and Pricing hub (5 pages, persistent sub navigation, black pill active state, unique URL per tab, stacked on mobile), `/brand-score`, `/jonathan`, `/about`. Copy is drafted to the section 11 standards: no em dashes, numerals, weekly pricing only, claims with proof nearby.
- Videos are placeholders. Every JB video slot renders a placeholder frame (`src/components/sections/video-slot.tsx`) holding the final position and ratio. The 3 tier 1 videos (JB Overview, Investment, What Is BrandFormance) are launch blockers per spec section 6. Drop-in is embed-only work; no layout changes needed.
- Brand Score: the capture form, throttle, and completion tracking are live. The automated 6 component engine is pending open decision 3 (below); its planned data sources are DataForSEO, Google PageSpeed, and a Claude assessment.
- Booking: every conversion point links to book.topservdigital.com, which is confirmed GoHighLevel. Spec section 8 asks for GHL calendar integration at every conversion point; the current implementation is links, not embedded calendars. Embedding is open front-end work if the team wants it.
- Legacy pages (`/services/*`, `/industries/*`, `/case-studies`, `/blog`, `/about`, `/contact`, legal) are retained: they hold the 301 map from the old site and become Phase 2 raw material (`/solutions/*`, `/insights`).
- The blog pipeline is live end to end except the final Titan hop: ingest API, MCP server, admin editor, and the Content Studio app all work against production; the Titan automation exists as an unpublished draft (runbook below).

## Ownership (spec section 9)

| Who | Owns |
|---|---|
| Ryan | Copy approval, positioning, final sign off, program and pricing decisions |
| JB | Voice, doctrine, on camera, final say on positioning |
| Alejandro | Site structure, SEO architecture, content strategy, all written copy |
| Shaw | Design, visual system, component library, page composition, front-end build |
| Alex | Brand Score, the agentic layer, Agency Titan integration, data layer, hosting architecture |
| Video team | Filming, editing, thumbnails, hosting, delivery |

The clean line from the spec: Alejandro and Shaw own the marketing site; Alex owns anything that touches the client data object. The Brand Score sits on that boundary and belongs to Alex, because it must stay identical to the sales console version.

## The 4 open decisions (spec section 13)

1. Does the pricing page publish exact numbers or ranges. Owners: Ryan, JB. Blocks final sign off of `/programs-pricing/pricing`. The page currently publishes exact weekly numbers ($1,000 / $1,625 / $2,375 plus the $10,000 onboarding), which Ryan confirmed as the live model in August 2026 (see `LAUNCH.md`); this decision formalizes it.
2. Which of the 6 clients can be named publicly. Owners: Ryan, JB. Blocks `/programs-pricing/success-stories`, which currently names all 6 (All Heart Heating, Spencer Air, Your New Door, Nick AC, Zen Air, C and S Air) with their revenue numbers.
3. Brand Score public version: does it require social login or run on public data. Owners: Alex, Ryan. Blocks the automated Brand Score engine. The capture form ships either way.
4. Launch date. Owner: all. Blocks everything downstream of the runbook.

## Launch runbook, in order

1. Re-auth the Vercel CLI as alex@topservdigital.com (`vercel login` + the email link). Sessions expire; this is the account that owns the `topserv` team. Confirm every variable in `.env.example` exists in the Vercel project settings for `topserv-website`.
2. Deploy the site: `vercel deploy --prod` from the repo root.
3. Publish the Agency Titan automation draft "Publish Blog to TopServ Website" (created unpublished by design; it needs the deployed ingest API with HTML format support, which step 2 provides). Its design is documented in `docs/ARCHITECTURE.md` section 2.
4. Update the live blog post `video-marketing-for-contractors`: restore its `/brandformance` and `/brand-score` internal links, which were held out pre-launch while the target pages did not exist (see the sample package README in `docs/sample-blog-video-marketing-for-contractors/`). Do it in the admin blog editor, or via the MCP `get_blog_post` then `create_blog_post` round trip.
5. DNS cutover per `LAUNCH.md`: add the domain, www to apex 301, spot-check the 301 map, noindex the old Webflow staging subdomain, Search Console and Bing submissions.
6. Lighthouse pass on `/` and `/programs-pricing/pricing` (plus 1 service page and 1 blog post per `LAUNCH.md`).

## Security notes

- Rotate `AGENCY_TITAN_API_KEY` and the admin password (`ADMIN_PASSWORD`). Both were shared in plain channels during the build and must be treated as exposed.
- No secret values live in the repo. `.env.local` is gitignored (the `.env*` pattern; note that pattern also catches `.env.example`, so adjust it if you want the example file committed). `.env.example` lists every variable name with where to get each value.
- `BLOG_INGEST_KEY` grants publish rights on the public website; treat it like a password. It lives in the website env, the Content Studio env, and inside the Titan automation's auth config.
- `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS. Server only, never `NEXT_PUBLIC_*`. All tables run RLS with no policies, so leaking the anon key is harmless but the service key is total access.
- The admin panel is a single shared password with an HMAC cookie (`src/lib/admin-auth.ts`). Fine for a small team; move to real accounts before widening access.

## Known items, deliberately not fixed (audited Aug 23, 2026)

- The Problem Solvers case study repeats All Heart's "$1M+ revenue months" stat (src/lib/case-studies.ts:84). Looks like a copy-paste artifact. Verify with Ryan before launch; the claim also feeds the chat agent's proof block.
- Orphaned components kept on purpose (nothing renders them since the restructure): how-we-can-help, team-roles, services-call-sheet, disrupt-statement, case-study-band, process-timeline, and the topserv-process subtree (process-intro, process-flythrough, process-steps, video/vimeo-card). They carry known quirks (a reduced-motion hydration mismatch in process-flythrough, always-on rAF loops, and 2 different 7-step name sets). If any is revived, fix those first; the 6 stage Method in bf-content.ts is the canon.
- public/design-lab.html plus public/videos/lab and public/images/lab-o (about 8 MB) are design-audition assets, unreferenced by the app. Kept per team decision; delete before DNS cutover if repo size matters.
- The ingest key is accepted as a ?key= query parameter for connector UIs that cannot set headers. Documented tradeoff: URLs can land in logs. Prefer the Authorization header everywhere else.
- Hero stats (200+, $89M+, 50+) are literals in hero.tsx for the count-up animation; update them together with siteConfig.stats.
- Legacy pages (about, contact, case-studies, services/*, industries/*, blog MDX) still contain em dashes; the copy standard sweep for those belongs to Alejandro in the Phase 2 copy pass.
