import { getSupabaseAdmin } from "@/lib/supabase-admin";

/**
 * Upserts a chat transcript (one row per conversation, replaced each turn)
 * so the team can grade agent performance and spot mistakes. Best-effort:
 * a failed save never affects the visitor's chat.
 */
export async function saveConversation(args: {
  conversationId: string;
  transcript: unknown;
  messageCount: number;
  leadCaptured: boolean;
}): Promise<void> {
  const sb = getSupabaseAdmin();
  if (!sb) {
    console.warn("Supabase not configured — conversation not saved:", args.conversationId);
    return;
  }
  const { error } = await sb.from("conversations").upsert(
    {
      conversation_id: args.conversationId,
      transcript: args.transcript,
      message_count: args.messageCount,
      lead_captured: args.leadCaptured,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "conversation_id" }
  );
  if (error) {
    console.error("Conversation save failed:", error, args.conversationId);
  }
}
