import { Check, X } from "lucide-react";
import { cn } from "@/lib/cn";

interface PolicyItemProps {
  label: string;
  allowed: boolean;
}

export function PolicyItem({ label, allowed }: PolicyItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold",
        allowed ? "bg-brand-100 text-brand-800" : "bg-red-50 text-red-700",
      )}
    >
      {allowed ? (
        <Check aria-hidden className="size-4 shrink-0" />
      ) : (
        <X aria-hidden className="size-4 shrink-0" />
      )}
      <span>{label}</span>
      <span className="sr-only">{allowed ? "permitido" : "não permitido"}</span>
    </div>
  );
}
