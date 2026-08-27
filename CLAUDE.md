@AGENTS.md

# TopServ Digital website

This site sells a methodology, BrandFormance, not a list of services. Every
page teaches it and every path leads to the Brand Assessment.

## Documentation router

Open the file before doing the work. Do not work from memory of these rules,
and do not run fresh keyword research per page.

| Work | Read first |
|---|---|
| Building or editing ANY public-facing page | `docs/SEO-GUIDELINES.md`, then that page's entry in `docs/KEYWORD-RESEARCH.md` |
| What a page must argue, and in what order | `docs/ARGUMENT-SPINE.md` |
| Voice, signature language, banned phrases | `docs/COPY-FRAMEWORK.md` |
| Scope, page specs, pricing and assessment doctrine | `docs/BUILD-SPEC-V2.md` |
| Code architecture and systems map | `docs/ARCHITECTURE.md` |
| Status, ownership, open decisions | `docs/HANDOFF.md` |
| Blog ingest, MCP, Content Studio | `BLOG-INGEST.md`, `docs/BLOG-WORKFLOW.md` |
| Admin content types and slots | `docs/ADMIN-CONTENT.md` |
| Domain cutover and launch | `LAUNCH.md` |

`docs/SEO-GUIDELINES.md` is standing instructions for every public-facing
page, every time, including its section 13 pre-publish checklist. It does not
expire at launch.

Order of authority when documents disagree: Build Spec v2, then Argument
Spine, then Copy Framework, then SEO Guidelines. Raise a conflict, never
silently resolve it. `docs/CONVERSION-NOTES.md` records how the converted
documents were produced and what they cannot represent.

## Non-negotiables

These bind titles, meta descriptions, headings, alt text, schema and body
copy alike:

- No price table. The only public numbers are the $1,000 per week floor and
  the $10,000 one time activation. Never a monthly figure, never an annual one.
- The public assessment returns a GRADE, never a number. "Brand Score" never
  appears publicly. Score components and weights stay internal.
- Brand frequency is fixed at 3 times weekly. A larger program buys more
  geography at the same frequency, never more frequency.
- No em dashes anywhere. Numerals rather than spelled out numbers.
- One primary keyword per page, never assigned to a second page.
- Capabilities such as SEO and PPC are never a page's opening frame.

## Open conflict, do not silently fix

The current Build Spec v2 names the 4 grades No Brand Equity, Name
Recognition, Household Name, Negative Brand Equity, and says to use those
labels verbatim. `src/lib/bf-content.ts` still carries "Unknown" and
"Negative Equity" from the older revision. See `docs/CONVERSION-NOTES.md`.
Raise it with Ryan and Alejandro before changing code.
