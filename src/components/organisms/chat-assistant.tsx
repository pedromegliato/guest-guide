"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Bot, CircleAlert, MessageCircle, SendHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { ChatBubble } from "@/components/molecules/chat-bubble";
import { cn } from "@/lib/cn";

const SUGGESTED_QUESTIONS = [
  "Qual a senha do WiFi?",
  "Posso trazer meu cachorro?",
  "A que horas posso fazer check-in?",
  "Que restaurantes tem perto?",
];

function messageText(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

interface ChatAssistantProps {
  code: string;
  propertyName: string;
}

export function ChatAssistant({ code, propertyName }: ChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: `/api/properties/${encodeURIComponent(code)}/chat`,
      }),
    [code],
  );

  const { messages, sendMessage, status, error, clearError } = useChat({
    transport,
  });

  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  function submitQuestion(text: string): void {
    const trimmed = text.trim();
    if (!trimmed || isBusy) {
      return;
    }
    clearError();
    void sendMessage({ text: trimmed });
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    submitQuestion(input);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir assistente virtual"
        className={cn(
          "fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition-all hover:bg-brand-700",
          isOpen && "pointer-events-none scale-90 opacity-0",
        )}
      >
        <MessageCircle aria-hidden className="size-5" />
        Assistente
      </button>

      <div
        role="dialog"
        aria-label={`Assistente virtual do imóvel ${propertyName}`}
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 flex h-[80dvh] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl ring-1 ring-stone-200 transition-all duration-300 md:inset-x-auto md:bottom-6 md:right-6 md:h-[600px] md:max-h-[80dvh] md:w-100 md:rounded-3xl",
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0",
        )}
      >
        <header className="flex items-center gap-3 border-b border-stone-200 bg-brand-600 px-4 py-3.5 text-white">
          <span className="grid size-10 place-items-center rounded-full bg-white/15">
            <Bot aria-hidden className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Assistente virtual</p>
            <p className="truncate text-xs text-white/80">{propertyName}</p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Fechar assistente"
            className="grid size-9 place-items-center rounded-full transition-colors hover:bg-white/15"
          >
            <X aria-hidden className="size-5" />
          </button>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.length === 0 && (
            <div className="grid gap-3">
              <ChatBubble role="assistant">
                Olá! Sou o assistente da sua estadia. Posso ajudar com a senha
                do Wi-Fi, regras da casa, horários e dicas da região. Como posso
                ajudar?
              </ChatBubble>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => submitQuestion(question)}
                    className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700 ring-1 ring-brand-200 transition-colors hover:bg-brand-100"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              role={message.role === "user" ? "user" : "assistant"}
            >
              {messageText(message)}
            </ChatBubble>
          ))}

          {status === "submitted" && (
            <div className="flex justify-start">
              <span
                className="flex gap-1 rounded-2xl rounded-bl-md bg-stone-100 px-4 py-3"
                role="status"
                aria-label="Assistente digitando"
              >
                <span className="size-1.5 animate-bounce rounded-full bg-stone-400 [animation-delay:0ms]" />
                <span className="size-1.5 animate-bounce rounded-full bg-stone-400 [animation-delay:150ms]" />
                <span className="size-1.5 animate-bounce rounded-full bg-stone-400 [animation-delay:300ms]" />
              </span>
            </div>
          )}

          {error && (
            <p className="flex items-start gap-2 rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm text-rose-800 ring-1 ring-rose-100">
              <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
              {error.message ||
                "Não consegui responder agora. Tente novamente em instantes."}
            </p>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-stone-200 px-3 py-3"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Pergunte sobre a sua estadia..."
            aria-label="Sua pergunta"
            className="min-w-0 flex-1 rounded-xl bg-stone-100 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-2 focus:outline-brand-500"
          />
          <button
            type="submit"
            disabled={isBusy || input.trim().length === 0}
            aria-label="Enviar pergunta"
            className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            <SendHorizontal aria-hidden className="size-4.5" />
          </button>
        </form>
      </div>
    </>
  );
}
