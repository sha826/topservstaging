"use client";

import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { Crosshair, Mail, Megaphone, Search, Share2, Store } from "lucide-react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

const TAU = Math.PI * 2;
const PERIOD_S = 30; // seconds per revolution
const RX = 205; // orbit radius x (px)
const RY = 78; // orbit radius y (px) — shallow = tilted orbital plane

interface OrbitNodeDef {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone: "blue" | "green";
}

// The six channels from TopServ's ecosystem diagram, tones matching it.
const NODES: OrbitNodeDef[] = [
  { label: "SEO", Icon: Search, tone: "blue" },
  { label: "SEM", Icon: Megaphone, tone: "green" },
  { label: "Email Marketing", Icon: Mail, tone: "blue" },
  { label: "Addressable Geofencing", Icon: Crosshair, tone: "green" },
  { label: "Social Media Ads", Icon: Share2, tone: "blue" },
  { label: "GBP", Icon: Store, tone: "green" },
];

// Round to 2dp: server-serialized styles and client-computed values must be
// byte-identical or React reports a hydration attribute mismatch.
const r2 = (n: number) => Math.round(n * 100) / 100;

function OrbitNode({
  node,
  angle,
  offset,
}: {
  node: OrbitNodeDef;
  angle: MotionValue<number>;
  offset: number;
}) {
  const x = useTransform(angle, (a) => r2(Math.cos(a + offset) * RX));
  const y = useTransform(angle, (a) => r2(Math.sin(a + offset) * RY));
  // Depth from the ellipse: front (bottom) = large & bright, back = small & dim.
  const depth = useTransform(angle, (a) => Math.sin(a + offset));
  const scale = useTransform(depth, (d) => r2(0.72 + (0.36 * (d + 1)) / 2));
  const opacity = useTransform(depth, (d) => r2(0.45 + (0.55 * (d + 1)) / 2));
  const zIndex = useTransform(depth, (d) => 20 + Math.round(d * 10));

  const { Icon } = node;

  return (
    <motion.div
      style={{ x, y, scale, opacity, zIndex }}
      className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
    >
      <span
        className={
          node.tone === "blue"
            ? "flex size-16 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg ring-1 ring-white/15"
            : "flex size-16 items-center justify-center rounded-full bg-brand text-primary-foreground shadow-lg ring-1 ring-white/15"
        }
      >
        <Icon className="size-7" aria-hidden />
      </span>
      <span className="w-28 text-center text-xs font-bold uppercase leading-tight tracking-wide text-foreground">
        {node.label}
      </span>
    </motion.div>
  );
}

/**
 * TopServ's marketing-ecosystem diagram as a living orbital system: the six
 * channels circle the logo on a tilted elliptical plane, passing in front of
 * and behind the hub, with mouse-parallax tilt on the whole scene.
 * Transform-only animation; static (evenly spread) for reduced motion.
 */
export function EcosystemOrbit() {
  const angle = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  // Mouse-parallax tilt
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-7, 7]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [5, -5]), {
    stiffness: 120,
    damping: 18,
  });

  useAnimationFrame((t) => {
    if (reduceMotion) return;
    angle.set(((t / 1000) % PERIOD_S) * (TAU / PERIOD_S));
  });

  return (
    <div
      aria-label="TopServ's marketing ecosystem: SEO, SEM, Email Marketing, Addressable Geofencing, Social Media Ads, and Google Business Profile, all built around one hub"
      role="img"
      style={{ perspective: "1100px" }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointerX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
        pointerY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative mx-auto h-[440px] w-[500px]"
      >
        {/* Ambient glow behind the hub */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 size-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(14,125,193,0.22),transparent_65%)]"
        />

        {/* Orbit rings */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[172px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-border/70"
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[210px] w-[478px] -translate-x-1/2 -translate-y-1/2 rotate-[8deg] rounded-[50%] border border-border/30"
        />

        {/* Hub: the TopServ logo, breathing */}
        <motion.div
          animate={{ scale: [1, 1.045, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 z-20 flex size-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brand-blue/50 bg-card shadow-[0_0_90px_rgba(14,125,193,0.35)]"
        >
          <Image
            src="/images/topserv-logo.png"
            alt=""
            width={110}
            height={84}
            className="h-auto w-24"
          />
        </motion.div>

        {NODES.map((node, i) => (
          <OrbitNode
            key={node.label}
            node={node}
            angle={angle}
            offset={(i / NODES.length) * TAU}
          />
        ))}
      </motion.div>
    </div>
  );
}
