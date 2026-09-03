import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { PostCover } from "@/components/blog/post-cover";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/json-ld";
import { getAllPosts, getPost } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";
import { formatDate } from "@/lib/utils";

interface Params {
  slug: string;
}

// ISR safety net only: ingest revalidates on-demand at every write.
export const revalidate = 3600;

export async function generateStaticParams(): Promise<Params[]> {
  return (await getAllPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    // seoTitle is the complete tab title (often already branded), so it
    // bypasses the layout's "| TopServ Digital" template.
    title: post.seoTitle ? { absolute: post.seoTitle } : post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      images: [
        post.coverImage
          ? { url: post.coverImage }
          : {
              url: `/api/og?title=${encodeURIComponent(post.title)}&eyebrow=${encodeURIComponent(post.category)}`,
              width: 1200,
              height: 630,
            },
      ],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // Same-category posts first, everything else after, newest first.
  const related = (await getAllPosts())
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) =>
      Number(b.category === post.category) - Number(a.category === post.category) ||
      b.date.localeCompare(a.date)
    )
    .slice(0, 3);

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        url={`${siteConfig.url}/blog/${post.slug}`}
        image={
          post.coverImage ??
          `${siteConfig.url}/api/og?title=${encodeURIComponent(post.title)}&eyebrow=${encodeURIComponent(post.category)}`
        }
        datePublished={post.date}
        dateModified={post.updated ?? post.date}
        authorName={post.author}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      {post.faq && <FAQJsonLd items={post.faq} />}

      <article>
        <header className="border-b border-border">
          <div className="mx-auto max-w-3xl px-5 pb-12 pt-20 md:pt-28">
            <p className="label-mono text-brand">{post.category}</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {post.description}
            </p>
            <p className="label-mono mt-6 text-ink-faint">
              By {post.author}
              {" · "}
              Published <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.updated && (
                <>
                  {" · "}
                  Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </>
              )}
              {" · "}
              {post.readingMinutes} min read
            </p>
          </div>
        </header>

        {/* The feature image sits between the header and the body, wider than
            the reading measure, and is the page's LCP element. */}
        <div className="mx-auto max-w-5xl px-5 pt-10">
          <PostCover
            src={post.coverImage}
            alt={post.coverAlt}
            category={post.category}
            priority
            className="rounded-lg"
          />
        </div>

        <div className="mx-auto max-w-3xl px-5 py-12">
          <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-a:text-brand-hot prose-a:underline-offset-2 prose-blockquote:border-brand prose-strong:text-foreground prose-th:text-foreground">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  // Database posts come from external systems: render as plain
                  // markdown so JSX/expressions can never execute. Repo MDX
                  // files keep full MDX power.
                  format: post.source === "db" ? "md" : "mdx",
                },
              }}
            />
            {post.faq && (
              <>
                <h2>Frequently asked questions</h2>
                {post.faq.map((f) => (
                  <div key={f.question}>
                    <h3>{f.question}</h3>
                    <p>{f.answer}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </article>

      <section aria-label="Call to action" className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-5 px-5 py-12">
          <p className="max-w-md text-lg font-semibold">
            Want this run for your company instead of reading about it?
          </p>
          <Button asChild size="lg">
            <a href={siteConfig.booking.discoveryCall}>Book a discovery call</a>
          </Button>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-label="More articles" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-5 py-14">
            <h2 className="label-mono text-brand">Keep reading</h2>
            <ul className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-brand"
                  >
                    <PostCover
                      src={r.coverImage}
                      alt={r.coverAlt}
                      category={r.category}
                    />
                    <p className="label-mono mt-4 text-brand">{r.category}</p>
                    <h3 className="mt-2 text-lg font-bold leading-snug group-hover:text-brand">
                      {r.title}
                    </h3>
                    <p className="label-mono mt-auto pt-4 text-ink-faint">
                      {r.readingMinutes} min read
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <nav aria-label="Back to blog" className="border-t border-border">
        <div className="mx-auto max-w-3xl px-5 py-8">
          <Link href="/blog" className="label-mono text-muted-foreground transition-colors hover:text-brand">
            ← All articles
          </Link>
        </div>
      </nav>
    </>
  );
}
