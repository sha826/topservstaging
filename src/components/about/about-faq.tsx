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
 * v7 moved the rows into the card language the rest of the page now uses:
 * each question is its own surface with a numeral tile, and opening one lights
 * it in brand green rather than leaving a flat hairline list. The disclosure
 * mechanics and the accessibility contract below are unchanged.
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
    <div
      className={`faq-row overflow-hidden rounded-[16px] border ${
        open
          ? "border-brand/35 bg-[linear-gradient(160deg,rgba(158,216,68,0.08),rgba(13,16,21,0.7)_62%)]"
          : "border-[#2b323c] bg-[#0d1015]"
      }`}
    >
      <h3>
        <button
          type="button"
          id={btnId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-center justify-between gap-6 p-4 text-left focus-visible:rounded-[16px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 md:gap-8 md:p-5"
        >
          <span className="flex items-center gap-4 md:gap-5">
            <span
              aria-hidden
              className={`faq-tile flex size-11 shrink-0 items-center justify-center rounded-[11px] font-mono text-[0.8125rem] tracking-[0.06em] md:size-12 ${
                open
                  ? "bg-brand text-[#0c0e12]"
                  : "bg-[rgba(158,216,68,0.26)] text-[rgba(244,245,242,0.72)] group-hover:bg-[rgba(158,216,68,0.4)]"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={`text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em] transition-colors md:text-[1.25rem] ${
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
            className="px-4 pb-5 md:px-5 md:pb-6 md:pl-[calc(3rem+1.25rem+1.25rem)]"
          >
            <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
              {a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutFaq() {
  return (
    <Shell className="pt-20 md:pt-28">
      <style>{`
.faq-panel { transition: grid-template-rows 420ms cubic-bezier(0.22, 1, 0.36, 1); }
.faq-tick  { transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1); }
.faq-row   { transition: border-color 260ms ease, background-color 260ms ease; }
.faq-tile  { transition: background-color 260ms ease, color 260ms ease; }
@media (prefers-reduced-motion: reduce) {
  .faq-panel, .faq-tick, .faq-row, .faq-tile { transition: none; }
}
      `}</style>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,32fr)_minmax(0,68fr)] lg:gap-16">
        <div>
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
        </div>

        <div className="grid gap-3">
          {ABOUT_FAQS.map((f, i) => (
            <Row key={f.question} q={f.question} a={f.answer} index={i} />
          ))}
        </div>
      </div>
    </Shell>
  );
}
