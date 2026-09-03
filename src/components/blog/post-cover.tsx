/**
 * The cover image slot for a post, used by the index cards, the article hero
 * and the "keep reading" cards so all 3 crop identically.
 *
 * Ratio is fixed at 2:1, per Image Guidelines section 7, and the box holds
 * that ratio whether or not an image exists, so a post without a cover costs
 * no layout shift and no empty frame. The fallback is a branded panel rather
 * than a stock photograph: Image Guidelines section 14 is explicit that a
 * missing asset ships as typography or a built visual, never as a fabricated
 * substitute.
 *
 * A plain img, not next/image, matching the documented departure already in
 * force on these routes (Image Guidelines section 16, conflict 1). Width and
 * height are stated so the box reserves space before the file lands, and
 * covers are SVG or WebP, which the optimizer would not improve on.
 *
 * Alt text follows SEO Guidelines 10.4: descriptive when the post supplies
 * it, empty when it does not, because an undescribed cover is decoration.
 */
export function PostCover({
  src,
  alt,
  category,
  priority = false,
  className = "",
}: {
  src?: string;
  alt?: string;
  category: string;
  priority?: boolean;
  className?: string;
}) {
  const frame =
    "relative aspect-[2/1] w-full overflow-hidden rounded-md border border-border bg-surface-raised";

  if (!src) {
    return (
      <div className={`${frame} ${className}`} aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_0%,color-mix(in_oklab,var(--brand)_14%,transparent),transparent_62%)]" />
        <div className="absolute inset-0 flex items-end p-5">
          <p className="label-mono text-brand">{category}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${frame} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? ""}
        width={1200}
        height={600}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
  );
}
