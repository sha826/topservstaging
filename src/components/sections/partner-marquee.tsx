import fs from "node:fs";
import path from "node:path";
import { homePartners } from "@/lib/testimonials";

/**
 * "Meet Our Valued Partners" (design-lab Q6, "backlit dark"): the client
 * logos in full color straight on the dark section, backlit by a faint
 * radial light spill, with a hairline white keyline around each mark so
 * dark lettering stays legible.
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
        <ul className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-14 gap-y-10 px-5">
          {shown.map((p) => (
            <li key={p.file}>
              {/* Plain img on purpose: these are small fixed-height marks
                  already sized as -sm webp, so next/image would add a
                  resize pipeline for no gain. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/partners/${p.file}`}
                alt={p.name}
                loading="lazy"
                className="h-16 w-auto [filter:drop-shadow(0_0_1px_rgba(255,255,255,0.55))_drop-shadow(0_0_10px_rgba(255,255,255,0.15))]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
