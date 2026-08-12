import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog — Marketing Playbooks for the Trades",
  description:
    "Practical marketing guides for HVAC, plumbing, roofing, and home service companies — budgets, channels, and real campaign data from TopServ Digital.",
  alternates: { canonical: "/blog" },
};

// ISR: admin-created posts appear without a rebuild.
export const revalidate = 300;

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

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
              The same thinking we sell, published in the open — budgets,
              channels, and real campaign numbers for home service companies.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Articles">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <ul className="grid gap-5">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={Math.min(i * 0.06, 0.2)}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid gap-3 rounded-lg border border-border bg-card p-7 transition-colors hover:border-brand md:grid-cols-[1fr_auto] md:items-center md:p-8"
                  >
                    <div>
                      {post.coverImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.coverImage}
                          alt=""
                          loading="lazy"
                          className="mb-5 aspect-[2/1] w-full max-w-xl rounded-md border border-border object-cover"
                        />
                      )}
                      <p className="label-mono text-brand">{post.category}</p>
                      <h2 className="mt-2 max-w-2xl text-2xl font-bold leading-snug">
                        {post.title}
                      </h2>
                      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                        {post.description}
                      </p>
                      <p className="label-mono mt-4 text-ink-faint">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        {" · "}
                        {post.readingMinutes} min read
                      </p>
                    </div>
                    <ArrowRight
                      className="hidden size-6 text-brand opacity-0 transition-opacity group-hover:opacity-100 md:block"
                      aria-hidden
                    />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
