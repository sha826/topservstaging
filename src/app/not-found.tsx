import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <p className="label-mono text-brand">Scene missing</p>
        <h1 className="display mt-4 text-6xl md:text-8xl">
          404<span className="text-brand">.</span>
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted-foreground">
          This page didn&apos;t make the final cut. The footage you&apos;re
          looking for may have moved or never existed.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="text-base">
            <Link href="/">
              Back to the homepage
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-base">
            <Link href="/case-studies">See our work</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-base">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
