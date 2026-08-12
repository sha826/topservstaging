"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

// The seven roles from the original site, same order, same blue/green
// alternation.
const ROLES = [
  { name: "Videographers", tone: "blue" },
  { name: "Paid Ad Specialists", tone: "green" },
  { name: "Graphic Designers", tone: "blue" },
  { name: "SEO Specialists", tone: "green" },
  { name: "Social Media Managers", tone: "blue" },
  { name: "Automation Specialists", tone: "green" },
  { name: "Web Developers/Designers", tone: "blue" },
] as const;

/**
 * Team roles as cinema title cards (design-lab G2): the section pins while
 * scroll advances through the seven roles one at a time — each card racks in
 * from a blurred over-scale like a film title landing. All roles stay in the
 * DOM (only styled invisible), so crawlers read the full list.
 */
export function TeamRoles() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(ROLES.length - 1, Math.max(0, Math.floor(v * ROLES.length))));
  });

  return (
    <section aria-labelledby="team-roles-heading" className="border-b border-border">
      <h2 id="team-roles-heading" className="sr-only">
        Our team of experts
      </h2>
      <div ref={wrapRef} className="relative h-[350vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          {/* Ambient glow behind the cards */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 size-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(14,125,193,0.14),transparent_65%)]"
          />

          {ROLES.map((role, i) => (
            <div
              key={role.name}
              data-active={i === active}
              className={cn(
                "absolute inset-0 flex items-center justify-center px-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                i === active
                  ? "scale-100 opacity-100 blur-0"
                  : "pointer-events-none scale-110 opacity-0 blur-md"
              )}
            >
              <div className="flex flex-wrap items-baseline justify-center gap-x-6 gap-y-4">
                <span
                  aria-hidden
                  className="expert-stamp rounded-[3px] border-[2.5px] border-current px-3.5 py-1.5 text-sm font-extrabold uppercase tracking-[0.24em] text-foreground"
                >
                  Expert
                </span>
                <p
                  className={cn(
                    "display -skew-x-6 text-center text-6xl leading-none transition-[letter-spacing] duration-500 md:text-8xl",
                    role.tone === "blue" ? "text-brand-blue" : "text-brand",
                    i === active ? "tracking-[0.005em]" : "tracking-[0.08em]"
                  )}
                >
                  {role.name}
                </p>
              </div>
            </div>
          ))}

          {/* Slate counter */}
          <p className="label-mono absolute bottom-6 right-6 text-muted-foreground">
            {String(active + 1).padStart(2, "0")} / {String(ROLES.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
