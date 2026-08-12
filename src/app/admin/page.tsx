import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { getFilePosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface ViewRow {
  created_at: string;
  path: string;
}

function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <p className="label-mono text-ink-faint">{label}</p>
      <p className="display mt-2 text-4xl text-brand">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export default async function AdminDashboard() {
  await requireAdmin();
  const sb = getSupabaseAdmin();

  const now = Date.now();
  const dayMs = 86_400_000;
  const since30 = new Date(now - 30 * dayMs).toISOString();

  let views: ViewRow[] = [];
  let leadRows: { created_at: string; name: string; source: string; trade: string | null }[] = [];
  let leadCount = 0;
  let dbPostCount = 0;

  if (sb) {
    const [v, l, lc, p] = await Promise.all([
      sb.from("page_views").select("created_at, path").gte("created_at", since30).limit(20000),
      sb.from("leads").select("created_at, name, source, trade").order("created_at", { ascending: false }).limit(6),
      sb.from("leads").select("id", { count: "exact", head: true }),
      sb.from("posts").select("id", { count: "exact", head: true }),
    ]);
    views = (v.data as ViewRow[]) ?? [];
    leadRows = (l.data as typeof leadRows) ?? [];
    leadCount = lc.count ?? 0;
    dbPostCount = p.count ?? 0;
  }

  const dayKey = (iso: string) => iso.slice(0, 10);
  const todayKey = dayKey(new Date(now).toISOString());
  const viewsToday = views.filter((v) => dayKey(v.created_at) === todayKey).length;
  const views7 = views.filter((v) => now - Date.parse(v.created_at) < 7 * dayMs).length;

  // Last 14 days, oldest first, zero-filled.
  const days: { key: string; count: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const key = dayKey(new Date(now - i * dayMs).toISOString());
    days.push({ key, count: 0 });
  }
  const dayIndex = new Map(days.map((d, i) => [d.key, i]));
  for (const v of views) {
    const i = dayIndex.get(dayKey(v.created_at));
    if (i !== undefined) days[i].count++;
  }
  const maxDay = Math.max(1, ...days.map((d) => d.count));

  const pathCounts = new Map<string, number>();
  for (const v of views) {
    if (now - Date.parse(v.created_at) < 7 * dayMs) {
      pathCounts.set(v.path, (pathCounts.get(v.path) ?? 0) + 1);
    }
  }
  const topPaths = [...pathCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);

  const totalPosts = dbPostCount + getFilePosts().length;

  return (
    <div>
      <h1 className="display text-4xl">Dashboard</h1>

      {!sb && (
        <p className="mt-6 rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">
          Supabase is not configured — analytics and leads will appear once
          SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set and the tables exist.
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Views today" value={viewsToday} />
        <StatCard label="Views · 7 days" value={views7} />
        <StatCard label="Leads captured" value={leadCount} hint="chat + contact form" />
        <StatCard label="Blog posts" value={totalPosts} hint={`${dbPostCount} in database`} />
      </div>

      <div className="mt-8 rounded-lg border border-border bg-card p-6">
        <p className="label-mono text-ink-faint">Daily views · last 14 days</p>
        <div className="mt-4 flex h-28 items-end gap-1.5">
          {days.map((d) => (
            <div
              key={d.key}
              title={`${d.key}: ${d.count} views`}
              className="flex-1 rounded-t-sm bg-brand/70 transition-colors hover:bg-brand"
              style={{ height: `${Math.max(3, (d.count / maxDay) * 100)}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-ink-faint">
          <span>{days[0]?.key}</span>
          <span>{days[days.length - 1]?.key}</span>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="label-mono text-ink-faint">Top pages · 7 days</p>
          <ul className="mt-4 grid gap-2 text-sm">
            {topPaths.length === 0 && <li className="text-muted-foreground">No views recorded yet.</li>}
            {topPaths.map(([path, count]) => (
              <li key={path} className="flex items-baseline justify-between gap-4">
                <span className="truncate font-mono text-[13px]">{path}</span>
                <span className="text-brand">{count}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-baseline justify-between">
            <p className="label-mono text-ink-faint">Recent leads</p>
            <Link href="/admin/leads" className="label-mono text-brand">
              View all
            </Link>
          </div>
          <ul className="mt-4 grid gap-2 text-sm">
            {leadRows.length === 0 && <li className="text-muted-foreground">No leads yet.</li>}
            {leadRows.map((lead, i) => (
              <li key={i} className="flex items-baseline justify-between gap-4">
                <span className="truncate">
                  <strong>{lead.name}</strong>
                  {lead.trade ? ` · ${lead.trade}` : ""}
                </span>
                <span className="shrink-0 text-xs text-ink-faint">
                  {lead.source} · {formatDate(lead.created_at.slice(0, 10))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
