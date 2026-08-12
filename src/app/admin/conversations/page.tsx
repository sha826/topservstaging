import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

interface ConversationRow {
  conversation_id: string;
  created_at: string;
  updated_at: string;
  transcript: {
    messages?: {
      role?: string;
      parts?: { type?: string; text?: string; state?: string }[];
    }[];
    reply?: {
      text?: string;
      tools?: { name?: string; input?: unknown; output?: unknown }[];
    };
  } | null;
  message_count: number | null;
  lead_captured: boolean | null;
}

function textOf(m: NonNullable<ConversationRow["transcript"]>["messages"] extends (infer T)[] | undefined ? T : never): string {
  return (m.parts ?? [])
    .filter((p) => p.type === "text" && p.text)
    .map((p) => p.text)
    .join("\n");
}

export default async function AdminConversationsPage() {
  await requireAdmin();
  const sb = getSupabaseAdmin();
  let rows: ConversationRow[] = [];
  if (sb) {
    const { data } = await sb
      .from("conversations")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(50);
    rows = (data as ConversationRow[]) ?? [];
  }

  return (
    <div>
      <h1 className="display text-4xl">
        Conversations <span className="text-brand">({rows.length})</span>
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Every chat with the agent, newest first — for grading answers and
        catching mistakes. A green badge means the conversation produced a
        captured lead.
      </p>

      {rows.length === 0 && (
        <p className="mt-8 rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
          No conversations saved yet. They appear as soon as visitors talk to
          the agent.
        </p>
      )}

      <ul className="mt-8 grid gap-3">
        {rows.map((row) => (
          <li key={row.conversation_id}>
            <details className="group rounded-lg border border-border bg-card">
              <summary className="flex cursor-pointer flex-wrap items-baseline gap-x-4 gap-y-1 p-5">
                <span className="font-mono text-xs text-ink-faint">
                  {row.updated_at.slice(0, 16).replace("T", " ")}
                </span>
                <span className="text-sm text-muted-foreground">
                  {row.message_count ?? "?"} messages
                </span>
                {row.lead_captured && (
                  <span className="label-mono rounded-sm border border-brand/50 bg-brand/10 px-2 py-0.5 text-brand">
                    Lead captured
                  </span>
                )}
                <span className="label-mono ml-auto text-ink-faint group-open:hidden">
                  Expand
                </span>
              </summary>
              <div className="grid gap-3 border-t border-border p-5">
                {(row.transcript?.messages ?? []).map((m, i) => {
                  const text = textOf(m);
                  if (!text) return null;
                  return (
                    <div
                      key={i}
                      className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "ml-auto bg-brand/15 text-foreground"
                          : "border border-border bg-background text-muted-foreground"
                      }`}
                    >
                      <span className="label-mono mb-1 block text-[10px] text-ink-faint">
                        {m.role}
                      </span>
                      <span className="whitespace-pre-wrap">{text}</span>
                    </div>
                  );
                })}
                {row.transcript?.reply?.text && (
                  <div className="max-w-[85%] rounded-lg border border-border bg-background px-4 py-2.5 text-sm leading-relaxed text-muted-foreground">
                    <span className="label-mono mb-1 block text-[10px] text-ink-faint">
                      assistant (final)
                    </span>
                    <span className="whitespace-pre-wrap">{row.transcript.reply.text}</span>
                  </div>
                )}
                {(row.transcript?.reply?.tools ?? []).map((tool, i) => (
                  <pre
                    key={i}
                    className="overflow-x-auto rounded-lg border border-brand/30 bg-background p-4 text-xs leading-relaxed text-muted-foreground"
                  >
                    {`tool: ${tool.name}\ninput: ${JSON.stringify(tool.input, null, 2)}\noutput: ${JSON.stringify(tool.output, null, 2)}`}
                  </pre>
                ))}
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
