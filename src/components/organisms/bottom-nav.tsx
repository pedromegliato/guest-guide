import type { LucideIcon } from "lucide-react";
import { ChatAssistantTrigger } from "@/components/organisms/chat-assistant-context";
import { GUIDE_NAV_ITEMS } from "@/components/organisms/guide-navigation";

const ITEM_CLASSES =
  "flex flex-col items-center gap-0.5 rounded-full px-3.5 py-2 text-brand-200 transition-colors hover:text-white focus-visible:text-white";

interface NavItemContentProps {
  icon: LucideIcon;
  label: string;
}

function NavItemContent({ icon: Icon, label }: NavItemContentProps) {
  return (
    <>
      <Icon aria-hidden className="size-5" />
      <span className="text-[11px] font-semibold">{label}</span>
    </>
  );
}

export function BottomNav() {
  return (
    <nav
      aria-label="Navegação do guia"
      className="fixed bottom-4 left-1/2 z-40 flex w-max max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center rounded-full bg-brand-800 px-2 py-1.5 shadow-xl shadow-brand-950/40 md:hidden"
    >
      {GUIDE_NAV_ITEMS.map((item) =>
        item.kind === "anchor" ? (
          <a key={item.label} href={item.href} className={ITEM_CLASSES}>
            <NavItemContent icon={item.icon} label={item.label} />
          </a>
        ) : (
          <ChatAssistantTrigger key={item.label} className={ITEM_CLASSES}>
            <NavItemContent icon={item.icon} label={item.label} />
          </ChatAssistantTrigger>
        ),
      )}
    </nav>
  );
}
