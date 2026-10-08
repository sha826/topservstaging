import { Reveal } from "@/components/motion/reveal";
import { homePartnerCompanies } from "@/lib/testimonials";

/**
 * The clients the home page names.
 *
 * WHY THERE ARE NO NUMBERS HERE ANY MORE. This band used to render
 * sixClients: 6 rows of real before and after revenue, shown without names
 * while Decision 1 stayed open. Shaw asked for these 5 companies instead,
 * the ones whose logos the page already publishes.
 *
 * They are not the same 6 companies. sixClients is All Heart Heating, Your
 * New Door, Nick AC, Zen Air, C and S Air and Spencer Air; only Spencer
 * appears in both lists, and the trades do not even overlap, since these 5
 * include windows, electrical and septic. Moving the figures across would
 * have credited each of these companies with another company's revenue on a
 * public page, so the figures did not come with the names.
 *
 * sixClients is untouched in bf-content.ts, still carrying its real numbers
 * and still consumed by the growth diagram on the programs pages. When the
 * real figures for these 5 arrive, this becomes a data change.
 *
 * The names themselves are already public: the same 5 logos sit further
 * down this page, so naming them here states nothing new. Each trade is
 * printed on that company's own logo.
 */
export function ProofClients() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {homePartnerCompanies.map((c, i) => (
        <li key={c.name} className="h-full">
          <Reveal delay={Math.min(i * 0.05, 0.25)} className="h-full">
            <div className="flex h-full flex-col gap-2 rounded-lg border border-border bg-card p-6">
              <span className="label-mono text-ink-faint">{c.trade}</span>
              <span className="display text-2xl">{c.name}</span>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
