"use client";

import { Reveal } from "@/components/motion/reveal";
import { VideoJsonLd } from "@/components/seo/json-ld";
import { VimeoCard } from "@/components/video/vimeo-card";
import { ProcessFlythrough } from "@/components/sections/process-flythrough";
import { ProcessIntro } from "@/components/sections/process-intro";

const SALES_LETTER_ID = "1060921948";
const SALES_LETTER_POSTER =
  "https://i.vimeocdn.com/video/1987555541-b82b3c0b360c552591515cccf01836f5c64bcb7eb9444dd0aca43dc81b54aa13-d_1280?region=us";

export function TopServProcess() {
  return (
    // NOTE: no overflow-hidden on this section — it would kill the sticky
    // pin inside ProcessFlythrough. The backdrop is contained per-layout.
    <section aria-labelledby="process-heading" className="relative border-b border-border">
      <VideoJsonLd
        name="TopServ Digital Sales Letter Video"
        description="TopServ Digital's founder walks through the agency's strategic 7-step process for growing home service companies."
        thumbnailUrl={SALES_LETTER_POSTER}
        embedUrl={`https://player.vimeo.com/video/${SALES_LETTER_ID}`}
        duration="PT2M43S"
      />

      {/* Mobile / tablet: static composition, no pin. */}
      <div className="relative overflow-hidden lg:hidden">
        <div aria-hidden className="grid-drift pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <ProcessIntro headingId="process-heading" />
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 max-w-2xl">
              <VimeoCard
                vimeoId={SALES_LETTER_ID}
                poster={SALES_LETTER_POSTER}
                title="TopServ Digital Sales Letter Video"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Desktop: the pinned flythrough stage, intro text inside it. */}
      <ProcessFlythrough />
    </section>
  );
}
