# Image and Media Guidelines

Consolidated image and media rules for topservdigital.com. **This document
creates no new brand, design, SEO, accessibility or technical rules.** Every
rule below is carried from an existing project document and cited to it.
Where the existing documentation establishes nothing, the gap is marked
**Not specified in existing documentation** rather than filled in.

| | |
|---|---|
| **Reads with** | `COPY-FRAMEWORK.md` §24, `SEO-GUIDELINES.md` §§4.3, 5, 9, 10, 13, `BUILD-SPEC-V2.md` §7, `ARCHITECTURE.md` §2 and §6, `BLOG-INGEST.md` |
| **Order of authority** | Unchanged from `SEO-GUIDELINES.md`: Build Spec v2, then Argument Spine, then Copy Framework, then SEO Guidelines. This document sits below all 4 and never overrides them |
| **Conflicts** | Flagged in section 16, never silently resolved |

Citation keys used throughout: **[CF §n]** Copy Framework · **[SEO §n]** SEO
Guidelines · **[SPEC §n]** Build Spec v2 · **[ARCH]** Architecture ·
**[INGEST]** Blog Ingest · **[SAMPLE]** the shipped example package at
`docs/sample-blog-video-marketing-for-contractors/`.

---

## 1. Purpose and scope

Covers every raster image, diagram, and video that appears on the public
site: page imagery, blog covers, Open Graph cards, client logos, team and
project photography, and embedded video.

Out of scope: the visual design system itself (colours, type, spacing), which
lives in `src/app/globals.css` and is not documented as prose anywhere.

**The governing principle is [CF §24]:**

> Do not rely only on stock photography and blocks of copy. Build visual
> explanations for: Brand + Performance, Create Demand / Capture Demand, the
> BrandFormance Flywheel, Five-Mile-Famous, Rented vs Owned Attention, the
> Customer Journey, Market Presence. **The visual design itself should help
> explain BrandFormance.**

---

## 2. When an image is appropriate

1. When it carries information the copy cannot, per the visual-explanation
   list in [CF §24].
2. When it is **evidence sitting next to a claim**. [SEO §9.5]: "Every major
   claim sits next to its evidence on the page (data, case study link,
   video)." [CF §27] lists the accepted proof types: client testimonials,
   video testimonials, case studies, before/after data, screenshots, maps,
   market-share evidence, client logos, speaking footage, podcast clips.
3. When it is a required social artifact, that is the Open Graph card
   [SEO §4.3].
4. When it is a video thumbnail [SPEC §7].

**Never** as decoration in place of argument. [CF §28] names the failure mode
directly: a page that could carry another agency's logo without substantially
changing has failed the positioning test [CF §30, Question 1].

---

## 3. When the visual should be typography, CSS, SVG, or a built diagram

1. **Above-the-fold text is always real text.** [SEO §5.6]: "The hero
   headline and supporting line are HTML text, never baked into images."
2. **Visual explanations need a text equivalent.** [SEO §5.7]: "Tables and
   visual explanations (Brand + Performance equation, the flywheel,
   before/after) always have an HTML text equivalent: real `<table>` elements
   or figure captions, so the content is crawlable and extractable. The
   diagrams carry the argument for humans; the text carries it for machines."
3. **Performance pressure favours built visuals.** [SEO §10.2] sets LCP under
   2.5s, INP under 200ms, CLS under 0.1 as release gates on mobile p75. An
   inline SVG or CSS diagram costs no image request and cannot shift layout.
4. **A concept with no authentic photograph available** should be built
   rather than fabricated. See section 4.

Not specified in existing documentation: a formal decision rule for choosing
between SVG, CSS, and raster. Use the constraints above.

---

## 4. Authenticity rules

### 4.1 The four principles

Established by project direction for this document, and consistent with the
doctrine cited beneath each:

1. **Existing authentic project assets are preferred where appropriate.**
2. **AI-generated imagery must never be used to fabricate real people,
   clients, client work, testimonials, case studies, statistics, results, or
   other factual evidence.**
3. **Conceptual visuals may be AI-generated** when consistent with the
   project guidelines.
4. **Final production assets are stored in the repository** per section 12.

Supporting doctrine already in force:

- [SEO §7] iron rule on structured data: "schema states only what is visibly
  true on the page. No invented ratings, no fake FAQs, nothing in schema that
  is not rendered content." An image is a claim in the same way.
- [SEO §9.2] "First-party evidence. Case studies use real numbers with
  starting context."
- [SEO §9.3] "Experience markers in copy. Named markets, real scenarios,
  specifics only an operator would know."
- [SPEC §7] production standards assume real filming of a real person in a
  real place: "JB office, professional but approachable. Medium shot, head
  and shoulders."
- [CF §28] the site must not become "a Jonathan Bannister fan site", which
  presumes the founder imagery that does exist is genuinely him.

### 4.2 Real photography required

Any image that a reasonable visitor would read as a record of something that
happened:

- Named people, including the founder, leadership, and staff
- The team, the office, the studio
- Client premises, client staff, client work, job sites
- Screenshots, dashboards, maps, and any before/after evidence [CF §27]
- Video testimonials and client conversations [SPEC §7, tier 3]

### 4.3 Synthetic imagery permitted

Non-representational visuals that assert no fact:

- Abstract renders of a concept (for example brand and performance
  converging)
- Texture, gradient, and motion backgrounds
- Illustrative diagrams with no claimed data

### 4.4 The separation rule

Factual proof and conceptual imagery must never be presented so a visitor
could mistake one for the other. A conceptual visual may not sit inside a
proof block, carry a client name, or imply a measured outcome. This follows
[SEO §9.5] proof proximity: if evidence sits next to a claim, then whatever
sits next to a claim reads as evidence.

### 4.5 Permissions

Client-identifying imagery inherits the unresolved naming decision.
[SPEC §15, Decision 1]: "Which of the six clients can be named publicly.
Owners: Ryan, JB." Until it resolves, follow the Argument Spine's documented
fallback: "At minimum assume market and outcome without company names."

Not specified in existing documentation: a model-release or client-consent
process for photography.

---

## 5. Visual direction and existing brand guidance

From [CF §24], the seven visual explanations to build, verbatim:

| Visual | What it must show |
|---|---|
| Brand + Performance | "Two systems combining" |
| Create Demand / Capture Demand | "Show both sides working simultaneously" |
| BrandFormance Flywheel | "Visualize the methodology" |
| Five-Mile-Famous | "Visualize local market saturation around the contractor's service area" |
| Rented vs Owned Attention | "Show the difference between purchasing individual leads and building a compounding brand asset" |
| Customer Journey | "Unaware → Exposed → Familiar → Trust → Search → Recognition → Choice → Customer → Advocate" |
| Market Presence | The homeowner encountering the contractor across Facebook, Instagram, YouTube, TikTok, Google, Streaming TV, Email, Search, Maps, AI platforms |

Constraints that bind image content as much as copy [SEO §1]:

- No banned phrases in any text rendered into an image
- Numerals rather than spelled-out numbers
- No price figures beyond the floor and the activation, and never in an image
- The words "Brand Score" never appear, including in alt text, file names,
  and metadata [SEO §1.4]
- BrandFormance carries ® on first prominent use per page, but **not** in
  title tags, URLs, or anchor text [SEO §1.8]

Colour and treatment, from the only worked example in the project
[SAMPLE image-prompt.txt]: "near-black charcoal, warm cream, muted amber,
small lime-green accent matching TopServ's live website."

Not specified in existing documentation: a written brand palette, type, or
logo-usage specification as prose. The live tokens are in
`src/app/globals.css`. See 5.1.

### 5.1 Brand colour alignment

> **Project requirement, supplied by the project owner.** This rule is **not**
> stated in Copy Framework, SEO Guidelines, Build Spec v2, or the Argument
> Spine. It is recorded here as a direct project requirement and is binding on
> that basis, not because a source document establishes it.

**All imagery used on the TopServ website must visually align with the TopServ
brand identity and brand colour system.**

> ### "Brand colors should influence the image, not necessarily dominate it."

Use the TopServ brand colours **naturally**, through composition, accents,
lighting, backgrounds, gradients, or colour grading. Images should feel
**unmistakably aligned with the TopServ brand while still looking realistic,
premium, and visually varied.**

**Do not force the entire image to use only the brand colours.**

That is the test to apply when judging any generated asset: influence, not
domination. An image that reads as a flat wash of `#9ed844` and `#0e7dc1` has
failed the requirement just as surely as one that ignores the palette.

For generated conceptual imagery in particular:

1. Visual treatment, lighting, accents, backgrounds, gradients, graphic
   elements, and overall palette should **harmonize** with the established
   TopServ brand colours.
2. **Do not use arbitrary colours that clash** with the brand identity.
3. Brand colours should **influence** the image **without making every image
   look artificially monochromatic.**
4. Use the existing brand and design documentation as the **authoritative
   source for the exact colours**. **Do not invent new brand colours.**
5. **Preserve readability, realism, and visual quality.** Brand alignment
   never justifies a degraded image.
6. **For photography**, achieve alignment through composition, lighting,
   environmental tones, grading, overlays, or restrained brand-colour accents,
   **rather than artificially recolouring the entire photograph.**

**Where the exact colours live.** No prose brand document exists in this
project (gap 5, section 16). The authoritative source is therefore the live
token block in `src/app/globals.css`, reproduced below as reference only.
These values are read from the codebase, not authored here:

| Token | Value | Documented role |
|---|---|---|
| `--brand` | `#9ed844` | Green. "accent/keyword/CTA role" |
| `--brand-hot` | `#b7e76a` | Lighter green |
| `--brand-deep` | `#7cb92f` | Deeper green |
| `--brand-blue` | `#0e7dc1` | Blue. "the companion tone" |
| `--brand-blue-hot` | `#3d9bd9` | Lighter blue |
| `--background` | `#0c0e12` | Near-black ground |
| `--card` | `#12151b` | Raised surface |
| `--surface-raised` | `#171c23` | Higher surface |
| `--foreground` | `#f4f5f2` | Off-white ink |
| `--ink-faint` | `#8a919c` | Muted ink, "≥5:1 on bg/card" |
| `--border` | `#242a33` | Hairline |

`globals.css` states the provenance directly: "Brand colors sampled from the
official logo: blue #0E7DC1 (TopServ), green #9ED844 (DIGITAL). Green =
accent/keyword/CTA role, blue = the companion tone." The theme is described
there as "dark cinematic, single committed theme."

If a prose brand specification is ever written, it supersedes this table and
this section should cite it instead.

⚠️ See conflict 5 in section 16: the one shipped image prompt in the project
specifies a warm amber and cream palette that does not correspond to any
brand token.

---

## 6. Image-generation prompt framework

The project has one shipped, working prompt [SAMPLE image-prompt.txt]. Its
nine fields are preserved exactly:

| Field | Purpose |
|---|---|
| **Use case** | e.g. `ads-marketing`, `precise-object-edit` |
| **Asset type** | What the asset is and its exact pixel composition |
| **Primary request** | One sentence naming the subject |
| **Scene/backdrop** | The literal scene |
| **Style/medium** | e.g. "High-end documentary brand photography, realistic skin and equipment, polished but not glossy stock photography" |
| **Composition/framing** | Placement, offset, negative space for responsive cropping |
| **Lighting/mood** | e.g. "Warm early-morning natural light, confident, trustworthy" |
| **Color palette** | Per section 5 **and section 5.1. Name the brand tokens the image should harmonize with, and state that they influence the image without making it monochromatic** |
| **Constraints** | Everything excluded. Include "no arbitrary colours that clash with the brand palette" per 5.1 |

The shipped constraint set, reusable verbatim: "Residential home services
only, accurate HVAC equipment, diverse adult professionals, safety-conscious
clothing, **no visible logos, no text, no watermark, no distorted hands or
equipment**, no construction site, no commercial high-rise."

The example also documents a **two-pass workflow**: generate a photographic
base, then run a `precise-object-edit` pass that adds branded treatment while
preserving the scene, with the constraint "Change only color treatment and
branded graphic framing. Preserve people, faces, hands, equipment, camera
perspective."

Note the "no text" constraint agrees with [SEO §5.6]: text belongs in HTML,
not baked into pixels.

---

## 7. Ratios and dimensions by use case

| Use case | Spec | Source |
|---|---|---|
| Open Graph / social card | 1200 x 630 | [SEO §4.3] |
| Blog cover | 2:1 displays best | [INGEST] |
| Video | 16 by 9 | [SPEC §7] |
| Touch targets (not an image spec) | 44 by 44 | [SPEC] |

**Everything else is Not specified in existing documentation**, including
hero imagery, team portraits, testimonial photos, project-update photos, and
in-article images. Where a ratio must be chosen, state it in the asset plan
rather than treating it as an established rule.

---

## 8. Delivery and optimisation

1. **Formats:** AVIF or WebP [SEO §10.2].
2. **Ingest pipeline behaviour** [ARCH §2, §6]: uploads accept PNG, JPEG,
   WebP, GIF at 10MB or smaller [INGEST]; files are recompressed to WebP and
   stored with immutable cache headers. External cover URLs are downloaded
   and re-hosted "so expiring source URLs never go stale", behind an SSRF
   guard. Animated GIFs are stored as-is.
3. **Covers** outside a 1.7 to 2.3 ratio are smart-cropped to 2:1 [ARCH §2].
4. **Storage:** public bucket `blog`, paths `covers/` and `uploads/`
   [ARCH §6].

Not specified in existing documentation: a maximum file size or dimension for
images committed to `public/`.

---

## 9. Next.js implementation requirements

From [SEO §10.2], enforced as Core Web Vitals release gates:

- `next/image` for every image, with **explicit width/height**, AVIF/WebP,
  and responsive `sizes`
- Hero image or poster `priority`-loaded and preloaded
- Lazy-load everything below the fold
- Zero layout shift from embeds: reserve aspect-ratio boxes
- Video embeds load as **facade thumbnails** that swap in the player on
  interaction, because "a raw Vimeo/Wistia iframe on load will blow the LCP
  budget on video-heavy pages"

⚠️ **Conflict, see section 16:** shipped code deliberately departs from
"`next/image` for every image" in 9 files.

---

## 10. Accessibility and alt text

From [SEO §10.4]:

- Alt text on **meaningful** images: descriptive, "primary keyword at most
  once per page"
- **Empty alt on decorative images**
- Focus states and semantic landmarks

From [SEO §4.3]: social image alt text "set via `twitter:image:alt`".

From [SEO §5.7]: diagrams and tables need an HTML text equivalent, real
`<table>` elements or figure captions.

From [SPEC §7] and [SEO §5.8]: every embedded video needs a text setup of 1
to 2 sentences, a transcript present in the DOM (not behind a fetch), and
VideoObject schema.

Worked alt-text example, house style [SAMPLE featured-image-alt.txt]:

> A video crew filming an HVAC technician beside an outdoor air-conditioning
> unit at a residential home

Plain, descriptive, no keyword stuffing, no "image of".

---

## 11. File naming

**Not specified in existing documentation.** No project document establishes
a naming convention.

Observed practice in `public/images/`, recorded here as description, not as a
rule: lowercase kebab-case; partner logos carry a `-sm` suffix for the
128px-tall variants; process screenshots are prefixed by step number; video
posters append the YouTube ID.

---

## 12. Directory and storage conventions

Two distinct stores, both already in use:

| Location | Holds | Source |
|---|---|---|
| `public/images/` | Repo-committed site imagery: `partners/`, `process/`, brand marks | Observed practice |
| `public/videos/` | Self-hosted portfolio and process video, posters | Observed practice |
| Supabase bucket `blog` | Runtime uploads: `covers/`, `uploads/` | [ARCH §6] |

**Production assets belong in the repository** per section 4.1, principle 4.
Runtime-uploaded content stays in the bucket.

Not specified in existing documentation: a per-page or per-route subdirectory
convention. Where a page needs its own assets, group them predictably and
state the path in the asset plan.

---

## 13. AI image-generation workflow

**Provider-neutral by requirement.** Use an approved image-generation tool
available to the developer. **The production site must never require an
image-generation provider at runtime.** Generated files are exported and
committed as ordinary static assets.

1. Confirm the visual is permitted synthetic content under section 4.
2. Confirm no authentic asset already exists (section 4.1, principle 1).
3. **Read the brand tokens from `src/app/globals.css`** and decide which
   should carry the image (section 5.1). Never invent a colour.
4. Write the prompt using the nine fields in section 6, with the Color
   palette and Constraints fields carrying the 5.1 requirement explicitly.
5. Generate, then run the edit pass if branded treatment is needed. For
   photography, prefer grading, lighting, and restrained accents over
   recolouring the whole frame (5.1, rule 6).
6. **Brand-alignment review before the asset is considered production ready.**
   Check all 5:
   - Does the palette harmonize with the brand tokens?
   - Is any colour present that clashes with the brand identity?
   - Do the brand colours **influence** the image rather than **dominate**
     it? A flat wash of brand colour fails, as does ignoring the palette.
   - Does it still look realistic, premium, and visually varied?
   - Are readability, realism, and visual quality intact?
   Fail on any of these and the asset is not production ready. Regenerate or
   re-grade rather than shipping it.
7. Export at the ratio from section 7, convert per section 8.
8. Write alt text per section 10.
9. Commit to the directory in section 12.
10. Run the checklist in section 15.

Note: the blog pipeline's optional `generateCover` [INGEST] is a separate,
server-side convenience for blog covers only. It does not make the rendered
site dependent on a provider.

---

## 14. Replacing temporary or generated assets

Where a real asset is required (section 4.2) but unavailable, the section
ships without it rather than with a fabricated substitute. Typography, CSS,
or a built diagram carries the slot in the meantime (section 3).

A placeholder must:

1. Never imply it depicts something real
2. Hold the final ratio and position so replacement needs no layout change
3. Be recorded in an asset plan naming purpose, ratio, type, filename, and
   alt text

Precedent [ARCH §1]: `src/components/sections/video-slot.tsx` "holds the
exact position, ratio, and framing ('in production' label) so the video team
can drop in embeds without layout work."

On replacement: swap the file, keep the path, re-check alt text, re-run
section 15.

---

## 15. QA checklist

Drawn from [SEO §13], image and media items only:

- [ ] Images through `next/image` with alt text; hero prioritised; embeds
      faceted or lazy
- [ ] CWV budgets pass on mobile emulation: LCP under 2.5s, INP under 200ms,
      CLS under 0.1
- [ ] Alt text descriptive on meaningful images, empty on decorative
- [ ] OG/Twitter tags complete with branded image
- [ ] Schema matches visible content; no review or rating markup on
      self-published proof
- [ ] Video: VideoObject + transcript in DOM + text setup + custom thumbnail
      + no autoplay
- [ ] Full content present with JS disabled
- [ ] No em dashes, no banned phrases, no prices, no "Brand Score" in any
      alt text, caption, or file name
- [ ] Nothing synthetic is presented as factual evidence (section 4)

**Brand-colour alignment, required before an image is production ready
(section 5.1, project requirement):**

- [ ] Palette harmonizes with the brand tokens in `src/app/globals.css`
- [ ] No arbitrary colours that clash with the brand identity
- [ ] Brand colours **influence** the image rather than **dominate** it. Not a
      flat wash of brand colour, not an image that ignores the palette
- [ ] Still looks realistic, premium, and visually varied
- [ ] The whole image is not forced into brand colours only
- [ ] No invented brand colours
- [ ] Readability, realism, and visual quality preserved
- [ ] Photography aligned through composition, lighting, environmental tones,
      grading, overlays, or restrained accents, not by recolouring the whole
      photograph

---

## 16. Sources, gaps, and conflicts

### Sources

| Document | Sections used |
|---|---|
| `COPY-FRAMEWORK.md` | §23 signature language, §24 visual direction, §27 trust and proof, §28 what the site must never become, §30 positioning test |
| `SEO-GUIDELINES.md` | §1 brand constraints, §4.3 OG and social, §5 heading and content architecture, §7 structured data, §9 E-E-A-T, §10 technical, §13 QA checklist |
| `BUILD-SPEC-V2.md` | §7 video production, §15 open decisions |
| `ARGUMENT-SPINE.md` | Page 8, client-naming fallback |
| `ARCHITECTURE.md` | §1 video slots, §2 cover handling, §6 storage |
| `BLOG-INGEST.md` | Cover and upload specs |
| `docs/sample-blog-video-marketing-for-contractors/` | `image-prompt.txt`, `featured-image-alt.txt`, `README.md` |

### Gaps: not specified in existing documentation

1. Aspect ratios for anything other than OG (1200x630), blog cover (2:1), and
   video (16:9)
2. File naming conventions
3. Per-page or per-route asset directory conventions
4. Maximum file size or dimensions for images committed to `public/`
5. A written brand palette, type, or logo-usage specification **as prose**.
   Section 5.1 is a project requirement to align imagery to brand colour, and
   it points at `src/app/globals.css` because that is the only authoritative
   source of the values. A prose brand document would supersede it
6. Model release or client photography consent process
7. Any rule governing AI-generated imagery. Section 4 is established by
   project direction for this document and grounded in adjacent doctrine,
   not lifted from an existing image rule
8. Any rule requiring imagery to match brand colour. Section 5.1 is a project
   requirement supplied by the project owner, not a source-document rule

### Conflicts, flagged rather than resolved

1. **"`next/image` for every image" [SEO §10.2] vs shipped code.** 9 files
   use a plain `<img>` behind an eslint disable, several with a documented
   reason. `partner-marquee.tsx`: "next/image lazy-loads and resizes, both of
   which break the seamless loop." Others: `content-slot.tsx`,
   `process-timeline.tsx`, `process-flythrough.tsx`, `blog/page.tsx`,
   `blog/[slug]/page.tsx`, and 3 admin files. Either the rule needs an
   exception clause or the code needs changing. Owner: Shaw with Alejandro.

2. **"Full content present with JS disabled" [SEO §10.1, §13] vs shipped
   animation.** Framer initial states serialise as `opacity:0`, so animated
   content, including images inside animated wrappers, is invisible without
   JS. Present site-wide via `Reveal`. Pre-existing, not introduced by any
   single page.

3. **`twitter:image:alt` [SEO §4.3] is not implemented.** No occurrence in
   the codebase. Either implement or amend the rule.

4. **OG image source.** [SEO §4.3] requires images "generated from a
   consistent branded template (Shaw's design system)". The site generates
   them at `/api/og`. Whether that route constitutes the referenced design
   system is unconfirmed.

5. **The shipped image prompt's palette does not match the brand tokens.**
   [SAMPLE image-prompt.txt] specifies "Charcoal, warm amber, cream,
   restrained blue accents" and, in the edit pass, "near-black charcoal, warm
   cream, muted amber, small lime-green accent matching TopServ's live
   website." Charcoal, blue, and lime-green map to `--background`,
   `--brand-blue`, and `--brand`, but **warm amber and cream correspond to no
   brand token**. Under section 5.1 that prompt would need amending. Flagged
   rather than resolved: the prompt is a shipped, working artifact and the
   amber may be a deliberate photographic warmth choice rather than a brand
   colour claim. Owner: Shaw with Ryan.

6. **Conversion loss, informational** [CONVERSION-NOTES]: diagrams in the
   converted Copy Framework existed as drawn page graphics and did not
   survive conversion to Markdown. Only their text labels remain, so §24's
   seven visuals are described in words but have no reference artwork in the
   repo.

---

*This document consolidates existing rules. It does not create them. Where it
and a source document disagree, the source document governs and the conflict
is raised, not silently resolved.*
