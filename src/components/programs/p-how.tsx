import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { threePhases } from "@/lib/bf-content";
import { Eyebrow, Shell } from "@/components/programs/p-grid";
import { FlywheelDiagram } from "@/components/programs/diagrams/d-flywheel";
import { PhaseStairDiagram } from "@/components/programs/diagrams/d-phase-stair";

/**
 * Programs and Pricing 2: How It Works.
 *
 * SCOPE. Build Spec v2 section 4, Programs page 2: the 3 phases with their
 * timings and the stages inside them, and for each phase what TopServ does,
 * what the client provides, how brand and performance interact, and what
 * progress looks like. All 4 are on every phase. The spec also calls for a
 * workflow diagram showing brand feeding performance and performance data
 * informing brand, which is the loop section below.
 *
 * ARGUMENT. Argument Spine, /programs-pricing/how-it-works. Problem:
 * agencies go quiet after the contract is signed and you find out in month 4
 * whether anything happened. False assumption: marketing is something an
 * agency does to my business while I wait. Insight: the parts only you can
 * supply are the parts that cannot be copied. Outcome: you know what month
 * you are in and what should be true by the end of it.
 *
 * THE CALLOUT, HONOURED LITERALLY. The spine is blunt: "Say what the client
 * owes us and when. Photos from jobsites, time on camera, access to their
 * people. Being specific about it here is what makes the physical layer
 * arrive later. Softening it is how a zone campaign starves." That is its
 * own section, stated as obligations rather than as a nice to have.
 *
 * All phase copy is verbatim from bf-content.ts. The video the spec places
 * here is not shot, so there is no slot and no VideoObject.
 */

const OWES = [
  {
    k: "Time on camera",
    v: "The owner, on a schedule, not once. The brand half runs on a face the market can recognize, and nobody else can stand in.",
  },
  {
    k: "Photographs from jobs",
    v: "Real work, in the places you actually serve. Location specific proof is what makes a service area page mean anything.",
  },
  {
    k: "Access to your people",
    v: "The technicians, the office, the customers who will speak. Their story is the part a competitor cannot buy.",
  },
  {
    k: "Answers, fast",
    v: "When demand arrives it is yours to lose. Speed to lead is a client obligation, not an agency one.",
  },
];

export function PHowHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(64%_54%_at_10%_100%,rgba(158,216,68,0.13),transparent_62%)]"
      />
      <Shell className="py-16 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,52fr)_minmax(0,48fr)] lg:gap-14">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <h1 className="display mt-6 text-[clamp(1.9rem,4.1vw,3.75rem)] leading-[1.02]">
              How BrandFormance works, month by month.
            </h1>
            <p className="mt-7 max-w-[58ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
              Most agencies go quiet once the contract is signed, and you find
              out in month 4 whether anything actually happened. This page is
              the opposite of that: 3 phases, what we do in each, what you
              provide, and what should be true by the end of it.
            </p>
            <p className="mt-5 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
              If you have ever asked what does a marketing agency do for
              contractors and got a channel list back, this is the answer that
              list was hiding. Marketing is not something an agency does to
              your business while you wait. The parts only you can supply, your story, your people,
              your jobsites, your customers, are exactly the parts a competitor
              cannot copy. An agency that never asks you for anything is
              building something generic.
            </p>
          </div>

          <PhaseStairDiagram />
        </div>
      </Shell>
    </section>
  );
}

/** The 3 phases, in full. Build Spec v2 section 4. */
export function PPhases() {
  return (
    <section aria-labelledby="p-phases-heading" className="border-b border-border bg-background">
      <Shell className="py-16 md:py-20">
        <div className="max-w-[46rem]">
          <Eyebrow>The 3 phases</Eyebrow>
          <h2
            id="p-phases-heading"
            className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
          >
            What happens, and when it happens.
          </h2>
        </div>

        <ol className="mt-10 grid gap-4 lg:grid-cols-3">
          {threePhases.map((p) => (
            <li key={p.n}>
              <article className="flex h-full flex-col rounded-[18px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_62%)] p-6 md:p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <span
                    aria-hidden
                    className="label-mono flex size-9 items-center justify-center rounded-[9px] bg-[rgba(158,216,68,0.26)] text-[0.75rem] text-[rgba(244,245,242,0.72)]"
                  >
                    {String(p.n).padStart(2, "0")}
                  </span>
                  <span className="label-mono text-ink-faint">{p.timing}</span>
                </div>

                <h3 className="display mt-5 text-[clamp(1.2rem,1.9vw,1.55rem)] leading-[1.06]">
                  {p.name}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-faint">
                  Stages: {p.stages}
                </p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {p.covers}
                </p>

                <dl className="mt-6 grid gap-4 border-t border-[rgba(244,245,242,0.09)] pt-5 text-[0.9375rem] leading-relaxed">
                  <div>
                    <dt className="label-mono text-ink-faint">We do</dt>
                    <dd className="mt-1.5 text-muted-foreground">{p.topserv}</dd>
                  </div>
                  <div>
                    <dt className="label-mono text-ink-faint">You provide</dt>
                    <dd className="mt-1.5 text-muted-foreground">{p.client}</dd>
                  </div>
                  <div className="mt-auto">
                    <dt className="label-mono text-brand">By the end of it</dt>
                    <dd className="mt-1.5 text-foreground">{p.progress}</dd>
                  </div>
                </dl>
              </article>
            </li>
          ))}
        </ol>
      </Shell>
    </section>
  );
}

/** The workflow the spec asks for: the 2 halves feeding each other. */
export function PLoop() {
  return (
    <section aria-labelledby="p-loop-heading" className="border-b border-border bg-background">
      <Shell className="py-16 md:py-20">
        {/* The 2 columns are weighted to finish at roughly the same depth:
            the explanation and both cards on the left, the circuit on the
            right, centred against them. The closing paragraph that used to
            sit under the cards is gone, because the plate at the centre of
            the diagram and its caption now say the same thing. */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,46fr)_minmax(0,54fr)] lg:items-center lg:gap-14">
          <div>
            <Eyebrow>The loop</Eyebrow>
            <h2
              id="p-loop-heading"
              className="display mt-5 max-w-[16ch] text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
            >
              The halves are not parallel. They feed each other.
            </h2>
            <p className="mt-6 max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
              This is the part 2 vendors can never do. It is not a handoff, it
              is a circuit, and it only closes when 1 partner holds both ends.
            </p>

            <div className="mt-8 grid gap-3">
              <div className="rounded-[16px] border border-[#2b323c] bg-[#0b0e13] p-5">
                <p className="label-mono text-brand">Brand feeds performance</p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  Familiarity built at frequency means the capture channels are
                  collecting people who already recognize the name. The same ad
                  budget buys a better click and the same search buys a warmer
                  call.
                </p>
              </div>
              <div className="rounded-[16px] border border-brand-blue/35 bg-[linear-gradient(160deg,rgba(14,125,193,0.1),rgba(13,16,21,0.72)_62%)] p-5">
                <p className="label-mono text-brand-blue-hot">Performance informs brand</p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  Capture data says which services people actually search for,
                  which language converts and which zones respond. That is what
                  the next round of brand content is made about. The brand half
                  stops guessing.
                </p>
              </div>
            </div>
          </div>

          <FlywheelDiagram />
        </div>
      </Shell>
    </section>
  );
}

/** The spine callout, stated plainly. */
export function POwes() {
  return (
    <section aria-labelledby="p-owes-heading" className="border-b border-border bg-background">
      <Shell className="py-16 md:py-20">
        <div className="max-w-[46rem]">
          <Eyebrow>What you owe us</Eyebrow>
          <h2
            id="p-owes-heading"
            className="display mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.02]"
          >
            4 things we will keep asking you for.
          </h2>
          <p className="mt-6 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
            We would rather be specific now than disappointed in month 3. None
            of these is optional, and none of them can be bought from anybody
            else.
          </p>
        </div>

        <ol className="mt-10 grid gap-3 sm:grid-cols-2">
          {OWES.map((o, i) => (
            <li key={o.k}>
              <div className="flex h-full flex-col rounded-[18px] border border-[#2b323c] bg-[#0d1015] p-6">
                <span
                  aria-hidden
                  className="label-mono flex size-9 items-center justify-center rounded-[9px] bg-[rgba(158,216,68,0.26)] text-[0.75rem] text-[rgba(244,245,242,0.72)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-[1.0625rem] font-semibold leading-snug">{o.k}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {o.v}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Shell>
    </section>
  );
}

export function PHowCta() {
  return (
    <section
      aria-labelledby="p-how-cta-heading"
      className="relative isolate overflow-hidden border-t border-border bg-background"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(64%_54%_at_18%_100%,rgba(158,216,68,0.16),transparent_62%)]"
      />
      <Shell className="py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:gap-16">
          <div>
            <Eyebrow>Next step</Eyebrow>
            <h2
              id="p-how-cta-heading"
              className="display mt-5 max-w-[14ch] text-[clamp(1.9rem,3.6vw,3rem)] leading-[0.98]"
            >
              You know the work. Now see what it produces.
            </h2>
          </div>
          <div>
            <p className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
              What does not happen in the first 30 days, what improves in the
              first 90, and the number we are held to across 12 months.
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
        </div>
      </Shell>
    </section>
  );
}
