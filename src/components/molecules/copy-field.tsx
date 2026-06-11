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
    <div className="flex items-center justify-between gap-3 rounded-xl bg-stone-50 px-3.5 py-2.5 ring-1 ring-stone-200">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
          {label}
        </p>
        <p className="truncate font-mono text-sm font-semibold text-stone-900">
          {value}
        </p>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? `${label} copiado` : `Copiar ${label}`}
        className="grid size-9 shrink-0 place-items-center rounded-lg text-stone-500 transition-colors hover:bg-stone-200 hover:text-stone-700"
      >
        {copied ? (
          <Check aria-hidden className="size-4 text-emerald-600" />
        ) : (
          <Copy aria-hidden className="size-4" />
        )}
      </button>
    </div>
  );
}
