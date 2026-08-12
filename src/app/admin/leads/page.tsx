import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { ExportCsv } from "@/components/admin/export-csv";

export const dynamic = "force-dynamic";

interface LeadRow {
  created_at: string;
  source: string;
  name: string;
  company: string | null;
  trade: string | null;
  revenue_band: string | null;
  market: string | null;
  email: string | null;
  phone: string | null;
  attribution?: string | null;
  pain_points?: string | null;
  marketing_spend?: string | null;
  decision_role?: string | null;
  goal: string | null;
  current_marketing: string | null;
  timeline: string | null;
  notes: string | null;
}

const COLUMNS: { key: keyof LeadRow; label: string }[] = [
  { key: "created_at", label: "When" },
  { key: "source", label: "Source" },
  { key: "name", label: "Name" },
  { key: "company", label: "Company" },
  { key: "trade", label: "Trade" },
  { key: "revenue_band", label: "Revenue" },
  { key: "market", label: "Market" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "attribution", label: "Why now (their words)" },
  { key: "pain_points", label: "Pain (their words)" },
  { key: "marketing_spend", label: "Spend/mo" },
  { key: "decision_role", label: "Decides?" },
  { key: "goal", label: "Goal" },
  { key: "timeline", label: "Timeline" },
  { key: "notes", label: "Notes" },
];

export default async function AdminLeadsPage() {
  await requireAdmin();
  const sb = getSupabaseAdmin();
  let rows: LeadRow[] = [];
  if (sb) {
    const { data } = await sb
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    rows = (data as LeadRow[]) ?? [];
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="display text-4xl">
          Leads <span className="text-brand">({rows.length})</span>
        </h1>
        <ExportCsv rows={rows as unknown as Record<string, unknown>[]} filename="topserv-leads.csv" />
      </div>

      {rows.length === 0 ? (
        <p className="mt-8 rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
          No leads captured yet. They arrive here from the chat agent and the
          contact form.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[1500px] border-collapse text-sm">
            <thead>
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className="label-mono border-b border-border bg-card px-3.5 py-3 text-left text-ink-faint"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="odd:bg-card/50">
                  {COLUMNS.map((col) => (
                    <td
                      key={col.key}
                      className="min-w-[110px] max-w-[280px] border-b border-border/50 px-3.5 py-2.5 align-top text-muted-foreground [overflow-wrap:anywhere]"
                    >
                      {col.key === "created_at"
                        ? row.created_at.slice(0, 16).replace("T", " ")
                        : (row[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
