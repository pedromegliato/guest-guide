import { Compass } from "lucide-react";
import { EmptyState } from "@/components/molecules/empty-state";

export default function NotFound() {
  return (
    <EmptyState
      icon={Compass}
      title="Página não encontrada"
      description="O endereço que você acessou não existe. Use o código do seu imóvel para encontrar o guia da sua estadia."
      ctaLabel="Ir para a página inicial"
      ctaHref="/"
    />
  );
}
