import { getSupabaseAdmin } from "@/lib/supabase-admin";

/**
 * Pageview beacon. Always answers 204 — analytics must never break the
 * site. Admin paths are excluded at both ends.
 */
export async function POST(req: Request) {
  try {
    const sb = getSupabaseAdmin();
    if (!sb) return new Response(null, { status: 204 });

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
