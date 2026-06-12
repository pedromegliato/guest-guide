import Image from "next/image";
import { ChatAssistantTrigger } from "@/components/organisms/chat-assistant-context";

export function MoraFloatingButton() {
  return (
    <ChatAssistantTrigger className="fixed bottom-6 right-6 z-40 hidden items-center gap-2.5 rounded-full bg-brand-800 py-1.5 pl-1.5 pr-5 shadow-xl shadow-brand-950/40 transition-colors hover:bg-brand-900 md:flex">
      <Image
        src="/mora.png"
        alt=""
        width={36}
        height={36}
        className="size-9 rounded-full object-cover ring-2 ring-white/30"
      />
      <span className="text-sm font-semibold text-white">Falar com a Mora</span>
    </ChatAssistantTrigger>
  );
}
