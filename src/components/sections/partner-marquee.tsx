import { partners } from "@/lib/testimonials";

/**
 * "Meet Our Valued Partners" (design-lab Q6, "backlit dark"): the client
 * logos in full color straight on the dark section, backlit by a faint
 * radial light spill, with a hairline white keyline around each mark so
 * dark lettering stays legible. The logo set is repeated 6 times so half
 * the track (what the -50% keyframe travels) outspans any viewport, and
 * the loop never shows a gap. Pauses on hover.
 */
export function PartnerMarquee() {
  return (
    <section aria-label="Meet Our Valued Partners" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 pt-14 text-center md:pt-16">
        <h2 className="display text-3xl md:text-4xl">Meet our valued partners</h2>
      </div>
      <div className="group relative mt-6 overflow-hidden py-12 md:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_100%_at_50%_50%,rgba(245,243,239,0.10),transparent_75%)]"
        />
        <div className="flex w-max animate-[partner-mq_160s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1, 2, 3, 4, 5].map((copy) => (
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
