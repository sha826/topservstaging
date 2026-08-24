"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import type { DbPostRow } from "@/lib/blog-db";
import type { SavePostState } from "@/app/admin/blog/actions";

const inputClass =
  "w-full rounded-md border border-input bg-card px-4 py-3 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
}

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

let faqIdCounter = 1;

interface Draft {
  t: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  cover: string;
  published: boolean;
  category?: string;
  seoTitle?: string;
  faq?: { question: string; answer: string }[];
}

export function PostForm({
  post,
  saveAction,
  deleteAction,
}: {
  post?: DbPostRow;
  saveAction: (prev: SavePostState, formData: FormData) => Promise<SavePostState>;
  deleteAction?: (formData: FormData) => void;
}) {
  const [state, formAction, isPending] = useActionState(saveAction, {});
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [description, setDescription] = useState(post?.description ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [published, setPublished] = useState(post?.published ?? false);
  const [category, setCategory] = useState(post?.category ?? "");
  const [seoTitle, setSeoTitle] = useState(post?.seo_title ?? "");
  const [faq, setFaq] = useState<FaqItem[]>(
    (post?.faq ?? []).map((f) => ({ id: faqIdCounter++, question: f.question, answer: f.answer }))
  );
  const [faqConfirm, setFaqConfirm] = useState<number | null>(null);
  const [cover, setCover] = useState(post?.cover_image ?? "");
  const [imgPrompt, setImgPrompt] = useState("");
  const [genBusy, setGenBusy] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  const coverFileRef = useRef<HTMLInputElement>(null);
  const [dirty, setDirty] = useState(false);
  const [restorable, setRestorable] = useState<Draft | null>(null);

  const draftKey = `tsd-post-draft:${post?.id ?? "new"}`;
  const draftKeyRef = useRef(draftKey);
  draftKeyRef.current = draftKey;

  // Offer to restore an autosaved draft that is newer than the loaded post.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKeyRef.current);
      if (!raw) return;
      const draft = JSON.parse(raw) as Draft;
      const newerThanPost = !post || draft.t > Date.parse(post.updated_at);
      const differs =
        draft.title !== (post?.title ?? "") ||
        draft.content !== (post?.content ?? "") ||
        draft.description !== (post?.description ?? "") ||
        draft.slug !== (post?.slug ?? "") ||
        draft.cover !== (post?.cover_image ?? "");
      if (newerThanPost && differs) setRestorable(draft);
      else localStorage.removeItem(draftKeyRef.current);
    } catch {
      // Private browsing / corrupt draft: skip silently.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave to localStorage (debounced) once anything changed.
  useEffect(() => {
    if (!dirty) return;
    const timer = setTimeout(() => {
      try {
        const draft: Draft = {
          t: Date.now(), title, slug, description, content, cover, published,
          category, seoTitle,
          faq: faq.map(({ question, answer }) => ({ question, answer })),
        };
        localStorage.setItem(draftKeyRef.current, JSON.stringify(draft));
      } catch {
        // Storage full or unavailable: the unload guard still protects.
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [dirty, title, slug, description, content, cover, published, category, seoTitle, faq]);

  // Warn before closing/reloading the tab with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function restoreDraft() {
    if (!restorable) return;
    setTitle(restorable.title);
    setSlug(restorable.slug);
    setSlugTouched(true);
    setDescription(restorable.description);
    setContent(restorable.content);
    setCover(restorable.cover);
    setPublished(restorable.published);
    setCategory(restorable.category ?? "");
    setSeoTitle(restorable.seoTitle ?? "");
    setFaq((restorable.faq ?? []).map((f) => ({ id: faqIdCounter++, question: String(f?.question ?? ""), answer: String(f?.answer ?? "") })));
    setDirty(true);
    setRestorable(null);
  }

  function discardDraft() {
    try {
      localStorage.removeItem(draftKeyRef.current);
    } catch {}
    setRestorable(null);
  }

  const slugChangedOnLive = Boolean(post?.published) && slug !== post?.slug;

  async function uploadCover(file: File) {
    setGenBusy(true);
    setGenError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload-image", { method: "POST", body: form });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.url) {
        throw new Error(data?.error ?? `Upload failed (${res.status})`);
      }
      setCover(data.url);
      setDirty(true);
    } catch (e) {
      setGenError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setGenBusy(false);
    }
  }

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
      setDirty(true);
    } catch (e) {
      setGenError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setGenBusy(false);
    }
  }

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        const submitter = (e.nativeEvent as SubmitEvent).submitter;
        if (submitter instanceof HTMLElement && submitter.dataset.delete) return;
        if (
          slugChangedOnLive &&
          !confirm(
            `This post is live at /blog/${post?.slug}. Saving with the new slug moves it to /blog/${slug} and the old link will 404. Continue?`
          )
        ) {
          e.preventDefault();
          return;
        }
        // Keep the draft until the save is CONFIRMED (the list page clears it
        // on saved=1) — a submit can still bounce to login or fail.
        try {
          sessionStorage.setItem("tsd-pending-save", draftKeyRef.current);
        } catch {}
      }}
      className="grid max-w-3xl gap-5"
    >
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="cover_image" value={cover} />

      {restorable && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-brand/50 bg-brand/10 px-4 py-3">
          <p className="text-sm">
            You have unsaved changes from{" "}
            {new Date(restorable.t).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
            .
          </p>
          <div className="flex gap-2">
            <Button type="button" size="sm" onClick={restoreDraft}>
              Restore
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={discardDraft}>
              Discard
            </Button>
          </div>
        </div>
      )}

      {state.error && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {state.error}
        </p>
      )}

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
            setDirty(true);
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
            setDirty(true);
          }}
          className={`${inputClass} font-mono text-sm`}
        />
        {slugChangedOnLive && (
          <p className="mt-1.5 text-sm text-amber-500">
            This post is live at /blog/{post?.slug}. Changing the slug moves it to a new URL and
            the old link will 404.
          </p>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="post-category" className="mb-1.5 block text-sm font-semibold">
            Category <span className="font-normal text-muted-foreground">(eyebrow, default Insights)</span>
          </label>
          <input
            id="post-category"
            name="category"
            value={category}
            maxLength={60}
            placeholder="Video Marketing"
            onChange={(e) => {
              setCategory(e.currentTarget.value);
              setDirty(true);
            }}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="post-seo-title" className="mb-1.5 flex items-baseline justify-between text-sm font-semibold">
            <span>SEO title <span className="font-normal text-muted-foreground">(tab title; empty = title)</span></span>
            <span className={`font-mono text-xs font-normal ${seoTitle.length > 65 ? "text-brand" : "text-ink-faint"}`}>
              {seoTitle.length}/60 ideal
            </span>
          </label>
          <input
            id="post-seo-title"
            name="seo_title"
            value={seoTitle}
            maxLength={200}
            onChange={(e) => {
              setSeoTitle(e.currentTarget.value);
              setDirty(true);
            }}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="post-description" className="mb-1.5 block text-sm font-semibold">
          Description <span className="font-normal text-muted-foreground">(SEO + card text)</span>
        </label>
        <textarea
          id="post-description"
          name="description"
          rows={2}
          value={description}
          onChange={(e) => {
            setDescription(e.currentTarget.value);
            setDirty(true);
          }}
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
            {genBusy ? "Working…" : "Generate with AI"}
          </Button>
          <Button
            type="button"
            onClick={() => coverFileRef.current?.click()}
            disabled={genBusy}
            variant="outline"
          >
            Upload
          </Button>
          <input
            ref={coverFileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            hidden
            onChange={(e) => {
              const file = e.currentTarget.files?.[0];
              if (file) uploadCover(file);
              e.currentTarget.value = "";
            }}
          />
          {cover && (
            <Button
              type="button"
              onClick={() => {
                setCover("");
                setDirty(true);
              }}
              variant="outline"
            >
              Remove
            </Button>
          )}
        </div>
        <div className="mt-3">
          <label htmlFor="post-cover-url" className="mb-1 block text-xs font-semibold text-muted-foreground">
            Or paste an image URL
          </label>
          <input
            id="post-cover-url"
            value={cover}
            onChange={(e) => {
              setCover(e.currentTarget.value);
              setDirty(true);
            }}
            placeholder="https://…"
            className={`${inputClass} max-w-md py-2 font-mono text-base md:text-xs`}
          />
        </div>
        {genError && (
          <p role="alert" className="mt-2 text-sm text-destructive">
            {genError}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="post-content" className="mb-1.5 block text-sm font-semibold">
          Content{" "}
          <span className="font-normal text-muted-foreground">
            (Markdown — drag or paste images straight in)
          </span>
        </label>
        <MarkdownEditor
          id="post-content"
          name="content"
          rows={18}
          required
          value={content}
          onChange={(next) => {
            setContent(next);
            setDirty(true);
          }}
        />
      </div>

      {/* FAQ builder: visible section + FAQPage schema, single source of truth */}
      <div>
        <p className="mb-1.5 text-sm font-semibold">
          FAQ <span className="font-normal text-muted-foreground">(renders as a section + FAQPage schema; do not repeat in the body)</span>
        </p>
        <div className="grid gap-3">
          {faq.map((f, i) => (
            <div key={f.id} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <input
                  aria-label={`Question ${i + 1}`}
                  value={f.question}
                  maxLength={300}
                  placeholder="Question"
                  className={`${inputClass} font-semibold`}
                  onChange={(e) => {
                    setFaq(faq.map((x) => (x.id === f.id ? { ...x, question: e.currentTarget.value } : x)));
                    setDirty(true);
                  }}
                />
                <button
                  type="button"
                  aria-label={faqConfirm === f.id ? `Confirm removing question ${i + 1}` : `Remove question ${i + 1}`}
                  onClick={() => {
                    if (faqConfirm === f.id) {
                      setFaq(faq.filter((x) => x.id !== f.id));
                      setFaqConfirm(null);
                      setDirty(true);
                    } else {
                      setFaqConfirm(f.id);
                      setTimeout(() => setFaqConfirm((c) => (c === f.id ? null : c)), 2500);
                    }
                  }}
                  className={`cursor-pointer whitespace-nowrap rounded-md border px-2.5 py-2 text-sm transition-colors ${faqConfirm === f.id ? "border-destructive bg-destructive/15 text-destructive" : "border-border text-muted-foreground hover:border-destructive/60 hover:text-destructive"}`}
                >
                  {faqConfirm === f.id ? "Sure?" : "✕"}
                </button>
              </div>
              <textarea
                aria-label={`Answer ${i + 1}`}
                rows={2}
                value={f.answer}
                maxLength={2000}
                placeholder="Answer"
                className={`${inputClass} mt-2 resize-y`}
                onChange={(e) => {
                  setFaq(faq.map((x) => (x.id === f.id ? { ...x, answer: e.currentTarget.value } : x)));
                  setDirty(true);
                }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setFaq([...faq, { id: faqIdCounter++, question: "", answer: "" }]);
              setDirty(true);
            }}
            className="cursor-pointer rounded-lg border border-dashed border-border py-2.5 text-sm text-muted-foreground transition-colors hover:border-brand/60 hover:text-brand"
          >
            + Add a question
          </button>
        </div>
      </div>
      <input
        type="hidden"
        name="faq"
        value={JSON.stringify(
          faq
            .map(({ question, answer }) => ({ question: question.trim(), answer: answer.trim() }))
            .filter((f) => f.question && f.answer)
        )}
      />

      {/* Structure checks (the Content Studio rail, fused in) */}
      <div className="rounded-lg border border-border bg-card p-5">
        <p className="label-mono text-ink-faint">Structure checks</p>
        <ul className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
          {(() => {
            const words = content.trim() ? content.trim().split(/\s+/).length : 0;
            const completeFaq = faq.filter((f) => f.question.trim() && f.answer.trim()).length;
            const partialFaq = faq.some((f) => Boolean(f.question.trim()) !== Boolean(f.answer.trim()));
            const checks = [
              { label: "Title (3+ characters)", ok: title.trim().length >= 3 },
              { label: `Body (300+ words recommended), ${words} words`, ok: words >= 300 },
              { label: "Description for SEO and cards", ok: description.trim().length > 0 },
              { label: "Cover image", ok: Boolean(cover) },
              { label: partialFaq ? "FAQ has an incomplete entry" : `FAQ entries, ${completeFaq} complete`, ok: completeFaq > 0 && !partialFaq },
              { label: "No H1 in body (the site renders the title)", ok: !/^#\s/m.test(content) },
            ];
            return checks.map((c) => (
              <li key={c.label} className="flex items-start gap-2">
                <span aria-hidden className={c.ok ? "text-brand" : "text-ink-faint"}>{c.ok ? "✓" : "○"}</span>
                <span className={c.ok ? "" : "text-muted-foreground"}>{c.label}</span>
              </li>
            ));
          })()}
        </ul>
      </div>

      <label className="flex items-center gap-2.5 text-sm font-semibold">
        <input
          type="checkbox"
          name="published"
          checked={published}
          onChange={(e) => {
            setPublished(e.currentTarget.checked);
            setDirty(true);
          }}
          className="size-4 accent-[var(--brand)]"
        />
        Published (visible on the site)
      </label>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" size="lg" disabled={isPending} className="text-base">
          {isPending ? "Saving…" : "Save post"}
        </Button>
        {post && deleteAction && (
          <Button
            type="submit"
            size="lg"
            variant="outline"
            formAction={deleteAction}
            data-delete="true"
            className="text-base text-destructive hover:border-destructive"
            onClick={(e) => {
              if (!confirm(`Delete "${post?.title ?? title}" permanently? This cannot be undone.`)) {
                e.preventDefault();
              }
            }}
          >
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}
