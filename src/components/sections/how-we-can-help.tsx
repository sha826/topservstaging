"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { VideoJsonLd } from "@/components/seo/json-ld";
import { cn } from "@/lib/utils";

const VIMEO_ID = "1060921622";
const POSTER =
  "https://i.vimeocdn.com/video/1987555032-0bca6fa4bff71ac385a8c7d23ad8a5bc930e5d8f780e48392aa5c79828c3920f-d_1280?region=us";

/**
 * "How We Can Help" — the cinema band (design-lab F3). Two states:
 * - Ambient: the welcome video loops muted at a cinematic 21:9 crop, fused
 *   into the page with top/bottom fades, copy overlaid.
 * - Playing: the band expands to true 16:9 and the full player takes over.
 *
 * Currently Vimeo-backed (ambient background embed → controls embed on
 * click). When the MP4 is self-hosted, replace both iframes with one native
 * <video> element and the states become a single continuous playback.
 */
export function HowWeCanHelp() {
  const [playing, setPlaying] = useState(false);
  // Ambient iframe mounts after hydration only (and never for reduced
  // motion) — server and first client render always show the poster, which
  // keeps markup hydration-identical.
  const [ambient, setAmbient] = useState(false);
  const reduceMotion = useReducedMotion();
  // Only mount the ambient Vimeo player once the band is near the viewport —
  // it pulls the full third-party player + stream, which most visitors who
  // never scroll here shouldn't pay for.
  const bandRef = useRef<HTMLDivElement>(null);
  const near = useInView(bandRef, { once: true, margin: "400px 0px" });

  useEffect(() => {
    if (near && !reduceMotion) setAmbient(true);
  }, [near, reduceMotion]);

  return (
    <section aria-labelledby="help-heading" className="border-b border-border">
      <VideoJsonLd
        name="TopServ Digital Welcome Video"
        description="An introduction to TopServ Digital: how the agency grows home service companies with video-first marketing, SEO, paid advertising, and reputation management."
        thumbnailUrl={POSTER}
        embedUrl={`https://player.vimeo.com/video/${VIMEO_ID}`}
        duration="PT52S"
      />

      <div
        ref={bandRef}
        className={cn(
          "relative max-h-[78vh] w-full overflow-hidden bg-black transition-[aspect-ratio] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          playing ? "aspect-video" : "aspect-[21/9]"
        )}
      >
        {playing ? (
          <iframe
            src={`https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1&title=0&byline=0&portrait=0`}
            allow="autoplay; fullscreen"
            title="TopServ Digital welcome video"
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <>
            {ambient ? (
              // Self-hosted ambient loop: replaces the Vimeo background embed
              // (~360KB player + unbounded stream) with a single 963KB MP4.
              // The full-quality sound version still plays via Vimeo on click.
              <video
                src="/videos/portfolio/Welcome-Video-v2-Selects.mp4"
                poster={POSTER}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                tabIndex={-1}
                aria-hidden
                className="absolute inset-0 size-full scale-105 object-cover"
              />
            ) : (
              <Image
                src={POSTER}
                alt=""
                fill
                sizes="100vw"
                className="scale-105 object-cover"
              />
            )}
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play the TopServ welcome video with sound"
              className="absolute left-1/2 top-1/2 z-10 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-primary-foreground shadow-[0_14px_60px_rgba(158,216,68,0.35)] transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <Play className="ml-1 size-8 fill-current" aria-hidden />
            </button>
          </>
        )}

        {/* Readability scrim: shades the copy side of the frame during the
            ambient state, dissolves once the real playback starts */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 z-[4] bg-gradient-to-r from-background/90 via-background/40 to-transparent transition-opacity duration-500",
            playing && "opacity-0"
          )}
        />

        {/* Fades fusing the band into the page; soften while playing */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 z-[5] bg-gradient-to-b from-background to-transparent transition-all duration-500",
            playing ? "h-14 opacity-60" : "h-14 md:h-32"
          )}
        />
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 z-[5] bg-gradient-to-t from-background to-transparent transition-all duration-500",
            playing ? "h-14 opacity-60" : "h-20 md:h-36"
          )}
        />

        {/* Overlaid copy; steps aside during playback */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-8 z-[6] transition-opacity duration-500 md:bottom-12",
            playing && "pointer-events-none opacity-0"
          )}
        >
          <div className="mx-auto max-w-6xl px-5">
            <p className="label-mono text-brand">What we do</p>
            <h2 id="help-heading" className="display mt-2 text-4xl md:text-5xl">
              How we can help
            </h2>
            <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:line-clamp-none md:text-base">
              We bring your brand to life with a comprehensive digital strategy
              designed to drive leads, boost conversions, and maximize growth.
              From high-impact websites and targeted SEO to paid advertising,
              social media, and reputation management, our team of experts
              ensures your home service business stays ahead of the competition
              and consistently delivers results.
            </p>
            <Button asChild className="mt-5">
              <Link href="/contact">
                Get started
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
