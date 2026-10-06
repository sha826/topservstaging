import fs from "node:fs";
import path from "node:path";
import { homePartners } from "@/lib/testimonials";

/**
 * "Meet Our Valued Partners": the client logos in full color, each on its
 * own light plate.
 *
 * WHY PLATES. design-lab Q6 "backlit dark" put the marks straight on the
 * dark section with a hairline white keyline to carry dark lettering. That
 * holds for logos drawn with bright fills and fails for logos drawn for
 * white paper. Measured against the band, Spencer's ink sits at a median
 * 1.9:1 contrast with 77 percent of it below 3:1, and King's Window has
 * half its ink below 3:1. A 1px keyline cannot rescue that.
 *
 * The alternative would be recolouring the marks, which is not ours to do:
 * a logo is someone else's brand identity. So the plate gives each one the
 * background it was drawn for, unaltered, and every logo in the row is
 * legible regardless of how it was designed.
 *
 * A STATIC ROW. It used to scroll: the set was repeated 4 times and the
 * track translated -50% forever, which is why the page carried 40 img tags
 * for 10 logos. The band now shows a chosen few, each exactly once, holding
 * still. Nothing animates, so nothing has to be duplicated to hide a seam,
 * every logo keeps its own alt text instead of 1 copy carrying it for the
 * rest, and there is no paused-on-hover behaviour to explain.
 *
 * WHICH LOGOS is homePartners in lib/testimonials.ts, in order. Only the
 * entries whose file is actually on disk render: 4 of the 5 chosen have no
 * asset in the repo yet, and a band of broken images is worse than a short
 * one. Each appears on its own once the file is added, no code change.
 * This check reads the filesystem at build time, which is fine here because
 * every page that mounts this component is statically generated.
 */
const PARTNERS_DIR = path.join(process.cwd(), "public", "images", "partners");

function available() {
  return homePartners.filter((p) => {
    try {
      return fs.existsSync(path.join(PARTNERS_DIR, p.file));
    } catch {
      return false;
    }
  });
}

export function PartnerMarquee({ tinted = false }: { tinted?: boolean }) {
  const shown = available();
  if (shown.length === 0) return null;

  return (
    <section
      aria-label="Meet Our Valued Partners"
      className={`border-b border-border ${tinted ? "bg-card/40" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-5 pt-14 text-center md:pt-16">
        <h2 className="display text-3xl md:text-4xl">Meet our valued partners</h2>
      </div>
      <div className="relative py-12 md:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_100%_at_50%_50%,rgba(245,243,239,0.10),transparent_75%)]"
        />
        {/* Wraps rather than scrolls sideways, so a narrow screen stacks the
            row instead of hiding logos off the edge. */}
        <ul className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-6 px-5">
          {shown.map((p) => (
            // Every plate is the same box, so the row reads as a set rather
            // than as marks of assorted sizes. The logos differ in aspect
            // ratio, 107x128 for King's Window against 316x128 for Lilypad,
            // so each one is scaled to fill the box it is given instead of
            // being matched on height alone. Padding is just enough to keep
            // the ink off the plate edge.
            <li
              key={p.file}
              className="flex h-28 w-56 items-center justify-center rounded-[14px] bg-[#f4f5f2] p-3 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_10px_30px_-12px_rgba(0,0,0,0.6)]"
            >
              {/* Plain img on purpose: these are small fixed-height marks
                  already sized as -sm webp, so next/image would add a
                  resize pipeline for no gain. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/partners/${p.file}`}
                alt={p.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
