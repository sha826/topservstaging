"use client";

import { useActionState, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { saveContentItem, type ContentFormState } from "@/app/admin/content/actions";
import { resolveOptions, type ContentTypeDef, type FieldSpec } from "@/lib/content-types";
import type { ContentItem } from "@/lib/content-store";

const inputClass =
  "w-full rounded-md border border-input bg-card px-4 py-3 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40";

/**
 * The universal composer: renders any registered content type as a form
 * with completeness checks (the Content Studio pattern, generalized).
 * Adding a type to the registry gives it this UI for free.
 */
export function TypeComposer({ type, item }: { type: ContentTypeDef; item?: ContentItem }) {
  const [state, formAction, pending] = useActionState<ContentFormState, FormData>(
    saveContentItem,
    {}
  );
  const [values, setValues] = useState<Record<string, string>>(item?.payload ?? {});
  const [publish, setPublish] = useState(item?.status === "published");
  const [imgBusy, setImgBusy] = useState<string | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const set = (key: string, v: string) => setValues((p) => ({ ...p, [key]: v }));

  async function uploadImage(fieldKey: string, file: File) {
    setImgBusy(fieldKey);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload-image", { method: "POST", body: form });
      const data = await res.json().catch(() => null);
      if (data?.url) set(fieldKey, data.url);
    } finally {
      setImgBusy(null);
    }
  }

  function renderField(f: FieldSpec) {
    const v = values[f.key] ?? "";
    const id = `cf-${f.key}`;
    const label = (
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {f.label}
        {f.required && <span className="text-brand"> *</span>}
        {f.help && <span className="ml-2 font-normal text-muted-foreground">{f.help}</span>}
      </label>
    );
    if (f.kind === "textarea") {
      return (
        <div key={f.key}>
          {label}
          <textarea id={id} name={f.key} rows={f.rows ?? 3} value={v} maxLength={f.max}
            onChange={(e) => set(f.key, e.currentTarget.value)} className={`${inputClass} resize-y`} />
        </div>
      );
    }
    if (f.kind === "select") {
      return (
        <div key={f.key}>
          {label}
          <select id={id} name={f.key} value={v} onChange={(e) => set(f.key, e.currentTarget.value)} className={inputClass}>
            <option value="">Not set</option>
            {resolveOptions(f).map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      );
    }
    if (f.kind === "multiselect") {
      const chosen = v ? v.split(",").map((s) => s.trim()).filter(Boolean) : [];
      const toggle = (opt: string) => {
        const next = chosen.includes(opt) ? chosen.filter((c) => c !== opt) : [...chosen, opt];
        set(f.key, next.join(", "));
      };
      return (
        <div key={f.key}>
          {label}
          <input type="hidden" name={f.key} value={v} />
          <div className="flex flex-wrap gap-2">
            {resolveOptions(f).map((o) => {
              const on = chosen.includes(o);
              return (
                <button key={o} type="button" onClick={() => toggle(o)} aria-pressed={on}
                  className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors ${on ? "border-brand bg-brand/15 text-brand" : "border-border text-muted-foreground hover:border-brand/50"}`}>
                  {o}
                </button>
              );
            })}
          </div>
        </div>
      );
    }
    if (f.kind === "date") {
      return (
        <div key={f.key}>
          {label}
          <input id={id} name={f.key} type="date" value={v}
            onChange={(e) => set(f.key, e.currentTarget.value)} className={`${inputClass} max-w-56`} />
        </div>
      );
    }
    if (f.kind === "images") {
      const urls: string[] = (() => {
        try {
          const a = JSON.parse(v || "[]");
          return Array.isArray(a) ? a : [];
        } catch {
          return [];
        }
      })();
      return (
        <div key={f.key}>
          {label}
          <input type="hidden" name={f.key} value={urls.length ? JSON.stringify(urls) : ""} />
          {urls.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {urls.map((u, i) => (
                <div key={u + i} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={u} alt="" className="h-24 w-24 rounded-md border border-border object-cover" />
                  <button type="button" aria-label={`Remove photo ${i + 1}`}
                    onClick={() => set(f.key, JSON.stringify(urls.filter((_, j) => j !== i)))}
                    className="absolute -right-2 -top-2 flex size-6 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-xs hover:border-destructive hover:text-destructive">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          <Button type="button" variant="outline" disabled={imgBusy === f.key}
            onClick={() => fileRefs.current[f.key]?.click()}>
            {imgBusy === f.key ? "Uploading…" : "Add photos"}
          </Button>
          <input ref={(el) => { fileRefs.current[f.key] = el; }} type="file" hidden multiple
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={async (e) => {
              const files = [...(e.currentTarget.files ?? [])];
              e.currentTarget.value = "";
              setImgBusy(f.key);
              try {
                const next = [...urls];
                for (const file of files) {
                  const form = new FormData();
                  form.append("file", file);
                  const res = await fetch("/api/admin/upload-image", { method: "POST", body: form });
                  const data = await res.json().catch(() => null);
                  if (data?.url) next.push(data.url);
                }
                set(f.key, JSON.stringify(next));
              } finally {
                setImgBusy(null);
              }
            }} />
        </div>
      );
    }
    if (f.kind === "image") {
      return (
        <div key={f.key}>
          {label}
          {v && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={v} alt="" className="mb-2 h-28 w-28 rounded-md border border-border object-cover" />
          )}
          <input type="hidden" name={f.key} value={v} />
          <div className="flex gap-2">
            <Button type="button" variant="outline" disabled={imgBusy === f.key}
              onClick={() => fileRefs.current[f.key]?.click()}>
              {imgBusy === f.key ? "Uploading…" : v ? "Replace image" : "Upload image"}
            </Button>
            {v && (
              <Button type="button" variant="outline" onClick={() => set(f.key, "")}>
                Remove
              </Button>
            )}
          </div>
          <input ref={(el) => { fileRefs.current[f.key] = el; }} type="file" hidden
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={(e) => {
              const file = e.currentTarget.files?.[0];
              e.currentTarget.value = "";
              if (file) uploadImage(f.key, file);
            }} />
        </div>
      );
    }
    return (
      <div key={f.key}>
        {label}
        <input id={id} name={f.key} type={f.kind === "url" ? "url" : "text"} value={v} maxLength={f.max}
          onChange={(e) => set(f.key, e.currentTarget.value)} className={inputClass} />
      </div>
    );
  }

  const missing = type.fields.filter((f) => f.required && !(values[f.key] ?? "").trim());

  return (
    <form action={formAction} className="grid max-w-2xl gap-5">
      <input type="hidden" name="type" value={type.key} />
      {item && <input type="hidden" name="id" value={item.id} />}

      {state.error && (
        <p role="alert" className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      {type.fields.map(renderField)}

      <div className="rounded-lg border border-border bg-card px-5 py-4">
        <p className="label-mono text-ink-faint">Checks</p>
        <ul className="mt-2 grid gap-1 text-sm">
          {type.fields.filter((f) => f.required).map((f) => {
            const ok = Boolean((values[f.key] ?? "").trim());
            return (
              <li key={f.key} className="flex items-center gap-2">
                <span aria-hidden className={ok ? "text-brand" : "text-ink-faint"}>{ok ? "✓" : "○"}</span>
                <span className={ok ? "" : "text-muted-foreground"}>{f.label}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {type.publishMode === "instant" ? (
        <label className="flex items-center gap-2.5 text-sm font-semibold">
          <input type="checkbox" name="publish" checked={publish}
            onChange={(e) => setPublish(e.currentTarget.checked)} className="size-4 accent-[var(--brand)]" />
          Published (live on the site; the SEO team is notified)
        </label>
      ) : (
        <p className="text-sm text-muted-foreground">
          This type requires review: items save as drafts until an admin publishes them.
        </p>
      )}

      <div>
        <Button type="submit" size="lg" disabled={pending || missing.length > 0} className="text-base">
          {pending ? "Saving…" : publish ? "Save and publish" : "Save"}
        </Button>
        {missing.length > 0 && (
          <p className="mt-2 text-xs text-ink-faint">
            Missing: {missing.map((f) => f.label).join(", ")}
          </p>
        )}
      </div>
    </form>
  );
}
