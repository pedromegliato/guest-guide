import { SearchX } from "lucide-react";
import Link from "next/link";

export default function PropertyNotFound() {
  return (
    <main className="grid flex-1 place-items-center px-4 py-16">
      <div className="grid max-w-md justify-items-center gap-4 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-brand-50 text-brand-600">
          <SearchX aria-hidden className="size-8" />
        </span>
        <h1 className="text-2xl font-bold text-stone-900">
          Imóvel não encontrado
        </h1>
        <p className="text-sm leading-relaxed text-stone-600">
          Não encontramos nenhum imóvel com esse código. Confira o link que
          você recebeu na confirmação da reserva ou fale com o seu anfitrião.
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Buscar outro código
        </Link>
      </div>
    </main>
  );
}
