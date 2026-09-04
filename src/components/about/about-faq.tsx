"use client";

import { useId, useState } from "react";
import { ABOUT_FAQS } from "@/components/about/faq-data";
import { Shell } from "@/components/about/page-grid";

/**
 * The Q&A layer, rebuilt in v4 as a real accordion.
 *
 * v3 rendered the answers open as a definition list, which read as an SEO
 * block bolted to the bottom rather than as part of the design system. This
 * is a proper disclosure interaction: clean full width rows on hairlines,
 * large question typography, a plus that becomes a minus, and a height
 * transition driven by grid-template-rows 0fr to 1fr so nothing has to be
 * measured in JS.
 *
 * Accessibility. Each question is a real <button> with aria-expanded and
 * aria-controls, so keyboard and screen reader behaviour is native. The panel
 * is a labelled region. When collapsed it carries `inert`, which removes it
 * from the tab order and the accessibility tree while leaving the answer text
 * in the HTML, so crawlers and AI extraction still read it (SEO Guidelines
 * 8.1 and 8.3). Reduced motion drops the transition and the rotation.
 *
 * v8 fixes what v7 got wrong. v7 gave every question a permanent border and
 * its own raised surface, which turned 5 short questions into 5 tall outlined
 * boxes sitting mostly empty, on a 16px radius nothing else on the site uses.
 * Against `principles.tsx` directly above it, which is the page's actual row
 * language (14px radius, no persistent chrome, numeral tile, display heading,
 * a hairline between rows), the accordion read as a component borrowed from
 * another site. The rows now match that language exactly: no border at rest,
 * a hairline separator, and brand green arriving only as the OPEN state, so
 * the tint means something instead of decorating every row equally.
 *
 * The disclosure mechanics and the accessibility contract below are unchanged.
 *
 * The tile size is a custom property rather than a literal, because the
 * answer's indent has to stay aligned to the question above it. v7 hardcoded
 * that indent as calc(3rem + 1.25rem + 1.25rem), which silently desynced the
 * moment the tile changed size.
 *
 * Content lives in faq-data.ts so the server page can emit FAQPage schema
 * from the same source; see the note in that file.
 */

function Row({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const uid = useId();
  const btnId = `faq-b-${uid}`;
  const panelId = `faq-p-${uid}`;

  return (
    <div className="faq-row">
      <div
        className={`faq-surface overflow-hidden rounded-[14px] ${
          open
            ? "bg-[linear-gradient(160deg,rgba(158,216,68,0.07),rgba(158,216,68,0)_58%)]"
            : "bg-transparent"
        }`}
      >
        <h3>
          <button
            type="button"
            id={btnId}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className="group flex w-full items-center justify-between gap-5 p-3 text-left focus-visible:rounded-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 lg:gap-6 lg:p-3.5"
          >
            <span className="flex items-center gap-[var(--faq-gap)]">
              <span
                aria-hidden
                className={`faq-tile flex size-[var(--faq-tile)] shrink-0 items-center justify-center rounded-[12px] font-mono text-[clamp(0.875rem,1.05vw,1.1rem)] tracking-[0.06em] ${
                  open
                    ? "bg-brand text-[#0c0e12]"
                    : "bg-[rgba(158,216,68,0.26)] text-[rgba(244,245,242,0.55)] group-hover:bg-[rgba(158,216,68,0.4)]"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={`display text-[clamp(1.05rem,1.4vw,1.5rem)] uppercase leading-[1.04] transition-colors ${
                  open ? "text-brand" : "text-foreground group-hover:text-brand"
                }`}
              >
                {q}
              </span>
            </span>

            {/* Plus that becomes a minus. Decorative: state is on the button. */}
            <span
              aria-hidden
              className={`relative block size-4 shrink-0 ${open ? "text-brand" : "text-ink-faint"}`}
            >
              <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
              <span
                className={`faq-tick absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current ${
                  open ? "scale-y-0" : "scale-y-100"
                }`}
              />
            </span>
          </button>
        </h3>

        {/* grid-template-rows 0fr to 1fr: animates height with no JS measuring.
            `inert` when collapsed keeps the text in the HTML for extraction
            while removing it from the tab order and the a11y tree. */}
        <div
          data-faq-panel
          className={`faq-panel grid ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="overflow-hidden">
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!open}
              className="faq-answer px-3 pb-4 lg:px-3.5 lg:pb-5"
            >
              <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
                {a}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Same hairline the principles rows use, so the 2 sections read as 1
          system rather than as a list and a stack of boxes. */}
      <span aria-hidden className="mt-1 block h-px w-full bg-[rgba(244,245,242,0.09)]" />
    </div>
  );
}

export function AboutFaq() {
  return (
    <Shell className="pt-20 md:pt-28">
      <style>{`
/* One source for the tile size, so the answer stays aligned under the
   question no matter how the tile is sized. Matches the principles row. */
.faq-row     { --faq-tile: clamp(3rem, 4vw, 3.75rem); --faq-gap: 1rem; }
/* Phones read the answer full width: a 4.75rem indent costs a third of the
   measure on a 390px screen. The alignment only starts paying off at md. */
.faq-answer  { padding-left: 0.75rem; }
@media (min-width: 768px) {
  .faq-answer { padding-left: calc(var(--faq-tile) + var(--faq-gap) + 0.75rem); }
}
@media (min-width: 1024px) {
  .faq-row   { --faq-gap: 1.25rem; }
  .faq-answer { padding-left: calc(var(--faq-tile) + var(--faq-gap) + 0.875rem); }
}
.faq-panel   { transition: grid-template-rows 420ms cubic-bezier(0.22, 1, 0.36, 1); }
.faq-tick    { transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1); }
.faq-surface { transition: background 260ms ease; }
.faq-tile    { transition: background-color 260ms ease, color 260ms ease; }
@media (prefers-reduced-motion: reduce) {
  .faq-panel, .faq-tick, .faq-surface, .faq-tile { transition: none; }
}
      `}</style>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,32fr)_minmax(0,68fr)] lg:gap-16">
        {/* Sticky: the answers run several screens on a phone-width column,
            and a fixed heading left a column of dead black beside them. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="label-mono flex items-center gap-2.5 text-[rgba(244,245,242,0.85)]">
            <span aria-hidden className="block size-2 rounded-full bg-brand" />
            Questions
          </p>
          <h2
            id="faq-heading"
            className="display mt-5 text-[clamp(1.9rem,3.6vw,3rem)] leading-[0.98]"
          >
            Before you call.
          </h2>
          <p className="mt-5 max-w-[30ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
            The ones that come up first, answered before anyone has to ask
            them.
          </p>
        </div>

        <div>
          {ABOUT_FAQS.map((f, i) => (
            <Row key={f.question} q={f.question} a={f.answer} index={i} />
          ))}
        </div>
      </div>
    </Shell>
  );
}
