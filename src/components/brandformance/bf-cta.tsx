import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Shell } from "@/components/brandformance/bf-grid";

/**
 * The close.
 *
 * ARGUMENT SPINE, /brandformance: the CTA is "See the method". This page
 * teaches the category; /method is where the machine gets taken apart. The
 * assessment stays available as the secondary, because Build Spec v2 section
 * 3 runs 1 conversion path and every page leads to it eventually.
 */
export function BfCta() {
  return (
    <section
      aria-labelledby="bf-cta-heading"
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
              id="bf-cta-heading"
              className="display mt-5 max-w-[14ch] text-[clamp(1.9rem,3.6vw,3rem)] leading-[0.98]"
            >
              You have the concept. Now see the machine.
            </h2>
          </div>
          <div>
            <p className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
              The method is 6 stages, each with an objective, what it produces
              and the metric it is judged on. If you would rather start with
              where your brand sits today, the assessment returns a grade in
              minutes.
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
        </div>
      </Shell>
    </section>
  );
}
