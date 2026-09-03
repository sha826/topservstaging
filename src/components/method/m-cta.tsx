import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Shell } from "@/components/method/m-grid";

/**
 * The close.
 *
 * ARGUMENT SPINE, /method: the CTA is "See what this delivers". This page
 * shows the machine; Programs page 3 shows what comes out of it. The
 * assessment stays as the secondary, because Build Spec v2 section 3 runs 1
 * conversion path and every page leads to it eventually.
 */
export function MCta() {
  return (
    <section
      aria-labelledby="m-cta-heading"
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
              id="m-cta-heading"
              className="display mt-5 max-w-[14ch] text-[clamp(1.9rem,3.6vw,3rem)] leading-[0.98]"
            >
              You can see the machine. Now see what it produces.
            </h2>
          </div>
          <div>
            <p className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
              What improves in the first 90 days, what does not happen in the
              first 30, and why branded demand converts at a better rate than
              demand you rent. If you would rather start with where your brand
              sits today, the assessment returns a grade in minutes.
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
