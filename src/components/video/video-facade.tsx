"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import type { PortfolioVideo } from "@/lib/videos";

/**
 * Click-to-load YouTube facade: a thumbnail until the user asks for the
 * player, so 4 videos don't cost 4 iframe loads on page load.
 */
export function VideoFacade({ video }: { video: PortfolioVideo }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`${video.embedUrl}?autoplay=1`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
        className="aspect-video w-full rounded-lg border border-border bg-black"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${video.title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-lg border border-border text-left"
    >
      <Image
        src={video.thumbnail}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
      />
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-primary-foreground shadow-lg transition-transform group-hover:scale-110"
      >
        <Play className="ml-0.5 size-6 fill-current" />
      </span>
      <span className="absolute inset-x-0 bottom-0 p-4">
        <span className="label-mono block text-brand">{video.kind}</span>
        <span className="mt-1 block text-sm font-semibold leading-snug text-white">
          {video.client}
        </span>
      </span>
    </button>
  );
}
