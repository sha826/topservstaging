"use client";

import { useActionState } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitLead, type LeadFormState } from "@/app/contact/actions";
import { industries } from "@/lib/content";
import { cn } from "@/lib/utils";

const initialState: LeadFormState = { status: "idle" };

const inputClass =
  "w-full rounded-md border border-input bg-card px-4 py-3 text-base text-foreground placeholder:text-ink-faint outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-destructive">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-lg border border-border bg-card p-8"
      >
        <CheckCircle2 className="size-8 text-brand" aria-hidden />
        <p className="text-xl font-semibold">Message sent.</p>
        <p className="text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="mb-1.5 block text-sm font-semibold">
            Your name
          </label>
          <input
            id="lead-name"
            name="name"
            autoComplete="name"
            required
            className={cn(inputClass, state.fieldErrors?.name && "border-destructive")}
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={state.fieldErrors?.name ? "lead-name-error" : undefined}
          />
          <FieldError id="lead-name-error" message={state.fieldErrors?.name} />
        </div>
        <div>
          <label htmlFor="lead-company" className="mb-1.5 block text-sm font-semibold">
            Company
          </label>
          <input
            id="lead-company"
            name="company"
            autoComplete="organization"
            required
            className={cn(inputClass, state.fieldErrors?.company && "border-destructive")}
            aria-invalid={Boolean(state.fieldErrors?.company)}
            aria-describedby={state.fieldErrors?.company ? "lead-company-error" : undefined}
          />
          <FieldError id="lead-company-error" message={state.fieldErrors?.company} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-email" className="mb-1.5 block text-sm font-semibold">
            Email
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={cn(inputClass, state.fieldErrors?.email && "border-destructive")}
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={state.fieldErrors?.email ? "lead-email-error" : undefined}
          />
          <FieldError id="lead-email-error" message={state.fieldErrors?.email} />
        </div>
        <div>
          <label htmlFor="lead-phone" className="mb-1.5 block text-sm font-semibold">
            Phone
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            className={cn(inputClass, state.fieldErrors?.phone && "border-destructive")}
            aria-invalid={Boolean(state.fieldErrors?.phone)}
            aria-describedby={state.fieldErrors?.phone ? "lead-phone-error" : undefined}
          />
          <FieldError id="lead-phone-error" message={state.fieldErrors?.phone} />
        </div>
      </div>

      <div>
        <label htmlFor="lead-trade" className="mb-1.5 block text-sm font-semibold">
          Your trade
        </label>
        <select id="lead-trade" name="trade" className={inputClass} defaultValue="">
          <option value="">Select one (optional)</option>
          {industries.map((industry) => (
            <option key={industry.slug} value={industry.trade}>
              {industry.trade}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="lead-message" className="mb-1.5 block text-sm font-semibold">
          What do you need?
        </label>
        <textarea
          id="lead-message"
          name="message"
          rows={5}
          required
          placeholder="Tell us about your company and what you're trying to grow."
          className={cn(inputClass, "resize-y", state.fieldErrors?.message && "border-destructive")}
          aria-invalid={Boolean(state.fieldErrors?.message)}
          aria-describedby={state.fieldErrors?.message ? "lead-message-error" : undefined}
        />
        <FieldError id="lead-message-error" message={state.fieldErrors?.message} />
      </div>

      {/* Honeypot — visually hidden, tabbed past by humans, filled by bots */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="lead-website">Website</label>
        <input id="lead-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Announced on every failed submit — field errors alone are silent
          to screen readers, so the summary always renders on error. */}
      {state.status === "error" && (
        <p role="alert" className="text-sm text-destructive">
          {state.fieldErrors
            ? "Some fields need attention. Check the messages above."
            : state.message}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="justify-self-start text-base">
        {pending && <LoaderCircle className="size-4 animate-spin" aria-hidden />}
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
