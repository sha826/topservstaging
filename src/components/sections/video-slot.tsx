import { Play } from "lucide-react";

/**
 * Placeholder frame for the JB videos specified in the build doc. Holds the
 * exact position, ratio and framing the finished embed will use, so the
 * video team can drop in Vimeo embeds without layout work.
 */
export function VideoSlot({
  title,
  length,
  className = "",
}: {
  title: string;
  length: string;
  className?: string;
}) {
  return (
    <figure className={`mx-auto w-full max-w-[900px] ${className}`}>
      <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border border-border bg-card">
        <span className="flex size-16 items-center justify-center rounded-full border border-brand/50 bg-background/60">
          <Play className="ml-0.5 size-6 text-brand" aria-hidden />
        </span>
        <p className="px-6 text-center text-lg font-semibold">{title}</p>
        <p className="label-mono text-ink-faint">{length} · in production</p>
      </div>
    </figure>
  );
}
