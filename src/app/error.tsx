"use client";

import { CircleAlert, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/atoms/button";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid flex-1 place-items-center px-4 py-16">
      <div className="grid max-w-md justify-items-center gap-4 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-rose-50 text-rose-600">
          <CircleAlert aria-hidden className="size-8" />
        </span>
        <h1 className="text-2xl font-bold text-stone-900">
          Algo deu errado
        </h1>
        <p className="text-sm leading-relaxed text-stone-600">
          Tivemos um problema ao carregar esta página. Tente novamente em
          instantes.
        </p>
        <Button onClick={reset}>
          <RefreshCw aria-hidden className="size-4" />
          Tentar novamente
        </Button>
      </div>
    </main>
  );
}
