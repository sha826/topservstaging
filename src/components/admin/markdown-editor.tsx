"use client";

import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Bold,
  Code,
  Columns2,
  Eye,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Pencil,
  Quote,
  Table,
} from "lucide-react";

type Mode = "write" | "preview" | "split";

const PROSE =
  "prose prose-invert max-w-none prose-headings:tracking-tight prose-a:text-brand-hot prose-a:underline-offset-2 prose-blockquote:border-brand prose-strong:text-foreground prose-th:text-foreground";

const TABLE_TEMPLATE = `| Column | Column |
| --- | --- |
| Cell | Cell |`;

/**
 * Markdown editor for post bodies: formatting toolbar, live preview rendered
 * with the same remark pipeline as the published article, and image uploads
 * via button, drag-drop, or paste. The value is plain markdown, so posts
 * written here and posts pushed by external systems are identical downstream.
 */
export function MarkdownEditor({
  id,
  name,
  value,
  onChange,
  rows = 18,
  required,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (next: string) => void;
  rows?: number;
  required?: boolean;
}) {
  const [mode, setMode] = useState<Mode>("write");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  // Latest committed value, readable from async flows (multi-file uploads)
  // where the render-time closure would be stale.
  const valueRef = useRef(value);
  valueRef.current = value;

  function apply(next: string, selStart: number, selEnd: number) {
    onChange(next);
    requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(selStart, selEnd);
    });
  }

  /** Wrap the selection (or a placeholder) with markdown markers. */
  function wrap(before: string, after: string, placeholder: string) {
    const el = textareaRef.current;
    if (!el) return;
    const v = valueRef.current;
    const { selectionStart: s, selectionEnd: e } = el;
    const selected = v.slice(s, e) || placeholder;
    const next = v.slice(0, s) + before + selected + after + v.slice(e);
    apply(next, s + before.length, s + before.length + selected.length);
  }

  /** Toggle a prefix on every line the selection touches. */
  function prefixLines(prefix: string, numbered = false) {
    const el = textareaRef.current;
    if (!el) return;
    const v = valueRef.current;
    const { selectionStart: s, selectionEnd: e } = el;
    const lineStart = v.lastIndexOf("\n", s - 1) + 1;
    const lineEndIdx = v.indexOf("\n", e);
    const lineEnd = lineEndIdx === -1 ? v.length : lineEndIdx;
    const block = v.slice(lineStart, lineEnd);
    const lines = block.split("\n");
    const allPrefixed = lines.every(
      (l) => l.startsWith(prefix) || (numbered && /^\d+\. /.test(l))
    );
    const nextBlock = lines
      .map((l, i) => {
        if (allPrefixed) return l.replace(numbered ? /^\d+\. / : prefix, "");
        return numbered ? `${i + 1}. ${l}` : prefix + l;
      })
      .join("\n");
    const next = v.slice(0, lineStart) + nextBlock + v.slice(lineEnd);
    apply(next, lineStart, lineStart + nextBlock.length);
  }

  /** Insert a block on its own blank-line-separated lines at the cursor. */
  function insertBlock(block: string) {
    const el = textareaRef.current;
    if (!el) return;
    const v = valueRef.current;
    const s = Math.min(el.selectionStart, v.length);
    const needsNewlineBefore = s > 0 && v[s - 1] !== "\n";
    const chunk = `${needsNewlineBefore ? "\n\n" : ""}${block}\n\n`;
    const next = v.slice(0, s) + chunk + v.slice(s);
    const caret = s + chunk.length;
    apply(next, caret, caret);
  }

  async function uploadFiles(files: FileList | File[]) {
    const images = [...files].filter((f) => f.type.startsWith("image/"));
    if (!images.length) return;
    setUploading(true);
    setUploadError(null);
    try {
      for (const file of images) {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/admin/upload-image", { method: "POST", body: form });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.url) {
          throw new Error(data?.error ?? `Upload failed (${res.status})`);
        }
        const alt = file.name.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ");
        insertBlock(`![${alt}](${data.url})`);
        // Let React commit before the next file so valueRef holds this insert.
        await new Promise((r) => setTimeout(r, 50));
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!(e.ctrlKey || e.metaKey)) return;
    const key = e.key.toLowerCase();
    if (key === "b") {
      e.preventDefault();
      wrap("**", "**", "bold text");
    } else if (key === "i") {
      e.preventDefault();
      wrap("*", "*", "italic text");
    } else if (key === "k") {
      e.preventDefault();
      wrap("[", "](https://)", "link text");
    }
  }

  const tools: { icon: React.ReactNode; label: string; run: () => void }[] = [
    { icon: <Bold className="size-4" />, label: "Bold (Ctrl+B)", run: () => wrap("**", "**", "bold text") },
    { icon: <Italic className="size-4" />, label: "Italic (Ctrl+I)", run: () => wrap("*", "*", "italic text") },
    { icon: <Heading2 className="size-4" />, label: "Heading", run: () => prefixLines("## ") },
    { icon: <Heading3 className="size-4" />, label: "Subheading", run: () => prefixLines("### ") },
    { icon: <Link2 className="size-4" />, label: "Link (Ctrl+K)", run: () => wrap("[", "](https://)", "link text") },
    { icon: <List className="size-4" />, label: "Bullet list", run: () => prefixLines("- ") },
    { icon: <ListOrdered className="size-4" />, label: "Numbered list", run: () => prefixLines("", true) },
    { icon: <Quote className="size-4" />, label: "Quote", run: () => prefixLines("> ") },
    { icon: <Code className="size-4" />, label: "Code", run: () => wrap("`", "`", "code") },
    { icon: <Table className="size-4" />, label: "Table", run: () => insertBlock(TABLE_TEMPLATE) },
    { icon: <ImageIcon className="size-4" />, label: "Upload image", run: () => fileRef.current?.click() },
  ];

  const modes: { key: Mode; icon: React.ReactNode; label: string; className?: string }[] = [
    { key: "write", icon: <Pencil className="size-4" />, label: "Write" },
    { key: "split", icon: <Columns2 className="size-4" />, label: "Split view", className: "hidden lg:inline-flex" },
    { key: "preview", icon: <Eye className="size-4" />, label: "Preview" },
  ];

  const toolBtn =
    "inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground";

  const editorPane = (
    <textarea
      ref={textareaRef}
      id={id}
      name={name}
      rows={rows}
      required={required}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      onKeyDown={onKeyDown}
      onPaste={(e) => {
        if (e.clipboardData.files.length) {
          e.preventDefault();
          uploadFiles(e.clipboardData.files);
        }
      }}
      onDrop={(e) => {
        if (e.dataTransfer.files.length) {
          e.preventDefault();
          uploadFiles(e.dataTransfer.files);
        }
      }}
      onDragOver={(e) => e.preventDefault()}
      onInvalid={() => setMode("write")}
      spellCheck={false}
      placeholder="Write markdown here, or drag / paste images straight in…"
      className={`w-full resize-y rounded-b-lg bg-transparent px-4 py-3 font-mono text-base leading-relaxed outline-none md:text-[13px] ${
        mode === "preview" ? "hidden" : ""
      }`}
    />
  );

  const previewPane =
    mode !== "write" ? (
      <div className={`${PROSE} min-h-40 overflow-x-auto px-4 py-3 text-[15px]`}>
        {value.trim() ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
        ) : (
          <p className="text-muted-foreground">Nothing to preview yet.</p>
        )}
      </div>
    ) : null;

  return (
    <div className="rounded-lg border border-input bg-card transition-colors focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/40">
      <div className="flex flex-wrap items-center gap-1 border-b border-border px-2 py-1.5">
        {tools.map((t) => (
          <button
            key={t.label}
            type="button"
            title={t.label}
            aria-label={t.label}
            onClick={t.run}
            className={toolBtn}
          >
            {t.icon}
          </button>
        ))}
        <span className="ml-auto flex items-center gap-1">
          {uploading && (
            <span className="label-mono mr-1 text-xs text-muted-foreground">Uploading…</span>
          )}
          {modes.map((m) => (
            <button
              key={m.key}
              type="button"
              title={m.label}
              aria-label={m.label}
              aria-pressed={mode === m.key}
              onClick={() => setMode(m.key)}
              className={`${toolBtn} ${m.className ?? ""} ${
                mode === m.key ? "bg-secondary text-foreground" : ""
              }`}
            >
              {m.icon}
            </button>
          ))}
        </span>
      </div>

      {mode === "split" ? (
        <div className="grid lg:grid-cols-2">
          <div className="border-r border-border">{editorPane}</div>
          {previewPane}
        </div>
      ) : (
        <>
          {editorPane}
          {previewPane}
        </>
      )}

      {uploadError && (
        <p role="alert" className="border-t border-border px-4 py-2 text-sm text-destructive">
          {uploadError}
        </p>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        multiple
        hidden
        onChange={(e) => {
          if (e.currentTarget.files?.length) uploadFiles(e.currentTarget.files);
          e.currentTarget.value = "";
        }}
      />
    </div>
  );
}
