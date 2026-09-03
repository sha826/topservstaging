import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Layout primitives for /brand-assessment.
 *
 * Same 2 primitives, and the same reasoning, as /about: that page's
 * header records the defect plainly, which is that letting each section pick
 * its own container width produces several different left edges and a page
 * that never feels aligned. Every section here uses Shell, and body copy
 * uses Measure inside it, so every left edge on the page is the same one.
 *
 * Widths are Build Spec v2 section 9: content maximum 1200, text maximum
 * 800. A local copy for the same reason as the other test folders: these
 * pages are still moving and a change to one must not break another. They
 * collapse into 1 shared primitive at promotion.
 */
export function Shell({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1200px] px-6 md:px-10 lg:px-12", className)}>
      {children}
    </Tag>
  );
}

/** A reading column inside Shell. Left aligned, never centred. */
export function Measure({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("max-w-[62ch]", className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("label-mono flex items-center gap-2.5 text-[rgba(244,245,242,0.85)]", className)}>
      <span aria-hidden className="block size-2 rounded-full bg-brand" />
      {children}
    </p>
  );
}
