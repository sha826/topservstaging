"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { requestBrandScore, type BrandScoreState } from "@/app/brand-score/actions";

const inputClass =
  "w-full rounded-md border border-input bg-card px-4 py-3 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40";

export function BrandScoreForm() {
  const [state, formAction, pending] = useActionState<BrandScoreState, FormData>(
    requestBrandScore,
    {}
  );

  if (state.ok) {
    return (
      <div className="rounded-lg border border-brand/50 bg-brand/10 p-8 text-center">
        <p className="display text-3xl">Your diagnostic is queued.</p>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          We run the 6 component analysis against your market and send your
          score and grade within 2 business days. The grade tells you which
          program fits, and whether now is even the right time.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-4">
      <input
        type="text"
        name="fax"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="bs-name" className="mb-1.5 block text-sm font-semibold">
            Your name
          </label>
          <input id="bs-name" name="name" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="bs-company" className="mb-1.5 block text-sm font-semibold">
            Company
          </label>
          <input id="bs-company" name="company" required autoComplete="organization" className={inputClass} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="bs-market" className="mb-1.5 block text-sm font-semibold">
            Market <span className="font-normal text-muted-foreground">(city, state)</span>
          </label>
          <input id="bs-market" name="market" required placeholder="Frisco, TX" className={inputClass} />
        </div>
        <div>
          <label htmlFor="bs-trade" className="mb-1.5 block text-sm font-semibold">
            Trade <span className="font-normal text-muted-foreground">(the division we score)</span>
          </label>
          <input id="bs-trade" name="trade" placeholder="HVAC, plumbing, roofing…" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="bs-website" className="mb-1.5 block text-sm font-semibold">
          Website
        </label>
        <input id="bs-website" name="website" type="url" placeholder="https://" autoComplete="url" className={inputClass} />
      </div>
      <p className="text-sm font-semibold">
        How the score reaches you{" "}
        <span className="font-normal text-muted-foreground">(at least 1 required)</span>
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="bs-email" className="mb-1.5 block text-sm font-semibold">
            Email
          </label>
          <input id="bs-email" name="email" type="email" autoComplete="email" className={inputClass} />
        </div>
        <div>
          <label htmlFor="bs-phone" className="mb-1.5 block text-sm font-semibold">
            Phone
          </label>
          <input id="bs-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </div>
      </div>

      {state.error && (
        <p role="alert" className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="text-base">
        {pending ? "Sending…" : "Get my Brand Score"}
      </Button>
      <p className="text-xs text-ink-faint">
        No spam, no drip sequence. You get the score, the grade, and what they
        mean. What you do with them is up to you.
      </p>
    </form>
  );
}
