"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { requestAssessment, type AssessmentState } from "@/app/brand-assessment/actions";

const inputClass =
  "w-full rounded-md border border-input bg-card px-4 py-3 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40";

export function BrandAssessmentForm() {
  const [state, formAction, pending] = useActionState<AssessmentState, FormData>(
    requestAssessment,
    {}
  );

  if (state.ok) {
    return (
      <div className="rounded-lg border border-brand/50 bg-brand/10 p-8 text-center">
        <p className="display text-3xl">Your assessment is queued.</p>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          We run the assessment against your market and send your Brand Grade
          within 2 business days, with what it means for your business and
          the right next step.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-4">
      <input type="text" name="fax" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="ba-name" className="mb-1.5 block text-sm font-semibold">
            Your name
          </label>
          <input id="ba-name" name="name" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ba-company" className="mb-1.5 block text-sm font-semibold">
            Company
          </label>
          <input id="ba-company" name="company" required autoComplete="organization" className={inputClass} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="ba-market" className="mb-1.5 block text-sm font-semibold">
            Market <span className="font-normal text-muted-foreground">(city, state)</span>
          </label>
          <input id="ba-market" name="market" required placeholder="Frisco, TX" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ba-trade" className="mb-1.5 block text-sm font-semibold">
            Trade <span className="font-normal text-muted-foreground">(the division we grade)</span>
          </label>
          <input id="ba-trade" name="trade" placeholder="HVAC, plumbing, roofing…" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="ba-website" className="mb-1.5 block text-sm font-semibold">
          Website
        </label>
        <input id="ba-website" name="website" type="url" placeholder="https://" autoComplete="url" className={inputClass} />
      </div>

      <p className="text-sm font-semibold">
        Optional, sharpens your grade{" "}
        <span className="font-normal text-muted-foreground">(never required)</span>
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="ba-revenue" className="mb-1.5 block text-sm font-semibold">
            Annual revenue
          </label>
          <select id="ba-revenue" name="revenue" className={inputClass} defaultValue="">
            <option value="">Prefer not to say</option>
            <option>Under $1M</option>
            <option>$1M to $3M</option>
            <option>$3M to $5M</option>
            <option>$5M to $10M</option>
            <option>Over $10M</option>
          </select>
        </div>
        <div>
          <label htmlFor="ba-membership" className="mb-1.5 block text-sm font-semibold">
            Membership program?
          </label>
          <select id="ba-membership" name="membership" className={inputClass} defaultValue="">
            <option value="">Prefer not to say</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>

      <p className="text-sm font-semibold">
        How the grade reaches you{" "}
        <span className="font-normal text-muted-foreground">(at least 1 required)</span>
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="ba-email" className="mb-1.5 block text-sm font-semibold">
            Email
          </label>
          <input id="ba-email" name="email" type="email" autoComplete="email" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ba-phone" className="mb-1.5 block text-sm font-semibold">
            Phone
          </label>
          <input id="ba-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </div>
      </div>

      {state.error && (
        <p role="alert" className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="text-base">
        {pending ? "Sending…" : "Get My Brand Grade"}
      </Button>
      <p className="text-xs text-ink-faint">
        No spam, no drip sequence. You get the grade and what it means. What
        you do with it is up to you.
      </p>
    </form>
  );
}
