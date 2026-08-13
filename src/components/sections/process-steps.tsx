"use client";

import { useRef, useState, type CSSProperties } from "react";
import { useInView } from "motion/react";
import { JsonLd } from "@/components/seo/json-ld";
import { cn } from "@/lib/utils";

// The 7-step diagram from the original site — blue bookends, green middles.
// Exported: the desktop flythrough deals these exact cards at its landing.
export const PROCESS_STEPS = [
  { name: "GBP & Website Audit", tone: "blue" },
  { name: "AI-Powered GBP Optimization", tone: "green" },
  { name: "Video Marketing Strategy", tone: "green" },
  { name: "Targeted Funnels & Addressable Geofencing", tone: "green" },
  { name: "Service & Location Pages", tone: "green" },
  { name: "Data-Driven Planning", tone: "green" },
  { name: "Track – Learn – Dominate", tone: "blue" },
] as const;

/**
 * The 7 steps as storyboard cards (design-lab I4): dealt onto the table one
 * by one when scrolled into view, settling slightly askew; hover straightens
 * a dealt card. Emits ItemList schema so the process is machine-readable.
 */
export function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [dealt, setDealt] = useState<boolean[]>(() => PROCESS_STEPS.map(() => false));

  return (
    // Desktop gets these cards inside the flythrough's landing instead;
    // the standalone section stays for mobile/tablet (schema renders always).
    <section aria-labelledby="steps-heading" className="border-b border-border lg:hidden">
      <h2 id="steps-heading" className="sr-only">
        The TopServ 7-step process
      </h2>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "TopServ Digital's 7-step marketing process",
          itemListOrder: "https://schema.org/ItemListOrderAscending",
          itemListElement: PROCESS_STEPS.map((step, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: step.name,
          })),
        }}
      />

      <div
        ref={ref}
        className={cn(
          "mx-auto grid max-w-6xl grid-cols-2 gap-3 px-5 py-14 sm:grid-cols-4 md:py-20 lg:grid-cols-7",
          inView && "go"
        )}
      >
        {PROCESS_STEPS.map((step, i) => (
          <div
            key={step.name}
            onAnimationEnd={() =>
              setDealt((d) => {
                const next = [...d];
                next[i] = true;
                return next;
              })
            }
            style={
              {
                "--rot": i % 2 ? "1.6deg" : "-2.2deg",
                animationDelay: `${(0.1 + i * 0.28).toFixed(2)}s`,
              } as CSSProperties
            }
            className={cn(
              "flex min-h-[128px] flex-col items-center justify-center gap-2 rounded-md p-3 text-center",
              step.tone === "blue"
                ? "bg-brand-blue text-white"
                : "bg-brand text-primary-foreground",
              dealt[i] ? "deal-done" : "deal-card"
            )}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-75">
              Step {i + 1}
            </span>
            <span className="text-[13.5px] font-bold leading-snug">{step.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
