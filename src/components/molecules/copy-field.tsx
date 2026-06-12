"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CopyFieldProps {
  label: string;
  value: string;
}

export function CopyField({ label, value }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  async function copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-stone-100 px-3.5 py-3">
      <div className="min-w-0">
        <p className="text-[10.5px] font-semibold uppercase tracking-wide text-stone-500">
          {label}
        </p>
        <p className="truncate font-mono text-sm font-bold text-stone-900">
          {value}
        </p>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? `${label} copiado` : `Copiar ${label}`}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-brand-800 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-900"
      >
        {copied ? (
          <Check aria-hidden className="size-3.5" />
        ) : (
          <Copy aria-hidden className="size-3.5" />
        )}
        {copied ? "Copiado" : "Copiar"}
      </button>
    </div>
  );
}
