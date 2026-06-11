import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "brand" | "neutral" | "success" | "danger";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  brand: "bg-brand-50 text-brand-700",
  neutral: "bg-stone-100 text-stone-700",
  success: "bg-emerald-50 text-emerald-700",
  danger: "bg-rose-50 text-rose-700",
};

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
