import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

/**
 * About Jonathan, served at /jonathan.
 *
 * WHAT THIS PAGE IS FOR. Copy Framework 17 governs it, because the Argument
 * Spine has no entry for this route. The page connects Jonathan to
 * BrandFormance to TopServ, and it supports the book, the podcast, speaking
 * and media. It is the E-E-A-T anchor for every article he bylines
 * (SEO Guidelines 9.1) and the Person entity the rest of the graph points at.
 *
 * WHAT IT IS NOT. Copy Framework 28 names the failure mode outright: this
 * site must never become a Jonathan Bannister fan site. So the page argues
 * rather than flatters, the methodology is linked and never re-taught here,
 * and it closes by handing the reader back to the institution.
 *
 * KEYWORDS (Keyword Research 4.7, never re-researched). Primary: jonathan
 * bannister. Secondary: creator of brandformance, jonathan bannister topserv.
 * Supporting: home service hustle host, f#ck digital marketing author. The
 * primary sits in the title, the H1, the first 100 words, one H2 and the
 * hero alt text exactly once, per SEO Guidelines 3.3.
 *
 * IMAGES. 3, all authentic, none generated (Image Guidelines 4.1, 4.2). The
 * portrait and the book cover are TopServ's own assets from the F#CK Digital
 * Marketing funnel; the podcast artwork is the published Home Service Hustle
 * cover. Nothing synthetic sits next to a claim (4.4). All 3 run through
 * next/image with explicit dimensions; the portrait is the LCP element and
 * is priority loaded (SEO Guidelines 10.2).
 *
 * MOTION. Transform only, per the hard rule learned on /about: an opacity
 * keyframe with `both` fill leaves below-fold content invisible at rest and
 * fails SEO Guidelines 10.1. Every word here is present with JS disabled.
 */
export const metadata: Metadata = {
  title: { absolute: "Jonathan Bannister: Creator of BrandFormance | TopServ" },
  description:
    "Jonathan Bannister founded TopServ Digital in 2016 and created BrandFormance, the argument that brand creates the demand performance marketing captures.",
  alternates: { canonical: "/jonathan" },
  openGraph: {
    title: "Jonathan Bannister: Creator of BrandFormance",
    description:
      "The founder of TopServ Digital on lead dependency, owned attention, and why being found is not the same as being chosen.",
  },
};

const URL = `${siteConfig.url}/jonathan`;
const PERSON_ID = `${siteConfig.url}/#jonathan`;
const { booking, company, podcast, stats } = siteConfig;

const BOOK_TITLE = "F#CK Digital Marketing";
const BOOK_SUBTITLE = "Why Building a Memorable Brand Matters More Than Rankings";

/** Copy Framework 17, verbatim as supporting authority. Nothing added. */
const CREDENTIALS = [
  "Founder and CEO, TopServ Digital",
  "Creator of BrandFormance",
  "Bestselling author",
  "Keynote speaker",
  `Host of the ${podcast.name} podcast`,
  "Entrepreneur",
  "Former law enforcement officer",
];

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

/**
 * Transform-only scroll motion. No opacity anywhere, so the page reads
 * identically with JS off, with animation-timeline unsupported, and with
 * reduced motion requested.
 */
function JonathanStyles() {
  return (
    <style>{`
@keyframes jb-rise { from { transform: translateY(20px); } }
@keyframes jb-markx { from { transform: scaleX(0); } }
@supports (animation-timeline: view()) {
  .jb-rise { animation: jb-rise linear both; animation-timeline: view(); animation-range: entry 2% cover 22%; }
  .jb-mark { animation: jb-markx linear both; animation-timeline: view(); animation-range: entry 6% cover 30%; transform-origin: left center; }
}
@media (prefers-reduced-motion: reduce) {
  .jb-rise, .jb-mark { animation: none; }
}
    `}</style>
  );
}

export default function JonathanPage() {
  return (
    <>
      <JonathanStyles />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About Jonathan", href: "/jonathan" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfilePage",
              "@id": `${URL}#profilepage`,
              url: URL,
              name: "Jonathan Bannister, creator of BrandFormance",
              isPartOf: { "@id": `${siteConfig.url}/#organization` },
              mainEntity: { "@id": PERSON_ID },
            },
            {
              "@type": "Person",
              "@id": PERSON_ID,
              name: company.founder,
              jobTitle: "Founder and CEO",
              worksFor: { "@id": `${siteConfig.url}/#organization` },
              url: URL,
              image: `${siteConfig.url}/images/jonathan/jonathan-bannister.webp`,
              // Only what the page renders. Iron rule, SEO Guidelines 7.
              knowsAbout: [
                "BrandFormance",
                "Brand marketing",
                "Performance marketing",
                "Home service marketing",
                "Video marketing",
              ],
              author: {
                "@type": "Book",
                name: BOOK_TITLE,
                alternativeHeadline: BOOK_SUBTITLE,
                url: booking.hvacEbook,
              },
            },
          ],
        }}
      />

      {/* 01 THE CLAIM. One H1, carrying the primary keyword and the argument
          at the same time. The portrait is the LCP element. */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-16 md:pb-20 md:pt-24">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,53fr)_minmax(0,47fr)] lg:gap-16">
            <div>
              <p className="label-mono text-brand">
                Creator of BrandFormance&reg;
              </p>
              <h1 className="display mt-4 text-5xl leading-[0.95] md:text-7xl">
                Jonathan Bannister built the argument this company runs on
                <span className="text-brand">.</span>
              </h1>
              <div className="mt-6 grid max-w-xl gap-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  He founded TopServ Digital in {company.foundedYear} and spent
                  the decade since inside home service marketing, watching the
                  same thing happen to good companies. They ranked. They
                  advertised. They still lost the job to the name the homeowner
                  already knew.
                </p>
                <p className="text-foreground">
                  BrandFormance is what he built so his clients would be that
                  name.
                </p>
              </div>
            </div>

            <figure className="jb-rise relative overflow-hidden rounded-lg border border-border">
              <Image
                src="/images/jonathan/jonathan-bannister.webp"
                alt="Jonathan Bannister, founder of TopServ Digital, at work in the company office"
                width={1800}
                height={1202}
                sizes="(min-width: 1024px) 47vw, 100vw"
                priority
                className="h-full w-full object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* 02 THE PROBLEM. His own language, unsoftened. */}
      <section aria-labelledby="against-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 id="against-heading" className="display text-3xl md:text-4xl">
                What Jonathan Bannister argues against
              </h2>
              <div className="jb-mark mt-6 h-px w-24 bg-brand" aria-hidden />
            </div>
            <div className="grid max-w-[68ch] gap-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                He calls lead dependency digital heroin. Stop paying and the
                leads stop. Lose rankings and the phone slows. Competition
                arrives and the cost of every lead climbs with it. The industry
                sells that dependency as a service, renews it every month, and
                calls the renewal a strategy.
              </p>
              <p>
                His objection is not that performance marketing fails. It is
                that performance marketing captures demand it did not create.
                Rent the attention and you rent the results attached to it. The
                day you stop paying, you own nothing.
              </p>
              <p className="text-foreground">
                Being found is not the same as being chosen. That sentence is
                the whole disagreement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 THE ANSWER. Named, then linked. The methodology is taught on its
          own pages and never re-taught here. */}
      <section aria-labelledby="idea-heading" className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 id="idea-heading" className="display text-3xl md:text-4xl">
                The idea he built instead
              </h2>
              <div className="jb-mark mt-6 h-px w-24 bg-brand" aria-hidden />
            </div>
            <div className="max-w-[68ch]">
              <div className="grid gap-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  BrandFormance is 1 system doing 2 jobs at once. Brand creates
                  the demand. Performance captures it. Neither is treated as
                  the winner of an internal argument, because both are measured
                  against the same number: cost per booked call.
                </p>
                <p>
                  That is the part he insists on. Awareness work usually
                  escapes measurement, so it gets cut first. Tie it to booked
                  calls and it stops being a matter of taste.
                </p>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/brandformance"
                  className="group rounded-lg border border-border bg-background p-5 transition-colors hover:border-brand"
                >
                  <p className="label-mono text-brand">The methodology</p>
                  <p className="display mt-2 text-2xl">BrandFormance</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    The definitive explanation: 10 questions, answered in
                    order.
                  </p>
                </Link>
                <Link
                  href="/method"
                  className="group rounded-lg border border-border bg-background p-5 transition-colors hover:border-brand"
                >
                  <p className="label-mono text-brand">The system</p>
                  <p className="display mt-2 text-2xl">The 6 stages</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    How the method actually runs, stage by stage, and what
                    each one produces.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 THE BOOK. Copy Framework 18: the book explains the problem,
          BrandFormance answers it, TopServ implements it. Real cover art,
          TopServ's own asset. */}
      <section aria-labelledby="book-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:gap-16">
            <figure className="jb-rise order-2 lg:order-1">
              <Image
                src="/images/jonathan/fck-digital-marketing-book.webp"
                alt={`Front and back covers of the book ${BOOK_TITLE}, subtitled ${BOOK_SUBTITLE}`}
                width={802}
                height={753}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="h-auto w-full max-w-md"
              />
            </figure>
            <div className="order-1 lg:order-2">
              <p className="label-mono text-brand">The book</p>
              <h2 id="book-heading" className="display mt-3 text-4xl md:text-5xl">
                {BOOK_TITLE}
              </h2>
              <p className="mt-3 text-lg text-foreground">{BOOK_SUBTITLE}</p>
              <div className="mt-6 grid max-w-[60ch] gap-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  The manifesto behind the methodology. It is the long version
                  of the objection: why most of what home service companies buy
                  is rented attention, and what owning attention would require
                  instead.
                </p>
                <p>
                  The book explains the problem. BrandFormance answers it.
                  TopServ implements it. Read in that order, the 3 are 1
                  argument.
                </p>
              </div>
              <a
                href={booking.hvacEbook}
                className="mt-7 inline-flex min-h-[44px] items-center gap-2 py-2.5 text-base font-semibold underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Read {BOOK_TITLE}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 05 THE PODCAST. Copy Framework 19: another surface of the same
          ecosystem, not a hobby. Published cover artwork. */}
      <section aria-labelledby="podcast-heading" className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:gap-16">
            <div>
              <p className="label-mono text-brand">The podcast</p>
              <h2 id="podcast-heading" className="display mt-3 text-4xl md:text-5xl">
                {podcast.name}
              </h2>
              <p className="mt-3 text-lg text-foreground">
                Marketing, mindset and money, for the trades.
              </p>
              <div className="mt-6 grid max-w-[60ch] gap-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  He hosts it, and the guests are operators rather than
                  marketers: HVAC, plumbing, electrical and the rest of the
                  trades, talking about what actually grew the company and what
                  quietly drained it.
                </p>
                <p>
                  It is also the argument working on itself. A brand that
                  publishes every week is the thing this company sells, so the
                  founder does it in public before asking any client to.
                </p>
              </div>
              <a
                href={podcast.url}
                className="mt-7 inline-flex min-h-[44px] items-center gap-2 py-2.5 text-base font-semibold underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Listen to {podcast.name}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>

            <figure className="jb-rise overflow-hidden rounded-lg border border-border">
              <Image
                src="/images/jonathan/home-service-hustle-cover.webp"
                alt={`Cover artwork for the ${podcast.name} podcast, a vintage broadcast microphone inside a house shaped badge`}
                width={1000}
                height={1000}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="h-auto w-full"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* 06 QUALIFICATION AND HANDBACK. Credentials from Copy Framework 17,
          then the institution takes the page back. */}
      <section aria-labelledby="credible-heading" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16">
            {/* Sticky so the heading tracks the credit roll instead of
                leaving a dead gutter beside it. */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 id="credible-heading" className="display text-3xl md:text-4xl">
                Why the argument is worth hearing
              </h2>
              <div className="jb-mark mt-6 h-px w-24 bg-brand" aria-hidden />
              <p className="mt-6 max-w-[32ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
                The credentials are not the argument. They are the reason to
                sit through it.
              </p>
            </div>

            <div>
              {/* A credit roll, same call sheet idiom the services list uses:
                  mono index, display type, 1 column so the 7th item is not
                  orphaned in a ragged second column. */}
              <div className="flex items-baseline justify-between border-b border-border pb-3">
                <p className="label-mono text-ink-faint">Credit</p>
                <p className="label-mono text-ink-faint">
                  {pad(CREDENTIALS.length)} total
                </p>
              </div>
              <ol className="jb-rise">
                {CREDENTIALS.map((item, i) => (
                  <li
                    key={item}
                    className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline gap-4 border-b border-border py-4 md:grid-cols-[3.25rem_minmax(0,1fr)] md:gap-5 md:py-[18px]"
                  >
                    <span className="label-mono text-brand">{pad(i + 1)}</span>
                    <span className="display text-2xl leading-none md:text-[27px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-10 grid max-w-[68ch] gap-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Founded in {company.foundedYear} as {company.formerName},
                  HVAC first and deliberately narrow. The 2024 rebrand made
                  video the engine of the system. The work now runs from{" "}
                  {company.address.city}, {company.address.region}, across 6
                  home service trades, {stats.clients} clients in.
                </p>
                <p className="text-foreground">
                  He says all of this on camera, at length, because trust moves
                  to a person before it moves to a logo. That is a starting
                  condition, not the plan. TopServ has to outlive whoever
                  started it.
                </p>
              </div>

              <Link
                href="/about"
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 py-2.5 text-base font-semibold underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                About TopServ Digital
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 07 THE SINGLE NEXT STEP. Same destination as every other page. */}
      <section aria-label="Next step">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-12 md:py-16">
          <p className="max-w-xl text-xl font-semibold">
            The methodology matters more than the person. Start where he would
            start you.
          </p>
          <Button asChild size="lg" className="text-base">
            <Link href="/brand-assessment">
              Get your Brand Grade
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
