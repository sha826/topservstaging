import { sixStages } from "@/lib/bf-content";
import { siteConfig } from "@/lib/site-config";
import { Shell } from "@/components/about/page-grid";

/**
 * The About page opens on the belief, not on company history.
 *
 * THE H1, AND A FLAGGED DEVIATION. Copy Framework 16 specifies this exact
 * sentence: "We Believe Home Service Companies Deserve Better Than Another
 * Lead-Generation Agency." SEO Guidelines 3.3 separately requires the primary
 * keyword ("topserv digital", KEYWORD-RESEARCH 4.6) in the H1, and v2 and v3
 * rewrote the sentence to "TopServ Digital believes ..." to satisfy it.
 *
 * That was the wrong call and it is reverted here, on the documents' own
 * terms. SEO-GUIDELINES 0 puts the Messaging Framework ABOVE the SEO
 * Guidelines in the order of authority. KEYWORD-RESEARCH 1.5 says plainly
 * that "Positioning outranks SEO ... the keyword loses". And the keyword is
 * KD 0 with navigational intent, so forcing it into the H1 wins nothing the
 * title tag does not already win. The 3.3 H1 requirement is knowingly unmet;
 * the keyword is carried in the title, the first 100 words, an H2 and alt
 * text instead. Raise with Alejandro rather than re-resolving silently.
 *
 * THE RIGHT HAND PANEL. v7 replaced the background photograph with the thing
 * the photograph could never say: the methodology itself, as a climb. The 6
 * stages come verbatim from bf-content.ts (Build Spec v2 section 3) and each
 * one carries a measure that grows, so the panel reads as progress rather
 * than as a list. It closes on "found" to "chosen", the sentence the whole
 * site turns on (Build Spec v2 section 1, Copy Framework 23).
 *
 * It teaches nothing here. The stage names are labels on a progression; /method
 * is where the methodology is actually taught, and this links nowhere so it
 * never competes with that page.
 *
 * Nothing in the panel encodes a figure. The measures are proportions of the
 * climb, never quantities, and no number appears except the stage index.
 *
 * Motion is a load animation with a fixed duration, never scroll linked, so
 * every line finishes visible and reduced motion drops it entirely.
 */

const CSS = `
@keyframes bh-in   { from { opacity: 0; transform: translateY(14px); } }
@keyframes bh-step { from { opacity: 0; transform: translateX(-14px); } }
@keyframes bh-bar  { from { transform: scaleX(0.06); } }
.bh-in   { animation: bh-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
.bh-step { animation: bh-step 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }
.bh-bar  { transform-origin: left center; animation: bh-bar 1.1s cubic-bezier(0.22, 1, 0.36, 1) both; }
@media (prefers-reduced-motion: reduce) {
  .bh-in, .bh-step, .bh-bar { animation: none; }
}
`;

/** Proportion of the climb each stage has reached. Not a quantity. */
const REACH = [22, 34, 47, 62, 80, 100];

export function BeliefHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background">
      <style>{CSS}</style>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(72%_60%_at_86%_18%,rgba(158,216,68,0.16),transparent_64%)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(244,245,242,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,245,242,0.05) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
          maskImage: "radial-gradient(110% 80% at 50% 40%, #000, transparent 78%)",
          WebkitMaskImage: "radial-gradient(110% 80% at 50% 40%, #000, transparent 78%)",
        }}
      />

      <Shell className="pb-16 pt-28 md:pb-20 md:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,52fr)_minmax(0,48fr)] lg:gap-14 xl:gap-20">
          <div>
            <p className="bh-in label-mono flex items-center gap-2.5 text-[rgba(244,245,242,0.85)]">
              <span aria-hidden className="block size-2 rounded-full bg-brand" />
              About TopServ Digital
            </p>

            <h1
              className="bh-in display mt-6 text-[clamp(1.85rem,3.2vw,2.875rem)] leading-[1.05]"
              style={{ animationDelay: "0.08s" }}
            >
              We believe home service companies deserve better than another lead
              generation agency.
            </h1>

            <p
              className="bh-in mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg"
              style={{ animationDelay: "0.16s" }}
            >
              TopServ Digital is the home of BrandFormance, the methodology we
              built for established home service companies that want to be
              chosen, not just found.
            </p>

            {/* Institutional facts on a rule. site-config only, nothing inferred. */}
            <div
              className="bh-in mt-10 border-t border-border/80 pt-5"
              style={{ animationDelay: "0.24s" }}
            >
              <p className="label-mono flex flex-wrap gap-x-3 gap-y-1 text-ink-faint">
                <span className="text-foreground">
                  {siteConfig.company.address.city},{" "}
                  {siteConfig.company.address.region}
                </span>
                <span aria-hidden className="text-border">/</span>
                <span>Founded {siteConfig.company.foundedYear}</span>
                <span aria-hidden className="text-border">/</span>
                <span>6 home service trades</span>
              </p>
            </div>
          </div>

          {/* The methodology, as a climb. */}
          <div className="bh-in relative" style={{ animationDelay: "0.2s" }}>
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 bg-[radial-gradient(closest-side,rgba(158,216,68,0.14),transparent)] blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[20px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_58%,#0d1015_100%)] p-6 md:p-8">
              <div className="flex items-baseline justify-between gap-6">
                <p className="label-mono text-brand">BrandFormance</p>
                <p className="label-mono text-ink-faint">6 stages</p>
              </div>

              <ol className="mt-7 grid gap-px">
                {sixStages.map((s, i) => {
                  const top = i === sixStages.length - 1;
                  return (
                    <li
                      key={s.n}
                      className="bh-step border-t border-[rgba(244,245,242,0.08)] py-3"
                      style={{ animationDelay: `${0.3 + i * 0.08}s` }}
                    >
                      <div className="flex items-baseline gap-3.5">
                        <span
                          className="label-mono shrink-0 text-[0.6875rem]"
                          style={{ color: top ? "var(--brand)" : "#6f7783" }}
                        >
                          0{s.n}
                        </span>
                        <span
                          className={`text-[0.9375rem] leading-tight md:text-base ${
                            top ? "font-semibold text-brand" : "text-muted-foreground"
                          }`}
                        >
                          {s.name}
                        </span>
                      </div>
                      <span
                        aria-hidden
                        className="bh-bar mt-2.5 block h-[3px] rounded-full"
                        style={{
                          width: `${REACH[i]}%`,
                          animationDelay: `${0.36 + i * 0.08}s`,
                          backgroundColor: `rgba(158,216,68,${(0.2 + i * 0.16).toFixed(2)})`,
                        }}
                      />
                    </li>
                  );
                })}
              </ol>

              <div className="mt-7 flex items-center justify-between gap-4 border-t border-[rgba(244,245,242,0.08)] pt-5">
                <span className="label-mono text-ink-faint">Found</span>
                <span aria-hidden className="h-px flex-1 bg-[linear-gradient(90deg,rgba(244,245,242,0.12),var(--brand))]" />
                <span className="label-mono text-brand">Chosen</span>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
