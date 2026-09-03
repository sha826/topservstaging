import { Shell } from "@/components/about/page-grid";

/**
 * Why TopServ Digital exists.
 *
 * THE ARGUMENT, AND WHY THERE IS NO DEVICE HERE. v6 carried 2 panels
 * illustrating rented versus owned attention. They were removed on request.
 * The page already opens on the methodology climb and turns on the 6 rules,
 * so this section is deliberately the quiet beat between them: a statement
 * and 2 paragraphs, nothing else. Copy Framework 24's rented versus owned
 * explanation lives on /brandformance, which teaches it properly.
 *
 * The long form belongs to /brandformance and /method, which teach the
 * methodology properly. Here it lands in one beat.
 *
 * Motion is CSS view-timeline only, transform based, so this section costs
 * nothing on scroll and degrades to the finished state with no JS.
 */

export function WhyWeExist() {
  return (
    <section
      aria-labelledby="why-heading"
      className="relative isolate overflow-hidden border-b border-border bg-background"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_88%_8%,rgba(158,216,68,0.12),transparent_62%)]"
      />

      <Shell className="py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:gap-14">
          <div>
            <p className="label-mono flex items-center gap-2.5 text-[rgba(244,245,242,0.85)]">
              <span aria-hidden className="block size-2 rounded-full bg-brand" />
              Why we exist
            </p>
            <h2
              id="why-heading"
              className="display mt-5 max-w-[11ch] text-[clamp(1.9rem,4vw,3.25rem)] leading-[0.96]"
            >
              Most marketing returns to zero.
            </h2>
          </div>

          <div className="grid gap-5 text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Generate leads, chase clicks, fight over rankings, rent attention,
              repeat. It is the model almost every agency sells, and it works
              right up until you stop paying for it. Nothing built inside it
              ever belonged to you.
            </p>
            <p>
              We started this company because the operators we admired were not
              winning that way. They were winning because the customer already
              knew the name before anything broke.
            </p>
          </div>
        </div>

      </Shell>
    </section>
  );
}
