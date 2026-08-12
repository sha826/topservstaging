import { isAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const maxDuration = 60;

/**
 * Admin-only: generate a blog cover with Gemini and upload it to the public
 * `blog` storage bucket. Returns { url } of the stored image.
 */
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return Response.json({ error: "GEMINI_API_KEY is not configured." }, { status: 503 });
  }
  const sb = getSupabaseAdmin();
  if (!sb) {
    return Response.json({ error: "Supabase storage is not configured." }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const prompt =
    typeof body?.prompt === "string" ? body.prompt.trim().slice(0, 600) : "";
  if (prompt.length < 3) {
    return Response.json({ error: "Prompt is too short." }, { status: 400 });
  }

  const model = process.env.GEMINI_IMAGE_MODEL ?? "gemini-2.5-flash-image";
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Create a wide 16:9 blog cover image. Professional, modern, no text or words in the image. Suitable for a home-services digital marketing blog. Subject: ${prompt}`,
              },
            ],
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    const detail = (await res.text()).slice(0, 200);
    console.error("Gemini image generation failed:", res.status, detail);
    return Response.json(
      { error: `Image model returned ${res.status}. Check the model name and key.` },
      { status: 502 }
    );
  }

  const json = await res.json();
  interface InlinePart {
    inlineData?: { data?: string; mimeType?: string };
    inline_data?: { data?: string; mime_type?: string };
  }
  const parts: InlinePart[] = json?.candidates?.[0]?.content?.parts ?? [];
  const imgPart = parts.find((p) => p.inlineData?.data || p.inline_data?.data);
  const data = imgPart?.inlineData?.data ?? imgPart?.inline_data?.data;
  const mime =
    imgPart?.inlineData?.mimeType ?? imgPart?.inline_data?.mime_type ?? "image/png";

  if (!data) {
    return Response.json({ error: "The model returned no image." }, { status: 502 });
  }

  const ext = mime.includes("jpeg") ? "jpg" : "png";
  const path = `covers/${Date.now()}.${ext}`;
  const { error } = await sb.storage
    .from("blog")
    .upload(path, Buffer.from(data, "base64"), { contentType: mime });

  if (error) {
    console.error("Cover upload failed:", error);
    return Response.json({ error: "Image upload to storage failed." }, { status: 502 });
  }

  const { data: pub } = sb.storage.from("blog").getPublicUrl(path);
  return Response.json({ url: pub.publicUrl });
}
