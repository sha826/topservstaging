import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Layout primitives for /brandformance.
 *
 * Widths come from Build Spec v2 section 9: content maximum 1200 pixels,
 * text sections maximum 800. Shell is the only container any section uses,
 * so every heading on the page shares one left edge. Only full bleed color
 * is allowed to break it.
 */
export function Shell({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header";
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1200px] px-6 md:px-10 lg:px-12", className)}>
      {children}
    </Tag>
  );
}

/** Section eyebrow. The dot is the page's repeating mark. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "label-mono flex items-center gap-2.5 text-[rgba(244,245,242,0.85)]",
        className
      )}
    >
      <span aria-hidden className="block size-2 rounded-full bg-brand" />
      {children}
    </p>
  );
}

/**
 * One of the 10 questions. Build Spec v2 section 4 fixes the questions and
 * their order; KEYWORD-RESEARCH 4.2 requires each one to be an H2 written as
 * the question, with an answer-first paragraph a model can lift.
 */
export function Question({
  n,
  q,
  id,
  lead,
  children,
  className,
}: {
  n: number;
  q: string;
  id: string;
  lead: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section aria-labelledby={id} className={cn("scroll-mt-24", className)}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,38fr)_minmax(0,62fr)] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span
            aria-hidden
            className="label-mono flex size-11 items-center justify-center rounded-[11px] bg-[rgba(158,216,68,0.26)] text-[0.8125rem] text-[rgba(244,245,242,0.72)]"
          >
            {String(n).padStart(2, "0")}
          </span>
          <h2
            id={id}
            className="display mt-5 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.02]"
          >
            {q}
          </h2>
        </div>

        <div>
          {/* Answer first, so a model lifting the opening paragraph is right. */}
          <p className="max-w-[68ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
            {lead}
          </p>
          {children}
        </div>
      </div>
    </section>
  );
}
