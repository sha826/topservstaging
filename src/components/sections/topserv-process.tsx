"use client";

import { Fragment, useRef } from "react";
import { useInView } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { VideoJsonLd } from "@/components/seo/json-ld";
import { VimeoCard } from "@/components/video/vimeo-card";
import { ProcessFlythrough } from "@/components/sections/process-flythrough";
import { cn } from "@/lib/utils";

const SALES_LETTER_ID = "1060921948";
const SALES_LETTER_POSTER =
  "https://i.vimeocdn.com/video/1987555541-b82b3c0b360c552591515cccf01836f5c64bcb7eb9444dd0aca43dc81b54aa13-d_1280?region=us";

// The original site's process paragraph, verbatim. The seven step phrases
// alternate green/blue and ignite in reading order (design-lab H2).
type Segment = { t: string; hl?: "g" | "b" };
const SEGMENTS: Segment[] = [
  { t: "At TopServ Digital, we follow a strategic 7-step process to drive success. We start with a " },
  { t: "GBP & Website Audit", hl: "g" },
  { t: " to assess your online presence, then " },
  { t: "Lay the Right Foundation", hl: "b" },
  { t: " by optimizing key assets. Next, it’s " },
  { t: "Lights, Camera, Action", hl: "g" },
  { t: ", where we implement targeted strategies to boost visibility. We " },
  { t: "Build Funnels to Get Omnipresent & Hyper-Focused", hl: "b" },
  { t: ", ensuring seamless customer engagement. With a " },
  { t: "Large Roadmap", hl: "g" },
  { t: ", we set clear milestones, followed by " },
  { t: "Map and Planning", hl: "b" },
  { t: " to execute data-driven campaigns. Finally, we " },
  { t: "Track - Learn - Dominate", hl: "g" },
  { t: ", continuously refining strategies to stay ahead of the competition." },
];

// Precompute each highlight's ignition order for its transition delay.
let hlCounter = 0;
const SEGMENTS_WITH_ORDER = SEGMENTS.map((s) =>
  s.hl ? { ...s, order: hlCounter++ } : { ...s, order: -1 }
);

export function TopServProcess() {
  const proseRef = useRef<HTMLParagraphElement>(null);
  const inView = useInView(proseRef, { once: true, amount: 0.45 });

  return (
    <section
      aria-labelledby="process-heading"
      className="relative overflow-hidden border-b border-border"
    >
      <div aria-hidden className="grid-drift pointer-events-none absolute inset-0" />
      <VideoJsonLd
        name="TopServ Digital Sales Letter Video"
        description="TopServ Digital's founder walks through the agency's strategic 7-step process for growing home service companies."
        thumbnailUrl={SALES_LETTER_POSTER}
        embedUrl={`https://player.vimeo.com/video/${SALES_LETTER_ID}`}
        duration="PT2M43S"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24 lg:pb-6">
        <Reveal>
          <p className="label-mono text-brand">The process</p>
          <h2 id="process-heading" className="display mt-3 text-4xl md:text-5xl">
            TopServ Process<span className="text-brand">.</span>
          </h2>
          <p
            ref={proseRef}
            className={cn(
              "mt-5 max-w-xl text-base leading-[1.75] text-muted-foreground",
              inView && "lit"
            )}
          >
            {SEGMENTS_WITH_ORDER.map((seg, i) =>
              seg.hl ? (
                <span
                  key={i}
                  className={cn(
                    "process-hl",
                    seg.hl === "g" ? "process-hl-g" : "process-hl-b"
                  )}
                  style={{ transitionDelay: `${(seg.order * 0.35 + 0.1).toFixed(2)}s` }}
                >
                  {seg.t}
                </span>
              ) : (
                <Fragment key={i}>{seg.t}</Fragment>
              )
            )}
          </p>
        </Reveal>

        {/* Mobile / tablet: the standard click-to-play card. */}
        <Reveal delay={0.15} className="lg:hidden">
          <div className="mt-10 max-w-2xl">
            <VimeoCard
              vimeoId={SALES_LETTER_ID}
              poster={SALES_LETTER_POSTER}
              title="TopServ Digital Sales Letter Video"
            />
          </div>
        </Reveal>
      </div>

      {/* Desktop: scroll-scrubbed flythrough that lands on the film. */}
      <ProcessFlythrough />
    </section>
  );
}
