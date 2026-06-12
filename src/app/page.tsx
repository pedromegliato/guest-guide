import { Compass, KeyRound, MessageCircle, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/atoms/card";
import { CodeSearchForm } from "@/components/organisms/code-search-form";
import { SiteHeader } from "@/components/organisms/site-header";

interface Highlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

const HIGHLIGHTS: readonly Highlight[] = [
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
    title: "Mora, sua assistente",
    description: "Tire dúvidas sobre a estadia a qualquer hora, em tempo real.",
  },
];

const DEMO_CODES = ["FLN001", "GRM001"] as const;

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950 px-6 pb-24 pt-12 text-center md:pb-28 md:pt-16">
      <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-100 ring-1 ring-white/20">
        Guia do Hóspede
      </span>
      <h1 className="mx-auto mt-5 max-w-xl text-3xl font-extrabold tracking-tight text-white md:text-4xl">
        A sua estadia, explicada em um só lugar
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-brand-100 md:text-base">
        Digite o código do seu imóvel — ele está no link enviado na confirmação
        da reserva — e veja tudo o que você precisa para aproveitar a
        hospedagem.
      </p>
    </section>
  );
}

function AccessCard() {
  return (
    <div className="relative z-10 mx-auto -mt-16 grid w-full max-w-lg justify-items-center gap-4 rounded-2xl bg-white/90 p-6 shadow-xl ring-1 ring-stone-200 backdrop-blur">
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
    </div>
  );
}

function HighlightCard({ icon: Icon, title, description }: Highlight) {
  return (
    <Card className="flex items-start gap-3.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
        <Icon aria-hidden className="size-4.5" />
      </span>
      <div>
        <h2 className="text-sm font-bold text-stone-900">{title}</h2>
        <p className="mt-1 text-[13px] leading-relaxed text-stone-600">
          {description}
        </p>
      </div>
    </Card>
  );
}

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 md:py-10">
        <Hero />
        <AccessCard />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {HIGHLIGHTS.map((highlight) => (
            <HighlightCard key={highlight.title} {...highlight} />
          ))}
        </div>
      </main>
    </>
  );
}
