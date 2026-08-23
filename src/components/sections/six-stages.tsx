import { Reveal } from "@/components/motion/reveal";
import { sixStages } from "@/lib/bf-content";

/** The 6 stage system, rendered as the numbered grid used on Home and Method. */
export function SixStages({ compact = false }: { compact?: boolean }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sixStages.map((stage, i) => (
        <li key={stage.n} className="h-full">
          <Reveal delay={Math.min(i * 0.05, 0.25)} className="h-full">
            <div className="flex h-full flex-col gap-2 rounded-lg border border-border bg-card p-6">
              <span className="label-mono text-brand">Stage {stage.n}</span>
              <span className="display text-2xl">{stage.name}</span>
              {!compact && (
                <span className="text-sm leading-relaxed text-muted-foreground">{stage.what}</span>
              )}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
