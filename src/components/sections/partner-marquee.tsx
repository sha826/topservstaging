import { partners } from "@/lib/testimonials";

/**
 * "Meet Our Valued Partners" (design-lab Q6, "backlit dark"): the client
 * logos in full color straight on the dark section, backlit by a faint
 * radial light spill, with a hairline white keyline around each mark so
 * dark lettering stays legible. Pauses on hover.
 *
 * COPIES is why the logo set is repeated. The keyframe travels -50% of the
 * track, so the half that remains has to still cover the viewport or the
 * loop shows a gap at the moment it restarts. 1 copy of the 10 logos
 * measures 1648px, so the half-track is COPIES x 824px:
 *
 *   2 copies -> 1648px, short of a 1920px screen by 272px. Gaps.
 *   4 copies -> 3296px, covers 1920 and 2560. Current.
 *   6 copies -> 4944px, covers 3440 ultrawide. The previous value.
 *
 * 4 is the smallest even count that holds every mainstream width, and it
 * costs 40 img tags instead of 60. A 3440px ultrawide would see the gap;
 * raise this to 6 if that matters. Only the first copy carries alt text,
 * the rest are aria-hidden, so the count never changes what is announced.
 *
 * Background tint is assigned by the caller, not hardcoded: the proof run
 * alternates tinted and untinted bands and which sections are on is
 * switchable (homeProofSections in bf-content.ts). See src/app/page.tsx.
 */
const COPIES = 4;

export function PartnerMarquee({ tinted = false }: { tinted?: boolean }) {
  return (
    <section
      aria-label="Meet Our Valued Partners"
      className={`border-b border-border ${tinted ? "bg-card/40" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-5 pt-14 text-center md:pt-16">
        <h2 className="display text-3xl md:text-4xl">Meet our valued partners</h2>
      </div>
      <div className="group relative mt-6 overflow-hidden py-12 md:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_100%_at_50%_50%,rgba(245,243,239,0.10),transparent_75%)]"
        />
        <div className="flex w-max animate-[partner-mq_160s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {Array.from({ length: COPIES }, (_, copy) => copy).map((copy) => (
            <div
              key={copy}
              aria-hidden={copy > 0}
              className="flex shrink-0 items-center gap-14 pr-14"
            >
              {partners.map((p) => (
                // Plain img + eager on purpose: next/image lazy-loads and
                // resizes, both of which break the seamless loop
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={p.file}
                  src={`/images/partners/${p.file}`}
                  alt={copy === 0 ? p.name : ""}
                  loading="eager"
                  className="h-16 w-auto shrink-0 [filter:drop-shadow(0_0_1px_rgba(255,255,255,0.55))_drop-shadow(0_0_10px_rgba(255,255,255,0.15))]"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
