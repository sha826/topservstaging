import { ProgramsSubnav } from "@/components/programs/subnav";

/**
 * Programs and Pricing is a navigation hub, not a page: 5 pages in a fixed
 * order that walk a prospect from understanding to investment to proof, with
 * the sub navigation persisting across all of them.
 */
export default function ProgramsPricingLayout({ children }: LayoutProps<"/programs-pricing">) {
  return (
    <>
      <div className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-8 pt-14 md:pt-20">
          <p className="label-mono text-brand">Programs and Pricing</p>
          {/* Styled as the hub masthead; each page below carries its own h1. */}
          <p className="display mt-3 text-4xl md:text-6xl">
            The BrandFormance program<span className="text-brand">.</span>
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            5 pages, in order. What we are, how it works, what it delivers, what
            it costs, and proof that it works. Read them in sequence and you
            will know more than most agencies would ever tell you.
          </p>
        </div>
      </div>
      <ProgramsSubnav />
      {children}
    </>
  );
}
