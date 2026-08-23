import { Reveal } from "@/components/motion/reveal";
import { sixClients } from "@/lib/bf-content";

/**
 * The 6 client results the spec names. Real numbers, no vanity metrics.
 * Which clients can be named publicly is an open decision (Ryan, JB); the
 * data here is the spec's own table and swaps easily if names change.
 */
export function ProofClients() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sixClients.map((c, i) => (
        <li key={c.client} className="h-full">
          <Reveal delay={Math.min(i * 0.05, 0.25)} className="h-full">
            <div className="flex h-full flex-col gap-2 rounded-lg border border-border bg-card p-6">
              <span className="label-mono text-ink-faint">{c.market}</span>
              <span className="display text-2xl">{c.client}</span>
              <span className="mt-1 text-3xl font-bold text-brand">{c.result}</span>
              <span className="text-sm text-muted-foreground">{c.detail}</span>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
