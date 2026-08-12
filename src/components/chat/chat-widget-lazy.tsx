"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const ChatWidget = dynamic(() => import("./chat-widget").then((m) => m.ChatWidget), {
  ssr: false,
});

/**
 * Defers the chat bundle (~270KB of AI SDK) until it's actually needed:
 * a lightweight lookalike button renders first; the real widget loads on
 * first tap, or immediately when a previous session left an open panel or
 * an in-progress conversation to restore.
 */
export function ChatWidgetLazy() {
  const [load, setLoad] = useState(false);
  const [openOnLoad, setOpenOnLoad] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem("topserv-chat") ?? "null");
      if (saved?.open || (Array.isArray(saved?.messages) && saved.messages.length > 0)) {
        setLoad(true);
      }
    } catch {}
  }, []);

  if (load) return <ChatWidget initialOpen={openOnLoad} />;

  return (
    <button
      type="button"
      onClick={() => {
        setOpenOnLoad(true);
        setLoad(true);
      }}
      aria-label="Chat with us"
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-brand text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <MessageCircle className="size-6" aria-hidden />
    </button>
  );
}
