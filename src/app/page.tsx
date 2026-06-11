import { Compass, KeyRound, MessageCircle } from "lucide-react";
import Link from "next/link";
import { CodeSearchForm } from "@/components/organisms/code-search-form";

const HIGHLIGHTS = [
  {
    icon: KeyRound,
    title: "Tudo sobre o seu imóvel",
    description:
      "Wi-Fi, instruções de acesso, regras da casa e contato do anfitrião.",
  },
  {
    icon: Compass,
    title: "Experiências da região",
    description: "Restaurantes, atrações e serviços essenciais perto de você.",
  },
  {
    icon: MessageCircle,
    title: "Assistente virtual",
    description: "Tire dúvidas sobre a estadia a qualquer hora, em tempo real.",
  },
] as const;

const DEMO_CODES = ["FLN001", "GRM001"] as const;

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 px-4 py-16">
      <div className="grid max-w-xl justify-items-center gap-4 text-center">
        <span className="rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-700 ring-1 ring-brand-200">
          Guia do Hóspede
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
          A sua estadia, explicada em um só lugar
        </h1>
        <p className="text-sm leading-relaxed text-stone-600 md:text-base">
          Digite o código do seu imóvel — ele está no link enviado na
          confirmação da reserva — e veja tudo o que você precisa para
          aproveitar a hospedagem.
        </p>
      </div>

      <CodeSearchForm />

      <p className="text-xs text-stone-500">
        Quer ver um exemplo?{" "}
        {DEMO_CODES.map((code, index) => (
          <span key={code}>
            {index > 0 && " ou "}
            <Link
              href={`/${code}`}
              className="font-semibold text-brand-700 underline-offset-2 hover:underline"
            >
              {code}
            </Link>
          </span>
        ))}
      </p>

      <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
        {HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="grid justify-items-center gap-2 rounded-2xl bg-white p-5 text-center ring-1 ring-stone-200"
          >
            <span className="grid size-10 place-items-center rounded-full bg-brand-50 text-brand-600">
              <Icon aria-hidden className="size-5" />
            </span>
            <h2 className="text-sm font-semibold text-stone-900">{title}</h2>
            <p className="text-xs leading-relaxed text-stone-600">
              {description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
