import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { requireAdmin } from "@/lib/admin-auth";
import { getDbPostById } from "@/lib/blog-db";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

/**
 * Renders a database post (draft or published) exactly as the public blog
 * will show it, behind admin auth — so drafts can be reviewed without
 * publishing them.
 */
export default async function PostPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const post = await getDbPostById(id);
  if (!post) notFound();

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-brand/40 bg-brand/10 px-5 py-3">
        <span className="label-mono text-brand">
          Preview · {post.published ? "Published" : "Draft, not public"}
        </span>
        <Link href={`/admin/blog/${post.id}`} className="label-mono text-muted-foreground hover:text-brand">
          ← Back to editor
        </Link>
        {post.published && (
          <Link href={`/blog/${post.slug}`} className="label-mono text-muted-foreground hover:text-brand">
            View live
          </Link>
        )}
      </div>

      <article className="mx-auto max-w-3xl">
        <p className="label-mono text-brand">{post.category || "Insights"}</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.description}</p>
        )}
        <p className="label-mono mt-6 text-ink-faint">
          {post.published_at
            ? `Published ${formatDate(post.published_at.slice(0, 10))}`
            : "Unpublished draft"}
        </p>
        {post.cover_image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image}
            alt=""
            className="mt-8 aspect-[2/1] w-full rounded-lg border border-border object-cover"
          />
        )}
        <div className="prose prose-invert mt-10 max-w-none prose-headings:tracking-tight prose-a:text-brand-hot prose-a:underline-offset-2 prose-blockquote:border-brand prose-strong:text-foreground prose-th:text-foreground">
          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm], format: "md" } }}
          />
          {post.faq && post.faq.length > 0 && (
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
      </article>
    </div>
  );
}
