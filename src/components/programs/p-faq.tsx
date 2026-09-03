"use client";

import { useId, useState } from "react";
import { OVERVIEW_FAQS } from "@/components/programs/p-faq-data";
import { Eyebrow, Shell } from "@/components/programs/p-grid";

/**
 * The embedded FAQ. Build Spec v2 section 4 requires one on this page, and
 * SEO Guidelines 7.2 assigns FAQPage schema where a Programs page carries
 * one.
 *
 * Same disclosure mechanics as the other test pages: a real button with
 * aria-expanded and aria-controls, a labelled region, a grid-template-rows
 * 0fr to 1fr height transition so nothing is measured in JS, and `inert`
 * when collapsed so the answer stays in the HTML for extraction while
 * leaving the tab order. Reduced motion drops the transitions.
 */
const CSS = `
.pf-panel { transition: grid-template-rows 420ms cubic-bezier(0.22, 1, 0.36, 1); }
.pf-card  { transition: border-color 260ms ease, background-color 260ms ease; }
.pf-tile  { transition: background-color 260ms ease, color 260ms ease; }
.pf-tick  { transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1); }
@media (prefers-reduced-motion: reduce) {
  .pf-panel, .pf-card, .pf-tile, .pf-tick { transition: none; }
}
`;

function Row({
  q,
  a,
  i,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  i: number;
  open: boolean;
  onToggle: () => void;
}) {
  const uid = useId();
  const btnId = `pf-b-${uid}`;
  const panelId = `pf-p-${uid}`;

  return (
    <div
      className={`pf-card overflow-hidden rounded-[16px] border ${
        open
          ? "border-brand/35 bg-[linear-gradient(160deg,rgba(158,216,68,0.07),rgba(13,16,21,0.72)_62%)]"
          : "border-[#2b323c] bg-[#0d1015]"
      }`}
    >
      <h3>
        <button
          type="button"
          id={btnId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 p-4 text-left focus-visible:rounded-[16px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 md:p-5"
        >
          <span className="flex items-center gap-4 md:gap-5">
            <span
              aria-hidden
              className={`pf-tile flex size-10 shrink-0 items-center justify-center rounded-[10px] font-mono text-[0.75rem] tracking-[0.06em] md:size-11 ${
                open
                  ? "bg-brand text-[#0c0e12]"
                  : "bg-[rgba(158,216,68,0.26)] text-[rgba(244,245,242,0.72)]"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`text-[1rem] font-semibold leading-snug tracking-[-0.01em] md:text-[1.125rem] ${
                open ? "text-brand" : "text-foreground group-hover:text-brand"
              }`}
            >
              {q}
            </span>
          </span>
          <span
            aria-hidden
            className={`relative block size-4 shrink-0 ${open ? "text-brand" : "text-ink-faint"}`}
          >
            <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
            <span
              className={`pf-tick absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current ${
                open ? "scale-y-0" : "scale-y-100"
              }`}
            />
          </span>
        </button>
      </h3>

      <div className={`pf-panel grid ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            inert={!open}
            className="px-4 pb-5 md:px-5 md:pb-6 md:pl-[calc(2.75rem+1.25rem+1.25rem)]"
          >
            <p className="max-w-[72ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
              {a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section aria-labelledby="p-faq-heading" className="border-b border-border bg-background">
      <style>{CSS}</style>
      <Shell className="py-16 md:py-20">
        {/* Heading on top, questions beneath. A lone heading in a short
            column beside a tall stack left the section looking unbalanced. */}
        <div className="max-w-[46rem]">
          <Eyebrow>Before you ask</Eyebrow>
          <h2
            id="p-faq-heading"
            className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
          >
            The 5 we get every time.
          </h2>
        </div>

        <div className="mt-10 grid gap-3">
          {OVERVIEW_FAQS.map((f, i) => (
            <Row
              key={f.question}
              q={f.question}
              a={f.answer}
              i={i}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </Shell>
    </section>
  );
}
