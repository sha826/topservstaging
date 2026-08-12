import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { getAllPosts, getPost } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";
import { formatDate } from "@/lib/utils";

interface Params {
  slug: string;
}

// ISR: database posts render on demand and refresh without a rebuild.
export const revalidate = 300;

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
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      images: [
        {
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

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        url={`${siteConfig.url}/blog/${post.slug}`}
        image={`${siteConfig.url}/api/og?title=${encodeURIComponent(post.title)}&eyebrow=${encodeURIComponent(post.category)}`}
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

        <div className="mx-auto max-w-3xl px-5 py-12">
          <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-a:text-brand-hot prose-a:underline-offset-2 prose-blockquote:border-brand prose-strong:text-foreground prose-th:text-foreground">
            <MDXRemote
              source={post.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
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
