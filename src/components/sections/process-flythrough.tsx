"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";

const SALES_LETTER_ID = "1060921948";
const SCRUB_SRC = "/videos/process/flythrough-scrub.mp4";
const START_POSTER = "/videos/process/flythrough-start.jpg";
const END_POSTER = "/videos/process/sales-letter-poster.jpg";

/**
 * Desktop-only scroll-scrubbed flythrough for the TopServ Process section
 * (design-lab R1): scrolling drives the camera move frame by frame inside a
 * fixed 16:9 cinema frame, dissolves into the sales-letter video's real
 * Vimeo thumbnail, and lands a centered play button on it. Clicking plays
 * the actual Vimeo video in the same frame. Mobile keeps the standard
 * click-to-play card in the section above; reduced motion gets the settled
 * end state with no pin.
 */
export function ProcessFlythrough() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
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
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (playingRef.current) return;
      const wrap = wrapRef.current;
      if (!wrap) return;
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
      // Dissolve the end of the move into the film's real thumbnail.
      if (posterRef.current) {
        posterRef.current.style.opacity = Math.min(
          1,
          Math.max(0, (p - 0.84) / 0.12)
        ).toFixed(3);
      }
      revealRef.current?.classList.toggle("fly-on", p > 0.93);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  const frame = (
    <div className="relative w-[min(92vw,1040px)]">
      <div
        aria-hidden
        className="absolute -inset-10 z-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(14,125,193,0.25),transparent_70%)] blur-2xl"
      />
      <div className="relative z-10 aspect-video overflow-hidden rounded-xl border border-border bg-black shadow-2xl">
        {playing ? (
          <iframe
            src={`https://player.vimeo.com/video/${SALES_LETTER_ID}?autoplay=1&title=0&byline=0&portrait=0`}
            allow="autoplay; fullscreen"
            title="TopServ Digital Sales Letter Video"
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <>
            {!reduceMotion && near && (
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
              style={{ opacity: reduceMotion ? 1 : 0 }}
            />
            {!reduceMotion && (
              <span
                ref={progressRef}
                aria-hidden
                className="absolute left-0 top-0 z-[3] h-0.5 bg-brand shadow-[0_0_8px_rgba(158,216,68,0.7)]"
                style={{ width: "0%" }}
              />
            )}
            <div
              ref={revealRef}
              className={
                "absolute inset-0 z-[2] grid place-items-center bg-black/25 opacity-0 transition-opacity duration-500 " +
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
              <p className="label-mono absolute bottom-5 left-6 text-white/90">
                The TopServ Process · 2:43
              </p>
            </div>
          </>
        )}
      </div>
      {!reduceMotion && !playing && (
        <p
          ref={hintRef}
          aria-hidden
          className="label-mono absolute -bottom-10 left-1/2 -translate-x-1/2 text-ink-faint transition-opacity duration-500"
        >
          Scroll to fly in
        </p>
      )}
    </div>
  );

  if (reduceMotion) {
    // No pin, no scrub: the settled end state as a normal block.
    return (
      <div className="hidden justify-center pb-20 lg:flex">{frame}</div>
    );
  }

  return (
    <div ref={wrapRef} className="relative hidden h-[260vh] lg:block">
      <div className="sticky top-0 flex h-svh items-center justify-center">
        {frame}
      </div>
    </div>
  );
}
