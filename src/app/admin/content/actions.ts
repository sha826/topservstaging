"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import { getType, validatePayload } from "@/lib/content-types";
import { deleteItem, restoreVersion, saveItem } from "@/lib/content-store";

export interface ContentFormState {
  error?: string;
}

export async function saveContentItem(
  _prev: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  if (!(await isAdmin())) redirect("/admin/login");

  const typeKey = String(formData.get("type") ?? "");
  const type = getType(typeKey);
  if (!type) return { error: "Unknown content type." };

  const raw: Record<string, unknown> = {};
  for (const f of type.fields) raw[f.key] = formData.get(f.key);
  const { payload, errors } = validatePayload(type, raw);
  if (errors) return { error: errors.join(" ") };

  const publish =
    type.publishMode === "instant" ? formData.get("publish") === "on" : false;
  const id = String(formData.get("id") ?? "") || undefined;

  const result = await saveItem({ id, type, payload: payload!, publish, actor: "admin" });
  if (result.error) return { error: result.error };

  // Slots re-render on the next request for the pages that host this type.
  revalidatePath("/", "layout");
  redirect(`/admin/content/${type.key}?saved=1`);
}

export async function deleteContentItem(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const id = String(formData.get("id") ?? "");
  const typeKey = String(formData.get("type") ?? "");
  if (id) {
    await deleteItem(id);
    revalidatePath("/", "layout");
  }
  redirect(`/admin/content/${typeKey}?deleted=1`);
}

export async function restoreContentVersion(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const itemId = String(formData.get("item_id") ?? "");
  const versionId = String(formData.get("version_id") ?? "");
  const typeKey = String(formData.get("type") ?? "");
  if (itemId && versionId) {
    await restoreVersion(itemId, versionId);
    revalidatePath("/", "layout");
  }
  redirect(`/admin/content/${typeKey}/${itemId}?restored=1`);
}
