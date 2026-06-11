import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ChatBubbleProps {
  role: "user" | "assistant";
  children: ReactNode;
}

export function ChatBubble({ role, children }: ChatBubbleProps) {
  const isUser = role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-md bg-brand-600 text-white"
            : "rounded-bl-md bg-stone-100 text-stone-800",
        )}
      >
        {children}
      </div>
    </div>
  );
}
