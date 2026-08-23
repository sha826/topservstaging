import { ingestAuthorized } from "@/lib/ingest-post";
import { storeUploadedImage } from "@/lib/upload-image";

export const maxDuration = 60;

/**
 * Image upload for external content systems (BlogApp, Agency Titan): same
 * BLOG_INGEST_KEY as /api/ingest/posts, multipart body with a `file` field.
 * Returns { url } to use as the post's coverImageUrl or in markdown bodies.
 */
export async function POST(req: Request) {
  if (!process.env.BLOG_INGEST_KEY) {
    return Response.json({ ok: false, error: "Ingest is not configured." }, { status: 503 });
  }
  if (!ingestAuthorized(req)) {
    return Response.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  const result = await storeUploadedImage(req);
  if (!result.url) {
    return Response.json({ ok: false, error: result.error }, { status: result.status });
  }
  return Response.json({ ok: true, url: result.url });
}
