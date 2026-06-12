import { memo, type ReactNode } from "react";
import Markdown from "react-markdown";
import { cn } from "@/lib/cn";

interface ChatBubbleProps {
  role: "user" | "assistant";
  children: ReactNode;
}

export const ChatBubble = memo(function ChatBubble({
  role,
  children,
}: ChatBubbleProps) {
  const isUser = role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "whitespace-pre-wrap rounded-br-md bg-brand-600 text-white"
            : "rounded-bl-md bg-stone-100 text-stone-800 [&_a]:font-semibold [&_a]:text-brand-700 [&_a]:underline [&_li]:mt-1 [&_ol]:list-decimal [&_ol]:pl-4 [&_p+p]:mt-2 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-4",
        )}
      >
        {isUser || typeof children !== "string" ? (
          children
        ) : (
          <Markdown allowedElements={["p", "strong", "em", "ul", "ol", "li", "a", "br", "code"]} unwrapDisallowed>
            {children}
          </Markdown>
        )}
      </div>
    </div>
  );
});
