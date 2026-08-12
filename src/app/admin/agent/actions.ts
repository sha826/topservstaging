"use server";

import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function savePromptHead(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const sb = getSupabaseAdmin();
  if (!sb) redirect("/admin/agent?error=nodb");

  const value = String(formData.get("head") ?? "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, 20000);

  if (!value) {
    await sb.from("settings").delete().eq("key", "concierge_head");
    redirect("/admin/agent?reset=1");
  }

  const { error } = await sb.from("settings").upsert({
    key: "concierge_head",
    value,
    updated_at: new Date().toISOString(),
  });
  redirect(error ? "/admin/agent?error=save" : "/admin/agent?saved=1");
}

export async function resetPromptHead() {
  if (!(await isAdmin())) redirect("/admin/login");
  const sb = getSupabaseAdmin();
  if (sb) await sb.from("settings").delete().eq("key", "concierge_head");
  redirect("/admin/agent?reset=1");
}
