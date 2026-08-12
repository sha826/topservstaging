"use client";

import dynamic from "next/dynamic";

/**
 * Client-only, code-split chat widget: keeps @ai-sdk/react and the chat UI
 * out of the shared bundle every page pays for.
 */
export const ChatWidgetLazy = dynamic(
  () => import("./chat-widget").then((m) => m.ChatWidget),
  { ssr: false }
);
