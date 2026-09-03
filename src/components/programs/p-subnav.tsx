"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll } from "motion/react";

/**
 * The hub sub navigation.
 *
 * Build Spec v2 section 3: Programs and Pricing is a navigation hub, not a
 * page. Section 9 fixes the behavior: a horizontal sub navigation that
 * persists across all 5 pages, an active pill, a unique URL per tab, and on
 * mobile it converts to stacked buttons rather than a scrolling strip that
 * hides tabs off screen. Minimum 44 by 44 pixel touch targets.
 *
 * The bar is full bleed so it reads as a rail across the whole viewport,
 * while the tabs stay inside the 1200 measure section 9 caps content at, and
 * spread across it rather than bunching at the left edge.
 *
 * The order is the spec's and is the order a prospect is meant to read in,
 * so the tabs are numbered. Active state is carried by aria-current, not by
 * colour alone. The pill is a shared layout element, so moving between tabs
 * slides it rather than snapping, which shows the sequence the numbering is
 * already claiming. Reduced motion drops the slide, not the pill.
 *
 * OPEN CONFLICT, not silently resolved. Build Spec v2 section 9 specifies a
 * "black pill active state". This ships a brand green pill, which is what
 * was already here. Raise with Ryan and Alejandro before changing either.
 */

const CSS = `
@keyframes ps-sheen { 0% { transform: translateX(-120%); } 60%, 100% { transform: translateX(320%); } }
@keyframes ps-scan {
  0%, 4%    { opacity: 0; transform: scaleX(0.3); }
  10%, 17%  { opacity: 0.9; transform: scaleX(1); }
  26%, 100% { opacity: 0; transform: scaleX(0.3); }
}
@keyframes ps-breathe {
  0%, 100% { box-shadow: 0 0 0 0 rgba(158, 216, 68, 0); }
  50%      { box-shadow: 0 0 26px 1px rgba(158, 216, 68, 0.28); }
}
@keyframes ps-rail {
  0%       { opacity: 0; transform: translateX(-100%); }
  8%, 82%  { opacity: 1; }
  100%     { opacity: 0; transform: translateX(520%); }
}
@media (prefers-reduced-motion: no-preference) {
  .ps-sheen   { animation: ps-sheen 4.6s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
  .ps-scan    { animation: ps-scan 4.5s ease-in-out infinite; }
  .ps-breathe { animation: ps-breathe 3.8s ease-in-out infinite; }
  .ps-rail    { animation: ps-rail 7.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
}
`;

/** All 5 pages are rebuilt, so every tab points inside the preview hub. */
const TABS = [
  { n: 1, href: "/programs-pricing/overview", label: "Overview" },
  { n: 2, href: "/programs-pricing/how-it-works", label: "How It Works" },
  { n: 3, href: "/programs-pricing/what-this-delivers", label: "What This Delivers" },
  { n: 4, href: "/programs-pricing/pricing", label: "Pricing" },
  { n: 5, href: "/programs-pricing/success-stories", label: "Success Stories" },
];

export function PSubnav() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  return (
    <nav
      aria-label="Programs and Pricing"
      className="sticky top-0 z-30 border-b border-border bg-[#0b0e13]/92 backdrop-blur-md"
    >
      <style>{CSS}</style>

      <ul className="mx-auto grid w-full max-w-[1200px] gap-1.5 px-6 py-2.5 sm:flex sm:items-center sm:justify-between sm:gap-2 md:px-10 md:py-3 lg:px-12">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <li key={tab.href} className="sm:min-w-0 sm:flex-1">
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`group relative flex min-h-[44px] items-center justify-center gap-2.5 overflow-hidden rounded-[12px] px-3 text-[1rem] font-semibold tracking-[-0.01em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 md:min-h-[52px] md:text-[1.0625rem] lg:text-[1.125rem] ${
                  active
                    ? "text-[#0c0e12]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {/* The travelling pill. One element shared across tabs, so
                    navigation slides it into its new place. */}
                {active && (
                  <motion.span
                    aria-hidden
                    layoutId="p-subnav-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 38 }}
                    className="ps-breathe absolute inset-0 -z-10 overflow-hidden rounded-[12px] bg-brand"
                  >
                    <span
                      aria-hidden
                      className="ps-sheen absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)]"
                    />
                  </motion.span>
                )}

                {/* The idle hover ground, kept off the active tab. */}
                {!active && (
                  <>
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-[12px] bg-[rgba(244,245,242,0.06)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    />
                    {/* The sequence pulse. It walks 01 to 05 on a loop, which
                        is the order the spec means these to be read in, and it
                        keeps the bar alive without waiting for a cursor. */}
                    <span
                      aria-hidden
                      className="ps-scan absolute inset-x-4 bottom-1.5 h-px origin-left rounded-full bg-brand opacity-0"
                      style={{ animationDelay: `${(tab.n - 1) * 0.9}s` }}
                    />
                  </>
                )}

                <span
                  aria-hidden
                  className={`label-mono text-[0.75rem] transition-colors duration-200 ${
                    active ? "text-[#0c0e12]/55" : "text-ink-faint group-hover:text-brand"
                  }`}
                >
                  {String(tab.n).padStart(2, "0")}
                </span>
                <span className="truncate">{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* A light running the length of the bar. Purely ambient, so it is
          hidden from assistive tech and stopped by reduced motion. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden"
      >
        <span className="ps-rail block h-px w-1/5 bg-[linear-gradient(90deg,transparent,var(--brand),transparent)] opacity-0" />
      </span>

      {/* Reading progress through the current page. Decorative. */}
      <motion.span
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-brand/70"
      />
    </nav>
  );
}
