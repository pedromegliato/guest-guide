import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}

export function InfoRow({ icon: Icon, label, children }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-stone-100 text-stone-600">
        <Icon aria-hidden className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
          {label}
        </p>
        <div className="mt-0.5 text-sm text-stone-800">{children}</div>
      </div>
    </div>
  );
}
