import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardTone = "default" | "gold";

const TONE_CLASSES: Record<CardTone, string> = {
  default: "border-stone-200 bg-white",
  gold: "border-gold-200 bg-gradient-to-br from-gold-50 to-gold-100",
};

interface CardProps {
  children: ReactNode;
  className?: string;
  tone?: CardTone;
  id?: string;
}

export function Card({ children, className, tone = "default", id }: CardProps) {
  return (
    <div
      id={id}
      className={cn(
        "rounded-2xl border p-5 shadow-sm md:p-6",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </div>
  );
}
