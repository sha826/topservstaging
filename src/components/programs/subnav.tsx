"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * The Programs and Pricing hub sub navigation: persists across all 5 pages,
 * pill active state, unique URL per tab. Converts to stacked buttons on
 * mobile per the spec.
 */
const TABS = [
  { n: 1, href: "/programs-pricing/overview", label: "Overview" },
  { n: 2, href: "/programs-pricing/how-it-works", label: "How It Works" },
  { n: 3, href: "/programs-pricing/what-this-delivers", label: "What This Delivers" },
  { n: 4, href: "/programs-pricing/pricing", label: "Pricing" },
  { n: 5, href: "/programs-pricing/success-stories", label: "Success Stories" },
] as const;

export function ProgramsSubnav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Programs and Pricing" className="border-b border-border bg-card/60">
      <div className="mx-auto max-w-6xl px-5">
        <ul className="flex flex-col gap-1 py-3 md:flex-row md:items-center md:gap-2">
          {TABS.map((tab) => {
            const active = pathname === tab.href;
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 ${
                    active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <span className={`label-mono ${active ? "text-background/60" : "text-ink-faint"}`}>
                    {tab.n}
                  </span>
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
