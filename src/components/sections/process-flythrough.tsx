"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const SALES_LETTER_ID = "1060921948";
const SCRUB_SRC = "/videos/process/flythrough-scrub.mp4";
const START_POSTER = "/videos/process/flythrough-start.jpg";
const END_POSTER = "/videos/process/sales-letter-poster.jpg";

// The seven steps as flight chapters (same names/tones as the verbatim
// paragraph, which stays in the mobile DOM for crawlers).
const STEPS: { name: string; tone: "g" | "b" }[] = [
  { name: "GBP & Website Audit", tone: "g" },
  { name: "Lay the Right Foundation", tone: "b" },
  { name: "Lights, Camera, Action", tone: "g" },
  { name: "Build Funnels to Get Omnipresent & Hyper-Focused", tone: "b" },
  { name: "Large Roadmap", tone: "g" },
  { name: "Map and Planning", tone: "b" },
  { name: "Track - Learn - Dominate", tone: "g" },
];
const T0 = 0.05;
const T1 = 0.8;
const SEG = (T1 - T0) / STEPS.length;

/**
 * Desktop-only pinned stage for the TopServ Process section (design-lab
 * S1+S2 combined): the flythrough fills the whole viewport while the seven
 * step names land as chapter titles synced to scroll. At the end the video
 * shrinks into a centered 16:9 card, dissolving into the sales-letter
 * video's real Vimeo thumbnail, and a play button lands on it. Clicking
 * plays the Vimeo film in that frame; scrolling on releases the page.
 *
 * Must NOT sit inside an overflow-hidden ancestor — that disables sticky.
 */
export function ProcessFlythrough() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const durRef = useRef(0);
  const playingRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const reduceMotion = useReducedMotion();
  // The 4.3MB scrub file only loads once the section approaches the viewport.
  const near = useInView(wrapRef, { once: true, margin: "900px 0px" });

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    if (reduceMotion) return;
    const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (playingRef.current) return;
      const wrap = wrapRef.current;
      const stage = stageRef.current;
      const shell = shellRef.current;
      if (!wrap || !stage || !shell) return;
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));

      const video = videoRef.current;
      if (video && durRef.current && !video.seeking) {
        const t = p * (durRef.current - 0.05);
        if (Math.abs(video.currentTime - t) > 0.02) video.currentTime = t;
      }
      if (progressRef.current) {
        progressRef.current.style.width = `${(p * 100).toFixed(1)}%`;
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = p < 0.04 ? "1" : "0";
      }

      // Landing: full-bleed -> centered 16:9 card, dissolving to the thumbnail.
      const q = easeOut(Math.min(1, Math.max(0, (p - 0.82) / 0.14)));
      const sw = stage.clientWidth;
      const sh = stage.clientHeight;
      const w1 = Math.min(sw * 0.62, 940);
      const h1 = (w1 * 9) / 16;
      shell.style.width = `${(sw + (w1 - sw) * q).toFixed(1)}px`;
      shell.style.height = `${(sh + (h1 - sh) * q).toFixed(1)}px`;
      shell.style.borderRadius = `${(14 * q).toFixed(1)}px`;
      shell.style.boxShadow =
        q > 0.05 ? `0 30px 80px rgba(0,0,0,${(0.6 * q).toFixed(2)})` : "none";
      shell.style.borderColor = `rgba(61,70,80,${q.toFixed(2)})`;
      if (posterRef.current) posterRef.current.style.opacity = q.toFixed(3);
      if (scrimRef.current) scrimRef.current.style.opacity = (1 - q).toFixed(3);
      if (headRef.current) headRef.current.style.opacity = (1 - q * 0.6).toFixed(3);

      // Chapter titles synced to the flight.
      const steps = stepsRef.current?.children;
      if (steps) {
        for (let i = 0; i < steps.length; i++) {
          const node = steps[i] as HTMLElement;
          const t = (p - (T0 + i * SEG)) / SEG;
          let o = 0;
          if (t > 0 && t < 1) o = Math.min(1, t / 0.22, (1 - t) / 0.22);
          o *= 1 - q;
          node.style.opacity = o.toFixed(3);
          node.style.transform = `translateY(${((1 - Math.max(0, Math.min(1, t))) * 14 - 7).toFixed(1)}px)`;
        }
      }

      revealRef.current?.classList.toggle("fly-on", p > 0.95);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  const reveal = (
    <div
      ref={revealRef}
      className={
        "absolute inset-0 z-[3] grid place-items-center bg-black/25 opacity-0 transition-opacity duration-500 " +
        "[&.fly-on]:pointer-events-auto [&.fly-on]:opacity-100 " +
        (reduceMotion ? "fly-on" : "pointer-events-none")
      }
    >
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label="Play the TopServ Process video"
        className="flex size-20 items-center justify-center rounded-full bg-brand text-primary-foreground shadow-[0_14px_60px_rgba(158,216,68,0.35)] transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <Play className="ml-1 size-8 fill-current" aria-hidden />
      </button>
      <p className="label-mono absolute bottom-4 left-5 text-white/90">
        The TopServ Process · 2:43
      </p>
    </div>
  );

  if (reduceMotion) {
    // No pin, no scrub: heading + the settled framed thumbnail.
    return (
      <div className="hidden px-5 py-20 lg:block">
        <div className="mx-auto max-w-6xl">
          <p className="label-mono text-brand">The process</p>
          <h2 className="display mt-3 text-4xl md:text-5xl">
            TopServ Process<span className="text-brand">.</span>
          </h2>
          <div className="relative mx-auto mt-10 aspect-video w-[min(92vw,940px)] overflow-hidden rounded-xl border border-border bg-black">
            {playing ? (
              <iframe
                src={`https://player.vimeo.com/video/${SALES_LETTER_ID}?autoplay=1&title=0&byline=0&portrait=0`}
                allow="autoplay; fullscreen"
                title="TopServ Digital Sales Letter Video"
                className="absolute inset-0 size-full border-0"
              />
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={END_POSTER} alt="" className="absolute inset-0 size-full object-cover" />
                {reveal}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative hidden h-[300vh] lg:block">
      <div ref={stageRef} className="sticky top-0 h-svh overflow-hidden bg-[#07080a]">
        {/* The film shell: full-bleed until the landing shrinks it to a card */}
        <div
          ref={shellRef}
          className="absolute left-1/2 top-1/2 z-[1] h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-transparent bg-black"
        >
          {playing ? (
            <iframe
              src={`https://player.vimeo.com/video/${SALES_LETTER_ID}?autoplay=1&title=0&byline=0&portrait=0`}
              allow="autoplay; fullscreen"
              title="TopServ Digital Sales Letter Video"
              className="absolute inset-0 size-full border-0"
            />
          ) : (
            <>
              {near && (
                <video
                  ref={videoRef}
                  src={SCRUB_SRC}
                  poster={START_POSTER}
                  muted
                  playsInline
                  preload="auto"
                  aria-hidden
                  onLoadedMetadata={(e) => {
                    durRef.current = e.currentTarget.duration;
                  }}
                  className="absolute inset-0 size-full object-cover"
                />
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={posterRef}
                src={END_POSTER}
                alt=""
                className="absolute inset-0 size-full object-cover"
                style={{ opacity: 0 }}
              />
              {reveal}
            </>
          )}
        </div>

        {/* Legibility scrim for the overlaid titles; fades out on landing */}
        <div
          ref={scrimRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#07080a]/60 via-transparent to-[#07080a]/35"
        />

        {!playing && (
          <span
            ref={progressRef}
            aria-hidden
            className="absolute left-0 top-0 z-[8] h-0.5 bg-brand shadow-[0_0_8px_rgba(158,216,68,0.7)]"
            style={{ width: "0%" }}
          />
        )}

        <div ref={headRef} className="absolute left-6 top-6 z-[7] xl:left-10 xl:top-9">
          <p className="label-mono text-brand">The process</p>
          <h2 className="display mt-2 text-3xl xl:text-4xl">
            TopServ Process<span className="text-brand">.</span>
          </h2>
        </div>

        {/* Chapter titles, lower-left, driven by scroll progress */}
        <div
          ref={stepsRef}
          aria-hidden
          className="absolute bottom-24 left-6 z-[6] xl:left-10"
        >
          {STEPS.map((step, i) => (
            <div key={step.name} className="absolute bottom-0 left-0 w-[46vw] max-w-[640px]" style={{ opacity: 0 }}>
              <p className="label-mono mb-2.5 text-ink-faint">
                Step 0{i + 1} / 07
              </p>
              <p
                className={cn(
                  "display -skew-x-6 text-[clamp(2.4rem,3.6vw,4rem)] leading-[0.98]",
                  step.tone === "g" ? "text-brand" : "text-brand-blue-hot"
                )}
              >
                {step.name}
              </p>
            </div>
          ))}
        </div>

        {!playing && (
          <p
            ref={hintRef}
            aria-hidden
            className="label-mono absolute bottom-6 left-1/2 z-[7] -translate-x-1/2 whitespace-nowrap text-white/75 transition-opacity duration-500"
          >
            Keep scrolling to fly in
          </p>
        )}
      </div>
    </div>
  );
}
