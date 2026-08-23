"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { deliverLead } from "@/lib/leads";
import { siteConfig } from "@/lib/site-config";

// Best-effort per-IP throttle (same caveats as the chat route: in-memory,
// per instance — a backstop against scripts, not a security boundary).
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

const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  company: z.string().trim().min(2, "Please enter your company name."),
  email: z.string().trim().email("Please enter a valid email."),
  phone: z
    .string()
    .trim()
    .min(10, "Please enter a valid phone number.")
    .max(20, "Please enter a valid phone number."),
  trade: z.string().trim().optional(),
  message: z.string().trim().min(10, "Tell us a bit about what you need."),
  // Honeypot: humans never fill this. Parsed permissively so a filled trap
  // reaches the fake-success branch instead of a confusing validation error
  // (browser autofill can fill hidden fields for real visitors too).
  website: z.string().max(500).optional(),
});

export interface LeadFormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "company" | "email" | "phone" | "message", string>>;
}

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (throttled(ip)) {
    return {
      status: "error",
      message: `That's a lot of messages in a row. Give it a few minutes, or call us at ${siteConfig.company.phoneDisplay}.`,
    };
  }

  const parsed = leadSchema.safeParse({
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    trade: formData.get("trade") ?? undefined,
    message: formData.get("message"),
    website: formData.get("website") ?? undefined,
  });

  if (!parsed.success) {
    const fieldErrors: LeadFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (
        field === "name" ||
        field === "company" ||
        field === "email" ||
        field === "phone" ||
        field === "message"
      ) {
        fieldErrors[field] ??= issue.message;
      }
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const lead = parsed.data;

  // Bot check: real visitors never fill the hidden field. Return a fake
  // success so bots learn nothing (mirrors the brand-score form).
  if (lead.website) {
    return { status: "success", message: "Got it — we'll get back to you within one business day." };
  }

  const { stored, delivered } = await deliverLead({
    name: lead.name,
    company: lead.company,
    email: lead.email,
    phone: lead.phone,
    trade: lead.trade,
    message: lead.message,
    source: "contact-form",
  });
  if (!stored && !delivered) {
    return {
      status: "error",
      message: `Something went wrong sending your message. Call us at ${siteConfig.company.phoneDisplay} and we'll pick it up from there.`,
    };
  }

  return {
    status: "success",
    message: "Got it — we'll get back to you within one business day.",
  };
}
