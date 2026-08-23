# TopServ Digital — Launch Checklist

The build is static-first Next.js on Vercel. Everything below is the cutover
work that code alone can't do. Items marked **BLOCKING** must happen before DNS
moves; the rest can follow within days.

**Status (August 11, 2026):** Site complete — 39 pages building clean. Every
section of the original homepage has been rebuilt or deliberately retired
(verbatim copy preserved where required), all internal links and external links
verified live, and a three-track audit (bugs/security, animations, UI/UX and
accessibility/performance) completed with all confirmed defects fixed. What
remains is this checklist: environment setup, content sign-offs, asset
compression, domain cutover, and the off-site entity campaign.

## 1. Environment variables (Vercel project settings)

| Variable | Purpose | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL | `https://topservdigital.com` |
| `RESEND_API_KEY` | Lead emails (contact form + chat) | **BLOCKING** — without it leads only hit server logs |
| `LEAD_EMAIL_TO` | Where leads land | defaults to info@topservdigital.com |
| `LEAD_EMAIL_FROM` | Verified sender | verify topservdigital.com in Resend first; until then the resend.dev fallback sender is used |
| `ANTHROPIC_API_KEY` | Concierge chat (direct Anthropic) | used when set; **takes precedence over the gateway** |
| `CHAT_MODEL` | Concierge model | defaults to `claude-sonnet-5` |
| `AI_GATEWAY_API_KEY` | Concierge chat via AI Gateway | fallback path; on Vercel deployments OIDC covers it automatically |
| `SUPABASE_URL` | Lead storage (the team's leads table) | **BLOCKING** for lead capture — without it leads only email/log |
| `SUPABASE_SERVICE_ROLE_KEY` | Lead storage auth | server-only secret; never expose as `NEXT_PUBLIC_*` |

## 2. Content sign-off (**BLOCKING**)

- [ ] Legal pages (`/privacy-policy`, `/terms-and-conditions`, `/refund-policy`) — verify ported text against the old site word-for-word.
- [ ] Claims written into copy that the team must confirm: the **"you own 100% of your assets"** guarantee (web-development page + FAQs), the **5–10% of revenue** budget guidance, the **"we reply within one business day"** promise (contact page + chat), and the **"30-minute"** discovery-call duration (hero/contact).
- [x] ~~Pricing source of truth~~ CONFIRMED by Ryan (Aug 2026): new program model live site-wide — Establish $1,000/wk, Amplify $1,625/wk, Dominate $2,375/wk by brand equity stage, $10K activation on every program (covers the two-day shoot). Old BRAND tiers, Enterprise tier, and the $15K standalone Intensive are retired everywhere (pricing page, FAQs, service/industry copy, blog, llms.txt, pricing.md, chat agent).
- [ ] Michael Harrison testimonial — confirm permission to feature. (Original site spells it "Micheal"; we normalized to "Michael" — confirm correct spelling with the client.)
- [ ] ~~Pull Dylan Rucker / Maddie Studstill review texts from Google Maps~~ — RESOLVED: their on-camera video testimonials (from the original homepage's "Partner love" section, both verified live on TopServ's YouTube channel) are now embedded on the homepage. Optionally still pull the Google text reviews for service pages.
- [ ] All Heart case study has no films: all four videos embedded on the original page (9kTl8inxGis, eBA6OtKADtY, IuuFQuEamSs, MRoRm4jODvA) are deleted from YouTube. Ask the client for re-uploads or source files; add IDs to `videoIds` in `src/lib/case-studies.ts` when available.
- [ ] Logo rollout — navbar and Organization schema already use the real logo (`public/images/topserv-logo.png`). Still pending: **favicon** generated from the logo mark, and (optional) swapping the footer text wordmark and OG-image route branding to the graphic logo.

## 2b. Pre-deploy hygiene (from the Aug 2026 site audit)

- [ ] Delete staging artifacts from `public/`: `design-lab.html` (196KB, noindexed but shippable) and `images/lab-o/` (2.0MB) — both are internal design-lab material.
- [ ] Compress `public/videos/portfolio/` teasers (~6.5MB total). ~~preload strategy~~ DONE: cinema stage now uses `preload="metadata"` + in-view playback (913KB no longer downloads below the fold); ambient Vimeo replaced with the self-hosted MP4.
- [x] ~~Compress partner logos~~ DONE: 128px WebP variants (~123KB total, was 543KB).
- [ ] Compress `public/images/process/` PNGs used as timeline clip thumbnails (~1MB as CSS backgrounds).
- [ ] Decide on a Content-Security-Policy header (`next.config.ts` has XFO/nosniff/HSTS/Referrer/Permissions but no CSP). Needs allowances for YouTube/Vimeo iframes + i.ytimg.com images; test embeds after adding.
- [ ] Contact form bot protection: currently honeypot only, no rate limit (chat API has a best-effort in-memory throttle). Consider Vercel BotID or a shared rate limiter if spam appears.
- [x] ~~TeamRoles mobile fallback~~ DONE: phones get a stacked list; the cinematic pin is desktop-only (Aug 2026 mobile audit — full fix batch applied: touch targets ≥44px, chat keyboard handling, compare-slider tap mode, carousel dots, deferred chat bundle).

## 3. Domain cutover

- [ ] Add `topservdigital.com` to the Vercel project; set **www → apex 301** in Vercel domain settings (fixes the duplicate-host problem from the audit).
- [ ] Point DNS. Keep Cloudflare proxying off for the apex/www at first (avoid double-CDN issues) or set SSL mode Full (Strict).
- [ ] **Webflow: enable "Disable indexing" on the `topserv-….webflow.io` staging subdomain** — it is currently fully indexed as a duplicate site. Then in Search Console request removal of indexed `webflow.io` URLs.

## 4. Redirects & search (**BLOCKING** verification, same day as cutover)

- [ ] Spot-check 301s after deploy (all mapped in `next.config.ts`):
  - `/services/seo-services-for-home-service-companies` → `/services/seo`
  - `/digital-marketing-services/digital-marketing-for-hvac-companies` → `/industries/hvac`
  - `/about/case-studies/flow-pros-case-study` → `/case-studies/flow-pros-plumbing`
  - `/about/team`, `/spotlight`, `/topserv-digital-testimonials` → `/about`
- [ ] Search Console: verify the domain property, submit `sitemap.xml` (28 URLs).
- [ ] Bing Webmaster Tools: same.
- [ ] Confirm `robots.txt`, `llms.txt`, and `pricing.md` resolve on the live domain.

## 5. Tracking decisions

- [ ] Old site ran GTM (`GTM-PR3DRB45`), Google Ads tag, Microsoft Clarity, and CallRail number-swapping. Decide what carries over; if CallRail stays, keep the static (214) 429-4245 in footer/schema — number-swap scripts must not touch schema data.
- [ ] Vercel Analytics is a lighter default if GTM isn't needed day one.

## 6. Entity cleanup (the AI-visibility campaign — post-launch, high value)

- [ ] Fix NAP inconsistency: Chamber of Commerce says Prosper, Facebook says McKinney, site says Frisco. One address everywhere: 15222 King Road, Unit 403, Frisco, TX 75036.
- [ ] Point Google Business Profile website link at the new site; push reviews to Google (not the reputation.topservdigital.com widget).
- [ ] Create Clutch, UpCity, and DesignRush profiles.
- [ ] Outreach into "best HVAC marketing agencies" roundups (Thrive, Silverback, Marketing LTB, Built Right Digital lists) — competitors are cited there, TopServ isn't.
- [ ] Publish TopServ's own data-backed agency roundup on the blog.
- [ ] Keep the blog fed — the engine is `content/blog/*.mdx`; frontmatter + file = schema, sitemap, OG image, dates all automatic.

## 7. Post-launch monitoring (first two weeks)

- [ ] Search Console coverage — watch old URLs move to "Redirect" status.
- [ ] Test the concierge end-to-end on production (ask it pricing; confirm the lead email arrives via `captureLead`).
- [ ] Submit a contact-form test lead; confirm delivery.
- [ ] Lighthouse pass on `/`, `/programs-pricing/pricing`, one service page, one blog post.
