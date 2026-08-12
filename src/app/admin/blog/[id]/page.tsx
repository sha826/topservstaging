import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { getDbPostById } from "@/lib/blog-db";
import { PostForm } from "@/components/admin/post-form";
import { deletePost, savePost } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
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
      <h1 className="display text-4xl">Edit post</h1>
      <div className="mt-8">
        <PostForm post={post} saveAction={savePost} deleteAction={deletePost} />
      </div>
    </div>
  );
}
