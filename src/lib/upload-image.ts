import { getSupabaseAdmin } from "@/lib/supabase-admin";

const MAX_BYTES = 10 * 1024 * 1024;
// Raster formats only: SVG can carry scripts, so it is deliberately excluded.
const ALLOWED = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

/**
 * Shared image-upload core for the admin editor and the ingest API:
 * validates the file, recompresses raster images to WebP, stores it in the
 * public blog bucket, and returns the public URL. Animated GIFs are stored
 * as-is so they keep moving.
 */
export async function storeUploadedImage(
  req: Request
): Promise<{ url?: string; error?: string; status: number }> {
  const sb = getSupabaseAdmin();
  if (!sb) return { error: "Storage is not configured.", status: 503 };

  let file: File | null = null;
  try {
    const form = await req.formData();
    const entry = form.get("file");
    if (entry instanceof File) file = entry;
  } catch {
    return { error: "Send the image as multipart form data.", status: 400 };
  }
  if (!file) return { error: "No file received.", status: 400 };
  if (!ALLOWED.has(file.type)) {
    return { error: "Only PNG, JPEG, WebP, and GIF images are supported.", status: 415 };
  }
  if (file.size > MAX_BYTES) {
    return { error: "Images must be 10MB or smaller.", status: 413 };
  }

  return storeImageBuffer(Buffer.from(await file.arrayBuffer()), file.type);
}

/** Buffer-level core: recompress and store, shared with fetch-and-rehost. */
export async function storeImageBuffer(
  input: Buffer,
  mime: string,
  options?: { normalizeCover?: boolean }
): Promise<{ url?: string; error?: string; status: number }> {
  const sb = getSupabaseAdmin();
  if (!sb) return { error: "Storage is not configured.", status: 503 };

  let body = input;
  let contentType = mime;
  let ext = mime.split("/")[1] ?? "png";
  if (mime !== "image/gif") {
    try {
      const sharp = (await import("sharp")).default;
      let img = sharp(body).rotate(); // honor EXIF orientation

      // Covers display in a 2:1 frame site-wide (cards, article header,
      // social share). External systems send arbitrary ratios (Titan's
      // generator makes squares) — smart-crop to 2:1 using sharp's
      // attention strategy, which keeps the salient region. Images already
      // close to 2:1 skip the crop to avoid needless quality loss.
      if (options?.normalizeCover) {
        const meta = await img.metadata();
        const ratio = (meta.width ?? 0) / (meta.height ?? 1);
        if (meta.width && meta.height && (ratio < 1.7 || ratio > 2.3)) {
          img = img.resize(1200, 600, {
            fit: "cover",
            position: sharp.strategy.attention,
          });
        } else {
          img = img.resize({ width: 1600, withoutEnlargement: true });
        }
      } else {
        img = img.resize({ width: 1600, withoutEnlargement: true });
      }

      body = Buffer.from(await img.webp({ quality: 82 }).toBuffer());
      contentType = "image/webp";
      ext = "webp";
    } catch (e) {
      console.warn("Upload recompression failed, storing original:", e);
    }
  }

  const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await sb.storage
    .from("blog")
    .upload(path, body, { contentType, cacheControl: "31536000" });
  if (error) {
    console.error("Image upload failed:", error);
    return { error: "Upload to storage failed.", status: 502 };
  }

  const { data: pub } = sb.storage.from("blog").getPublicUrl(path);
  return { url: pub.publicUrl, status: 200 };
}

/**
 * Fetch an external image (e.g. an Agency Titan attachment URL, which
 * expires) and re-host it in our storage so post covers never go stale.
 */
/** Hosts a server-side fetch must never reach (SSRF guard). */
function isPrivateHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".local") || h.endsWith(".internal")) return true;
  if (h === "::1" || h.startsWith("fd") || h.startsWith("fe80")) return true;
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h) || /^169\.254\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  if (h === "0.0.0.0" || h === "metadata.google.internal") return true;
  return false;
}

export async function fetchAndStoreImage(
  url: string
): Promise<{ url?: string; error?: string; status: number }> {
  try {
    const target = new URL(url);
    if (!/^https?:$/.test(target.protocol) || isPrivateHost(target.hostname)) {
      return { error: "Image URLs must be public http(s) addresses.", status: 400 };
    }
    const res = await fetch(url, {
      signal: AbortSignal.timeout(20_000),
      redirect: "error",
      headers: { Accept: "image/*" },
    });
    if (!res.ok) return { error: `Image URL returned ${res.status}.`, status: 502 };
    const mime = (res.headers.get("content-type") ?? "").split(";")[0].trim();
    if (!ALLOWED.has(mime)) {
      return { error: `Unsupported image type "${mime || "unknown"}".`, status: 415 };
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.byteLength > MAX_BYTES) {
      return { error: "Images must be 10MB or smaller.", status: 413 };
    }
    // Fetched URLs are always post covers — normalize the ratio.
    return storeImageBuffer(buf, mime, { normalizeCover: true });
  } catch {
    return { error: "Could not download the image URL.", status: 502 };
  }
}
