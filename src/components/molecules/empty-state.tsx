import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { buttonClasses } from "@/components/atoms/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaHref,
}: EmptyStateProps) {
  return (
    <main className="grid flex-1 place-items-center px-4 py-16">
      <div className="grid max-w-md justify-items-center gap-4 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-brand-50 text-brand-600">
          <Icon aria-hidden className="size-8" />
        </span>
        <h1 className="text-2xl font-bold text-stone-900">{title}</h1>
        <p className="text-sm leading-relaxed text-stone-600">{description}</p>
        <Link href={ctaHref} className={buttonClasses("primary", "mt-2 px-5")}>
          {ctaLabel}
        </Link>
      </div>
    </main>
  );
}
