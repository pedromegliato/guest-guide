import { SearchX } from "lucide-react";
import { EmptyState } from "@/components/molecules/empty-state";

export default function PropertyNotFound() {
  return (
    <EmptyState
      icon={SearchX}
      title="Imóvel não encontrado"
      description="Não encontramos nenhum imóvel com esse código. Confira o link que você recebeu na confirmação da reserva ou fale com o seu anfitrião."
      ctaLabel="Buscar outro código"
      ctaHref="/"
    />
  );
}
