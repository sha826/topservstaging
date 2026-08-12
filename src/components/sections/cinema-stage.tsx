"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { VideoJsonLd } from "@/components/seo/json-ld";
import { PORTFOLIO_FILMS } from "@/lib/video-portfolio";
import { cn } from "@/lib/utils";

type LightboxState = { type: "yt"; id: string } | { type: "file"; src: string } | null;

/**
 * The video portfolio as a cinema stage (design-lab M4): one big stage
 * playing the featured muted teaser, a tray of the rest below. Tray click
 * swaps the stage (double-buffered crossfade, never a black frame),
 * auto-advances every 6s while in view, and the stage opens the full film
 * on YouTube. Only films with working full-length uploads are listed (see
 * lib/video-portfolio.ts).
 */
export function CinemaStage() {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [lbLoaded, setLbLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const film = PORTFOLIO_FILMS[index];

  // Double-buffered stage: two persistent <video> slots. A swap loads the
  // next film into the hidden slot and only brings it forward once it can
  // actually render frames — the outgoing film keeps playing underneath, so
  // there is never a black gap.
  const slotARef = useRef<HTMLVideoElement>(null);
  const slotBRef = useRef<HTMLVideoElement>(null);
  const [slotFilms, setSlotFilms] = useState<[number, number]>([0, -1]);
  const [front, setFront] = useState<0 | 1>(0);
  // Ref mirror of `front`: the auto-advance interval's closure goes stale
  // between canplay-driven front swaps, so slot picks must read the ref.
  const frontRef = useRef<0 | 1>(0);
  const pendingSlotRef = useRef<number | null>(null);

  const slotRef = (k: 0 | 1) => (k === 0 ? slotARef : slotBRef);

  const show = (i: number) => {
    if (i === index) return;
    setIndex(i);
    const back = frontRef.current === 0 ? 1 : 0;
    // If the back slot already holds this film, its src won't change and
    // canplay never refires — flip immediately instead of waiting forever.
    if (slotFilms[back] === i) {
      pendingSlotRef.current = null;
      slotRef(back).current?.play().catch(() => {});
      slotRef(frontRef.current).current?.pause();
      frontRef.current = back;
      setFront(back);
      return;
    }
    pendingSlotRef.current = back;
    setSlotFilms((s) => {
      const next: [number, number] = [...s];
      next[back] = i;
      return next;
    });
  };

  const onSlotReady = (k: 0 | 1) => {
    if (pendingSlotRef.current !== k) return;
    pendingSlotRef.current = null;
    slotRef(k).current?.play().catch(() => {});
    // Pause the outgoing slot — it's invisible but would keep decoding.
    slotRef(k === 0 ? 1 : 0).current?.pause();
    frontRef.current = k;
    setFront(k);
  };

  // Viewport-gated playback of the front slot. With preload="metadata" the
  // first real fetch happens here, when the stage is actually on screen.
  useEffect(() => {
    const el = slotRef(front).current;
    if (!el) return;
    if (inView && !reduceMotion) el.play().catch(() => {});
    else el.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduceMotion, front]);

  // Kick the back slot into buffering after a swap: metadata preload alone
  // won't fire canplay, so nudge it with play() (muted autoplay is allowed);
  // onSlotReady then flips the crossfade exactly as before.
  useEffect(() => {
    const pending = pendingSlotRef.current;
    if (pending === null) return;
    const el = slotRef(pending as 0 | 1).current;
    el?.load();
    el?.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slotFilms]);

  // While the lightbox is open: scroll-lock the page AND pause the stage
  // teaser so nothing moves behind the player; resume on close.
  useEffect(() => {
    if (!lightbox) return;
    setLbLoaded(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const stage = slotRef(front).current;
    stage?.pause();
    return () => {
      document.body.style.overflow = prev;
      if (inView && !reduceMotion) stage?.play().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

  // Auto-advance while in view (off for reduced motion / open lightbox).
  useEffect(() => {
    if (!inView || reduceMotion || lightbox) return;
    const id = setInterval(() => {
      if (!document.hidden) show((index + 1) % PORTFOLIO_FILMS.length);
    }, 6000);
    return () => clearInterval(id);
  }, [inView, reduceMotion, lightbox, index]);

  // Lightbox keyboard support: Escape closes, Tab is trapped inside the
  // dialog, focus moves to the close button on open and restores on close.
  const lbRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!lightbox) return;
    const prev = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() =>
      lbRef.current?.querySelector<HTMLElement>("button")?.focus()
    );
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "Tab") {
        const nodes = lbRef.current?.querySelectorAll<HTMLElement>(
          "button, iframe, video"
        );
        if (!nodes?.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (!lbRef.current?.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [lightbox]);

  const openFilm = () => {
    setLightbox(
      film.youtubeId
        ? { type: "yt", id: film.youtubeId }
        : { type: "file", src: film.teaser }
    );
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="stage-heading"
      className="border-b border-border"
    >
      {PORTFOLIO_FILMS.filter((f) => f.youtubeId).map((f) => (
        <VideoJsonLd
          key={f.youtubeId}
          name={`${f.name} · ${f.client}`}
          description={`Video produced by TopServ Digital for ${f.client}.`}
          thumbnailUrl={
            f.poster
              ? f.poster
              : `https://i.ytimg.com/vi/${f.youtubeId}/hqdefault.jpg`
          }
          uploadDate={f.uploadDate}
          embedUrl={`https://www.youtube.com/embed/${f.youtubeId}`}
        />
      ))}

      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <p className="label-mono text-brand">The work</p>
          <h2 id="stage-heading" className="display mt-3 text-4xl md:text-5xl">
            Engaging video marketing that drives results
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            From cinematic brand stories that captivate to authentic
            testimonials that build trust, we craft high-impact visuals that
            engage and convert. Video is the future. Let&apos;s make yours
            unforgettable.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          {/* Stage */}
          <div className="relative mt-10 aspect-video overflow-hidden rounded-xl border border-border bg-black md:aspect-[16/8.2]">
            {([0, 1] as const).map((k) => {
              const fi = slotFilms[k];
              if (fi < 0) return null;
              const f = PORTFOLIO_FILMS[fi];
              return (
                <video
                  key={k}
                  ref={slotRef(k)}
                  src={f.teaser}
                  poster={f.poster}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onCanPlay={() => onSlotReady(k)}
                  className={cn(
                    "absolute inset-0 size-full object-cover transition-opacity duration-500",
                    front === k ? "opacity-100" : "opacity-0"
                  )}
                />
              );
            })}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent"
            />
            <div className="absolute bottom-4 left-5 z-[2] max-w-[55%] sm:max-w-[70%] md:bottom-6 md:left-7">
              <p className="label-mono text-brand">{film.client}</p>
              <p className="display mt-1 text-2xl leading-tight text-white sm:text-3xl md:text-4xl">{film.name}</p>
            </div>
            <button
              type="button"
              onClick={openFilm}
              className="absolute bottom-4 right-4 z-[3] flex min-h-11 items-center gap-2 rounded-md bg-brand px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-primary-foreground transition-transform hover:scale-105 md:bottom-7 md:right-7"
            >
              <Play className="size-3.5 fill-current" aria-hidden />
              Watch full film
            </button>
            {/* Whole stage is clickable too; button above is the accessible control */}
            <div
              aria-hidden
              onClick={openFilm}
              className="absolute inset-0 cursor-pointer"
            />
          </div>

          {/* Tray */}
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {PORTFOLIO_FILMS.map((f, i) => (
              <button
                key={f.teaser}
                type="button"
                onClick={() => show(i)}
                aria-label={`Show: ${f.name} · ${f.client}`}
                aria-current={i === index ? "true" : undefined}
                className={cn(
                  "relative aspect-video overflow-hidden rounded-md border-2 bg-black transition-all",
                  i === index
                    ? "border-brand opacity-100"
                    : "border-transparent opacity-55 hover:opacity-100"
                )}
              >
                {f.poster ? (
                  <Image
                    src={f.poster}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 12vw, 22vw"
                    className="object-cover"
                  />
                ) : (
                  <video
                    src={f.teaser}
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 size-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          ref={lbRef}
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[90] flex cursor-zoom-out items-center justify-center bg-black/95 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Close video"
            onClick={() => setLightbox(null)}
            className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full border border-white/20 text-lg text-white transition-colors hover:border-brand hover:text-brand"
          >
            ✕
          </button>
          {!lbLoaded && (
            <div
              aria-hidden
              className="absolute size-10 animate-spin rounded-full border-2 border-white/15 border-t-brand"
            />
          )}
          {lightbox.type === "yt" ? (
            <iframe
              src={`https://www.youtube.com/embed/${lightbox.id}?autoplay=1`}
              allow="autoplay; fullscreen"
              title="Video"
              onLoad={() => setLbLoaded(true)}
              className={cn(
                "aspect-video w-[min(94vw,1240px)] rounded-md border-0 transition-opacity duration-300",
                lbLoaded ? "opacity-100" : "opacity-0"
              )}
            />
          ) : (
            <video
              src={lightbox.src}
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
              onCanPlay={() => setLbLoaded(true)}
              className={cn(
                "aspect-video w-[min(94vw,1240px)] rounded-md transition-opacity duration-300",
                lbLoaded ? "opacity-100" : "opacity-0"
              )}
            />
          )}
        </div>
      )}
    </section>
  );
}
