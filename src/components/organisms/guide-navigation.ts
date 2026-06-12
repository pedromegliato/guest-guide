import {
  KeyRound,
  MessageCircle,
  Phone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const GUIDE_SECTION_IDS = {
  access: "acesso",
  experiences: "experiencias",
  contact: "contato",
} as const;

export type GuideNavItem = {
  label: string;
  icon: LucideIcon;
} & ({ kind: "anchor"; href: string } | { kind: "assistant" });

export const GUIDE_NAV_ITEMS: GuideNavItem[] = [
  {
    kind: "anchor",
    href: `#${GUIDE_SECTION_IDS.access}`,
    icon: KeyRound,
    label: "Guia",
  },
  {
    kind: "anchor",
    href: `#${GUIDE_SECTION_IDS.experiences}`,
    icon: Sparkles,
    label: "Experiências",
  },
  { kind: "assistant", icon: MessageCircle, label: "Assistente" },
  {
    kind: "anchor",
    href: `#${GUIDE_SECTION_IDS.contact}`,
    icon: Phone,
    label: "Contato",
  },
];
