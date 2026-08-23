import { isAdmin } from "@/lib/admin-auth";
import { storeUploadedImage } from "@/lib/upload-image";

export const maxDuration = 60;

/** Admin-only image upload for the editor (shared core with /api/ingest/upload). */
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const result = await storeUploadedImage(req);
  if (!result.url) {
    return Response.json({ error: result.error }, { status: result.status });
  }
  return Response.json({ url: result.url });
}
