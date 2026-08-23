import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
  tool,
  type UIMessage,
} from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { composeConcierge } from "@/lib/concierge";
import { saveConversation } from "@/lib/conversation-store";
import { deliverLead } from "@/lib/leads";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const maxDuration = 60;

// Direct Anthropic key when present (local testing); AI Gateway string
// otherwise (Vercel, via explicit key or OIDC).
const CHAT_MODEL = process.env.CHAT_MODEL ?? "claude-sonnet-5";
const model = process.env.ANTHROPIC_API_KEY
  ? anthropic(CHAT_MODEL)
  : `anthropic/${CHAT_MODEL}`;

// Admin-editable behavioral head, cached briefly so the settings table
// isn't hit on every message.
let headCache: { value: string | null; at: number } = { value: null, at: 0 };
async function getPromptHead(): Promise<string | null> {
  if (Date.now() - headCache.at < 30_000) return headCache.value;
  const sb = getSupabaseAdmin();
  let value: string | null = null;
  if (sb) {
    const { data } = await sb
      .from("settings")
      .select("value")
      .eq("key", "concierge_head")
      .maybeSingle();
    value = data?.value ?? null;
  }
  headCache = { value, at: Date.now() };
  return value;
}

// Best-effort per-IP throttle. In-memory, so per serverless instance — a
// backstop against runaway loops, not a security boundary.
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;
const hits = new Map<string, number[]>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

const captureLead = tool({
  description:
    "Save everything learned about a prospect so the TopServ team follows up. Call this once you have their name and a way to reach them. Strongly prefer a phone number: if you have a name and email but no phone, and the visitor has not declined to give one, ask for the phone once more BEFORE calling this tool. Include every other detail you learned in the conversation. Partial information is fine, empty fields are fine.",
  inputSchema: z.object({
    name: z.string().max(200).describe("Visitor's name"),
    company: z.string().max(200).optional().describe("Their company name"),
    phone: z.string().max(50).optional().describe("Phone number"),
    // Deliberately NOT .email(): a typo'd address must never fail the tool
    // call and lose the whole lead. The team can fix a typo; they can't fix
    // a lead that was never captured.
    email: z.string().max(320).optional().describe("Email address"),
    trade: z.string().max(100).optional().describe("Their trade, e.g. HVAC, plumbing"),
    revenueBand: z
      .string()
      .max(100)
      .optional()
      .describe('Rough annual revenue, e.g. "$2M-$5M" or "about $3M"'),
    market: z.string().max(200).optional().describe('Service area / city, e.g. "Frisco, TX"'),
    currentMarketing: z
      .string()
      .max(500)
      .optional()
      .describe("What marketing they currently run and where their jobs come from"),
    attribution: z
      .string()
      .max(300)
      .optional()
      .describe("What got them looking / what caught their attention, in their EXACT words"),
    painPoints: z
      .string()
      .max(500)
      .optional()
      .describe("What they dislike about their current marketing results, in their EXACT words"),
    marketingSpend: z
      .string()
      .max(100)
      .optional()
      .describe('Monthly marketing spend all-in, e.g. "about $4k/mo"'),
    decisionRole: z
      .string()
      .max(150)
      .optional()
      .describe('Whether they own the marketing decision, e.g. "owner, decides alone" or "needs partner"'),
    goal: z.string().max(500).optional().describe("Their main growth goal, in their words"),
    timeline: z.string().max(200).optional().describe("How soon they want to start"),
    need: z.string().max(2000).describe("What they want help with, in one or two sentences"),
  }),
  execute: async (input) => {
    if (!input.phone && !input.email) {
      return { saved: false, reason: "Need a phone number or email before saving." };
    }
    const { stored, delivered } = await deliverLead({
      name: input.name,
      company: input.company,
      phone: input.phone,
      email: input.email,
      trade: input.trade,
      revenueBand: input.revenueBand,
      market: input.market,
      currentMarketing: input.currentMarketing,
      attribution: input.attribution,
      painPoints: input.painPoints,
      marketingSpend: input.marketingSpend,
      decisionRole: input.decisionRole,
      goal: input.goal,
      timeline: input.timeline,
      message: input.need,
      source: "chat",
    });
    return { saved: true, stored, delivered };
  },
});

export async function POST(req: Request) {
  // Needs one auth path: direct Anthropic key, gateway key, or Vercel OIDC.
  if (
    !process.env.ANTHROPIC_API_KEY &&
    !process.env.AI_GATEWAY_API_KEY &&
    !process.env.VERCEL
  ) {
    return Response.json(
      { error: "Chat is not configured. Set ANTHROPIC_API_KEY or AI_GATEWAY_API_KEY." },
      { status: 503 }
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (throttled(ip)) {
    return Response.json({ error: "Too many requests." }, { status: 429 });
  }

  // Malformed bodies (invalid JSON, wrong shape, corrupted messages) get a
  // 400, not an unhandled 500.
  let modelMessages;
  let uiMessages: UIMessage[];
  let conversationId: string | null = null;
  try {
    const body: { messages?: UIMessage[]; conversationId?: string } = await req.json();
    if (!Array.isArray(body.messages)) throw new Error("messages missing");
    uiMessages = body.messages;
    if (typeof body.conversationId === "string" && body.conversationId.length <= 100) {
      conversationId = body.conversationId;
    }
    modelMessages = await convertToModelMessages(uiMessages.slice(-20));
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = streamText({
    model,
    system: composeConcierge(await getPromptHead()),
    messages: modelMessages,
    tools: { captureLead },
    stopWhen: isStepCount(4),
  });

  // Persist the transcript once the stream completes (fire-and-forget) so
  // the team can grade the agent's answers later.
  if (conversationId) {
    const id = conversationId;
    void (async () => {
      try {
        const [text, steps] = await Promise.all([result.text, result.steps]);
        const tools = steps.flatMap((step) =>
          step.toolCalls.map((call) => ({
            name: call.toolName,
            input: call.input,
            output: step.toolResults.find((r) => r.toolCallId === call.toolCallId)
              ?.output,
          }))
        );
        const transcript = {
          messages: uiMessages.slice(-100),
          reply: { text, tools },
        };
        await saveConversation({
          conversationId: id,
          transcript,
          messageCount: uiMessages.length + 1,
          leadCaptured: JSON.stringify(transcript).includes('"saved":true'),
        });
      } catch (e) {
        console.error("Conversation save failed:", e);
      }
    })();
  }

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
