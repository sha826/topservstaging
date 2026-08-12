import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { Lead } from "@/lib/leads";

/**
 * Persists a lead into the Supabase `leads` table — the team's spreadsheet
 * view (Table Editor filters/sorts/exports CSV). Server-only: uses the
 * service-role key, which must never reach client code. Degrades gracefully
 * when Supabase isn't configured so dev without env vars still works.
 */
export async function storeLead(lead: Lead): Promise<{ stored: boolean }> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    console.warn("Supabase not configured — lead not stored:", lead);
    return { stored: false };
  }

  const { error } = await supabase.from("leads").insert({
    source: lead.source,
    name: lead.name,
    company: lead.company ?? null,
    trade: lead.trade ?? null,
    revenue_band: lead.revenueBand ?? null,
    market: lead.market ?? null,
    email: lead.email ?? null,
    phone: lead.phone ?? null,
    goal: lead.goal ?? null,
    current_marketing: lead.currentMarketing ?? null,
    timeline: lead.timeline ?? null,
    notes: lead.message,
  });

  if (error) {
    // Full lead in the log so a failed insert still leaves a recoverable trace.
    console.error("Supabase insert failed — lead not stored:", error, lead);
    return { stored: false };
  }

  return { stored: true };
}
