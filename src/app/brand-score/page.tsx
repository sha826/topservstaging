import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { BrandScoreForm } from "@/components/sections/brand-score-form";
import { brandScoreComponents, brandScoreGrades } from "@/lib/bf-content";

export const metadata: Metadata = {
  title: "Get Your Brand Score",
  description:
    "The 6 component diagnostic of how strong your home service brand actually is in your market. A score out of 100, a grade, and the program the grade points to.",
  alternates: { canonical: "/brand-score" },
};

export default function BrandScorePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Brand Score", href: "/brand-score" },
        ]}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-20 md:pt-28">
          <Reveal>
            <p className="label-mono text-brand">The diagnostic</p>
            <h1 className="display mt-4 text-5xl md:text-7xl">
              How strong is your brand<span className="text-brand">?</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Not how strong it feels. How strong it measures. The Brand Score
              is a 6 component diagnostic of how your company actually stands
              in its market: a score out of 100, a grade, and the program the
              grade points to. It is the same engine our own team runs before
              any strategy conversation, so the number you get here is the
              number you would get on a call.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="components-heading" className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <h2 id="components-heading" className="display text-3xl md:text-4xl">
              6 components, weighted
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {brandScoreComponents.map((c, i) => (
              <li key={c.component} className="h-full">
                <Reveal delay={Math.min(i * 0.05, 0.25)} className="h-full">
                  <div className="flex h-full flex-col gap-2 rounded-lg border border-border bg-background p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="display text-xl">{c.component}</span>
                      <span className="display text-3xl text-brand">{c.weight}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{c.how}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal className="mt-8">
            <div className="grid gap-3 text-sm leading-relaxed text-muted-foreground md:grid-cols-3">
              <p>
                <strong className="text-foreground">Normalized to your market.</strong>{" "}
                100 reviews means something different against a field of 400
                than against a field of 2,800. We score against your local
                competitive set, never an absolute threshold.
              </p>
              <p>
                <strong className="text-foreground">Scored per market.</strong>{" "}
                Reviews and profile strength attach to the home market and do
                not transfer. Website and consistency do. Multi market
                companies get a score per market.
              </p>
              <p>
                <strong className="text-foreground">Graded per division.</strong>{" "}
                A plumbing company with 79 years of equity can still be unknown
                in HVAC. We grade the division being marketed, not the logo.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="grades-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <h2 id="grades-heading" className="display text-3xl md:text-4xl">
              The grade drives everything
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              You do not pick a program. The grade places you in one. That is
              the point: the prescription matches the diagnosis.
            </p>
          </Reveal>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="label-mono py-3 pr-6 font-normal text-ink-faint">Grade</th>
                  <th className="label-mono py-3 pr-6 font-normal text-ink-faint">What it means</th>
                  <th className="label-mono py-3 font-normal text-ink-faint">Program</th>
                </tr>
              </thead>
              <tbody>
                {brandScoreGrades.map((g) => (
                  <tr key={g.grade} className="border-b border-border/60">
                    <td className="display py-4 pr-6 text-xl">{g.grade}</td>
                    <td className="py-4 pr-6 text-sm leading-relaxed text-muted-foreground">
                      {g.meaning}
                    </td>
                    <td className="py-4">
                      <span
                        className={`label-mono ${
                          g.program === "Not a fit yet" ? "text-ink-faint" : "text-brand"
                        }`}
                      >
                        {g.program}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="form-heading" className="border-b border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:py-20 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <h2 id="form-heading" className="display text-3xl md:text-4xl">
              Get your score
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Tell us who you are and where you compete. We run the 6 component
              diagnostic against your market and send you the score, the grade,
              and what both mean, within 2 business days.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              If the grade says you are not a fit yet, we tell you that too,
              along with what to fix first. The diagnostic is honest or it is
              worthless.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <BrandScoreForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
