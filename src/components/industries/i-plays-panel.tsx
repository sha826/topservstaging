/**
 * The plays panel: what the work actually is in this trade, visible before
 * the reader scrolls.
 *
 * WHY A PANEL AND NOT A PICTURE. The industry pages were the only public
 * pages carrying no visual companion to their copy: a headline, a paragraph
 * and bullet lists, where every BrandFormance era page pairs its argument
 * with something built. The fix is a built panel rather than a photograph,
 * per IMAGE-GUIDELINES 4.2: anything a visitor would read as a record of
 * something that happened, a job site or a crew or a van, has to be real
 * photography. A generated one would read as exactly that. 4.3 permits
 * synthetic visuals only where they assert no fact, and 3 says a concept
 * with no authentic photograph available should be built instead.
 *
 * So it asserts nothing. It carries the trade's own plays, the same strings
 * already written for each industry, in the panel idiom the Method hero
 * established: 1 rounded card, a hairline rail, numbered rows. No invented
 * data, no numbers, nothing that could be mistaken for a measured outcome
 * sitting next to a claim (4.4).
 *
 * The plays move here from the section that used to follow the hero, so
 * nothing is said twice.
 */
export function IPlaysPanel({ trade, plays }: { trade: string; plays: string[] }) {
  return (
    <div className="relative">
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 bg-[radial-gradient(closest-side,rgba(158,216,68,0.14),transparent)] blur-2xl"
      />
      <div className="relative overflow-hidden rounded-[20px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_58%,#0d1015_100%)] p-6 md:p-7">
        <p className="label-mono text-ink-faint">How we win in {trade.toLowerCase()}</p>

        {/* The rail the plays sit on, same hairline the Method panel uses.
            Outside the ol: only li is valid there. */}
        <div className="relative mt-5">
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-3 left-[1.1rem] top-3 w-px bg-[linear-gradient(180deg,rgba(244,245,242,0.06),rgba(244,245,242,0.14),rgba(158,216,68,0.45))]"
          />
          <ol className="relative">
          {plays.map((play, i) => (
            <li
              key={play}
              className={`relative flex items-start gap-4 py-3.5 ${
                i === 0 ? "" : "border-t border-[rgba(244,245,242,0.08)]"
              }`}
            >
              <span
                aria-hidden
                className="label-mono relative z-10 flex size-[2.2rem] shrink-0 items-center justify-center rounded-[8px] border border-[rgba(244,245,242,0.12)] bg-[#0b0e13] text-[0.625rem] text-brand"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                {play}
              </span>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
