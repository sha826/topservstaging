import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BfEquationStage } from "@/components/brandformance/bf-equation-stage";
import { Eyebrow, Shell } from "@/components/brandformance/bf-grid";

/**
 * The canonical definition of BrandFormance.
 *
 * 51 words, inside the 40 to 60 word window SEO Guidelines 12.2 requires.
 * This string is the DefinedTerm description, the OG description and the
 * on-page definition block, and it must stay byte identical across all 3.
 * Stability is what makes it citable, so change it deliberately or not at
 * all. At promotion it moves to bf-content.ts and llms.txt.
 */
export const BF_DEFINITION =
  "BrandFormance is the combination of brand building and performance marketing, run as 1 system rather than 2 budgets. Brand creates demand by making a home service company known, trusted and remembered inside its market. Performance captures that demand the moment a customer is ready to buy. Together they build market dominance.";

/**
 * The opening.
 *
 * ARGUMENT SPINE, /brandformance. Problem: every agency sells the same tools
 * under different names, so contractors pick on price and get burned.
 * Insight: channels are components, and what is missing is the operating
 * system that decides what runs, where, at what frequency and in what order.
 * The H1 states that insight and carries the primary keyword first.
 *
 * The equation is required to appear visually on this page and on the home
 * page (Build Spec v2 section 1). It is the simplest expression of what we
 * sell, so it sits in the hero rather than further down.
 */
export function BfHero() {
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
            <Eyebrow>The category we own</Eyebrow>
            <h1 className="display mt-6 text-[clamp(1.85rem,3.05vw,2.75rem)] leading-[1.06]">
              BrandFormance is the operating system for home service marketing.
            </h1>
            <p className="mt-7 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
              Every agency sells the same channels under different names. What
              is missing is the system that decides what runs, where, at what
              frequency and in what order. Without one you are buying parts and
              hoping they assemble themselves.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/method">
                  See the method
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base">
                <Link href="/brand-assessment">Get Your Brand Grade</Link>
              </Button>
            </div>
          </div>

          {/* The equation, per Build Spec v2 section 1. */}
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 bg-[radial-gradient(closest-side,rgba(158,216,68,0.14),transparent)] blur-2xl"
            />
            <BfEquationStage />
          </div>
        </div>
      </Shell>
    </section>
  );
}

/**
 * The definition block. SEO Guidelines 12.2 puts it at the top of the page,
 * marked with DefinedTerm and reused verbatim wherever the site defines the
 * term. It is deliberately its own band so nothing competes with it.
 */
export function BfDefinition() {
  return (
    <section aria-labelledby="bf-definition-heading" className="border-b border-border bg-background">
      <Shell className="py-14 md:py-16">
        <div className="rounded-[20px] border border-brand/30 bg-[linear-gradient(160deg,rgba(158,216,68,0.07),rgba(13,16,21,0.7)_60%)] p-7 md:p-10">
          <h2 id="bf-definition-heading" className="label-mono text-brand">
            The definition
          </h2>
          <p className="mt-6 max-w-[46ch] text-[clamp(1.15rem,2vw,1.6rem)] font-semibold leading-[1.35] tracking-[-0.01em] text-foreground">
            {BF_DEFINITION}
          </p>
          <p className="mt-6 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-faint">
            That is the definition, written once and kept stable. What follows
            is BrandFormance for home services in detail: the 10 questions a
            serious operator asks next, answered in order.
          </p>
        </div>
      </Shell>
    </section>
  );
}
