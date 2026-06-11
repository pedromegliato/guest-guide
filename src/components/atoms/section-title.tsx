import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface SectionTitleProps {
  icon: LucideIcon;
  children: ReactNode;
}

export function SectionTitle({ icon: Icon, children }: SectionTitleProps) {
  return (
    <h2 className="flex items-center gap-2.5 text-lg font-semibold text-stone-900">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
        <Icon aria-hidden className="size-4.5" />
      </span>
      {children}
    </h2>
  );
}
