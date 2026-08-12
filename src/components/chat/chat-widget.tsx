"use client";

import Image from "next/image";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const QUICK_REPLIES = [
  "What do you charge?",
  "What would you recommend for my company?",
  "What results have you gotten?",
] as const;

const CHAT_STORAGE_KEY = "topserv-chat";

/** Small brand avatar shown beside the agent's messages. */
function AgentAvatar() {
  return (
    <span
      aria-hidden
      className="grid size-8 shrink-0 place-items-center self-end rounded-full border border-border bg-background"
    >
      <Image src="/images/topserv-logo.png" alt="" width={20} height={20} className="h-5 w-auto" />
    </span>
  );
}

/** WhatsApp-style "the other side is typing" bubble. */
function TypingBubble() {
  return (
    <div className="chat-in flex items-end gap-2.5">
      <AgentAvatar />
      <div
        className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3.5"
        aria-label="Typing"
      >
        <span className="sr-only">The assistant is typing</span>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            aria-hidden
            className="chat-dot size-2 rounded-full bg-muted-foreground"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export function ChatWidget({ initialOpen = false }: { initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  const [input, setInput] = useState("");
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  // True only when the user clicked the toggle this page-load — restored-open
  // panels must not steal focus on every navigation. A tap on the deferred
  // placeholder button counts as manual.
  const manualOpenRef = useRef(initialOpen);
  // Track the visual viewport so the panel shrinks above the mobile
  // keyboard instead of having its header pushed off-screen.
  const [vvh, setVvh] = useState<number | null>(null);
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const onResize = () => setVvh(vv.height);
    vv.addEventListener("resize", onResize);
    onResize();
    return () => vv.removeEventListener("resize", onResize);
  }, []);
  // Stable per-session conversation id: the server keys saved transcripts on
  // it so the team can review and grade conversations. This component is
  // client-only (ssr:false), so reading sessionStorage in the initializer is
  // safe.
  const [conversationId] = useState<string>(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(CHAT_STORAGE_KEY) ?? "null");
      if (typeof saved?.conversationId === "string") return saved.conversationId;
    } catch {}
    return crypto.randomUUID();
  });
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: { conversationId } }),
    [conversationId]
  );
  const { messages, sendMessage, status, error, setMessages } = useChat({ transport });

  const busy = status === "submitted" || status === "streaming";

  // Human-messenger feel: while the agent is composing, hide the partial
  // stream and show a typing indicator; the reply appears whole when done.
  const lastMessage = messages[messages.length - 1];
  const visibleMessages =
    busy && lastMessage?.role === "assistant" ? messages.slice(0, -1) : messages;

  // Restore the conversation (and open state) after navigation — the chat
  // survives moving between pages within the tab session.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CHAT_STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { messages?: unknown; open?: boolean };
      if (Array.isArray(saved.messages) && saved.messages.length > 0) {
        setMessages(saved.messages as Parameters<typeof setMessages>[0]);
      }
      if (saved.open) setOpen(true);
    } catch {
      // Storage unavailable (private browsing) — start fresh.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist on every change, capped to the last 30 messages.
  useEffect(() => {
    try {
      sessionStorage.setItem(
        CHAT_STORAGE_KEY,
        JSON.stringify({ messages: messages.slice(-30), open, conversationId })
      );
    } catch {
      // Best-effort only.
    }
  }, [messages, open, conversationId]);

  // Focus the input on user-initiated open; Escape closes and hands focus
  // back to the toggle. Restored-open panels don't grab focus.
  useEffect(() => {
    if (!open) return;
    if (manualOpenRef.current) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [visibleMessages.length, busy]);

  function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    sendMessage({ text: trimmed });
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
  }

  function autoGrow(el: HTMLTextAreaElement) {
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 132)}px`;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="flex h-[min(78dvh,640px)] w-[min(94vw,440px)] flex-col overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
          style={vvh ? { maxHeight: `${Math.max(280, Math.min(vvh - 96, 640))}px` } : undefined}
          role="dialog"
          aria-label="Chat with TopServ Digital"
        >
          <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
            <Image
              src="/images/topserv-logo.png"
              alt="TopServ Digital"
              width={120}
              height={36}
              className="h-8 w-auto"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold leading-tight">Chat with us</p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span aria-hidden className="size-2 rounded-full bg-brand" />
                Online now, replies in seconds
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="ml-auto size-11 shrink-0"
            >
              <X className="size-4" aria-hidden />
            </Button>
          </header>

          <div
            ref={logRef}
            role="log"
            aria-label="Conversation"
            aria-live="polite"
            className="flex-1 space-y-3.5 overflow-y-auto p-4"
          >
            {messages.length === 0 && (
              <div className="space-y-3.5">
                <div className="flex items-end gap-2.5">
                  <AgentAvatar />
                  <p className="chat-in max-w-[85%] break-words rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3 text-[15px] leading-relaxed [overflow-wrap:anywhere]">
                    Hey! Thanks for stopping by. I&apos;m the TopServ assistant.
                    Happy to talk pricing, results, or whether we&apos;d be a
                    good fit for your company. What&apos;s on your mind?
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pl-[42px]">
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply}
                      type="button"
                      onClick={() => submit(reply)}
                      className="min-h-11 rounded-full border border-border px-4 py-2.5 text-[13px] font-medium text-muted-foreground transition-colors hover:border-brand hover:text-brand active:scale-[0.98]"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {visibleMessages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "chat-in flex items-end gap-2.5",
                  message.role === "user" && "flex-row-reverse"
                )}
              >
                {message.role !== "user" && <AgentAvatar />}
                <div
                  className={cn(
                    "max-w-[85%] break-words rounded-2xl px-4 py-3 text-[15px] leading-relaxed [overflow-wrap:anywhere]",
                    message.role === "user"
                      ? "rounded-br-md bg-brand text-primary-foreground"
                      : "rounded-bl-md border border-border bg-card"
                  )}
                >
                  {message.parts.map((part, i) => {
                    if (part.type === "text") {
                      return (
                        <p key={`${message.id}-${i}`} className="whitespace-pre-wrap">
                          {part.text}
                        </p>
                      );
                    }
                    if (part.type === "tool-captureLead" && part.state === "output-available") {
                      const out = part.output as
                        | { saved?: boolean; stored?: boolean; delivered?: boolean }
                        | undefined;
                      // Only claim success when the lead actually landed
                      // somewhere (Supabase table or team inbox).
                      if (!out?.saved) return null;
                      if (out.delivered === false && out.stored === false) {
                        return (
                          <p
                            key={`${message.id}-${i}`}
                            className="mt-1 text-xs text-muted-foreground"
                          >
                            Got your details noted. If you don&apos;t hear from
                            us within a business day, call{" "}
                            {siteConfig.company.phoneDisplay} and we&apos;ll
                            sort it out.
                          </p>
                        );
                      }
                      return (
                        <p
                          key={`${message.id}-${i}`}
                          className="mt-1 flex items-center gap-1.5 text-xs text-brand"
                        >
                          <CheckCircle2 className="size-3.5" aria-hidden />
                          Passed along to the team
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}

            {busy && <TypingBubble />}

            {(error || status === "error") && (
              <div className="chat-in rounded-2xl border border-destructive/40 bg-card px-4 py-3 text-sm text-muted-foreground">
                Sorry, something hiccuped on my end. You can call{" "}
                <a
                  href={`tel:${siteConfig.company.phone}`}
                  className="font-semibold text-foreground"
                >
                  {siteConfig.company.phoneDisplay}
                </a>{" "}
                or{" "}
                <a
                  href={siteConfig.booking.discoveryCall}
                  className="font-semibold text-brand"
                >
                  book a call
                </a>{" "}
                and a real person will pick it up from here.
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="flex items-end gap-2 border-t border-border bg-card p-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              Your message
            </label>
            <textarea
              id="chat-input"
              ref={inputRef}
              value={input}
              rows={1}
              onChange={(e) => {
                setInput(e.currentTarget.value);
                autoGrow(e.currentTarget);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit(input);
                }
              }}
              placeholder="Type your message…"
              autoComplete="off"
              className="max-h-[132px] min-h-[44px] min-w-0 flex-1 resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-base leading-relaxed outline-none transition-colors placeholder:text-ink-faint focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40"
            />
            <Button
              type="submit"
              size="icon"
              disabled={busy || !input.trim()}
              aria-label="Send message"
              className="size-11 shrink-0 rounded-full active:scale-95"
            >
              <Send className="size-4.5" aria-hidden />
            </Button>
          </form>
        </div>
      )}

      <button
        type="button"
        ref={toggleRef}
        onClick={() => {
          manualOpenRef.current = true;
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Chat with us"}
        className="flex size-14 items-center justify-center rounded-full bg-brand text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        {open ? <X className="size-6" aria-hidden /> : <MessageCircle className="size-6" aria-hidden />}
      </button>
    </div>
  );
}
