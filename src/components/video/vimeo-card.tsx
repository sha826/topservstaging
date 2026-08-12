"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Chromeless Vimeo card (design-lab F4): poster with feathered edges and a
 * brand-blue ambient glow; clicking swaps in the real player with sound
 * (the click gesture permits unmuted autoplay).
 */
export function VimeoCard({
  vimeoId,
  poster,
  title,
}: {
  vimeoId: string;
  poster: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-8 z-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(14,125,193,0.26),transparent_70%)] blur-2xl"
      />
      <div
        className={cn(
          "relative z-10 aspect-video overflow-hidden rounded-lg bg-black",
          !playing && "vfeather"
        )}
      >
        {playing ? (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
            allow="autoplay; fullscreen"
            title={title}
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <>
            <Image
              src={poster}
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="scale-105 object-cover"
            />
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${title}`}
              className="absolute left-1/2 top-1/2 z-10 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-primary-foreground shadow-[0_14px_60px_rgba(158,216,68,0.35)] transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <Play className="ml-0.5 size-7 fill-current" aria-hidden />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
