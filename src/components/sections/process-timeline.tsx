"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Eye, Lock, Play } from "lucide-react";
import {
  motion,
  useAnimationFrame,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  PROCESS_DETAIL,
  type ProcessDetailStep,
  type StepMedia,
} from "@/lib/process-detail";
import { cn } from "@/lib/utils";

const STEP_COUNT = PROCESS_DETAIL.length;
const CLIP_W = 216;
const CLIP_GAP = 4;
const CLIP_SPAN = CLIP_W + CLIP_GAP;
const TRACK_W = STEP_COUNT * CLIP_SPAN;

type LightboxState = { type: "img"; src: string } | { type: "video"; id: string } | null;

/* Deterministic waveform path (seeded — identical on server and client). */
const WAVEFORM_PATH = (() => {
  let seed = 42;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  let d = "";
  for (let x = 0; x < TRACK_W; x += 3) {
    const amp = 4 + rnd() * 12 * (0.6 + 0.4 * Math.sin(x / 90));
    d += `M${x} ${(16 - amp).toFixed(1)} L${x} ${(16 + amp).toFixed(1)} `;
  }
  return d;
})();

const V2_GRAPHICS = [
  { left: 60, width: 150, label: "TITLE: AUDIT" },
  { left: 700, width: 170, label: "LOWER THIRD" },
  { left: 1290, width: 190, label: "GFX: DOMINATE" },
];

function stepThumb(step: ProcessDetailStep): string {
  const m = step.media;
  if (m.kind === "shots") return m.shots[0];
  if (m.kind === "compare") return m.before;
  if (m.kind === "mosaic") return m.funnel;
  return `https://i.ytimg.com/vi/${m.videos[0].id}/hqdefault.jpg`;
}

/* ---------- shared scene pieces (unchanged from the JC build) ---------- */

function BrowserFrame({
  children,
  onZoom,
  light,
}: {
  children: React.ReactNode;
  onZoom?: () => void;
  light?: boolean;
}) {
  return (
    <div
      onClick={onZoom}
      className={cn(
        "overflow-hidden rounded-lg border border-border shadow-[0_18px_50px_rgba(0,0,0,0.5)]",
        light ? "bg-white" : "bg-card",
        onZoom && "cursor-zoom-in"
      )}
    >
      <div className="flex h-6 items-center gap-1.5 bg-secondary px-2.5">
        <i className="size-2 rounded-full bg-[#ff5f57]" />
        <i className="size-2 rounded-full bg-[#febc2e]" />
        <i className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-1.5 flex-1 truncate rounded bg-background px-2 py-0.5 font-mono text-[8.5px] text-ink-faint">
          topservdigital.com/deliverables
        </span>
      </div>
      {children}
    </div>
  );
}

function CompareSlider({
  before,
  after,
  labelBefore,
  labelAfter,
}: {
  before: string;
  after: string;
  labelBefore: string;
  labelAfter: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <BrowserFrame>
      <div className="relative aspect-[16/10] bg-black">
        <Image
          src={after}
          alt={labelAfter}
          fill
          sizes="(min-width: 1024px) 42vw, 86vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image
            src={before}
            alt={labelBefore}
            fill
            sizes="(min-width: 1024px) 42vw, 86vw"
            className="object-cover object-top"
          />
        </div>
        <span className="label-mono absolute left-2 top-2 z-[2] rounded-sm bg-brand-blue/90 px-2 py-0.5 !text-[9px] text-white">
          {labelBefore}
        </span>
        <span className="label-mono absolute right-2 top-2 z-[2] rounded-sm bg-brand/90 px-2 py-0.5 !text-[9px] text-primary-foreground">
          {labelAfter}
        </span>
        <div
          className="pointer-events-none absolute inset-y-0 z-[3] w-0.5 bg-brand"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-[13px] text-primary-foreground">
            ⇄
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.currentTarget.value))}
          aria-label={`Compare ${labelBefore} and ${labelAfter}`}
          className="absolute inset-0 z-[4] size-full cursor-ew-resize opacity-0"
        />
      </div>
    </BrowserFrame>
  );
}

function SceneMedia({
  media,
  onLightbox,
}: {
  media: StepMedia;
  onLightbox: (lb: LightboxState) => void;
}) {
  if (media.kind === "compare") {
    return <CompareSlider {...media} />;
  }
  if (media.kind === "videos") {
    return (
      <div className="flex gap-3">
        {media.videos.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => onLightbox({ type: "video", id: v.id })}
            aria-label={`Play video: ${v.label}`}
            className="group relative aspect-[9/14] flex-1 overflow-hidden rounded-lg border border-border bg-black"
          >
            <Image
              src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 1024px) 14vw, 28vw"
              className="object-cover"
            />
            <span className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-primary-foreground transition-transform group-hover:scale-110">
              <Play className="ml-0.5 size-4 fill-current" aria-hidden />
            </span>
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-2 pt-5 text-[11px] font-bold text-white">
              {v.label}
            </span>
          </button>
        ))}
      </div>
    );
  }
  if (media.kind === "mosaic") {
    const card = (src: string, cap: string, cls?: string) => (
      <div
        onClick={() => onLightbox({ type: "img", src })}
        className={cn(
          "relative cursor-zoom-in overflow-hidden rounded-lg border border-border bg-white",
          cls
        )}
      >
        <span className="label-mono absolute left-2 top-2 z-[2] rounded-sm bg-background/85 px-2 py-0.5 !text-[8.5px] text-brand">
          {cap}
        </span>
        <Image src={src} alt={cap} fill sizes="(min-width: 1024px) 24vw, 45vw" className="object-contain" />
      </div>
    );
    return (
      <div className="flex flex-col gap-2.5">
        {card(media.funnel, "THE FUNNEL — TOFU · MOFU · BOFU", "h-[176px]")}
        <div className="grid grid-cols-2 gap-2.5">
          {card(media.ad, "THE AD CREATIVE", "h-[124px]")}
          {card(media.map, "ADDRESSABLE TARGETING", "h-[124px]")}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-3">
      {media.shots.map((src: string) => (
        <div key={src} className="flex-1">
          <BrowserFrame light={media.fitWhole} onZoom={() => onLightbox({ type: "img", src })}>
            <div className={cn("relative", media.fitWhole ? "h-[280px]" : "h-[260px]")}>
              <Image
                src={src}
                alt={`Process evidence: ${humanizeSrc(src)}`}
                fill
                sizes="(min-width: 1024px) 24vw, 86vw"
                className={media.fitWhole ? "object-contain" : "object-cover object-top"}
              />
            </div>
          </BrowserFrame>
        </div>
      ))}
    </div>
  );
}

/** "gbp-categories.png" → "gbp categories", for evidence-image alt text. */
function humanizeSrc(src: string) {
  return (src.split("/").pop() ?? "").replace(/\.\w+$/, "").replace(/[-_]+/g, " ");
}

/**
 * Types the title in when its scene activates. Server-renders the full text
 * (crawlers and no-JS always see complete titles); the typing is a
 * client-only re-run per activation, with an adaptive speed so even the
 * longest title lands in ~0.75s.
 */
function TypewriterTitle({
  text,
  play,
  className,
}: {
  text: string;
  play: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [chars, setChars] = useState(text.length);

  useEffect(() => {
    if (!play || reduceMotion) return;
    setChars(0);
    const delay = Math.min(24, Math.max(14, 750 / text.length));
    const id = setInterval(() => {
      setChars((c) => {
        if (c >= text.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, delay);
    return () => clearInterval(id);
  }, [play, reduceMotion, text]);

  return (
    <h3 className={className} aria-label={text}>
      <span aria-hidden>{text.slice(0, chars)}</span>
      {play && !reduceMotion && <span className="tw-caret" aria-hidden />}
    </h3>
  );
}

function SceneBody({
  step,
  index,
  onLightbox,
  stacked,
  play = false,
}: {
  step: ProcessDetailStep;
  index: number;
  onLightbox: (lb: LightboxState) => void;
  stacked?: boolean;
  play?: boolean;
}) {
  return (
    <div
      className={cn(
        stacked
          ? "flex flex-col gap-5"
          : "grid grid-cols-[0.46fr_0.54fr] items-center gap-7"
      )}
    >
      <div>
        <p className="label-mono text-ink-faint">
          Step {String(index + 1).padStart(2, "0")} · TopServ Process
        </p>
        <TypewriterTitle
          text={step.title}
          play={play}
          className={cn(
            "display mt-2 text-3xl leading-none md:text-4xl",
            step.tone === "blue" ? "text-brand-blue-hot" : "text-brand"
          )}
        />
        <p className="mt-3 max-w-md text-[13px] leading-relaxed text-muted-foreground">
          {step.desc.map((seg, i) =>
            seg.b ? (
              <b key={i} className="text-foreground">
                {seg.t}
              </b>
            ) : (
              <span key={i}>{seg.t}</span>
            )
          )}
        </p>
        {step.ctas && (
          <div className="mt-4 flex flex-wrap gap-2">
            {step.ctas.map((cta) =>
              cta.href ? (
                <a
                  key={cta.label}
                  href={cta.href}
                  target="_blank"
                  rel="noopener"
                  className="rounded border border-border px-3.5 py-2.5 font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                >
                  {cta.label} ↗
                </a>
              ) : (
                <button
                  key={cta.label}
                  type="button"
                  onClick={() => cta.img && onLightbox({ type: "img", src: cta.img })}
                  className="rounded border border-border px-3.5 py-2.5 font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                >
                  {cta.label}
                </button>
              )
            )}
          </div>
        )}
      </div>
      <SceneMedia media={step.media} onLightbox={onLightbox} />
    </div>
  );
}

/* ---------- the section ---------- */

export function ProcessTimeline() {
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const tracksRef = useRef<HTMLDivElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const seekRef = useRef<HTMLInputElement>(null);
  const meterLRef = useRef<HTMLDivElement>(null);
  const meterRRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const playingRef = useRef(false);
  const seekingRef = useRef(false);
  const meterRef = useRef(0);
  const lastYRef = useRef(0);
  const [stageW, setStageW] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });

  const slideX = useTransform(smooth, (v) => {
    if (!stageW) return 0;
    const start = stageW / 2 - CLIP_SPAN / 2;
    const end = stageW / 2 - (TRACK_W - CLIP_SPAN / 2);
    return start + v * (end - start);
  });
  const renderedW = useTransform(smooth, (v) => Math.max(0, v) * TRACK_W);

  useMotionValueEvent(smooth, "change", (v) => {
    const clamped = Math.min(0.999, Math.max(0, v));
    if (clamped > 0.005) setEntered(true);
    const idx = Math.floor(clamped * STEP_COUNT);
    if (idx !== activeRef.current) {
      // cut flash + playhead snap on the edit point
      const fl = flashRef.current;
      const ph = playheadRef.current;
      if (fl) {
        fl.style.opacity = "0.09";
        setTimeout(() => { if (fl) fl.style.opacity = "0"; }, 90);
      }
      if (ph) {
        ph.classList.add("shadow-[0_0_22px_rgba(158,216,68,1)]");
        setTimeout(() => ph?.classList.remove("shadow-[0_0_22px_rgba(158,216,68,1)]"), 220);
      }
      activeRef.current = idx;
      setActive(idx);
    }
    if (tcRef.current) {
      const secs = clamped * STEP_COUNT;
      const ff = Math.floor((secs % 1) * 24);
      tcRef.current.textContent = `TC 00:00:0${Math.floor(secs)}:${String(ff).padStart(2, "0")}`;
    }
  });

  // Meters + seek sync, every frame.
  useAnimationFrame(() => {
    const vy = Math.abs(window.scrollY - lastYRef.current);
    lastYRef.current = window.scrollY;
    meterRef.current = Math.max(meterRef.current * 0.88, Math.min(1, vy / 60));
    const base = playingRef.current ? 0.35 : 0.06;
    const lvl = Math.max(base, meterRef.current);
    if (meterLRef.current) meterLRef.current.style.height = `${Math.round((lvl * 0.92 + Math.random() * 0.08) * 100)}%`;
    if (meterRRef.current) meterRRef.current.style.height = `${Math.round((lvl * 0.85 + Math.random() * 0.12) * 100)}%`;
    if (!seekingRef.current && seekRef.current) {
      seekRef.current.value = String(Math.round(scrollYProgress.get() * 1000));
    }
  });

  useEffect(() => {
    const measure = () => setStageW(tracksRef.current?.clientWidth ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Transport helpers
  const runway = () => {
    const el = wrapRef.current;
    if (!el) return { top: 0, len: 1 };
    const top = el.getBoundingClientRect().top + window.scrollY;
    return { top, len: el.offsetHeight - window.innerHeight };
  };
  const stopPlay = () => {
    playingRef.current = false;
    setPlaying(false);
  };
  const togglePlay = () => {
    if (playingRef.current) return stopPlay();
    playingRef.current = true;
    setPlaying(true);
    const r = runway();
    const step = () => {
      if (!playingRef.current) return;
      const y = window.scrollY + 4.6;
      if (y >= r.top + r.len) {
        window.scrollTo(0, r.top + r.len);
        stopPlay();
        return;
      }
      window.scrollTo(0, y);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    const stop = () => stopPlay();
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    return () => {
      // Kill the auto-scroll loop on unmount, or it keeps scrolling the
      // next page after a client-side navigation.
      stopPlay();
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [lbLoaded, setLbLoaded] = useState(false);
  const lbRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!lightbox) return;
    setLbLoaded(false);
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() =>
      lbRef.current?.querySelector<HTMLElement>("button")?.focus()
    );
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "Tab") {
        // Keep Tab inside the dialog while it's open.
        const nodes = lbRef.current?.querySelectorAll<HTMLElement>(
          "button, iframe, video"
        );
        if (!nodes?.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (!lbRef.current?.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
  }, [lightbox]);

  return (
    <section aria-labelledby="timeline-heading" className="border-b border-border">
      <h2 id="timeline-heading" className="sr-only">
        The TopServ process, step by step
      </h2>

      {/* Desktop: the editing app */}
      <div ref={wrapRef} className="relative hidden h-[500vh] lg:block">
        <div className="sticky top-0 flex h-screen items-center px-5">
          <div className="mx-auto flex h-[min(660px,90vh)] w-full max-w-6xl flex-col overflow-hidden rounded-lg border border-[#2a2e35] bg-[#17191d] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            {/* Title bar */}
            <div className="flex h-8 items-center gap-1.5 border-b border-[#2a2e35] bg-[#1f2228] px-3">
              <i className="size-2.5 rounded-full bg-[#ff5f57]" />
              <i className="size-2.5 rounded-full bg-[#febc2e]" />
              <i className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[10px] tracking-wide text-muted-foreground">
                TopServ Studio — process.prproj
              </span>
            </div>

            {/* Program label + timecode */}
            <div className="flex items-center justify-between border-b border-[#24272d] bg-background px-3 py-1">
              <span className="font-mono text-[9px] tracking-[0.14em] text-ink-faint">
                PROGRAM: TOPSERV PROCESS
              </span>
              <span ref={tcRef} className="label-mono text-brand">
                TC 00:00:00:00
              </span>
            </div>

            {/* Monitor */}
            <div className="relative flex-1 overflow-hidden bg-card">
              <div
                ref={flashRef}
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[8] bg-white opacity-0 transition-opacity duration-75"
              />
              {PROCESS_DETAIL.map((step, i) => (
                <div
                  key={step.title}
                  className={cn(
                    "absolute inset-0 flex items-center px-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    i === active
                      ? "scale-100 opacity-100"
                      : "pointer-events-none scale-[0.97] opacity-0"
                  )}
                >
                  <div className="w-full">
                    <SceneBody
                      step={step}
                      index={i}
                      onLightbox={setLightbox}
                      play={entered && i === active}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Transport */}
            <div className="flex h-9 items-center gap-2.5 border-y border-[#24272d] bg-[#1a1d22] px-3">
              <button
                type="button"
                onClick={() => {
                  stopPlay();
                  window.scrollTo(0, runway().top);
                }}
                aria-label="Go to start"
                className="flex h-6 w-7 items-center justify-center rounded border border-[#2f343c] bg-[#23272e] text-[10px] transition-colors hover:border-brand hover:text-brand"
              >
                ⏮
              </button>
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play the timeline"}
                className="flex h-6 w-9 items-center justify-center rounded border border-[#2f343c] bg-[#23272e] text-[10px] transition-colors hover:border-brand hover:text-brand"
              >
                {playing ? "⏸" : "▶"}
              </button>
              <input
                ref={seekRef}
                type="range"
                min={0}
                max={1000}
                defaultValue={0}
                aria-label="Seek through the process"
                onPointerDown={() => (seekingRef.current = true)}
                onPointerUp={() => (seekingRef.current = false)}
                onInput={(e) => {
                  stopPlay();
                  const r = runway();
                  window.scrollTo(0, r.top + (Number(e.currentTarget.value) / 1000) * r.len);
                }}
                className="h-1 flex-1 cursor-pointer appearance-none rounded-sm bg-[#2a2e35] [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand"
              />
              <span className="font-mono text-[10px] text-muted-foreground">00:00:07:00</span>
            </div>

            {/* Timeline: headers + tracks + meters */}
            <div className="flex h-[152px] bg-background">
              <div className="z-[6] flex w-16 flex-col border-r border-[#24272d] bg-[#191c21]">
                <span className="flex h-[22px] items-center border-b border-[#22262c] px-2 font-mono text-[9px] text-muted-foreground">TC</span>
                <span className="flex h-[26px] items-center gap-1 border-b border-[#22262c] px-2 font-mono text-[9px] text-muted-foreground">
                  V2 <Eye className="size-2.5 opacity-50" aria-hidden />
                </span>
                <span className="flex h-16 items-center gap-1 border-b border-[#22262c] px-2 font-mono text-[9px] text-muted-foreground">
                  V1 <Eye className="size-2.5 opacity-50" aria-hidden />
                  <Lock className="size-2.5 opacity-50" aria-hidden />
                </span>
                <span className="flex h-10 items-center gap-1 px-2 font-mono text-[9px] text-muted-foreground">
                  A1 <span className="text-[8px] opacity-50">M S</span>
                </span>
              </div>

              <div ref={tracksRef} className="relative flex-1 overflow-hidden">
                <motion.div style={{ x: slideX }} className="absolute inset-y-0 will-change-transform">
                  {/* Ruler */}
                  <div
                    className="relative h-[22px] border-b border-[#22262c] [background:repeating-linear-gradient(90deg,#2a2e35_0_1px,transparent_1px_27.5px)]"
                    style={{ width: TRACK_W }}
                  >
                    <motion.div style={{ width: renderedW }} className="absolute left-0 top-0 h-[3px] bg-brand" />
                    {PROCESS_DETAIL.map((_, i) => (
                      <span
                        key={i}
                        className="absolute top-1 font-mono text-[8px] text-ink-faint"
                        style={{ left: i * CLIP_SPAN + 4 }}
                      >
                        00:00:0{i}:00
                      </span>
                    ))}
                  </div>
                  {/* V2 graphics */}
                  <div className="relative h-[26px] border-b border-[#22262c]" style={{ width: TRACK_W }}>
                    {V2_GRAPHICS.map((g) => (
                      <span
                        key={g.label}
                        className="absolute top-1 flex h-[18px] items-center rounded-sm border border-[#9b6fd8] bg-[#7c4dbd] px-1.5 font-mono text-[7.5px] tracking-wider text-white"
                        style={{ left: g.left, width: g.width }}
                      >
                        {g.label}
                      </span>
                    ))}
                  </div>
                  {/* V1 clips */}
                  <div className="flex h-16 items-center gap-1 border-b border-[#22262c]" style={{ width: TRACK_W }}>
                    {PROCESS_DETAIL.map((step, i) => (
                      <div
                        key={step.title}
                        className={cn(
                          "relative h-14 w-[216px] shrink-0 overflow-hidden rounded border-[1.5px] bg-repeat-x transition-[border-color,box-shadow] duration-300",
                          i === active
                            ? step.tone === "blue"
                              ? "border-brand-blue shadow-[0_0_0_1px_var(--brand-blue),0_0_14px_rgba(14,125,193,0.4)]"
                              : "border-brand shadow-[0_0_0_1px_var(--brand),0_0_14px_rgba(158,216,68,0.35)]"
                            : "border-border"
                        )}
                        style={{ backgroundImage: `url(${stepThumb(step)})`, backgroundSize: "auto 100%" }}
                      >
                        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0a0c0f]/90 to-[#0a0c0f]/45" />
                        <span className="absolute left-1.5 top-1 rounded-sm border border-[#2f343c] bg-[#23272e] px-1 font-mono text-[7px] text-ink-faint">
                          fx
                        </span>
                        <span
                          className={cn(
                            "absolute inset-x-2 bottom-1 text-[10.5px] font-bold leading-tight",
                            i === active ? "text-white" : "text-muted-foreground"
                          )}
                        >
                          {i + 1}. {step.title}
                        </span>
                        {i === active && (
                          <>
                            <span aria-hidden className="absolute inset-y-0 left-0 w-[5px] rounded-l bg-brand opacity-90" />
                            <span aria-hidden className="absolute inset-y-0 right-0 w-[5px] rounded-r bg-brand opacity-90" />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* A1 waveform */}
                  <div className="relative h-10" style={{ width: TRACK_W }}>
                    <svg
                      width={TRACK_W}
                      height={32}
                      viewBox={`0 0 ${TRACK_W} 32`}
                      className="absolute left-0 top-1"
                      aria-hidden
                    >
                      <path d={WAVEFORM_PATH} stroke="rgba(158,216,68,0.55)" strokeWidth="1.6" fill="none" />
                    </svg>
                  </div>
                </motion.div>

                {/* Playhead */}
                <div
                  ref={playheadRef}
                  className="absolute inset-y-0 left-1/2 z-[5] w-0.5 bg-brand shadow-[0_0_10px_rgba(158,216,68,0.6)] transition-shadow duration-150"
                >
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-0 -translate-x-1/2 border-[6px] border-transparent border-t-brand"
                  />
                </div>
              </div>

              {/* Meters */}
              <div className="flex w-6 items-end gap-[3px] border-l border-[#24272d] bg-[#191c21] px-[5px] py-1.5">
                <div ref={meterLRef} className="min-h-[4%] w-full rounded-[1px] bg-gradient-to-t from-brand via-[#d9e84a] to-[#ff5f57] transition-[height] duration-100" style={{ height: "8%" }} />
                <div ref={meterRRef} className="min-h-[4%] w-full rounded-[1px] bg-gradient-to-t from-brand via-[#d9e84a] to-[#ff5f57] transition-[height] duration-100" style={{ height: "8%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: native swipe carousel */}
      <div className="lg:hidden">
        <div className="px-5 pt-14">
          <p className="label-mono text-brand">The process, in detail</p>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-8">
          {PROCESS_DETAIL.map((step, i) => (
            <div
              key={step.title}
              className="w-[86vw] max-w-[420px] shrink-0 snap-center rounded-lg border border-border bg-card p-5"
            >
              <SceneBody step={step} index={i} onLightbox={setLightbox} stacked />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          ref={lbRef}
          role="dialog"
          aria-modal="true"
          aria-label="Media viewer"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[90] flex cursor-zoom-out items-center justify-center bg-black/90"
        >
          <button
            type="button"
            aria-label="Close viewer"
            onClick={() => setLightbox(null)}
            className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full border border-white/20 text-lg text-white transition-colors hover:border-brand hover:text-brand"
          >
            ✕
          </button>
          {!lbLoaded && (
            <div
              aria-hidden
              className="absolute size-10 animate-spin rounded-full border-2 border-white/15 border-t-brand"
            />
          )}
          {lightbox.type === "img" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={lightbox.src}
              alt={`Full-size view: ${humanizeSrc(lightbox.src)}`}
              onLoad={() => setLbLoaded(true)}
              className={cn(
                "max-h-[92vh] max-w-[92vw] rounded-md transition-opacity duration-300",
                lbLoaded ? "opacity-100" : "opacity-0"
              )}
            />
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${lightbox.id}?autoplay=1`}
              allow="autoplay; fullscreen"
              title="Video"
              onLoad={() => setLbLoaded(true)}
              className={cn(
                "aspect-video w-[min(94vw,1240px)] rounded-md border-0 transition-opacity duration-300",
                lbLoaded ? "opacity-100" : "opacity-0"
              )}
            />
          )}
        </div>
      )}
    </section>
  );
}
