import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { PostCover } from "@/components/blog/post-cover";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog: Marketing Playbooks for the Trades",
  description:
    "Practical marketing guides for HVAC, plumbing, roofing and home service companies: budgets, channels and real campaign data from TopServ Digital.",
  alternates: { canonical: "/blog" },
};

// ISR safety net only: the ingest pipeline revalidates on-demand at every
// write, so the timer just bounds staleness for out-of-band edits.
export const revalidate = 3600;

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-20 md:pt-28">
          <Reveal>
            <p className="label-mono text-brand">Blog</p>
            <h1 className="display mt-4 text-5xl md:text-7xl">
              Playbooks for the trades<span className="text-brand">.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              The same thinking we sell, published in the open: budgets,
              channels and real campaign numbers for home service companies.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The newest post leads, at full width, because a list of equal cards
          gives a reader no idea where to start. */}
      {lead && (
        <section aria-label="Latest article" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-14">
            <Reveal>
              <Link
                href={`/blog/${lead.slug}`}
                className="group grid gap-8 rounded-lg border border-border bg-card p-6 transition-colors hover:border-brand md:grid-cols-2 md:items-center md:p-8"
              >
                <PostCover
                  src={lead.coverImage}
                  alt={lead.coverAlt}
                  category={lead.category}
                  priority
                />
                <div>
                  <p className="label-mono text-brand">{`Latest · ${lead.category}`}</p>
                  <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                    {lead.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {lead.description}
                  </p>
                  <p className="label-mono mt-6 text-ink-faint">
                    <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                    {" · "}
                    {lead.readingMinutes} min read
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-brand">
                    Read the article
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section aria-label="Articles">
          <div className="mx-auto max-w-6xl px-5 py-14">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <li key={post.slug} className="h-full">
                  <Reveal delay={Math.min(i * 0.06, 0.2)} className="h-full">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-brand"
                    >
                      <PostCover
                        src={post.coverImage}
                        alt={post.coverAlt}
                        category={post.category}
                      />
                      <p className="label-mono mt-5 text-brand">{post.category}</p>
                      <h2 className="mt-2 text-xl font-bold leading-snug group-hover:text-brand">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                        {post.description}
                      </p>
                      <p className="label-mono mt-auto pt-6 text-ink-faint">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        {" · "}
                        {post.readingMinutes} min read
                      </p>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
