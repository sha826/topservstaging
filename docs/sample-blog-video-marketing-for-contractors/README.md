# Agency Titan sample content package

This folder is a portable test fixture for publishing a blog article from Agency Titan to the TopServ Digital website.

## Recommended ingestion order

1. Read `content.json` as the manifest.
2. Load the HTML fragment named by `content.file`.
3. Upload `featured-image.webp` to the manifest's `featuredImage.publicPath` or replace that path with the final media URL.
4. Generate the page title, meta description, canonical, Open Graph, and Twitter metadata from `content.json`.
5. Generate JSON-LD from the normalized content record.
6. Compare the output with `schema.expected.json`.
7. Reject publication if a referenced file is missing, the slug already exists, the canonical host is invalid, or required metadata is blank.

## File roles

- `content.json`: transport manifest and normalized metadata
- `article.html`: branded, standalone visual preview with the TopServ article template applied
- `article-body.html`: semantic ingestion fragment only; no document shell, scripts, styles, navigation, header, or footer
- `featured-image.webp`: final branded 1200 by 630 featured and social-sharing image
- `featured-image.png`: lossless 1200 by 630 master of the branded featured image
- `featured-image-unbranded.webp`: retained clean photographic source
- `featured-image-cover-base.png`: AI-edited photographic base used for the branded cover
- `cover-art.html`: exact, editable HTML composition used to render the branded featured image
- `topserv-logo.webp`: TopServ logo used by the branded preview and featured image
- `assets/fonts/`: local copies of the TopServ display, body, and label fonts used by the previews
- `featured-image-alt.txt`: plain-text fallback for systems that ingest image metadata separately
- `image-prompt.txt`: prompts used to create and art-direct the featured image with the built-in image generator
- `schema.expected.json`: expected structured-data fixture for validation; the site should generate final JSON-LD
- `keyword-research.md`: Semrush topic-selection record

## Important implementation notes

- Sanitize the HTML at ingestion even when Agency Titan is trusted.
- Preserve heading hierarchy, table semantics, ordered and unordered lists, and internal links.
- Ingest `article-body.html`, not the standalone `article.html` preview. The website's article template should own production presentation.
- Resolve relative links against `https://topservdigital.com`.
- The `/brandformance` and `/brand-score` links are planned phase-one destinations from the website build specification. Validate their availability before publishing.
- Treat the manifest's date as editorial input. The publishing system should retain the first publication date and update only `modified` on later revisions.
- The production page template should create the visible article header. `article-body.html` begins with the article body to avoid duplicating the title, excerpt, byline, date, and featured image.

## Acceptance checks

- One visible H1, supplied by the page template
- No H1 inside `article-body.html`
- Canonical URL matches the production domain and slug
- Featured image resolves at 1200 by 630
- Article, BreadcrumbList, and FAQPage JSON-LD parse successfully
- FAQ schema answers match the visible FAQ text
- `article-body.html` contains no inline styles, scripts, iframes, tracking tags, or external assets
- Internal links resolve or are explicitly held until the target page launches
