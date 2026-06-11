"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { normalizePropertyCode } from "@/domain/property";

export function CodeSearchForm() {
  const router = useRouter();
  const [code, setCode] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const normalized = normalizePropertyCode(code);
    if (!normalized) {
      return;
    }
    router.push(`/${encodeURIComponent(normalized)}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md items-center gap-2 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-stone-200"
    >
      <input
        value={code}
        onChange={(event) => setCode(event.target.value)}
        placeholder="Código do imóvel, ex: FLN001"
        aria-label="Código do imóvel"
        autoCapitalize="characters"
        autoCorrect="off"
        spellCheck={false}
        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm uppercase text-stone-900 placeholder:normal-case placeholder:text-stone-400 focus:outline-none"
      />
      <button
        type="submit"
        disabled={code.trim().length === 0}
        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-stone-300"
      >
        Acessar
        <ArrowRight aria-hidden className="size-4" />
      </button>
    </form>
  );
}
