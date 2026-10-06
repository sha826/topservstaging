import { Reveal } from "@/components/motion/reveal";
import { JbVideoFigure } from "@/components/video/jb-video-figure";
import type { JbVideo } from "@/lib/jb-videos";

/**
 * A JB video as a page section: 1 band, a short heading that says why the
 * video is there, and the figure under it.
 *
 * Pages compose from section components, so the video arrives as 1 too
 * rather than as markup pasted into each page. Tone is a prop because the
 * pages alternate tinted and untinted bands and the video has to take
 * whichever its neighbours leave.
 */
export function JbVideoSection({
  video,
  eyebrow,
  heading,
  id,
  tinted = false,
}: {
  video: JbVideo;
  eyebrow: string;
  heading: string;
  /** Anchors the heading for aria-labelledby. */
  id: string;
  tinted?: boolean;
}) {
  return (
    <section
      aria-labelledby={id}
      className={`border-b border-border ${tinted ? "bg-card/40" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <Reveal className="text-center">
          <p className="label-mono text-brand">{eyebrow}</p>
          <h2 id={id} className="display mt-3 text-3xl md:text-4xl">
            {heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="mt-10">
          <JbVideoFigure video={video} />
        </Reveal>
      </div>
    </section>
  );
}
