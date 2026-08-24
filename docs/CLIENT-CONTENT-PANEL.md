# Concept: The Client Content Panel (Agentic Site Backbone)

Discussion draft for Alex, Alejandro, and Shaw. Not a build spec yet.
Origin: Alejandro's proposal (Aug 24, 2026) plus the decision that clients
can publish directly, with the SEO team notified rather than gatekeeping.

## The vision

Every site we build becomes an agentic site: the client manages their own
news, people, projects, and business details by chatting with an AI inside
their admin panel ("add this press release", "create a project update for
this roofing job in Miami", "update our holiday hours"), and cannot break
the site or its SEO no matter what they do. This panel becomes the
backbone offering for future client websites.

## Why auto-publish is safe here (the core design argument)

Safety does not come from an approval queue. It comes from 4 layers:

1. **Immutability by design.** Clients work inside predefined content
   types. The submission payload for a press release simply has no fields
   for URLs, meta tags, templates, navigation, tracking, or layout. The
   site generates schema markup, canonicals, sitemaps, and social images
   itself. There is nothing SEO-critical to break because it is not
   reachable, the same guarantee our blog pipeline already enforces in
   production.
2. **Preview before publish.** The client sees the true render (the exact
   pipeline our Content Studio and admin preview use today) before
   confirming.
3. **Notify, don't gate.** Every client publish fires a notification to
   the SEO department (email and/or Slack) with what changed, who changed
   it, and a link to view and to roll back. Observability replaces
   approval.
4. **Instant rollback.** Every publish snapshots the previous state.
   One click restores it. This is the piece that makes trust cheap.

Per-type publish policy stays configurable: business info and team photos
can be instant, while rarer or riskier types (a brand new page) can still
require internal review. Default: publish with notification.

## What already exists (proven on the TopServ site)

- The full pattern for 1 content type (blog posts): strict schema
  validation, draft and publish states, true-render preview, automatic
  schema/sitemap/OG generation, image upload with smart aspect-ratio
  normalization, merge-safe updates.
- 3 input doors sharing 1 core: a form composer with live site preview
  and completeness checks (Content Studio), a REST ingest API (feeds the
  Agency Titan automation, live), and an MCP server, which already lets
  an AI agent create content conversationally.
- A conversational tool-calling agent in production (the site concierge)
  and the prompt/tooling patterns to build scoped agents quickly.
- Supabase as the data layer, with the auth product available for client
  logins.

## What the client can manage (from Alejandro's list)

- Media room: press releases, announcements, news, images, publish dates,
  downloadable documents.
- Project / job updates: photos, description, location, services
  performed, service areas. Tagged content auto-appears on matching
  service-area and project pages (placement rules).
- Team: photos, bios, roles, certifications, new hires.
- Testimonials and reviews.
- Business info: phone, email, hours, address, socials, holiday closures,
  emergency notices.
- Galleries, case studies, awards, partner logos, events.
- Homepage announcements and promo banners with preset layouts and
  expiry dates.

Additions worth including: careers/job postings, a per-service FAQ
manager (feeds FAQPage schema, high AEO value), before/after photo pairs
on projects, offers with expiry and Offer schema, AI drafting assist
(client gives bullets, system writes within the template, generates alt
text, crops images).

## What the client can never touch (enforced by absence, not permission)

SEO titles, meta, schema, URLs, redirects, canonicals, sitemaps, robots;
core service/location/homepage copy; navigation, hierarchy, templates,
branding, fonts, colors, layout; CTAs, forms, tracking, booking flows,
lead routing; analytics, pixels, integrations, CRM, automations, user
permissions, site settings; legal, accessibility, security, cookies,
hosting, domains. New page types require an internal workflow.

## Architecture: how the system recognizes content on any site

The panel never guesses what a site contains. Every site declares itself
through a manifest, and the engine reads the declaration. 4 layers:

### Layer 1: the shared engine
One versioned module installed into every site (the same portability
discipline as the blog pipeline): validation, storage, review queue,
true-render preview, versioning and rollback, publish notifications, the
agent runtime, and the admin panel shell. Built once, on the TopServ site
first, never forked per site.

### Layer 2: the content-type catalog (shared)
The universal definitions of the ~10 types. A testimonial has the same
shape on every site (author, company, quote, rating, photo). A project
update is always photos, description, location, services performed,
service areas. Nothing site-specific lives in the catalog.

### Layer 3: the site manifest (per site, the recognition mechanism)
Each site declares:
- Which types it enables (the TopServ site: blog, media room, team; a
  client roofing site: all of them).
- Its vocabularies: the actual services list, service areas, and team
  roles of that business. This is what lets "a roofing job in Miami"
  resolve to validated values instead of free text.
- Per-type publish policy (instant / preview-confirmed / review-required)
  and notification targets.

The difference between the bespoke company site and a templated client
site is only the manifest and the slots. Same engine, same types, same
agent everywhere.

### Layer 4: placement slots in the pages
Pages pull content from the store by type and tags through slot
components ("testimonials render here on the homepage", "project updates
matching this service area render here"). Templated client sites get the
slots baked into the template family once; the bespoke company site adds
slots only where they make sense. Content never knows about routing,
which is also why clients cannot break structure.

### How the agent recognizes content, concretely
- **Creating:** the agent's tools are generated from the manifest, 1 tool
  per enabled type, each tool's input schema being the type's schema.
  Missing required fields become the agent's follow-up questions, because
  the schema already knows what is missing (the proven captureLead and
  create_blog_post pattern).
- **Editing:** the agent queries the content store ("find the team member
  named Carlos", "list active banners"), shows what it found, proposes
  the change, previews the render, publishes with the SEO notification.
  Recognition is a database query, never page comprehension.

### The Content Studio graduates into the panel
The Studio's real invention is the trio of schema-driven form, live
true-render preview, and completeness checks. That becomes the panel's
generalized composer: one component that takes any registered type and
produces the form, the checks, and the preview automatically. Build the
composer once, get the UI for every type free. The standalone Studio app
remains the external door until client logins exist, then retires.

## Build order (all types, one by one, sequenced by leverage)

Each step makes the next cheaper. Versioning, rollback, and SEO
notifications are built into the engine at step 1 so every later type
inherits them free.

1. **The registry itself**, proven by refactoring blog posts into the
   first registered type. No new product surface, all the plumbing.
2. **Testimonials**: simplest schema, first real client type.
3. **Project updates**: the flagship, introduces tags and placement rules.
4. **Team members.**
5. **Media room** (press releases, announcements, documents): brings file
   attachment infrastructure.
6. **Business info and emergency notices**: a different beast, singleton
   settings rather than a collection, with schema.org opening-hours
   implications.
7. **Banners and announcements**: brings timed expiry infrastructure.
8. **Galleries, awards, partner logos, events**: media-heavy, cheap after
   step 5.
9. **FAQ manager**: nearly free, feeds the FAQPage machinery the sites
   already render.
10. **Careers / job postings.**
11. **Client logins and scoping** (Supabase Auth, client editor and
    agency admin roles).
12. **The agent**: by this point pure assembly, every tool and schema
    already exists.

Some types will not be enabled on the TopServ site itself. They are built
here anyway, because this site is the reference implementation and the
baseline for every client site that follows.

## The discipline that decides whether this works

Everything is built on the TopServ site first, and nothing is hardcoded
to the TopServ site. Every site-specific fact goes in the manifest, never
in the engine. This is the same discipline that made the blog pipeline
portable, and it is the difference between "backbone for future websites"
being real versus a slogan. Expect it to cost roughly 15 percent more
effort per feature. It is the whole ballgame.

## Open questions for the team

1. Which 2 content types first? (Proposal: project updates and
   testimonials, highest client demand and strong SEO value.)
2. Notification channel for the SEO dept: email, Slack, or both? Digest
   or per-change?
3. Any types that should stay review-required even for trusted clients?
4. One central portal for all of a client's properties, or a panel per
   site? (Proposal: per site first, portal later.)
5. Where does client identity live long-term: per-site Supabase or a
   shared auth tenant across all client sites?
