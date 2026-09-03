import Image from "next/image";

/**
 * The hero panel used across the Programs pages.
 *
 * One pattern: a photograph fills the frame, a scrim darkens its lower half,
 * and a panel of rows sits on top with a charge running down a rail through
 * them. It is the same device as the Method page, so the hub reads as part
 * of the same system rather than a different site.
 *
 * Every moving value is a transform or an opacity, so it stays on the
 * compositor. The rows never change state, so nothing is duplicated in the
 * DOM for a screen reader, and reduced motion stops it with the last row
 * left lit.
 */

const CSS = `
@keyframes ph-lit {
  0%, 2%    { opacity: 0; }
  8%, 22%   { opacity: 1; }
  30%, 100% { opacity: 0; }
}
@keyframes ph-charge {
  0%       { opacity: 0; transform: translateY(-10%); }
  8%, 86%  { opacity: 1; }
  100%     { opacity: 0; transform: translateY(430%); }
}
@media (prefers-reduced-motion: no-preference) {
  .ph-lit    { animation: ph-lit var(--ph-cycle) linear infinite; }
  .ph-charge { animation: ph-charge var(--ph-cycle) cubic-bezier(0.45, 0, 0.55, 1) infinite; }
}
`;

export function HeroPanel({
  src,
  alt,
  items,
  minHeight = "min-h-[28rem] md:min-h-[32rem]",
}: {
  src: string;
  alt: string;
  items: { k: string; v: string }[];
  minHeight?: string;
}) {
  const cycle = items.length * 1.9;
  return (
    <div className="relative">
      <style>{CSS}</style>
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-5 -z-10 bg-[radial-gradient(closest-side,rgba(158,216,68,0.12),transparent)] blur-2xl"
      />
      <div
        className={`relative flex ${minHeight} flex-col justify-end overflow-hidden rounded-[24px] border border-[#2b323c] p-3 md:p-4`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="object-cover"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,14,18,0.42),rgba(12,14,18,0.86)_56%,rgba(12,14,18,0.94))]"
        />

        <dl
          className="relative overflow-hidden rounded-[18px] border border-[#2b323c] bg-[linear-gradient(160deg,#12161d_0%,#0b0e13_60%)] p-6 md:p-7"
          style={{ ["--ph-cycle" as string]: `${cycle}s` }}
        >
          <span
            aria-hidden
            className="absolute bottom-7 left-[1.85rem] top-7 w-px bg-[linear-gradient(180deg,rgba(244,245,242,0.06),rgba(158,216,68,0.45))] md:left-[2.1rem]"
          />
          <span
            aria-hidden
            className="ph-charge absolute left-[1.73rem] top-7 h-[20%] w-[3px] rounded-full bg-[linear-gradient(180deg,transparent,var(--brand),transparent)] opacity-0 md:left-[1.98rem]"
          />
          {items.map((o, i) => (
            <div
              key={o.k}
              className={`relative flex gap-4 py-3.5 ${
                i === 0 ? "" : "border-t border-[rgba(244,245,242,0.08)]"
              }`}
            >
              <span
                aria-hidden
                className="ph-lit pointer-events-none absolute inset-y-0 left-[-0.75rem] right-[-0.75rem] rounded-[10px] bg-[linear-gradient(90deg,rgba(158,216,68,0.16),transparent_78%)] opacity-0"
                style={{ animationDelay: `${(i * cycle) / items.length}s` }}
              />
              <span
                aria-hidden
                className="relative z-10 mt-1 block size-2 shrink-0 rounded-full bg-brand"
              />
              <div className="relative z-10">
                <dt className="display text-[clamp(1.05rem,1.6vw,1.35rem)] uppercase leading-none">
                  {o.k}
                </dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {o.v}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
