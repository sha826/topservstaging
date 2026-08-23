import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClearSavedDraft } from "@/components/admin/clear-saved-draft";
import { requireAdmin } from "@/lib/admin-auth";
import { listAllDbPosts } from "@/lib/blog-db";
import { getFilePosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const NOTICES: Record<string, { text: string; error?: boolean }> = {
  saved: { text: "Post saved. The blog updates immediately." },
  deleted: { text: "Post deleted." },
  delete: { text: "Delete failed — try again.", error: true },
};

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const notice = Object.keys(NOTICES).find((k) => params[k] || params.error === k);
  const dbPosts = await listAllDbPosts();
  const filePosts = getFilePosts();

  return (
    <div>
      {params.saved && <ClearSavedDraft />}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="display text-4xl">Blog</h1>
        <Button asChild>
          <Link href="/admin/blog/new">New post</Link>
        </Button>
      </div>

      {notice && (
        <p
          role={NOTICES[notice].error ? "alert" : "status"}
          className={`mt-4 rounded-md border px-4 py-2.5 text-sm ${
            NOTICES[notice].error
              ? "border-destructive/40 text-destructive"
              : "border-brand/40 bg-brand/10 text-brand"
          }`}
        >
          {NOTICES[notice].text}
        </p>
      )}

      <ul className="mt-8 grid gap-3">
        {dbPosts.length === 0 && (
          <li className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
            No database posts yet — create the first one.
          </li>
        )}
        {dbPosts.map((post) => (
          <li key={post.id}>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-lg border border-border bg-card p-5 transition-colors hover:border-brand">
              <span
                className={`label-mono ${post.published ? "text-brand" : "text-ink-faint"}`}
              >
                {post.published ? "Published" : "Draft"}
              </span>
              <Link href={`/admin/blog/${post.id}`} className="font-semibold hover:text-brand">
                {post.title}
              </Link>
              <span className="font-mono text-xs text-muted-foreground">/blog/{post.slug}</span>
              <span className="ml-auto flex items-baseline gap-4">
                <Link
                  href={`/admin/blog/${post.id}/preview`}
                  className="label-mono text-muted-foreground hover:text-brand"
                >
                  Preview
                </Link>
                {post.published && (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="label-mono text-muted-foreground hover:text-brand"
                  >
                    View
                  </Link>
                )}
                <span className="text-xs text-ink-faint">
                  {post.updated_at.slice(0, 16).replace("T", " ")}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="label-mono mt-10 text-ink-faint">
        Repo posts (MDX files — edit in the codebase)
      </h2>
      <ul className="mt-3 grid gap-2">
        {filePosts.map((post) => (
          <li
            key={post.slug}
            className="flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-lg border border-border/60 p-4 text-sm text-muted-foreground"
          >
            <span>{post.title}</span>
            <span className="font-mono text-xs">/blog/{post.slug}</span>
            <span className="ml-auto text-xs text-ink-faint">{formatDate(post.date)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
