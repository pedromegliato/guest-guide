"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ChatAssistantContextValue {
  isOpen: boolean;
  hasOpened: boolean;
  open: () => void;
  close: () => void;
}

const ChatAssistantContext = createContext<ChatAssistantContextValue | null>(
  null,
);

interface ChatAssistantProviderProps {
  children: ReactNode;
}

export function ChatAssistantProvider({
  children,
}: ChatAssistantProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const open = useCallback(() => {
    setIsOpen(true);
    setHasOpened(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(
    () => ({ isOpen, hasOpened, open, close }),
    [isOpen, hasOpened, open, close],
  );

  return (
    <ChatAssistantContext.Provider value={value}>
      {children}
    </ChatAssistantContext.Provider>
  );
}

export function useChatAssistant(): ChatAssistantContextValue {
  const context = useContext(ChatAssistantContext);
  if (!context) {
    throw new Error(
      "useChatAssistant deve ser usado dentro de ChatAssistantProvider",
    );
  }
  return context;
}

interface ChatAssistantTriggerProps {
  className?: string;
  children: ReactNode;
}

export function ChatAssistantTrigger({
  className,
  children,
}: ChatAssistantTriggerProps) {
  const { open } = useChatAssistant();

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Abrir assistente virtual"
      className={className}
    >
      {children}
    </button>
  );
}
