import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Layout primitives for /programs-pricing.
 *
 * Widths per Build Spec v2 section 9: content maximum 1200, text maximum
 * 800. A local copy for the same reason as the other test folders: the
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
