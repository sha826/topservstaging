"use client";

import { Fragment, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Headline words rise out of a mask one by one, same language as the
 * homepage hero. Mask padding keeps descenders (y, g, p) unclipped.
 */
export function CascadeHeadline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <h1 className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            {i > 0 && " "}
            <span className="-mb-[0.16em] inline-block overflow-hidden pb-[0.16em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.12 + i * 0.055, ease: EASE_OUT }}
              >
                {word}
              </motion.span>
            </span>
          </Fragment>
        ))}
      </span>
    </h1>
  );
}

/** Act marker: mono eyebrow with a hairline that draws itself in. */
export function ActHeader({
  act,
  title,
  headingId,
}: {
  act: string;
  title: string;
  headingId: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <p className="label-mono text-ink-faint">{act}</p>
        <motion.span
          aria-hidden
          className="h-px w-16 origin-left bg-brand/50"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
        />
      </div>
      <motion.h2
        id={headingId}
        className="display mt-2 text-3xl md:text-4xl"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
      >
        {title}
      </motion.h2>
    </div>
  );
}

/**
 * Case-study stat that counts up when scrolled into view — but only when the
 * value parses as one number (e.g. "136,500+", "$1M+", "5 months"). Ranges
 * like "21 → 35" render static. Server HTML always shows the final value.
 */
export function SmartStat({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const m = value.match(/^([^\d]*)([\d,]+)([^\d]*)$/);
    if (!m || !inView || reduceMotion || !ref.current) return;
    const target = parseInt(m[2].replace(/,/g, ""), 10);
    // Zero out before the delayed count starts, or the SSR'd final value
    // flashes and then snaps to 0 (same hazard the hero StatValue documents).
    ref.current.textContent = `${m[1]}0${m[3]}`;
    const controls = animate(0, target, {
      duration: 1.6,
      delay: 0.3,
      ease: EASE_OUT,
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = `${m[1]}${Math.round(v).toLocaleString("en-US")}${m[3]}`;
        }
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return <span ref={ref}>{value}</span>;
}

/** The "what we ran" checklist: items slide in staggered, checks pop after. */
export function ApproachList({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 grid gap-4 md:grid-cols-2">
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: EASE_OUT }}
          className="flex items-start gap-3"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: i * 0.1 + 0.25, ease: EASE_OUT }}
            className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/15"
          >
            <Check className="size-3 text-brand" aria-hidden />
          </motion.span>
          <span className="text-base leading-relaxed text-muted-foreground">{item}</span>
        </motion.li>
      ))}
    </ul>
  );
}
