import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "ghost";

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-800 text-white hover:bg-brand-900 disabled:bg-stone-300 disabled:text-stone-500",
  ghost:
    "bg-transparent text-brand-700 hover:bg-brand-50 disabled:text-stone-400",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  className?: string,
): string {
  return cn(BASE_CLASSES, VARIANT_CLASSES[variant], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, className)} {...props} />
  );
}
