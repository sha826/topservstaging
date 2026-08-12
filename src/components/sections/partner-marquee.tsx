import { partners } from "@/lib/testimonials";

/**
 * "Meet Our Valued Partners" (design-lab Q4): the original site's client
 * logos in full color, each on its own small light plate so the section
 * itself stays dark. The logo set is repeated 6 times so half the track
 * (what the -50% keyframe travels) outspans any viewport, and the loop
 * never shows a gap. Pauses on hover.
 */
export function PartnerMarquee() {
  return (
    <section aria-label="Meet Our Valued Partners" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 pt-14 text-center md:pt-16">
        <h2 className="display text-3xl md:text-4xl">Meet our valued partners</h2>
      </div>
      <div className="group mt-10 overflow-hidden pb-14 md:pb-16">
        <div className="flex w-max animate-[partner-mq_160s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1, 2, 3, 4, 5].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy > 0}
              className="flex shrink-0 items-center gap-6 pr-6"
            >
              {partners.map((p) => (
                <span
                  key={p.file}
                  className="group/plate grid h-24 w-48 shrink-0 place-items-center rounded-md bg-[#f5f3ef]"
                >
                  {/* Plain img + eager on purpose: next/image lazy-loads and
                      resizes, both of which break the seamless loop */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/partners/${p.file}`}
                    alt={copy === 0 ? p.name : ""}
                    loading="eager"
                    className="max-h-16 w-auto max-w-[76%] brightness-0 opacity-70 transition duration-300 group-hover/plate:opacity-100 group-hover/plate:brightness-100"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
