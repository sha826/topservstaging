import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Shell } from "@/components/about/page-grid";

/**
 * What is behind the methodology.
 *
 * WHY THIS IS ITS OWN SECTION. It used to be the pinned right half of the
 * qualification band, which meant the portrait, the history, the 2 figures
 * and the link all arrived while the reader was still working through 12
 * list items. It now gets its own band and its own silence, and the copy is
 * cut to what only this section can say.
 *
 * Every fact is already in the project: site-config.ts and the production
 * About and /jonathan pages. Founded 2016 as Cornerstone Marketing
 * Solutions, rebranded 2024, Frisco TX, 6 trades. Nothing inferred, no
 * invented dates or achievements, and only the 2 published figures.
 *
 * The photograph is REAL and already approved in this repository
 * (public/images/jonathan-slate.jpg, referenced by
 * src/components/sections/disrupt-statement.tsx). It is large and unboxed so
 * it reads as an institutional anchor rather than a team member card, and
 * its alt text is where this page's primary keyword sits honestly (SEO
 * Guidelines 3.3).
 */

const { company, podcast, stats } = siteConfig;

export function Institution() {
  return (
    <section
      aria-labelledby="institution-heading"
      className="border-b border-border bg-background"
    >
      <Shell className="py-16 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:gap-14 xl:gap-16">
          <div className="relative aspect-[5/4] w-full overflow-hidden">
            <Image
              src="/images/jonathan-slate.jpg"
              alt="Jonathan Bannister, founder of TopServ Digital, on the company video set holding a production slate"
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover object-[54%_28%]"
            />
          </div>

          <div>
            <p className="label-mono text-brand">{company.founder}, founder</p>
            <h2
              id="institution-heading"
              className="display mt-4 max-w-[20ch] text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.06]"
            >
              TopServ Digital is the institution behind the methodology.
            </h2>
            <p className="mt-6 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
              Founded in {company.foundedYear} as {company.formerName}, HVAC
              first and deliberately narrow. The 2024 rebrand made video the
              engine of the system. The work runs from {company.address.city},{" "}
              {company.address.region}, across 6 home service trades, with the{" "}
              {podcast.name} podcast around it.
            </p>
            <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed md:text-base">
              The methodology has a founder. It is not a company built around
              one.
            </p>

            {/* Only the 2 published figures, as they appear elsewhere. */}
            <dl className="mt-8 grid max-w-[26rem] grid-cols-2 border-t border-border">
              <div className="border-r border-border py-5 pr-6">
                <dd className="display text-[clamp(1.5rem,3vw,2.25rem)] leading-none">
                  {stats.clients}
                </dd>
                <dt className="label-mono mt-2 text-ink-faint">
                  home service clients
                </dt>
              </div>
              <div className="py-5 pl-6">
                <dd className="display text-[clamp(1.5rem,3vw,2.25rem)] leading-none">
                  {stats.teamSize}
                </dd>
                <dt className="label-mono mt-2 text-ink-faint">
                  certified professionals
                </dt>
              </div>
            </dl>

            <Link
              href="/jonathan"
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 py-2.5 text-base font-semibold underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              More on Jonathan
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Shell>
    </section>
  );
}
