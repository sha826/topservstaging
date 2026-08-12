"use server";

import { z } from "zod";
import { deliverLead } from "@/lib/leads";
import { siteConfig } from "@/lib/site-config";

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
  // Honeypot: humans never fill this.
  website: z.string().max(0).optional(),
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

  try {
    await deliverLead({
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      trade: lead.trade,
      message: lead.message,
      source: "contact-form",
    });
  } catch (error) {
    console.error("Lead email failed:", error);
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
