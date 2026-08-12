"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

// Film credits, but the client is the star (design-lab A3).
const CREDITS = [
  { role: "Directed by", name: "Your brand" },
  { role: "Starring", name: "Your technicians" },
  { role: "Filmed on", name: "Location" },
  { role: "Produced by", name: "TopServ Digital" },
  { role: "Now showing", name: "In your market" },
  { role: "Box office", name: "$89M+ generated" },
] as const;

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/**
 * Credits-crawl marquee. Drifts continuously; page-scroll velocity feeds its
 * speed and direction. Decorative: aria-hidden (content repeats 4x for the
 * seamless loop), frozen for reduced-motion users.
 */
export function CreditsCrawl() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-1200, 0, 1200], [-4, 0, 4], {
    clamp: false,
  });
  const reduceMotion = useReducedMotion();
  const direction = useRef(-1);

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    let moveBy = direction.current * 1.4 * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = 1;
    else if (vf > 0) direction.current = -1;
    moveBy += moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div aria-hidden className="overflow-hidden border-b border-border bg-card">
      <motion.div style={{ x }} className="flex w-max will-change-transform">
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex">
            {CREDITS.map((credit) => (
              <div
                key={`${copy}-${credit.role}`}
                className="flex flex-col gap-0.5 whitespace-nowrap border-r border-border px-11 py-5"
              >
                <span className="label-mono text-brand">{credit.role}</span>
                <span className="display text-4xl leading-none text-foreground">
                  {credit.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
