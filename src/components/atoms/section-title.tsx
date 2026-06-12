import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionTitleProps {
  icon: LucideIcon;
  children: ReactNode;
  iconClassName?: string;
}

export function SectionTitle({
  icon: Icon,
  children,
  iconClassName,
}: SectionTitleProps) {
  return (
    <h2 className="flex items-center gap-2.5 text-lg font-semibold text-stone-900">
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-xl",
          iconClassName ?? "bg-brand-100 text-brand-700",
        )}
      >
        <Icon aria-hidden className="size-4.5" />
      </span>
      {children}
    </h2>
  );
}
