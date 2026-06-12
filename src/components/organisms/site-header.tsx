import { Compass } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface SiteHeaderProps {
  children?: ReactNode;
}

export function SiteHeader({ children }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-stone-900 transition-opacity hover:opacity-80"
        >
          <span className="flex size-8 items-center justify-center rounded-xl bg-brand-800 text-white">
            <Compass aria-hidden className="size-4.5" />
          </span>
          <span className="text-[15px] font-extrabold tracking-tight">
            Guia do Hóspede
          </span>
        </Link>
        {children}
      </div>
    </header>
  );
}
