"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { Button } from "@/components/ui/button";

const LINES: { text: string; green?: boolean; delay: number }[] = [
  { text: "Using video", delay: 0.1 },
  { text: "to disrupt", green: true, delay: 0.45 },
  { text: "the industry", delay: 0.8 },
];

/**
 * Brand statement (design-lab O4): the original site's best line as huge
 * outline-stroke type that fills itself in line by line, with the founder's
 * clapperboard portrait feathered in from the right. Replaces the original
 * site's converge / sticky-fan / case-study-rows trio.
 */
export function DisruptStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, margin: "-25% 0px" });

  return (
    <section aria-labelledby="disrupt-heading" className="relative overflow-hidden border-b border-border">
      <div ref={ref} className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] md:block"
          style={{
            maskImage: "linear-gradient(to left, black 55%, transparent)",
            WebkitMaskImage: "linear-gradient(to left, black 55%, transparent)",
          }}
        >
          <Image
            src="/images/jonathan-slate.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 52vw, 0px"
            className="object-cover object-[65%_30%] opacity-90"
          />
        </div>

        <motion.p
          className="label-mono relative z-10 text-brand"
          initial={{ opacity: 0 }}
          animate={on ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          The TopServ way
        </motion.p>

        <h2 id="disrupt-heading" className="relative z-10 mt-5">
          <span className="sr-only">Using video to disrupt the industry</span>
          <span aria-hidden className="display block">
            {LINES.map((line) => (
              <span
                key={line.text}
                className="relative block w-fit text-[clamp(3.4rem,8.5vw,7.25rem)] leading-[0.94]"
              >
                <span className="text-transparent [-webkit-text-stroke:1px_rgba(245,243,239,0.32)]">
                  {line.text}
                </span>
                <motion.span
                  className={`absolute inset-0 ${line.green ? "text-brand" : "text-foreground"}`}
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={on ? { clipPath: "inset(0 0% 0 0)" } : {}}
                  transition={{ duration: 0.9, delay: line.delay, ease: [0.4, 0, 0.2, 1] }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </span>
        </h2>

        <motion.div
          className="relative z-10 mt-9"
          initial={{ opacity: 0, y: 14 }}
          animate={on ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button asChild size="lg" className="text-base">
            <Link href="/about">
              About us
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
