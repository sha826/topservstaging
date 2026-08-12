"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { DbPostRow } from "@/lib/blog-db";

const inputClass =
  "w-full rounded-md border border-input bg-card px-4 py-3 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
}

export function PostForm({
  post,
  saveAction,
  deleteAction,
}: {
  post?: DbPostRow;
  saveAction: (formData: FormData) => void;
  deleteAction?: (formData: FormData) => void;
}) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [cover, setCover] = useState(post?.cover_image ?? "");
  const [imgPrompt, setImgPrompt] = useState("");
  const [genBusy, setGenBusy] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  async function generateImage() {
    const prompt = imgPrompt.trim() || title.trim();
    if (!prompt || genBusy) return;
    setGenBusy(true);
    setGenError(null);
    try {
      const res = await fetch("/api/admin/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.url) {
        throw new Error(data?.error ?? `Generation failed (${res.status})`);
      }
      setCover(data.url);
    } catch (e) {
      setGenError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setGenBusy(false);
    }
  }

  return (
    <form action={saveAction} className="grid max-w-3xl gap-5">
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="cover_image" value={cover} />

      <div>
        <label htmlFor="post-title" className="mb-1.5 block text-sm font-semibold">
          Title
        </label>
        <input
          id="post-title"
          name="title"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
            if (!slugTouched) setSlug(slugify(e.currentTarget.value));
          }}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="post-slug" className="mb-1.5 block text-sm font-semibold">
          Slug <span className="font-normal text-muted-foreground">(/blog/…)</span>
        </label>
        <input
          id="post-slug"
          name="slug"
          required
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.currentTarget.value);
          }}
          className={`${inputClass} font-mono text-sm`}
        />
      </div>

      <div>
        <label htmlFor="post-description" className="mb-1.5 block text-sm font-semibold">
          Description <span className="font-normal text-muted-foreground">(SEO + card text)</span>
        </label>
        <textarea
          id="post-description"
          name="description"
          rows={2}
          defaultValue={post?.description ?? ""}
          className={`${inputClass} resize-y`}
        />
      </div>

      <div className="rounded-lg border border-border bg-card p-5">
        <p className="text-sm font-semibold">Cover image</p>
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt="Cover preview"
            className="mt-3 aspect-[2/1] w-full max-w-md rounded-md border border-border object-cover"
          />
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">No cover yet.</p>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <input
            aria-label="Image prompt"
            placeholder={title ? `AI prompt (default: post title)` : "Describe the image…"}
            value={imgPrompt}
            onChange={(e) => setImgPrompt(e.currentTarget.value)}
            className={`${inputClass} max-w-md flex-1 py-2 text-base md:text-sm`}
          />
          <Button type="button" onClick={generateImage} disabled={genBusy} variant="outline">
            {genBusy ? "Generating…" : "Generate with AI"}
          </Button>
          {cover && (
            <Button type="button" onClick={() => setCover("")} variant="outline">
              Remove
            </Button>
          )}
        </div>
        {genError && (
          <p role="alert" className="mt-2 text-sm text-destructive">
            {genError}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="post-content" className="mb-1.5 block text-sm font-semibold">
          Content <span className="font-normal text-muted-foreground">(Markdown)</span>
        </label>
        <textarea
          id="post-content"
          name="content"
          rows={18}
          required
          defaultValue={post?.content ?? ""}
          spellCheck={false}
          className={`${inputClass} resize-y font-mono text-base leading-relaxed md:text-[13px]`}
        />
      </div>

      <label className="flex items-center gap-2.5 text-sm font-semibold">
        <input
          type="checkbox"
          name="published"
          defaultChecked={post?.published ?? false}
          className="size-4 accent-[var(--brand)]"
        />
        Published (visible on the site)
      </label>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" size="lg" className="text-base">
          Save post
        </Button>
        {post && deleteAction && (
          <Button
            type="submit"
            size="lg"
            variant="outline"
            formAction={deleteAction}
            className="text-base text-destructive hover:border-destructive"
            onClick={(e) => {
              if (!confirm("Delete this post permanently?")) e.preventDefault();
            }}
          >
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}
