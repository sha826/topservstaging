"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/lib/content";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

/**
 * "What we do" as a production call sheet (design-lab N1): department rows
 * wipe in staggered while a green scan-line runs the sheet once.
 */
export function ServicesCallSheet() {
  const sheetRef = useRef<HTMLUListElement>(null);
  const on = useInView(sheetRef, { once: true, margin: "-15% 0px" });

  return (
    <section id="services" aria-labelledby="services-heading" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <p className="label-mono text-brand">What we do · Call sheet</p>
          <h2 id="services-heading" className="display mt-3 text-4xl md:text-5xl">
            Marketing services built for the trades
          </h2>
        </Reveal>

        <ul ref={sheetRef} className="relative mt-10 border-t border-border/80">
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 z-10 h-0.5 bg-gradient-to-r from-transparent via-brand to-transparent [filter:drop-shadow(0_0_7px_var(--brand))]"
            initial={{ top: 0, opacity: 0 }}
            animate={on ? { top: "100%", opacity: [0.9, 0.9, 0] } : {}}
            transition={{ duration: 1.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          />
          {services.map((service, i) => (
            <motion.li
              key={service.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={on ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.065, ease: EASE_OUT }}
              className="border-b border-border"
            >
              <Link
                href={`/services/${service.slug}`}
                className="group grid grid-cols-[56px_1fr_24px] items-center gap-4 px-3 py-4 transition-colors hover:bg-card md:grid-cols-[92px_1fr_1.15fr_36px] md:gap-5 md:py-[17px]"
              >
                <span className="label-mono text-ink-faint transition-colors group-hover:text-brand">
                  <span className="hidden md:inline">Dept </span>
                  {pad(i + 1)}
                </span>
                <span>
                  <span className="display block text-2xl leading-none transition-transform duration-300 ease-out group-hover:translate-x-1.5 md:text-[27px]">
                    {service.name}
                  </span>
                  <span className="mt-1.5 block text-sm leading-snug text-muted-foreground md:hidden">
                    {service.description}
                  </span>
                </span>
                <span className="hidden text-[13.5px] leading-relaxed text-muted-foreground md:block">
                  {service.description}
                </span>
                <ArrowRight
                  className="size-4 text-brand transition-all duration-300 md:-translate-x-2 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100"
                  aria-hidden
                />
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
