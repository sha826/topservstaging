"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import type { JbVideo } from "@/lib/jb-videos";

/**
 * The click to load half of JbVideoFigure.
 *
 * NOTHING FROM YOUTUBE LOADS UNTIL THE VISITOR ASKS. Until the button is
 * pressed this is a thumbnail and a play affordance, so a page carrying 3
 * videos costs 3 images rather than 3 iframes, each of which would pull
 * YouTube's player bundle and set cookies before anyone chose to watch.
 * The iframe is only mounted after the click, with autoplay so the click
 * that loads it is also the click that starts it.
 *
 * youtube-nocookie.com is deliberate: the visitor has not consented to
 * YouTube tracking by looking at a page, and on this path they have not
 * even pressed play yet.
 */
export function JbVideoPlayer({ video }: { video: JbVideo }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        className="aspect-video w-full rounded-[14px] border border-border bg-black"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${video.title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-[14px] border border-border bg-black text-left"
    >
      <Image
        src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
        alt=""
        fill
        sizes="(min-width: 1024px) 900px, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),rgba(0,0,0,0.1)_45%,transparent)]"
      />
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-primary-foreground shadow-lg transition-transform group-hover:scale-110"
      >
        <Play className="ml-1 size-7 fill-current" />
      </span>
    </button>
  );
}
