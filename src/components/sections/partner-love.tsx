"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { motion, useInView } from "motion/react";
import { Button } from "@/components/ui/button";
import { VideoJsonLd } from "@/components/seo/json-ld";
import { testimonials, videoTestimonials, type VideoTestimonial } from "@/lib/testimonials";
import { siteConfig } from "@/lib/site-config";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function TestimonialCard({
  t,
  on,
  tilt,
  delay,
  cam,
}: {
  t: VideoTestimonial;
  on: boolean;
  tilt: number;
  delay: number;
  cam: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 46, rotate: tilt * 5 }}
      animate={on ? { opacity: 1, y: 0, rotate: tilt * 0.8 } : {}}
      transition={{ duration: 0.75, delay, ease: EASE_OUT }}
      className="overflow-hidden rounded-lg border border-border bg-card"
    >
      {/* Screening-room chrome (design-lab P2): REC · who · camera */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-background/60 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        <span className="flex items-center gap-2 text-[#ff5a48]">
          <span aria-hidden className="rec-dot size-2 rounded-full bg-[#ff5a48]" />
          Rec
        </span>
        <span className="truncate">
          {t.name} · {t.company}
        </span>
        <span className="shrink-0">Cam {cam}</span>
      </div>
      <div className="relative aspect-video bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${t.youtubeId}?autoplay=1`}
            title={t.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play testimonial: ${t.name}, ${t.company}`}
            className="group absolute inset-0"
          >
            <Image
              src={`https://i.ytimg.com/vi/${t.youtubeId}/hq720.jpg`}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
            />
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-primary-foreground shadow-lg transition-transform group-hover:scale-110"
            >
              <Play className="ml-0.5 size-6 fill-current" />
            </span>
          </button>
        )}
      </div>
    </motion.figure>
  );
}

/**
 * "Partner love" (design-lab P1): the original site's two on-camera client
 * testimonials as a double feature, with the Harrison quote as supporting
 * print. Cards rise and settle with a slight alternating tilt.
 */
export function PartnerLove() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, margin: "-20% 0px" });
  const quote = testimonials[0];

  return (
    <section aria-labelledby="partner-love-heading" className="border-b border-border bg-card/40">
      {videoTestimonials.map((t) => (
        <VideoJsonLd
          key={t.youtubeId}
          name={t.title}
          description={`On-camera testimonial from ${t.name} of ${t.company} about working with TopServ Digital.`}
          thumbnailUrl={`https://i.ytimg.com/vi/${t.youtubeId}/hq720.jpg`}
          uploadDate={t.uploadDate}
          embedUrl={`https://www.youtube.com/embed/${t.youtubeId}`}
        />
      ))}
      <div ref={ref} className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="label-mono text-brand">Real stories, real results</p>
        <h2 id="partner-love-heading" className="display mt-3 text-5xl md:text-6xl">
          Partner <span className="text-brand">love</span>
        </h2>
        <p className="mt-4 max-w-md text-muted-foreground">
          See how we&apos;ve helped businesses like yours achieve their goals
          and thrive in a competitive digital world.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {videoTestimonials.map((t, i) => (
            <TestimonialCard
              key={t.youtubeId}
              t={t}
              on={on}
              tilt={i === 0 ? -1 : 1}
              delay={0.1 + i * 0.18}
              cam={i === 0 ? "A" : "B"}
            />
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={on ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 max-w-3xl text-[15px] leading-relaxed text-muted-foreground"
        >
          <span aria-hidden className="display mr-2 align-[-0.55rem] text-4xl leading-none text-brand">
            &ldquo;
          </span>
          If it were up to me TopServ would be kept a secret because they truly
          have the ability to make your business grow.{" "}
          <strong className="text-foreground">
            If you want to expand your business, TopServ Digital is the answer!
          </strong>
          <footer className="label-mono mt-3 text-ink-faint">Michael Harrison</footer>
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={on ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7, ease: EASE_OUT }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <Button asChild size="lg" className="text-base">
            <Link href="/brand-assessment">
              Get Your Brand Grade
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-base">
            <Link href="/programs-pricing/success-stories">See more success stories</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
