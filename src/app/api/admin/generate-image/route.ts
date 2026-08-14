import { isAdmin } from "@/lib/admin-auth";
import { generateCover } from "@/lib/generate-cover";

export const maxDuration = 60;

/** Admin-only: generate a blog cover with Gemini (shared lib). */
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  const prompt = typeof body?.prompt === "string" ? body.prompt : "";
  const result = await generateCover(prompt);
  if (!result.url) {
    return Response.json({ error: result.error }, { status: result.status });
  }
  return Response.json({ url: result.url });
}
