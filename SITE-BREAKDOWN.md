# TopServ Digital — New Website Breakdown

What was rebuilt, why, and how it is engineered for search engines, answer
engines, and AI agents. August 2026. Live: https://topserv-website.vercel.app
(domain cutover to topservdigital.com pending per LAUNCH.md).

---

## 1. Old site vs new site

| Dimension | Old (Webflow) | New (Next.js 16) |
|---|---|---|
| Platform | Webflow, closed builder | Next.js 16 + React 19 + TypeScript, owned code in a private GitHub repo, deployed on Vercel |
| Pages | ~27 URLs, no blog (the /blog link 404'd) | 42 pages: 10 service pages, 6 industry pages, 3 case studies, working blog, pricing, about, contact, legal |
| Rendering | Client-heavy Webflow output | Server-rendered / statically generated; every word of content exists in the HTML before JavaScript runs |
| Sitemap | **None** | Auto-generated sitemap.xml, updates itself when blog posts are published |
| robots.txt | **Empty file** | Explicit policy welcoming 12 named AI crawlers, protecting /admin and /api, allowing the social-card image |
| Canonical tags | **Zero** | Canonical on every page |
| Heading semantics | **53 h1 tags on the homepage** (letter-split animation) | Exactly one h1 per page, strict h2→h3 hierarchy (audited) |
| Structured data | One flawed Organization block | Full JSON-LD graph: ProfessionalService, Service, FAQPage, Article, VideoObject, BreadcrumbList, ItemList (details below) |
| Duplicate indexing | webflow.io staging fully indexed alongside the real site | Single host; staging noindex step in the cutover checklist |
| llms.txt / machine-readable pricing | None | Both: /llms.txt and /pricing.md |
| Case studies | 3 rows of near-identical boilerplate ("This case study showcases our ability…" ×3, one with a Lancaster/San Antonio copy-paste error); All Heart page embeds **4 deleted YouTube videos** | 3 full case-study pages with verified numbers, live films only, VideoObject schema, count-up stat animations; the copy error fixed |
| Testimonials | Video testimonials buried, animations floaty | Both on-camera testimonials front and center with schema, plus the Harrison quote |
| Contact | **No form** | Working form (validation, honeypot, lead storage) plus the AI concierge |
| Lead capture | Phone number and a booking link | Booking link + form + an AI agent that qualifies prospects and files structured leads |
| Animations | Same scroll-scrubbed translate/rotate everywhere, heavy lag (smoothing 80–90), multiple scroll-jacking pinned sections | Purposeful film-production motion language (edit-timeline, cinema stage, call sheet), one-shot entrances, reduced-motion support, pins desktop-only |
| Mobile | Same scroll-jacking, tiny targets | Dedicated mobile audit + fixes: ~350KB first load (was ~2MB), 44px touch targets, stacked layouts, keyboard-aware chat |
| Old URL equity | n/a | 301 map for all 27 legacy URLs into the new structure |
| NAP consistency | Frisco / McKinney / Prosper conflicting across web | One address everywhere on-site; off-site cleanup itemized in LAUNCH.md |
| Analytics | GTM + Clarity + CallRail | First-party pageview analytics in our own admin panel (plus optional Vercel Analytics at cutover) |
| Content management | Webflow editor | Admin panel: blog CRUD with AI cover images, agent prompt editor, leads table, conversation transcripts |

## 2. Built for AI agents — the site treats machines as a first-class audience

**Agents reading the site:**
- **/llms.txt** is the agent's homepage: company definition, key facts, all 10
  services and 6 industries with one-line descriptions and URLs, full pricing,
  the three case studies with real numbers, testimonials, and the client
  roster. An assistant answering "who is TopServ Digital?" can quote it directly.
- **/pricing.md** is machine-readable pricing. An agent asked "what does
  TopServ charge?" gets exact weekly numbers, the activation fee, and the
  stage-matching logic without parsing any HTML.
- **robots.txt names and welcomes AI crawlers** (GPTBot, ChatGPT-User,
  OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot,
  Perplexity-User, Google-Extended, Applebot-Extended, Bingbot, CCBot) as a
  documented policy, not an accident of an empty file.
- **Everything renders without JavaScript.** Every animated headline, count-up
  stat, typewriter title, and masked word is server-rendered as complete text.
  Verified in audits: an agent that never executes JS still reads the entire
  site, including all seven process steps and every case-study number.
- **FAQ answers are engineered for quotation**: self-contained 40–70 word
  passages that stand alone without surrounding context, exposed both on-page
  and as FAQPage schema.

**Agents working on the site:**
- The **AI concierge** (Claude Sonnet) is itself an answer engine for visitors:
  grounded exclusively on the same data files that render the pages, so it can
  never contradict the site. It runs the sales team's discovery motion,
  captures leads (attribution and pain in the prospect's exact words, spend,
  revenue, decision role, timeline) into a structured database, and saves
  full transcripts for grading. It discloses it is an AI when asked.

## 3. SEO

- **Technical foundation**: single h1s, semantic HTML, canonicals, sitemap,
  correct robots, breadcrumbs with schema, clean URL structure
  (/services/seo, /industries/hvac, /case-studies/…, /blog/…).
- **Old equity preserved**: every legacy URL 301s to its new equivalent
  (verified returning correct targets), so 8 years of link equity transfers.
- **Performance as ranking signal**: static/SSG pages, optimized images with
  correct sizes, code-split JS (chat bundle deferred), font-display swap,
  video posters instead of eager streams, ~350KB mobile first load.
- **Content engine**: blog with Article schema, visible dates, GFM support;
  publishing a post automatically updates sitemap, schema, and OG images.
  Internal linking mesh across services ↔ industries ↔ case studies ↔ blog.
- **Local SEO**: consistent NAP sitewide, geo coordinates in schema, and the
  off-site campaign (GBP link, citations, directories) queued in LAUNCH.md.

## 4. AEO (answer engine optimization)

- **The JSON-LD graph**: ProfessionalService (address, geo, founder as a
  Person entity, service area), Service schema per service page, FAQPage on
  homepage + pricing + every service and industry page, Article per blog
  post, VideoObject for every film (portfolio, welcome, both client
  testimonials — with titles, upload dates, thumbnails), BreadcrumbList
  sitewide, ItemList for the 7-step process.
- **Entity clarity**: a visible entity-definition paragraph leads the About
  page; identical facts (founding year, founder, address, phone, stats)
  repeat across schema, llms.txt, FAQ answers, and page copy, so engines
  triangulate one consistent entity.
- **Citable numbers**: answer engines prefer specific, sourced claims. The
  site leads with them: 1,000 → 136,500+ monthly visits in five months,
  domain authority 21 → 35, back-to-back million-dollar months, $89M+ client
  revenue, 200+ clients, published weekly pricing.

## 5. GEO (being the answer generative engines give)

- On-site: everything above makes TopServ quotable and unambiguous.
- Off-site (the LAUNCH.md campaign, post-cutover): fix the third-party NAP
  conflicts, point Google Business Profile at the new site, create Clutch /
  UpCity / DesignRush profiles, and get into the "best HVAC marketing
  agencies" roundups — those lists are the sources AI assistants actually
  cite when recommending agencies, and competitors are in them today while
  TopServ is not. Publishing TopServ's own data-backed roundup is queued.
- The transparent pricing is itself a GEO weapon: when an engine is asked
  "what do home-service marketing agencies charge?", TopServ is one of the
  only agencies with a citable answer.

## 6. What runs underneath

- **Chat agent**: Claude Sonnet, sales-playbook discovery, phone-first
  capture, honest status messaging, conversation persistence, transcripts.
- **Admin panel** (/admin): traffic dashboard, leads table with CSV export,
  conversation grading view, live agent-prompt editor, blog manager with
  Gemini-generated cover images.
- **Data**: Supabase (leads, conversations, pageviews, posts, settings), all
  server-side only, RLS locked.
- **Pipeline**: GitHub (private repo) → Vercel; one-command production deploys.

## 7. Still ahead (tracked in LAUNCH.md)

Domain cutover + Search Console, Resend email for lead notifications, team
sign-off on four remaining copy claims, teaser video compression, favicon,
staging-asset cleanup, and the off-site entity campaign.
