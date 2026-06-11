import { Check, X } from "lucide-react";
import { cn } from "@/lib/cn";

interface PolicyItemProps {
  label: string;
  allowed: boolean;
}

export function PolicyItem({ label, allowed }: PolicyItemProps) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-stone-50 px-3 py-2.5 ring-1 ring-stone-200">
      <span
        className={cn(
          "grid size-6 shrink-0 place-items-center rounded-full",
          allowed ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700",
        )}
      >
        {allowed ? (
          <Check aria-hidden className="size-3.5" />
        ) : (
          <X aria-hidden className="size-3.5" />
        )}
      </span>
      <span className="text-sm text-stone-800">{label}</span>
      <span className="sr-only">{allowed ? "permitido" : "não permitido"}</span>
    </div>
  );
}
