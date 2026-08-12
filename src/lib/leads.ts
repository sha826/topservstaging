import { Resend } from "resend";
import { storeLead } from "@/lib/lead-store";
import { siteConfig } from "@/lib/site-config";

export interface Lead {
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  trade?: string;
  /** Rough annual revenue band, e.g. "$2M–$5M" — maps to a pricing plan. */
  revenueBand?: string;
  /** Service area / city, e.g. "Frisco, TX". */
  market?: string;
  /** What marketing they currently run. */
  currentMarketing?: string;
  /** What got them looking, verbatim — the sales team's close anchor. */
  attribution?: string;
  /** What they dislike about current results, verbatim. */
  painPoints?: string;
  /** Monthly marketing spend, all-in. */
  marketingSpend?: string;
  /** Whether they own the marketing decision. */
  decisionRole?: string;
  /** Their main growth goal in their own words. */
  goal?: string;
  /** How soon they want to start. */
  timeline?: string;
  message: string;
  source: "contact-form" | "chat";
}

/**
 * Delivers a lead to BOTH channels, each best-effort and individually
 * reported: the Supabase `leads` table (the team's sheet) and the team inbox
 * via Resend. A lead is never silently dropped — every failure path logs the
 * full payload server-side.
 */
export async function deliverLead(
  lead: Lead
): Promise<{ stored: boolean; delivered: boolean }> {
  const { stored } = await storeLead(lead);
  const delivered = await emailLead(lead);
  return { stored, delivered };
}

async function emailLead(lead: Lead): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — lead not emailed:", lead);
    return false;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.LEAD_EMAIL_FROM || "TopServ Website <onboarding@resend.dev>",
    to: process.env.LEAD_EMAIL_TO || siteConfig.company.email,
    replyTo: lead.email,
    subject: `New ${lead.source === "chat" ? "chat" : "website"} lead: ${lead.name}${lead.company ? ` — ${lead.company}` : ""}`,
    text: [
      `Source: ${lead.source === "chat" ? "AI concierge chat" : "Contact form"}`,
      `Name: ${lead.name}`,
      lead.company ? `Company: ${lead.company}` : null,
      lead.email ? `Email: ${lead.email}` : null,
      lead.phone ? `Phone: ${lead.phone}` : null,
      lead.trade ? `Trade: ${lead.trade}` : null,
      lead.revenueBand ? `Annual revenue: ${lead.revenueBand}` : null,
      lead.market ? `Market: ${lead.market}` : null,
      lead.attribution ? `What got them looking (their words): ${lead.attribution}` : null,
      lead.currentMarketing ? `Current marketing: ${lead.currentMarketing}` : null,
      lead.painPoints ? `Pain (their words): ${lead.painPoints}` : null,
      lead.marketingSpend ? `Marketing spend: ${lead.marketingSpend}` : null,
      lead.decisionRole ? `Decision role: ${lead.decisionRole}` : null,
      lead.goal ? `Goal: ${lead.goal}` : null,
      lead.timeline ? `Timeline: ${lead.timeline}` : null,
      "",
      lead.message,
    ]
      .filter((line): line is string => line !== null)
      .join("\n"),
  });

  // Resend never throws — failures come back as { error }. Log the full
  // lead so a failed send still leaves a recoverable trace in server logs.
  if (error) {
    console.error("Resend send failed — lead not emailed:", error, lead);
    return false;
  }

  return true;
}
