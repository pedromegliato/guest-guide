"use client";

import dynamic from "next/dynamic";
import { useChatAssistant } from "@/components/organisms/chat-assistant-context";

const ChatAssistantPanel = dynamic(
  () =>
    import("@/components/organisms/chat-assistant").then(
      (module) => module.ChatAssistantPanel,
    ),
  { ssr: false },
);

interface LazyChatAssistantPanelProps {
  code: string;
  propertyName: string;
}

export function LazyChatAssistantPanel({
  code,
  propertyName,
}: LazyChatAssistantPanelProps) {
  const { hasOpened } = useChatAssistant();

  if (!hasOpened) {
    return null;
  }

  return <ChatAssistantPanel code={code} propertyName={propertyName} />;
}
