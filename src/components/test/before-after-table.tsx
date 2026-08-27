import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { beforeAfter } from "@/lib/bf-content";

/**
 * The transformation, as a real <table>.
 *
 * SEO Guidelines section 5.7: visual explanations of before and after must
 * carry an HTML text equivalent so the content is crawlable and extractable.
 * A semantic table with a caption and column headers gives assistive tech and
 * AI extraction the same pairing a sighted reader sees, which a grid of divs
 * cannot. Content comes from bf-content.ts, so the copy stays in 1 place.
 */
export function BeforeAfterTable() {
  return (
    <Reveal>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            What changes when a home service company runs BrandFormance,
            compared with capture only marketing
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th
                scope="col"
                className="label-mono w-1/2 px-6 py-4 font-normal text-ink-faint"
              >
                Before BrandFormance
              </th>
              <th
                scope="col"
                className="label-mono w-1/2 px-6 py-4 font-normal text-brand"
              >
                After BrandFormance
              </th>
            </tr>
          </thead>
          <tbody>
            {beforeAfter.map((row) => (
              <tr key={row.before} className="border-b border-border align-top">
                <td className="px-6 py-5 text-base leading-relaxed text-muted-foreground">
                  {row.before}
                </td>
                <td className="px-6 py-5 text-base font-semibold leading-relaxed">
                  <span className="flex items-baseline gap-3">
                    <ArrowRight
                      className="hidden size-4 shrink-0 translate-y-0.5 text-brand sm:block"
                      aria-hidden
                    />
                    {row.after}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}
