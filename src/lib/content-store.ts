import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { siteConfig } from "@/lib/site-config";
import { SITE_MANIFEST, type ContentTypeDef } from "@/lib/content-types";

/**
 * Generic content store for registry types (content_items table), with
 * version snapshots on every change and publish notifications to the SEO
 * team (notify, don't gate). The blog keeps its dedicated pipeline; every
 * new type rides this store.
 */

export interface ContentItem {
  id: string;
  type: string;
  status: "draft" | "published";
  payload: Record<string, string>;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export async function listItems(type: string, publishedOnly = false): Promise<ContentItem[]> {
  const sb = getSupabaseAdmin();
  if (!sb) return [];
  let q = sb.from("content_items").select("*").eq("type", type).order("updated_at", { ascending: false });
  if (publishedOnly) q = q.eq("status", "published");
  const { data, error } = await q;
  if (error) console.error("Content list failed:", type, error);
  return (data as ContentItem[]) ?? [];
}

export async function getItem(id: string): Promise<ContentItem | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  const { data, error } = await sb.from("content_items").select("*").eq("id", id).maybeSingle();
  if (error) console.error("Content get failed:", id, error);
  return (data as ContentItem) ?? null;
}

export async function saveItem(input: {
  id?: string;
  type: ContentTypeDef;
  payload: Record<string, string>;
  publish: boolean;
  actor?: string;
}): Promise<{ id?: string; error?: string }> {
  const sb = getSupabaseAdmin();
  if (!sb) return { error: "Database is not configured." };

  const now = new Date().toISOString();
  const existing = input.id ? await getItem(input.id) : null;

  // Snapshot the previous state BEFORE changing it: one-click rollback is
  // what makes instant publishing safe (concept doc, layer 4).
  if (existing) {
    await sb.from("content_versions").insert({
      item_id: existing.id,
      payload: existing.payload,
      status: existing.status,
      saved_by: input.actor ?? "admin",
    });
  }

  const row = {
    type: input.type.key,
    payload: input.payload,
    status: input.publish ? "published" : "draft",
    published_at: input.publish ? (existing?.published_at ?? now) : existing?.published_at ?? null,
    updated_at: now,
  };

  let id = existing?.id;
  if (existing) {
    const { error } = await sb.from("content_items").update(row).eq("id", existing.id);
    if (error) {
      console.error("Content save failed:", error);
      return { error: "Save failed. Try again." };
    }
  } else {
    const { data, error } = await sb.from("content_items").insert(row).select("id").single();
    if (error) {
      console.error("Content save failed:", error);
      return { error: "Save failed. Try again." };
    }
    id = (data as { id: string }).id;
  }

  if (input.publish && input.type.notifyOnPublish) {
    void notifyPublish(input.type, input.payload, existing ? "updated" : "created", id!);
  }
  return { id };
}

export async function deleteItem(id: string): Promise<boolean> {
  const sb = getSupabaseAdmin();
  if (!sb) return false;
  const { error } = await sb.from("content_items").delete().eq("id", id);
  if (error) console.error("Content delete failed:", error);
  return !error;
}

export async function listVersions(itemId: string) {
  const sb = getSupabaseAdmin();
  if (!sb) return [];
  const { data } = await sb
    .from("content_versions")
    .select("id, status, saved_by, saved_at, payload")
    .eq("item_id", itemId)
    .order("saved_at", { ascending: false })
    .limit(10);
  return data ?? [];
}

export async function restoreVersion(itemId: string, versionId: string): Promise<boolean> {
  const sb = getSupabaseAdmin();
  if (!sb) return false;
  const { data: v } = await sb.from("content_versions").select("payload, status").eq("id", versionId).maybeSingle();
  if (!v) return false;
  const { error } = await sb
    .from("content_items")
    .update({ payload: v.payload, status: v.status, updated_at: new Date().toISOString() })
    .eq("id", itemId);
  return !error;
}

/** Best-effort SEO-team notification. Never blocks or fails the save. */
async function notifyPublish(
  type: ContentTypeDef,
  payload: Record<string, string>,
  action: string,
  id: string
) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env[SITE_MANIFEST.notifyEmailEnv] || process.env.LEAD_EMAIL_TO;
    const title = payload[type.titleKey] ?? "(untitled)";
    const summary = `${type.label} ${action}: "${title}" is now live on ${siteConfig.url}. Review or roll back in the admin: ${siteConfig.url}/admin/content/${type.key}/${id}`;
    if (!apiKey || !to) {
      console.warn("Content publish notification (email not configured):", summary);
      return;
    }
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.LEAD_EMAIL_FROM || "TopServ Website <onboarding@resend.dev>",
      to,
      subject: `Site content ${action}: ${type.label} "${title}"`,
      text: summary,
    });
  } catch (e) {
    console.error("Content publish notification failed:", e);
  }
}
