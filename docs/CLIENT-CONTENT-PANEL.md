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

## The new pieces to build

1. **Content-type registry.** Each type = a schema, a storage shape, a
   renderer, placement rules, and a publish policy. One shared engine,
   types added by configuration. Blog posts become the first registered
   type retroactively.
2. **Client identity and scoping.** Per-client logins (Supabase Auth),
   client sees and edits only their content. Two roles to start: client
   editor and agency admin.
3. **Publish policies and notifications.** Per-type policy (instant /
   preview-confirmed / review-required). Every publish notifies the SEO
   dept with a change summary and rollback link.
4. **Versioning and rollback.** Snapshot on publish, one-click restore,
   simple audit log (who, what, when).
5. **Timed content.** Banner and offer expiry, holiday windows, emergency
   notices with auto-remove.
6. **The agent.** A client-scoped chat in the panel with 1 tool per
   content type. The schemas drive the conversation: missing required
   fields become the agent's follow-up questions; the preview is shown in
   chat before the client confirms publish. Same agent architecture as
   the site concierge, different tools and audience.

## Suggested phasing

- **Phase 1, engine + 2 types:** content-type registry built on the blog
  pipeline core; project updates and testimonials as the first client
  types; publishes notify the SEO dept; rollback included from day 1.
- **Phase 2, client access:** client logins, the panel UI (Content Studio
  pattern per type), business info + banners with timing.
- **Phase 3, the agent:** conversational layer over the same schemas and
  tools; this is assembly, not research, by this point.
- **Phase 4, productize:** the panel ships as part of the standard client
  site build (the build spec's Phase 3 "templated and offered to
  clients"), alongside the Titan pipeline (agency door) and the panel
  (client door).

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
