import { getSupabaseAdmin } from "@/lib/supabase-admin";

// Generous per-IP cap: real browsing never hits it, loops do (in-memory,
// per instance — a backstop, not a security boundary).
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 30;
const hits = new Map<string, number[]>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

/**
 * Pageview beacon. Always answers 204 — analytics must never break the
 * site. Admin paths are excluded at both ends.
 */
export async function POST(req: Request) {
  try {
    const sb = getSupabaseAdmin();
    if (!sb) return new Response(null, { status: 204 });

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (throttled(ip)) return new Response(null, { status: 204 });

    const body = await req.json().catch(() => null);
    const path = typeof body?.path === "string" ? body.path.slice(0, 300) : null;
    if (!path || !path.startsWith("/") || path.startsWith("/admin")) {
      return new Response(null, { status: 204 });
    }

    await sb.from("page_views").insert({
      path,
      referrer:
        typeof body?.referrer === "string" && body.referrer
          ? body.referrer.slice(0, 500)
          : null,
      ua: (req.headers.get("user-agent") ?? "").slice(0, 300) || null,
    });
  } catch {
    // Swallow everything: a failed beacon is not a user-facing problem.
  }
  return new Response(null, { status: 204 });
}
