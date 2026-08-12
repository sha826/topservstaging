import { requireAdmin } from "@/lib/admin-auth";
import { PostForm } from "@/components/admin/post-form";
import { savePost } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  await requireAdmin();
  return (
    <div>
      <h1 className="display text-4xl">New post</h1>
      <div className="mt-8">
        <PostForm saveAction={savePost} />
      </div>
    </div>
  );
}
