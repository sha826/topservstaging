"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { getDbPostById } from "@/lib/blog-db";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
}

export async function savePost(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const sb = getSupabaseAdmin();
  if (!sb) redirect("/admin/blog?error=nodb");

  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim().slice(0, 200);
  const slug = slugify(String(formData.get("slug") ?? "") || title);
  const description = String(formData.get("description") ?? "").trim().slice(0, 500);
  const content = String(formData.get("content") ?? "").replace(/\r\n/g, "\n").slice(0, 100000);
  const coverImage = String(formData.get("cover_image") ?? "").slice(0, 1000);
  const published = formData.get("published") === "on";

  if (!title || !slug || !content) redirect("/admin/blog?error=missing");

  const existing = id ? await getDbPostById(id) : null;
  const publishedAt = published
    ? existing?.published_at ?? new Date().toISOString()
    : null;

  const row = {
    slug,
    title,
    description: description || null,
    content,
    cover_image: coverImage || null,
    published,
    published_at: publishedAt,
    updated_at: new Date().toISOString(),
  };

  const { error } = existing
    ? await sb.from("posts").update(row).eq("id", id)
    : await sb.from("posts").insert(row);

  if (error) {
    redirect(`/admin/blog?error=${error.code === "23505" ? "slug" : "save"}`);
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect("/admin/blog?saved=1");
}

export async function deletePost(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const sb = getSupabaseAdmin();
  const id = String(formData.get("id") ?? "");
  if (sb && id) {
    const existing = await getDbPostById(id);
    await sb.from("posts").delete().eq("id", id);
    revalidatePath("/blog");
    if (existing) revalidatePath(`/blog/${existing.slug}`);
  }
  redirect("/admin/blog?deleted=1");
}
