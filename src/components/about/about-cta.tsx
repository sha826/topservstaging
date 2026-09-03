import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Cols, Eyebrow, Shell } from "@/components/about/page-grid";

/**
 * The close. One next step, never a generic contact prompt.
 *
 * Build Spec v2 section 3 is explicit that the site runs a single conversion
 * path rather than 12 competing calls to action, and that the public
 * diagnostic returns a GRADE. This is step 3 of that path.
 */
export function AboutCta() {
  return (
    <Shell as="section" className="py-20 md:py-28">
      <div className="border-t border-border pt-14 md:pt-16">
        <Cols>
          <div>
            <Eyebrow tone="dark">Next step</Eyebrow>
            <h2
              id="about-cta-heading"
              className="display mt-4 max-w-[12ch] text-[clamp(1.75rem,3.4vw,2.875rem)] leading-[1.04]"
            >
              How strong is your brand<span className="text-brand">?</span>
            </h2>
          </div>
          <div>
            <p className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
              The Brand Assessment reads how well your market actually knows
              you and returns your Brand Grade. Diagnosis first. The program
              comes after.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/brand-assessment">
                  Get Your Brand Grade
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base">
                <Link href="/programs-pricing/overview">See how the program works</Link>
              </Button>
            </div>
          </div>
        </Cols>
      </div>
    </Shell>
  );
}
