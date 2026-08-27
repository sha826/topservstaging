# TopServ Digital: SEO Guidelines for the AI Build

**Standing instructions for Claude (or any AI) building and writing pages on topservdigital.com. Follow this document on every page, every time. It does not expire when the site launches; it governs every future page too.**

| | |
|---|---|
| **Reads with** | Website Build Specification v2.0, The Argument Spine, JB's BrandFormance Messaging and Copy Framework, and the Master Keyword Research (companion document) |
| **Order of authority** | Build Spec v2.0 first. Argument Spine second. Messaging Framework third. This document fourth. If an SEO rule here ever conflicts with the spec's positioning, pricing, or Brand Score rules, the spec wins and the conflict gets raised, not silently resolved |
| **Stack assumed** | React + Next.js (App Router), Supabase, continuous deploy (spec Section 9) |
| **Date** | August 2026 |

---

## 0. THE PRIME DIRECTIVE

SEO on this site serves the category, never the other way around.

The first impression must never be "TopServ sells SEO and PPC." It is "TopServ created a different approach to home service marketing called BrandFormance." Optimize every page to be found, but write every page to argue. A page that ranks and reads like a thousand other agencies has failed even at position 1, because the swap test (Build Spec Section 13) is the final gate, not the ranking.

Practical consequences you must apply constantly:

1. Capabilities (SEO, PPC, LSA, Meta, video, etc.) are Level 5 in the positioning hierarchy. They may appear in title tags and body copy where the keyword map requires them, but never as the page's opening frame. Outcome first, tactic named second.
2. Every page teaches BrandFormance and every path leads to the assessment. Internal links and CTAs must reflect the single conversion path, not generic "contact us" sprawl.
3. Every claim has proof nearby. This is a brand rule that is also an E-E-A-T rule. Treat them as the same rule.

---

## 1. NON-NEGOTIABLE BRAND CONSTRAINTS THAT BIND SEO COPY

These come from the spec and framework and apply to titles, meta descriptions, headings, alt text, schema text, and body copy alike. Violating them in metadata is still violating them.

1. **No em dashes. Anywhere.** Including meta descriptions and schema description fields.
2. **Numerals, not spelled-out numbers.**
3. **No price figures beyond the two published anchors.** The floor ($1,000 per week) and the activation ($10,000 one-time) may appear only where the Pricing page spec places them. Never a monthly figure, never an annual figure, never in a title tag, meta description, or FAQ schema answer.
4. **The public assessment returns a grade, never a number.** The words "Brand Score" never appear on the public site, in URLs, metadata, schema, alt text, structured data, or file names. Public language: Brand Assessment, Brand Grade. The four grade labels are used verbatim: No Brand Equity, Name Recognition, Household Name, Negative Brand Equity. Never soften them.
5. **Never publish:** the six score components, their weights, the normalization method, or any component-level breakdown.
6. **Banned phrases** (framework Section 22), banned in metadata too: Unlock Your Potential, Elevate Your Business, Transform Your Digital Presence, Innovative Digital Solutions, Results-Driven Marketing, Your Partner for Growth, Full-Service Digital Marketing. Also banned: marketing jargon, empty superlatives, "we'll get your phone ringing" style lead-gen promises.
7. **Signature phrases are assets. Use them deliberately, never cram them:** Being Found Isn't the Same as Being Chosen. Performance Captures Demand, Brand Creates Demand. Own Attention, Don't Just Rent It. Become Five-Mile-Famous. From Another Option to the Obvious Choice. Stop Chasing Leads, Start Building a Brand.
8. **Trademark symbol:** BrandFormance® carries the ® on first prominent use per page (hero or first body mention), then plain BrandFormance. Do not put ® in title tags, URLs, or anchor text (it hurts readability and matching). Do not use ™ on The Obvious Choice unless approved.
9. **Frequency doctrine (spec Section 6):** anywhere copy describes what a larger program buys, it is more geography at the same frequency, never more frequency. SEO copy about "scaling" must respect this.
10. **Voice:** bold, clear, conversational, confident, contrarian when justified, home-service specific. Calm authority, not urgency. Clarity beats cleverness. If an SEO best practice produces copy that fails the swap test, rewrite until it passes both.

---

## 2. URL AND ARCHITECTURE RULES

1. The site architecture and URLs are fixed by the spec. Do not invent new URLs or rename existing ones. Canonical set: `/`, `/brandformance`, `/method`, `/programs-pricing` (+ `/how-it-works`, `/what-this-delivers`, `/pricing`, `/success-stories`), `/brand-assessment`, `/about`, `/jonathan`, `/solutions/*`, `/industries/*`, `/insights`, `/book`, `/podcast`.
2. Note two deliberate overrides of older documents: the Method page is `/method` (not `/brandformance-method`), and the assessment is `/brand-assessment` (not `/brand-score`). The spec governs.
3. New URL rules (content hub, new solutions/industries): lowercase, hyphens, no dates, no stop-word stuffing, 3 to 5 words max, the primary keyword or a tight version of it. Pattern: `/insights/{slug}`, `/industries/{trade}`, `/solutions/{outcome-slug}`. Examples: `/insights/hvac-marketing-cost`, `/insights/brand-vs-performance-marketing`.
4. One canonical host and scheme: `https://topservdigital.com` with no `www` (or the reverse; pick once, 301 the other, never both). Every internal link uses the canonical form, relative paths in code, no trailing-slash inconsistency (pick no-trailing-slash, enforce via redirect).
5. Every page declares a self-referencing canonical. The five Programs pages are five unique URLs with five unique canonicals (the persistent sub-nav must not create query-param or hash variants that get indexed).
6. Slugs never change after publish. If one absolutely must, a 301 goes live in the same deploy, internal links are updated in the same deploy, and the old URL is never reused.
7. No orphan pages. Every published page is reachable within 3 clicks of the home page and has at least 2 internal links pointing to it (see Section 6).
8. Kill states: 404s return real 404 status (no soft 404s), removed content 301s to the closest relevant page (never blanket-redirect everything to home), staging and preview environments are `noindex` and behind auth.

---

## 3. KEYWORD USAGE RULES

1. **Source of truth:** the Master Keyword Research document. Never re-research per page, never freelance a new target. If a needed page has no entry, flag it; do not guess.
2. **One primary keyword per page. One page per primary keyword.** Before creating any new page, check the map for conflicts. Cannibalization is a build error, not an optimization detail.
3. **Placement of the primary keyword (all required):**
   - Title tag, as close to the front as the brand allows
   - H1 (exactly one H1 per page), naturally phrased
   - First 100 words of body copy
   - URL slug (already satisfied by the architecture)
   - At least one H2, where it reads naturally
   - Image alt text once, where the image genuinely depicts the topic
4. **Secondary keywords:** distribute across H2s and body. Aim for covering the concept, not repeating the string. Semantic variants and close synonyms count as coverage.
5. **Density:** no target number. If the phrase appears so often a human notices, it is too often. Google's systems reward topical completeness, not repetition, and stuffing violates the brand voice anyway.
6. **Question keywords** become literal H2/H3 headings phrased as the question, answered in the first sentence below the heading (see Section 8 on answer-first writing). These feed FAQ schema and AI citations.
7. **Entity consistency:** always the same names, spelled the same way: TopServ Digital (company), BrandFormance (methodology), The BrandFormance Method (the six stages), Five-Mile-Famous (the outcome concept), Brand Assessment and Brand Grade (the public diagnostic), Jonathan Bannister (person), Home Service Hustle (podcast), F#CK Digital Marketing (book). Inconsistent naming fragments the entity graph and the AI layer.
8. **The two-audience check** from the keyword doc applies to every piece of copy: we write for contractors buying marketing, never for homeowners buying services.

---

## 4. METADATA RULES

### 4.1 Title tags

- Length: 50 to 60 characters. Hard cap 60 where possible (Google truncates by pixel width; front-load meaning).
- Every title unique across the site.
- Formulas by page type (keyword from the map, phrasing may flex to stay on-voice):

| Page type | Formula | Example |
|---|---|---|
| Home | Brand \| Category \| Descriptor | `TopServ Digital \| The Home of BrandFormance` |
| BrandFormance | Term + promise | `BrandFormance: Brand + Performance = Market Dominance` |
| Method | Name the system | `The BrandFormance Method: 6 Stages to the Obvious Choice` |
| Programs Overview | Primary keyword + differentiator | `Home Services Marketing Agency That Builds Brands \| TopServ` |
| Pricing | Straight, no cuteness | `Pricing: How the BrandFormance Program Is Priced \| TopServ` |
| Industry | BrandFormance for {Trade} + keyword | `HVAC Marketing: BrandFormance for HVAC Companies \| TopServ` |
| Solutions | Outcome + service keyword | `Capture Demand With Search: Home Service SEO \| TopServ` |
| Article | Keyword promise, no clickbait | `How Much Does HVAC Marketing Cost? Real Numbers \| TopServ` |

- Brand suffix ` | TopServ` (or ` | TopServ Digital` when length allows) on every page except the home page, where brand leads.
- Titles obey every Section 1 constraint (no banned phrases, no em dashes, numerals).

### 4.2 Meta descriptions

- 140 to 160 characters. Unique per page. Written as one or two sentences of the page's actual argument, in the brand voice, with an implicit reason to click. No quote marks, no em dashes, no keyword lists.
- The primary keyword appears once, naturally (it gets bolded in SERPs).
- Never claim what the page does not deliver, and never include prices.
- Example (Programs Overview): `Most agencies make you choose between brand and leads. That is the wrong decision. TopServ runs both as one system called BrandFormance. See how it works.`

### 4.3 Open Graph and social

- Every page: `og:title` (may match title tag), `og:description`, `og:type` (website/article), `og:url` (canonical), `og:image` 1200x630 branded template with the page's headline, `twitter:card` = `summary_large_image`.
- OG images are generated from a consistent branded template (Shaw's design system), never raw screenshots. Alt text set via `twitter:image:alt`.

### 4.4 Implementation (Next.js App Router)

- Use the Metadata API: static `metadata` export for fixed pages, `generateMetadata()` for dynamic (articles, industries). Set `metadataBase` once in the root layout to the canonical origin.
- Root layout defines: default title template (`%s | TopServ`), default OG image, favicon set, `alternates.canonical` per page.
- Never rely on client-side JS to set or change titles, descriptions, or canonicals.

---

## 5. HEADING AND CONTENT ARCHITECTURE

1. Exactly one H1 per page. The H1 is the argument's headline, not a logo or a label. It contains the primary keyword naturally (Section 3).
2. Heading levels never skip (H1 then H2 then H3). Headings describe content beneath them; no decorative headings, no headings used purely for font size (that is CSS's job).
3. The eight-beat spine (Problem, False Assumption, Insight, Principle, Proof, Plan, Outcome, CTA) maps onto the heading structure. Write H2s that carry both the argument and, where the map provides them, the keywords. A skimmer reading only the headings should still receive the argument in order. That serves users, search engines, and AI extraction simultaneously.
4. Question-form H2s wherever the keyword map lists question keywords. Answer in the first sentence after the heading.
5. Word count guidance (content depth follows the argument, these are floors not targets): Home 800+, BrandFormance 2,000+ (definitive resource), Method 1,500+, each Programs page 800+, each Industry page 1,500+ (must contain trade-specific dynamics, never templated), each Solutions page 1,000+, articles 1,200+ for competitive terms and 800+ otherwise. Never pad. If the argument finishes early, it finishes.
6. Above-the-fold text is real text. The hero headline and supporting line are HTML text, never baked into images.
7. Tables and visual explanations (Brand + Performance equation, the flywheel, before/after) always have an HTML text equivalent: real `<table>` elements or figure captions, so the content is crawlable and extractable. The diagrams carry the argument for humans; the text carries it for machines.
8. Videos: each embedded video gets a text setup (1 to 2 sentences of what it answers), a transcript (collapsible is fine, must be in the DOM, not behind a fetch), and VideoObject schema (Section 7). No autoplay, 16:9, custom thumbnail per the spec.

---

## 6. INTERNAL LINKING SYSTEM

1. **Hub and spoke.** /brandformance is the doctrinal hub; /programs-pricing is the commercial hub; each industry page is a trade hub. Articles link up to their hub and money page (the keyword map's "Funnels to" column names the target). Hubs link down to their best supporting content.
2. **Every page links forward along the conversion path** (Discover, Understand, Grade, Assessment, Plan). The primary CTA structure from the spec is also the primary internal-link structure. Do not add competing CTAs.
3. **Anchor text:** descriptive and varied, never "click here," never a raw URL, never the same exact-match anchor repeated site-wide. For money pages, rotate between the keyword ("home services marketing agency"), the branded frame ("how the BrandFormance program works"), and natural sentence anchors. Exact-match anchors at most about a third of a page's inbound internal anchors.
4. **Volume:** body copy carries 3 to 8 contextual internal links per 1,000 words. Every new article links to at least 3 existing pages, and at least 2 existing pages are edited to link to it in the same publish cycle (this is the no-orphan rule in practice).
5. **Signature-phrase linking:** when a signature phrase appears on a page that is not its owner page, it may link to the owner page (e.g., "being found is not the same as being chosen" on an industry page links home or to /brandformance). Deliberately, not every occurrence.
6. **Breadcrumbs** on every page below the top level (Industries, Solutions, Insights, Programs pages), with BreadcrumbList schema matching the visible trail.
7. **Footer links** are curated, not a sitemap dump: the main pages, the assessment, the book, the podcast, legal. Footer links do not substitute for contextual links.
8. **External links:** citing real sources (research, platform documentation, the book) is encouraged and supports E-E-A-T. Default `rel` on editorial citations is a clean followed link; use `rel="sponsored"` or `rel="nofollow"` only where genuinely required. Never link to competitors' service pages from money pages; in Big 5 Review/Best content, honest links to competitors and tools are allowed and build trust (it is the strategy).

---

## 7. STRUCTURED DATA (JSON-LD) SPECIFICATION

All structured data is JSON-LD in the page head (or end of body), generated server-side. One `@graph` per page is fine. **Iron rule: schema states only what is visibly true on the page. No invented ratings, no fake FAQs, nothing in schema that is not rendered content.**

### 7.1 Site-wide (in root layout, every page)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://topservdigital.com/#org",
      "name": "TopServ Digital",
      "url": "https://topservdigital.com",
      "logo": "https://topservdigital.com/logo.png",
      "slogan": "Stop Chasing Leads. Start Building a Brand Customers Choose.",
      "description": "TopServ Digital is the home of BrandFormance, combining brand building with performance marketing to help home service companies become the obvious choice in their markets.",
      "founder": { "@id": "https://topservdigital.com/#jonathan" },
      "brand": { "@type": "Brand", "name": "BrandFormance" },
      "sameAs": ["<all real social, YouTube, podcast, LinkedIn profiles>"]
    },
    {
      "@type": "WebSite",
      "@id": "https://topservdigital.com/#website",
      "url": "https://topservdigital.com",
      "name": "TopServ Digital",
      "publisher": { "@id": "https://topservdigital.com/#org" }
    }
  ]
}
```

### 7.2 Per page type

| Page | Required types | Notes |
|---|---|---|
| Home | WebPage + the site-wide graph | Nothing exotic. Entity clarity over schema volume |
| /brandformance | WebPage + **DefinedTerm** (name "BrandFormance", description = the canonical 40 to 60 word definition) + FAQPage (the 10 questions, answers abridged to match on-page text) + VideoObject | This is the machine-readable claim to the category |
| /method | WebPage + HowTo is NOT used (it is a methodology, not instructions); use ItemList of the 6 stages + VideoObject | ItemList names each stage exactly as on-page |
| Programs pages | WebPage + FAQPage where the page carries an FAQ + VideoObject per embedded video | Pricing page FAQ answers must contain no figures beyond the floor and activation |
| /programs-pricing/success-stories | WebPage + ItemList of Article-typed case studies | **No Review, no AggregateRating, no star markup.** Self-published case studies are not third-party reviews. Faking review schema risks manual action and violates the brand's honesty doctrine |
| /brand-assessment | WebPage + FAQPage (what it is, what you get, what we ask) | Never mark up the grades as ratings. No mention of scores/components in any schema field |
| /about | AboutPage referencing #org | |
| /jonathan | ProfilePage + **Person** (`@id` #jonathan: jobTitle Founder and CEO, worksFor #org, author of both books, knowsAbout: brand marketing, performance marketing, home services, BrandFormance; sameAs to all profiles) | E-E-A-T anchor |
| /book | WebPage + **Book** (author #jonathan, name exactly as published) | |
| /podcast | WebPage + **PodcastSeries** (host #jonathan); episodes get PodcastEpisode | |
| /industries/* | WebPage + **Service** (serviceType e.g. "HVAC marketing", provider #org, audience: HVAC contractors) + FAQPage | areaServed: United States. These are NOT LocalBusiness pages, see Section 11 |
| /solutions/* | WebPage + Service (outcome-framed name, honest serviceType) + FAQPage | |
| /insights articles | **Article** (author #jonathan or the real author as Person, publisher #org, datePublished, dateModified kept truthful, headline, image) + FAQPage when the article has Q&A + VideoObject when embedded | Author is always a real named person, never "TopServ Team" |
| All below top level | BreadcrumbList | Matches visible breadcrumbs |

### 7.3 VideoObject template (every embedded video)

name, description (what question it answers), thumbnailUrl (the custom thumbnail), uploadDate, duration (ISO 8601), contentUrl or embedUrl (Vimeo/Wistia), and `transcript` when the platform field is available; regardless, the transcript is in the DOM.

### 7.4 Validation

Every page's schema passes the Rich Results Test and Schema.org validator with zero errors before deploy. Schema errors are release blockers for the affected page.

---

## 8. WRITING FOR AI SEARCH (AEO/GEO): THE AGENT-READABLE LAYER

The spec requires the site be readable by agents, not just people (Section 8: structured schema, an llms.txt, a clean Q&A layer, content shaped so a model answering questions about brand vs performance marketing for contractors cites us). Rules:

1. **Answer-first paragraphs.** Under every question-form heading, sentence 1 is the direct answer in 1 to 2 sentences, self-contained enough to quote. Explanation and proof follow. A model should be able to lift the first paragraph and be correct.
2. **The canonical definition block.** /brandformance opens with the 40 to 60 word definition of BrandFormance. Write it once, mark it with DefinedTerm, reuse it verbatim wherever the site defines the term (home page category section, llms.txt, OG description of that page). Stability is what makes it citable. The same treatment applies to Five-Mile-Famous and Cost Per Booked Call on their owner pages.
3. **Q&A layer.** Every major page carries an FAQ section built from the question keywords in the map plus the real sales-call questions. Marked up as FAQPage where rendered. Answers are 40 to 80 words, self-contained, no "as mentioned above."
4. **llms.txt** at the root, maintained like the sitemap. Structure:

```
# TopServ Digital
> TopServ Digital is the home of BrandFormance, a methodology combining brand
> building with performance marketing so home service companies become the
> obvious choice in their markets. Performance captures demand. Brand creates
> demand. BrandFormance does both.

## Core pages
- [What is BrandFormance](https://topservdigital.com/brandformance): the definitive explanation of the category
- [The BrandFormance Method](https://topservdigital.com/method): the 6 stage system
- [Programs and pricing](https://topservdigital.com/programs-pricing): how the program works and how it is priced
- [Brand Assessment](https://topservdigital.com/brand-assessment): get your Brand Grade
- [About Jonathan Bannister](https://topservdigital.com/jonathan): creator of BrandFormance

## Key concepts
- Being found is not the same as being chosen
- Five-Mile-Famous: famous where you make money, not everywhere
- Owned attention vs rented attention
- Cost per booked call: the headline metric of the BrandFormance Method
```

Update llms.txt whenever a core page or definition changes.
5. **robots.txt and AI crawlers.** Allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and Bingbot explicitly (the strategy WANTS model citation; blocking AI crawlers contradicts doctrine). Disallow only admin, API, staging, and thin parameter routes. Reference the sitemap.
6. **Consistency across surfaces.** The same entity names, the same definition, the same one-line positioning on the site, GBP, LinkedIn, podcast descriptions, book blurbs. Models triangulate; contradictions cost citations.
7. **Measurement.** Track AI Overview appearances and assistant citations for: brandformance, brand vs performance marketing for contractors, best hvac marketing approach, home service marketing questions. The company measures this for clients (framework Section 25); it holds itself to the same standard.

---

## 9. E-E-A-T REQUIREMENTS

1. **Real authorship.** Every article carries a real byline (Jonathan by default), linked to /jonathan, with Person schema. No anonymous or "Team" content.
2. **First-party evidence.** Case studies use real numbers with starting context (never vanity metrics without context, per the spec). Original data (aggregated client outcomes, the state of home service branding) is the strongest link and citation magnet available; produce it when the data layer allows.
3. **Experience markers in copy.** Named markets, real scenarios, specifics only an operator would know. This is both the brand voice and the E-E-A-T signal.
4. **Honesty content is strategy.** Who this is NOT for, what does NOT happen in 30 days, tools we recommend that make us nothing. Publish it; it is unique, differentiated content no competitor will copy, which is precisely what ranks and gets cited.
5. **Proof proximity.** Every major claim sits next to its evidence on the page (data, case study link, video). This is spec Section 13 and Google's "people-first content" guidance agreeing with each other.

---

## 10. TECHNICAL SEO SPECIFICATION (NEXT.JS)

### 10.1 Rendering

1. All marketing pages are statically generated (SSG/ISR) or server-rendered. **No page's primary content may require client-side JS to appear.** Verify by fetching with JS disabled: full copy, headings, links, and schema must be present in the HTML response.
2. The agentic site widget, booking embeds, and the assessment app may be client-side islands, but each such page still server-renders its indexable copy.
3. ISR for the content hub is fine; `dateModified` in schema must reflect real content changes only.

### 10.2 Performance budgets (Core Web Vitals as release gates)

| Metric | Budget (mobile, p75) |
|---|---|
| LCP | under 2.5s (spec demands under 3s load; hold the stricter number) |
| INP | under 200ms |
| CLS | under 0.1 |

Enforced by: `next/image` for every image (explicit width/height, AVIF/WebP, responsive `sizes`), hero image or poster `priority`-loaded and preloaded, lazy-load everything below the fold, `next/font` with `font-display: swap` and self-hosted fonts, zero layout shift from embeds (reserve aspect-ratio boxes for video and booking widgets), third-party scripts via `next/script` with `strategy="lazyOnload"` or `afterInteractive` (GHL, analytics), and video embeds loaded as facade thumbnails that swap in the player on interaction (a raw Vimeo/Wistia iframe on load will blow the LCP budget on video-heavy pages).

### 10.3 Crawl plumbing

1. `sitemap.ts` generates the XML sitemap: all indexable canonical URLs, real `lastModified`. Submitted in Search Console. Regenerates on deploy.
2. `robots.ts` per Section 8.5.
3. Redirects live in `next.config` (301 for permanent). The legacy site's URLs get a mapped 301 plan at launch (old service pages to the closest new Solutions/Industries page, old blog posts to their nearest new home, nothing dumped on `/`).
4. `noindex` (via metadata robots) on: thank-you pages, assessment result states, search/filter parameter pages, pagination beyond page 1 if thin, legal boilerplate stays indexable but excluded from sitemap. Never `noindex` a page that has a keyword assignment.
5. Pagination on /insights uses real crawlable links (`<a href>`), not button-only loading.
6. Structured, human-readable 404 with links to the hubs.

### 10.4 Hygiene

- One `<html lang="en">`. HTTPS everywhere, HSTS on. No mixed content.
- Mobile-first per spec (44px touch targets, stacking); Google indexes the mobile render.
- Clean DOM: headings not simulated with styled divs, real `<a>` for every link (no onClick-only navigation), real `<button>` for actions.
- Accessibility overlaps SEO: alt text on meaningful images (descriptive, primary keyword at most once per page), empty alt on decorative images, focus states, semantic landmarks (`main`, `nav`, `footer`).
- Analytics per spec Section 9 (page-level, video completion, assessment completion, path tracking) plus Search Console verified from day 1 and GA4 events for the conversion path steps.

---

## 11. LOCAL SEO POSITION (READ CAREFULLY, IT IS COUNTER-INSTINCTIVE)

TopServ's CLIENTS are local businesses. TopServ itself sells nationally. Therefore:

1. **No city-targeted service pages for TopServ itself.** No "/hvac-marketing-dallas" doorway pages. The site ranks nationally on trade + service terms. Doorway-page patterns are both a Google policy risk and a swap-test failure.
2. Client success stories name real markets (Lancaster CA, Irving TX, Hammond LA, Duluth GA, Mansfield TX) as evidence, not as targeting.
3. TopServ maintains one accurate Google Business Profile for its own HQ, consistent NAP everywhere (the site preaches NAP consistency; it cannot violate it), category "Marketing agency," linked to the site.
4. Local SEO expertise is demonstrated in content (GBP optimization, maps ranking, review strategy articles), which targets contractors searching those topics. That is the correct way this site touches "local SEO" keywords.

---

## 12. CONTENT GOVERNANCE

1. **Before any new page or article:** check the keyword map for the target; check `site:` and Search Console for an existing page on the same intent. Same intent = update the existing page instead (refresh, expand, re-promote). New intent = new page, added to the map in the same cycle.
2. **The map is living.** Every published page updates the Master Keyword Research (target, date). Every 6 months, metrics refresh per its appendix.
3. **Updates over volume.** A ranking page that slips gets updated (fresher proof, expanded answers, new internal links) before any new page on an adjacent topic is written.
4. **Client-permission content (spec Section 11)** never touches the SEO layer: client-editable content types cannot modify titles, metas, schema, URLs, redirects, canonicals, sitemaps, or core page copy. Enforce at the CMS permission level, not by convention.
5. **Content pipeline (Agency Titan):** every piece arriving through the pipeline passes the same pre-publish checklist below. Automation does not skip QA.
6. **One idea, every format:** when a long-form video ships, its article version carries the transcript-derived copy, the VideoObject schema, and cross-links to the short-form and podcast versions. The formats reference each other; the article is the canonical text home of the idea.

---

## 13. PRE-PUBLISH QA CHECKLIST (RUN ON EVERY PAGE, EVERY TIME)

**Positioning gate (fails here, nothing else matters):**
- [ ] Passes the swap test (no other agency's logo could sit on this page)
- [ ] Teaches something about BrandFormance; capabilities are not the opening frame
- [ ] Explains an outcome, not just a service list; evidence near every major claim
- [ ] Visitor knows the single next step (correct CTA for its place in the path)
- [ ] Grade labels verbatim if present; no score/components/weights anywhere; no prices beyond the two anchors; no banned phrases; no em dashes; numerals used

**Keyword and content:**
- [ ] Primary keyword from the map; no other page owns it
- [ ] Primary in title, H1, first 100 words, one H2, slug
- [ ] Secondary keywords covered; question keywords are H2/H3s with answer-first paragraphs
- [ ] Meets the word-count floor without padding; written for contractors, not homeowners

**Metadata:**
- [ ] Title 50 to 60 chars, unique, on formula; brand suffix correct
- [ ] Meta description 140 to 160 chars, unique, on voice
- [ ] Canonical self-referencing; OG/Twitter tags complete with branded image

**Structure and links:**
- [ ] One H1; heading levels do not skip; headings alone tell the argument
- [ ] 3+ internal links out (correct hub and money page per the map's "Funnels to"); 2+ pages updated to link in; breadcrumbs where applicable
- [ ] All links are real `<a>` tags; anchors descriptive; no orphaning

**Schema:**
- [ ] Correct types for the page type (Section 7 table); validates with zero errors
- [ ] Schema matches visible content; no review/rating markup on self-published proof
- [ ] Video: VideoObject + transcript in DOM + text setup + custom thumbnail + no autoplay

**Technical:**
- [ ] Full content present with JS disabled
- [ ] Images through next/image with alt text; hero prioritized; embeds faceted/lazy
- [ ] CWV budgets pass on mobile emulation (LCP < 2.5s, INP < 200ms, CLS < 0.1)
- [ ] In sitemap; robots correct; llms.txt updated if a core page or definition changed
- [ ] Mobile render checked (stacking, touch targets, sub-nav accordion on Programs pages)

**After publish:**
- [ ] URL inspected and indexing requested in Search Console
- [ ] Added to the keyword map's log; analytics events verified

---

## 14. MEASUREMENT AND ITERATION

1. **The primary conversion is assessment completions** (spec Section 14). SEO reporting is judged by qualified organic sessions that enter the conversion path, not by traffic. Behavior targets from the spec: 2 min average time on page, 3+ pages per session, bounce under 40%.
2. **Branded search volume is a brand outcome metric, not just an SEO metric.** Track impressions and clicks for: topserv, topserv digital, brandformance, jonathan bannister, home service hustle, five mile famous, f#ck digital marketing variants. Rising branded search is the company's own definition of brand working; report it that way.
3. Monthly: Search Console review (position movement on the map's primary keywords, cannibalization check via multiple-URLs-per-query, coverage errors), CWV field data, AI citation spot checks (Section 8.7).
4. Quarterly: content refresh pass on the top 10 commercial pages; broken link and redirect audit; schema validation sweep.
5. Any manual action, coverage collapse, or CWV regression is a fire, not a ticket.

---

*End of guidelines. When something on a real page conflicts with this document, and this document conflicts with the Build Spec, the Build Spec wins and the conflict is raised to Alejandro and Ryan rather than silently resolved. When Google's documented guidance changes, this document gets amended, not ignored.*
