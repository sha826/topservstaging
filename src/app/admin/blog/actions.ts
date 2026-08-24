"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { getDbPostById } from "@/lib/blog-db";
import { getFilePosts } from "@/lib/blog";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
}

export interface SavePostState {
  error?: string;
}

// useActionState shape: errors return inline so the form keeps everything
// the admin typed; only a successful save leaves the page.
export async function savePost(
  _prev: SavePostState,
  formData: FormData
): Promise<SavePostState> {
  if (!(await isAdmin())) redirect("/admin/login");
  const sb = getSupabaseAdmin();
  if (!sb) return { error: "Supabase is not configured, so posts cannot be saved." };

  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim().slice(0, 200);
  const slug = slugify(String(formData.get("slug") ?? "") || title);
  const description = String(formData.get("description") ?? "").trim().slice(0, 500);
  const content = String(formData.get("content") ?? "").replace(/\r\n/g, "\n").slice(0, 100000);
  const coverImage = String(formData.get("cover_image") ?? "").slice(0, 1000);
  const published = formData.get("published") === "on";
  const category = String(formData.get("category") ?? "").trim().slice(0, 60);
  const seoTitle = String(formData.get("seo_title") ?? "").trim().slice(0, 200);
  // FAQ arrives as JSON from the editor's builder; validate shape strictly.
  let faq: { question: string; answer: string }[] = [];
  try {
    const parsed = JSON.parse(String(formData.get("faq") ?? "[]"));
    if (Array.isArray(parsed)) {
      faq = parsed
        .filter(
          (f): f is { question: string; answer: string } =>
            !!f && typeof f.question === "string" && typeof f.answer === "string"
        )
        .map((f) => ({ question: f.question.trim().slice(0, 300), answer: f.answer.trim().slice(0, 2000) }))
        .filter((f) => f.question && f.answer)
        .slice(0, 20);
    }
  } catch {}

  if (!title || !slug || !content) {
    return { error: "Title, slug, and content are all required." };
  }

  // Same guard the ingest API enforces: a database post with a repo MDX
  // post's slug silently replaces that vetted page site-wide.
  const existingForGuard = id ? await getDbPostById(id) : null;
  if (slug !== existingForGuard?.slug && getFilePosts().some((f) => f.slug === slug)) {
    return { error: `The slug "${slug}" belongs to a built-in article. Choose a different slug.` };
  }

  const existing = existingForGuard;
  // Unpublishing keeps published_at, so a later republish keeps the
  // original date instead of resetting it (same merge rule as ingest).
  const publishedAt = published
    ? existing?.published_at ?? new Date().toISOString()
    : existing?.published_at ?? null;

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
  const extendedRow = {
    ...row,
    word_count: content.split(/\s+/).length,
    category: category || null,
    seo_title: seoTitle || null,
    faq: faq.length ? faq : null,
  };

  let { error } = existing
    ? await sb.from("posts").update(extendedRow).eq("id", id)
    : await sb.from("posts").insert(extendedRow);
  if (error && (error.code === "PGRST204" || /word_count/i.test(error.message ?? ""))) {
    ({ error } = existing
      ? await sb.from("posts").update(row).eq("id", id)
      : await sb.from("posts").insert(row));
  }

  if (error) {
    if (error.code === "23505") {
      return { error: `The slug "${slug}" is already taken by another post.` };
    }
    console.error("Post save failed:", error);
    return { error: "Save failed. Try again." };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");
  redirect("/admin/blog?saved=1");
}

export async function deletePost(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const sb = getSupabaseAdmin();
  const id = String(formData.get("id") ?? "");
  if (sb && id) {
    const existing = await getDbPostById(id);
    const { error } = await sb.from("posts").delete().eq("id", id);
    if (error) {
      console.error("Post delete failed:", error);
      redirect("/admin/blog?error=delete");
    }
    revalidatePath("/blog");
    revalidatePath("/sitemap.xml");
    if (existing) revalidatePath(`/blog/${existing.slug}`);
  }
  redirect("/admin/blog?deleted=1");
}
