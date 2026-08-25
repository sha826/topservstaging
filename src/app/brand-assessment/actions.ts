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

export interface AssessmentState {
  ok?: boolean;
  error?: string;
}

/**
 * Brand Assessment request: the site's primary conversion (spec v2 §5.2).
 * Returns a GRADE, never a number. Captures the lead plus the optional
 * inputs that sharpen the grade and pre-populate the console. The automated
 * grade engine (public mode of the scoring engine) plugs in behind this
 * same form; until then the team runs it and sends the grade.
 */
export async function requestAssessment(
  _prev: AssessmentState,
  formData: FormData
): Promise<AssessmentState> {
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
  const revenue = String(formData.get("revenue") ?? "").trim().slice(0, 40);
  const membership = String(formData.get("membership") ?? "").trim().slice(0, 10);
  const email = String(formData.get("email") ?? "").trim().slice(0, 160);
  const phone = String(formData.get("phone") ?? "").trim().slice(0, 40);

  if (!name || !company || !market) {
    return { error: "Name, company and market are required." };
  }
  if (!email && !phone) {
    return { error: "Leave an email or a phone number so the grade can reach you." };
  }

  const extras = [
    website ? `Website: ${website}` : "",
    revenue ? `Revenue: ${revenue}` : "",
    membership ? `Membership program: ${membership}` : "",
  ]
    .filter(Boolean)
    .join(" · ");

  const { stored, delivered } = await deliverLead({
    name,
    company,
    market,
    trade: trade || undefined,
    email: email || undefined,
    phone: phone || undefined,
    revenueBand: revenue || undefined,
    currentMarketing: extras || undefined,
    attribution: "Brand Assessment request form",
    message: `Brand Grade request${trade ? ` for the ${trade} division` : ""}${extras ? ` (${extras})` : ""}`,
    source: "contact-form",
  });

  if (!stored && !delivered) {
    return { error: `Something failed on our side. Call us instead: ${siteConfig.company.phoneDisplay}.` };
  }

  // Assessment completions are the site's primary conversion metric
  // (spec v2 §14). Best-effort event; never blocks the user.
  try {
    await getSupabaseAdmin()
      ?.from("page_views")
      .insert({ path: "/brand-assessment/completed", referrer: null, ua: "event" });
  } catch {}

  return { ok: true };
}
