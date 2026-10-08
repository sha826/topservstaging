import { Reveal } from "@/components/motion/reveal";
import {
  anonymousClient,
  namesCleared,
  namesWithheldNote,
  sixClients,
} from "@/lib/bf-content";

/**
 * The 6 client results the spec names. Real numbers, no vanity metrics.
 *
 * NAMES. Build Spec v2 section 15, Decision 1 is open: which of the 6 clients
 * can be named publicly is Ryan and JB's call and has not been made. So the
 * card carries market plus outcome only, which is the Argument Spine's
 * documented fallback, and the same treatment the programs page growth
 * diagram already uses. The names live in bf-content.ts and appear here only
 * once namesCleared flips.
 */
export function ProofClients() {
  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sixClients.map((c, i) => (
          <li key={`${c.market}-${c.result}`} className="h-full">
            <Reveal delay={Math.min(i * 0.05, 0.25)} className="h-full">
              <div className="flex h-full flex-col gap-2 rounded-lg border border-border bg-card p-6">
                <span className="label-mono text-ink-faint">{c.market}</span>
                <span className="display text-2xl">
                  {namesCleared ? c.client : anonymousClient}
                </span>
                <span className="mt-1 text-3xl font-bold text-brand">{c.result}</span>
                <span className="text-sm text-muted-foreground">{c.detail}</span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      {!namesCleared && (
        <Reveal>
          <p className="mt-5 text-sm text-ink-faint">{namesWithheldNote}</p>
        </Reveal>
      )}
    </>
  );
}
