import { ChatAssistantTrigger } from "@/components/organisms/chat-assistant-context";
import { GUIDE_NAV_ITEMS } from "@/components/organisms/guide-navigation";

const ANCHOR_CLASSES =
  "rounded-full px-3 py-1.5 text-sm font-semibold text-stone-600 transition-colors hover:bg-stone-100 hover:text-brand-800";

export function GuideDesktopNav() {
  return (
    <nav
      aria-label="Navegação do guia"
      className="hidden items-center gap-1 md:flex"
    >
      {GUIDE_NAV_ITEMS.map((item) =>
        item.kind === "anchor" ? (
          <a key={item.label} href={item.href} className={ANCHOR_CLASSES}>
            {item.label}
          </a>
        ) : (
          <ChatAssistantTrigger
            key={item.label}
            className="ml-1 flex items-center gap-1.5 rounded-full bg-brand-800 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand-900"
          >
            <item.icon aria-hidden className="size-4" />
            {item.label}
          </ChatAssistantTrigger>
        ),
      )}
    </nav>
  );
}
