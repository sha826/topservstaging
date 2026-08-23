"use server";

import { headers } from "next/headers";
import { deliverLead } from "@/lib/leads";
import { siteConfig } from "@/lib/site-config";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

// Best-effort per-IP throttle (in-memory, per instance — a backstop against
// scripts hammering the primary conversion form, not a security boundary).
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export interface BrandScoreState {
  ok?: boolean;
  error?: string;
}

/**
 * Brand Score request: the site's primary conversion. Captures the lead and
 * routes it to the team, who run the 6 component diagnostic. The automated
 * public engine plugs in behind this same form once its data source is
 * decided (open decision 3 in the build spec).
 */
export async function requestBrandScore(
  _prev: BrandScoreState,
  formData: FormData
): Promise<BrandScoreState> {
  // Honeypot: humans never fill this field.
  if (String(formData.get("fax") ?? "")) {
    return { ok: true };
  }
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (throttled(ip)) {
    return {
      error: `That's a lot of requests in a row. Give it a few minutes, or call ${siteConfig.company.phoneDisplay}.`,
    };
  }

  const name = String(formData.get("name") ?? "").trim().slice(0, 120);
  const company = String(formData.get("company") ?? "").trim().slice(0, 160);
  const market = String(formData.get("market") ?? "").trim().slice(0, 120);
  const trade = String(formData.get("trade") ?? "").trim().slice(0, 80);
  const website = String(formData.get("website") ?? "").trim().slice(0, 200);
  const email = String(formData.get("email") ?? "").trim().slice(0, 160);
  const phone = String(formData.get("phone") ?? "").trim().slice(0, 40);

  if (!name || !company || !market) {
    return { error: "Name, company and market are required." };
  }
  if (!email && !phone) {
    return { error: "Leave an email or a phone number so the score can reach you." };
  }

  const { stored, delivered } = await deliverLead({
    name,
    company,
    market,
    trade: trade || undefined,
    email: email || undefined,
    phone: phone || undefined,
    currentMarketing: website ? `Website: ${website}` : undefined,
    attribution: "Brand Score request form",
    message: `Brand Score request${trade ? ` for the ${trade} division` : ""}${website ? ` (${website})` : ""}`,
    source: "contact-form",
  });

  if (!stored && !delivered) {
    return { error: `Something failed on our side. Call us instead: ${siteConfig.company.phoneDisplay}.` };
  }

  // Brand Score completions are the site's primary conversion metric
  // (build spec, section 12). Best-effort event; never blocks the user.
  try {
    await getSupabaseAdmin()
      ?.from("page_views")
      .insert({ path: "/brand-score/completed", referrer: null, ua: "event" });
  } catch {}

  return { ok: true };
}
