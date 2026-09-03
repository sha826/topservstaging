import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sixStages } from "@/lib/bf-content";
import { Eyebrow, Shell } from "@/components/method/m-grid";

/**
 * The opening.
 *
 * ARGUMENT SPINE, /method. Problem: every agency has a proprietary process
 * and most of them are a diagram with no teeth. False assumption: a
 * methodology is marketing language for the same work everyone else does.
 * The H1 carries the primary keyword, "brandformance method"
 * (KEYWORD-RESEARCH 4.3), and the intro states the problem the page exists
 * to answer.
 *
 * The panel lists the 6 stages in order before the reader scrolls, so the
 * shape of the machine is visible immediately. That is the Outcome beat
 * stated early: "the contractor can see the whole machine before they buy
 * it".
 *
 * IT RUNS. A charge travels the rail and each stage lights as it passes,
 * in order, on a loop. The method is a sequence, so the panel behaves like
 * one rather than sitting there as a list. Every moving value is a transform
 * or an opacity, so it stays on the compositor and costs nothing on scroll.
 * The stage names never change state, so nothing has to be duplicated in the
 * DOM for a screen reader to trip over, and reduced motion simply stops it
 * with stage 06 left lit, which is where the eye should end anyway.
 */
const CYCLE = 6;

const CSS = `
@keyframes m-lit {
  0%, 1%    { opacity: 0; }
  4%, 13%   { opacity: 1; }
  18%, 100% { opacity: 0; }
}
@keyframes m-charge {
  0%        { opacity: 0; transform: translateY(-8%); }
  6%, 88%   { opacity: 1; }
  100%      { opacity: 0; transform: translateY(520%); }
}
@media (prefers-reduced-motion: no-preference) {
  .m-lit    { animation: m-lit ${CYCLE}s linear infinite; }
  .m-charge { animation: m-charge ${CYCLE}s cubic-bezier(0.45, 0, 0.55, 1) infinite; }
}
`;

export function MHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_58%_at_88%_16%,rgba(158,216,68,0.16),transparent_64%)]"
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
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,54fr)_minmax(0,46fr)] lg:gap-14 xl:gap-20">
          <div>
            <Eyebrow>The method</Eyebrow>
            <h1 className="display mt-6 text-[clamp(1.9rem,4.1vw,3.75rem)] leading-[1.02]">
              The BrandFormance method, stage by stage.
            </h1>
            <p className="mt-7 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
              You have heard the pitch before. Every agency has a proprietary
              process and most of them are a diagram with no teeth. A real
              method tells you what happens, in what order, what it produces
              and how you know it worked. Miss any of those 4 and it is a
              diagram.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/programs-pricing/what-this-delivers">
                  See what this delivers
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base">
                <Link href="/brand-assessment">Get Your Brand Grade</Link>
              </Button>
            </div>
          </div>

          {/* The whole machine, before the reader scrolls. */}
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 bg-[radial-gradient(closest-side,rgba(158,216,68,0.14),transparent)] blur-2xl"
            />
            <ol className="relative overflow-hidden rounded-[20px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_58%,#0d1015_100%)] p-6 md:p-7">
              <style>{CSS}</style>

              {/* The rail the stages sit on, and the charge that runs it. */}
              <span
                aria-hidden
                className="absolute bottom-8 left-[2.4rem] top-8 w-px bg-[linear-gradient(180deg,rgba(244,245,242,0.06),rgba(244,245,242,0.14),rgba(158,216,68,0.5))] md:left-[2.65rem]"
              />
              <span
                aria-hidden
                className="m-charge absolute left-[2.28rem] top-8 h-[15%] w-[3px] rounded-full bg-[linear-gradient(180deg,transparent,var(--brand),transparent)] opacity-0 md:left-[2.53rem]"
              />

              {sixStages.map((s, i) => (
                <li
                  key={s.n}
                  className={`relative flex items-center gap-4 py-3 ${
                    i === 0 ? "" : "border-t border-[rgba(244,245,242,0.08)]"
                  }`}
                >
                  {/* The stage lighting as the charge reaches it. */}
                  <span
                    aria-hidden
                    className="m-lit pointer-events-none absolute inset-y-0 left-[-0.75rem] right-[-0.75rem] rounded-[10px] bg-[linear-gradient(90deg,rgba(158,216,68,0.16),transparent_78%)] opacity-0"
                    style={{ animationDelay: `${(i * CYCLE) / sixStages.length}s` }}
                  />
                  <span
                    aria-hidden
                    className={`relative z-10 label-mono flex size-8 shrink-0 items-center justify-center rounded-[8px] text-[0.625rem] ${
                      i === sixStages.length - 1
                        ? "bg-brand text-[#0c0e12]"
                        : "bg-[rgba(158,216,68,0.22)] text-[rgba(244,245,242,0.7)]"
                    }`}
                  >
                    {String(s.n).padStart(2, "0")}
                  </span>
                  <span
                    className={`relative z-10 text-[0.9375rem] font-semibold md:text-base ${
                      i === sixStages.length - 1 ? "text-brand" : "text-foreground"
                    }`}
                  >
                    {s.name}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Shell>
    </section>
  );
}
