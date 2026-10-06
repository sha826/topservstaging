import { JsonLd } from "@/components/seo/json-ld";
import { JbVideoPlayer } from "@/components/video/jb-video-player";
import { siteConfig } from "@/lib/site-config";
import type { JbVideo } from "@/lib/jb-videos";

/**
 * A JB video in place: the click to load player, the title as real text
 * beside it, and the VideoObject markup that describes it.
 *
 * THE TITLE IS TEXT, NOT A CAPTION BAKED INTO THE THUMBNAIL. SEO Guidelines
 * 5.6 keeps headlines in HTML rather than in pixels, and 5.7 asks every
 * visual to carry a text equivalent so the content is crawlable and
 * extractable. So the figcaption states what the video is, and a reader who
 * never presses play still knows what they were offered.
 *
 * THE MARKUP IS A SERVER COMPONENT. The player has to be a client component
 * to hold the clicked state, but the schema must be in the HTML before any
 * JavaScript runs, or a crawler that does not execute scripts sees no video
 * at all. Splitting them keeps the JSON-LD server rendered.
 *
 * Every field is true of the file: name, description, uploadDate and
 * duration come from src/lib/jb-videos.ts, which took them from YouTube.
 * No transcript field: the platform does not expose one for these, and
 * 7.3 only asks for it where it exists.
 */
export function JbVideoFigure({
  video,
  eyebrow,
  className = "",
}: {
  video: JbVideo;
  /** Optional label above the title, e.g. "The manifesto". */
  eyebrow?: string;
  className?: string;
}) {
  return (
    <figure className={`mx-auto w-full max-w-[900px] ${className}`}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: video.title,
          description: video.description,
          thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
          uploadDate: video.uploadDate,
          duration: video.duration,
          embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
          publisher: { "@id": `${siteConfig.url}/#organization` },
        }}
      />

      <JbVideoPlayer video={video} />

      <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {eyebrow && <span className="label-mono text-brand">{eyebrow}</span>}
        <span className="text-base font-semibold text-foreground">{video.title}</span>
      </figcaption>
    </figure>
  );
}
