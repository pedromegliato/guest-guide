"use client";

import {
  CalendarHeart,
  Compass,
  CircleAlert,
  Cross,
  Hospital,
  RefreshCw,
  ShoppingCart,
  Sparkles,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { SectionTitle } from "@/components/atoms/section-title";
import { Skeleton } from "@/components/atoms/skeleton";
import { PlaceCard } from "@/components/molecules/place-card";
import type {
  EssentialServiceCategory,
  ExperienceGuide,
} from "@/domain/experience-guide";

const ESSENTIAL_ICONS: Record<EssentialServiceCategory, LucideIcon> = {
  farmácia: Cross,
  supermercado: ShoppingCart,
  hospital: Hospital,
};

type GuideState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; guide: ExperienceGuide };

const GENERIC_ERROR_MESSAGE =
  "Não foi possível carregar o guia de experiências agora. Tente novamente em instantes.";

interface ExperienceGuideSectionProps {
  code: string;
}

export function ExperienceGuideSection({ code }: ExperienceGuideSectionProps) {
  const [state, setState] = useState<GuideState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setState({ status: "loading" });
    setAttempt((current) => current + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGuide(): Promise<void> {
      try {
        const response = await fetch(
          `/api/properties/${encodeURIComponent(code)}/experience-guide`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          const body = (await response.json().catch(() => null)) as {
            message?: string;
          } | null;
          setState({
            status: "error",
            message: body?.message ?? GENERIC_ERROR_MESSAGE,
          });
          return;
        }
        const guide = (await response.json()) as ExperienceGuide;
        setState({ status: "ready", guide });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        console.error("Falha ao carregar o guia de experiências", error);
        setState({ status: "error", message: GENERIC_ERROR_MESSAGE });
      }
    }

    void loadGuide();
    return () => controller.abort();
  }, [code, attempt]);

  return (
    <Card>
      <SectionTitle icon={Compass}>Guia de experiências</SectionTitle>

      {state.status === "loading" && <GuideSkeleton />}

      {state.status === "error" && (
        <div className="mt-4 grid justify-items-start gap-3 rounded-xl bg-rose-50 p-4 ring-1 ring-rose-100">
          <p className="flex items-start gap-2 text-sm text-rose-800">
            <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
            {state.message}
          </p>
          <Button onClick={retry}>
            <RefreshCw aria-hidden className="size-4" />
            Tentar novamente
          </Button>
        </div>
      )}

      {state.status === "ready" && <GuideContent guide={state.guide} />}
    </Card>
  );
}

function GuideSkeleton() {
  return (
    <div className="mt-4 grid gap-3" role="status">
      <p className="flex items-center gap-2 text-sm text-stone-600">
        <Sparkles aria-hidden className="size-4 animate-pulse text-brand-600" />
        Preparando recomendações personalizadas da região para você...
      </p>
      <Skeleton className="h-16 w-full" />
      <div className="grid gap-2.5 sm:grid-cols-2">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
}

interface GuideContentProps {
  guide: ExperienceGuide;
}

function GuideContent({ guide }: GuideContentProps) {
  const { content } = guide;
  return (
    <div className="mt-4 grid gap-6">
      <p className="rounded-xl bg-brand-50 p-4 text-sm leading-relaxed text-brand-900 ring-1 ring-brand-100">
        {content.welcomeMessage}
      </p>

      <section aria-label="Restaurantes próximos">
        <h3 className="mb-2.5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-stone-500">
          <UtensilsCrossed aria-hidden className="size-4 text-brand-600" />
          Onde comer
        </h3>
        <ul className="grid gap-2.5">
          {content.restaurants.map((place) => (
            <PlaceCard key={place.name} place={place} icon={UtensilsCrossed} />
          ))}
        </ul>
      </section>

      <section aria-label="Atrações próximas">
        <h3 className="mb-2.5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-stone-500">
          <Compass aria-hidden className="size-4 text-brand-600" />
          O que fazer
        </h3>
        <ul className="grid gap-2.5">
          {content.attractions.map((place) => (
            <PlaceCard key={place.name} place={place} icon={Compass} />
          ))}
        </ul>
      </section>

      <section aria-label="Serviços essenciais">
        <h3 className="mb-2.5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-stone-500">
          <Cross aria-hidden className="size-4 text-brand-600" />
          Serviços essenciais
        </h3>
        <ul className="grid gap-2.5">
          {content.essentialServices.map((service) => (
            <PlaceCard
              key={service.name}
              place={service}
              icon={ESSENTIAL_ICONS[service.category]}
            />
          ))}
        </ul>
      </section>

      <section
        aria-label="Dica da estação"
        className="flex gap-3 rounded-xl bg-amber-50 p-4 ring-1 ring-amber-100"
      >
        <CalendarHeart aria-hidden className="mt-0.5 size-5 shrink-0 text-amber-600" />
        <div>
          <h3 className="text-sm font-semibold text-amber-900">
            Dica da estação
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-amber-900/90">
            {content.seasonalTip}
          </p>
        </div>
      </section>
    </div>
  );
}
