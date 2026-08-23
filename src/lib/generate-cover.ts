import { getSupabaseAdmin } from "@/lib/supabase-admin";

/**
 * Generates a 16:9 blog cover with Gemini and uploads it to the public
 * `blog` storage bucket. Shared by the admin panel and the ingest API.
 */
export async function generateCover(
  prompt: string
): Promise<{ url?: string; error?: string; status: number }> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return { error: "GEMINI_API_KEY is not configured.", status: 503 };
  const sb = getSupabaseAdmin();
  if (!sb) return { error: "Supabase storage is not configured.", status: 503 };

  const clean = prompt.trim().slice(0, 600);
  if (clean.length < 3) return { error: "Prompt is too short.", status: 400 };

  const model = process.env.GEMINI_IMAGE_MODEL ?? "gemini-2.5-flash-image";
  let res: Response;
  try {
    res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Bounded: a hung Gemini call must not eat the route's whole budget.
        signal: AbortSignal.timeout(30_000),
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Create a wide 2:1 landscape blog cover image. Professional, modern, no text or words in the image. Suitable for a home-services digital marketing blog. Subject: ${clean}`,
                },
              ],
            },
          ],
        }),
      }
    );
  } catch {
    return { error: "Image model timed out.", status: 504 };
  }

  if (!res.ok) {
    console.error("Gemini image generation failed:", res.status, (await res.text()).slice(0, 200));
    return {
      error: `Image model returned ${res.status}. Check the model name and key.`,
      status: 502,
    };
  }

  interface InlinePart {
    inlineData?: { data?: string; mimeType?: string };
    inline_data?: { data?: string; mime_type?: string };
  }
  let json: { candidates?: { content?: { parts?: InlinePart[] } }[] };
  try {
    json = await res.json();
  } catch {
    return { error: "The model returned an unreadable response.", status: 502 };
  }
  const parts: InlinePart[] = json?.candidates?.[0]?.content?.parts ?? [];
  const imgPart = parts.find((p) => p.inlineData?.data || p.inline_data?.data);
  const data = imgPart?.inlineData?.data ?? imgPart?.inline_data?.data;
  const mime =
    imgPart?.inlineData?.mimeType ?? imgPart?.inline_data?.mime_type ?? "image/png";
  if (!data) return { error: "The model returned no image.", status: 502 };

  // Gemini returns ~1.3MB PNGs; recompress to WebP (~100-200KB) before
  // storing. Paths are unique timestamps, so immutable caching is safe.
  let body: Buffer = Buffer.from(data, "base64");
  let contentType = mime;
  let ext = mime.includes("jpeg") ? "jpg" : "png";
  try {
    const sharp = (await import("sharp")).default;
    body = Buffer.from(
      await sharp(body).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer()
    );
    contentType = "image/webp";
    ext = "webp";
  } catch (e) {
    console.warn("Cover recompression failed, storing original:", e);
  }

  const path = `covers/${Date.now()}.${ext}`;
  const { error } = await sb.storage
    .from("blog")
    .upload(path, body, { contentType, cacheControl: "31536000" });
  if (error) {
    console.error("Cover upload failed:", error);
    return { error: "Image upload to storage failed.", status: 502 };
  }

  const { data: pub } = sb.storage.from("blog").getPublicUrl(path);
  return { url: pub.publicUrl, status: 200 };
}
