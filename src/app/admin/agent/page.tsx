import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { composeConcierge, DEFAULT_CONCIERGE_HEAD } from "@/lib/concierge";
import { resetPromptHead, savePromptHead } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminAgentPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; reset?: string; error?: string }>;
}) {
  await requireAdmin();
  const { saved, reset, error } = await searchParams;

  const sb = getSupabaseAdmin();
  let override: string | null = null;
  if (sb) {
    const { data } = await sb
      .from("settings")
      .select("value")
      .eq("key", "concierge_head")
      .maybeSingle();
    override = data?.value ?? null;
  }

  const head = override ?? DEFAULT_CONCIERGE_HEAD;
  const fullLength = composeConcierge(override).length;

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-4">
        <h1 className="display text-4xl">Agent</h1>
        <span
          className={`label-mono ${override ? "text-brand" : "text-ink-faint"}`}
        >
          {override ? "Custom instructions active" : "Using default instructions"}
        </span>
      </div>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        This edits the agent&apos;s behavior: identity, discovery playbook, and
        style rules. Its factual knowledge (pricing, services, case studies,
        FAQs) is composed automatically from the website&apos;s own content and
        can&apos;t drift. Changes go live within 30 seconds. Full prompt:
        ~{Math.round(fullLength / 4).toLocaleString("en-US")} tokens.
      </p>

      {saved && (
        <p role="status" className="mt-4 rounded-md border border-brand/40 bg-brand/10 px-4 py-2.5 text-sm text-brand">
          Saved — the agent uses the new instructions within 30 seconds.
        </p>
      )}
      {reset && (
        <p role="status" className="mt-4 rounded-md border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground">
          Reset to the default instructions.
        </p>
      )}
      {error && (
        <p role="alert" className="mt-4 rounded-md border border-destructive/40 bg-card px-4 py-2.5 text-sm text-destructive">
          {error === "nodb" ? "Supabase is not configured — cannot save." : "Save failed — try again."}
        </p>
      )}

      <form action={savePromptHead} className="mt-6 grid gap-4">
        <label htmlFor="agent-head" className="text-sm font-semibold">
          Behavioral instructions
        </label>
        <textarea
          id="agent-head"
          name="head"
          rows={22}
          defaultValue={head}
          spellCheck={false}
          className="w-full rounded-md border border-input bg-card px-4 py-3 font-mono text-base leading-relaxed outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40 md:text-[13px]"
        />
        <div className="flex flex-wrap gap-3">
          <Button type="submit" size="lg" className="text-base">
            Save instructions
          </Button>
          <Button
            type="submit"
            formAction={resetPromptHead}
            size="lg"
            variant="outline"
            className="text-base"
          >
            Reset to default
          </Button>
        </div>
      </form>

      <details className="mt-10">
        <summary className="label-mono cursor-pointer text-muted-foreground">
          View the knowledge block (auto-generated, read-only)
        </summary>
        <pre className="mt-4 max-h-[420px] overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-card p-5 text-xs leading-relaxed text-muted-foreground">
          {composeConcierge(null).slice(DEFAULT_CONCIERGE_HEAD.length).trim()}
        </pre>
      </details>
    </div>
  );
}
