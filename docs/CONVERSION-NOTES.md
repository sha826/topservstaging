# Conversion notes

How the converted guideline documents in `docs/` were produced, and what
they cannot represent. Read this before treating a converted file as
byte-authoritative.

## What is verbatim and what is converted

| File | Source | Method |
|---|---|---|
| `KEYWORD-RESEARCH.md` | `TopServ_Keyword_Research_Master.md` | Verbatim copy, byte identical |
| `SEO-GUIDELINES.md` | `TopServ_SEO_Guidelines.md` | Verbatim copy, byte identical |
| `BUILD-SPEC-V2.md` | `sources/TSD_Website_Build_Specification_v2_2026-08-26.docx` | Converted from DOCX XML |
| `ARGUMENT-SPINE.md` | `sources/TSD_Website_Argument_Spine.docx` | Converted from DOCX XML |
| `COPY-FRAMEWORK.md` | `sources/TopServ Digital ... Copy Framework.pdf` | Converted from PDF text |

Originals are unchanged and kept in `docs/sources/`. The two pre-existing
`.docx` files at the top of `docs/` were left exactly as they were.

## Text fidelity, verified

Every converted file was checked word by word against its source. All three
match exactly, with no words dropped and none introduced:

| File | Source words | Markdown words | Difference |
|---|---|---|---|
| `BUILD-SPEC-V2.md` | 5127 | 5127 | 0 |
| `ARGUMENT-SPINE.md` | 2688 | 2688 | 0 |
| `COPY-FRAMEWORK.md` | 2977 | 2977 | 0 |

## IMPORTANT: two different files are named "Build Specification v2"

They are not duplicates. They are different revisions:

- `docs/TSD_Website_Build_Specification_v2.docx`, dated August 18 2026, the
  copy that was already in the repo.
- `docs/sources/TSD_Website_Build_Specification_v2_2026-08-26.docx`, dated
  August 26 2026, newer, and the one `BUILD-SPEC-V2.md` was converted from.
  It arrived in the same batch as the SEO Guidelines and the Keyword
  Research, and the SEO Guidelines agree with it.

The revisions differ in section 5, on the four brand grades. The newer one
renames 2 of the 4 and adds the instruction to use JB's labels verbatim:

| August 18 revision | August 26 revision (current) |
|---|---|
| Unknown | No Brand Equity |
| Name Recognition | Name Recognition |
| Household Name | Household Name |
| Negative Equity | Negative Brand Equity |

`src/lib/bf-content.ts` still carries the older labels. That is a real
conflict between the current spec and the running code. It has not been
changed. Raise it with Ryan and Alejandro rather than silently resolving it,
per the rule in `SEO-GUIDELINES.md` section 0.

## What the conversion cannot carry

Both DOCX files use direct visual formatting and carry no Word heading
styles, so heading level was derived from font size and verified against the
resulting outline. The PDF encodes text as glyph IDs (`Identity-H` subset
fonts) and was decoded through each font's ToUnicode CMap.

Known losses, all of them layout rather than content:

1. **Side-by-side comparisons become sequential.** In the Copy Framework the
   "BEFORE BRANDFORMANCE" and "AFTER BRANDFORMANCE" columns sat next to each
   other. In Markdown they run one after the other. Every item survives, but
   the visual pairing does not. The same applies to "Traditional Model" vs
   "BrandFormance Model" and to "Rented Attention" vs "Owned Brand Equity".
2. **Diagrams and drawn shapes are gone.** The flywheel, the positioning
   pyramid, arrows and connectors were drawn as page graphics. Only their
   text labels survive. The PDF has no embedded raster images, so nothing
   else was dropped.
3. **Display type and section headings share a size in the PDF**, so
   pull-quote headlines such as "Stop Chasing Leads. Start Building a Brand
   Customers Choose." render as `###` and appear in the outline alongside
   real subsections.
4. **One inline bullet list runs into the following paragraph.** In section
   "Purpose of This Document", the last list item reads "Conversion strategy"
   followed immediately by the next paragraph's text, because the PDF set
   them on a single line. No words were lost; the break is in the wrong place.
5. **Word callout boxes became blockquotes.** Single-cell layout boxes are
   not tabular data, so they render as `>` quotes rather than 1 cell tables.
6. **Tables with no header row** get an empty Markdown header, because GFM
   requires a header row and promoting the first data row would misrepresent it.
7. **Uniformly bold tables lost the bold.** Where every cell in a Word table
   was bold, the bold carried no emphasis contrast and was dropped for
   readability. Mixed-emphasis tables kept their formatting.

Page numbers, headers, footers, and the PDF's colour and typographic design
are not represented in any of the converted files.
