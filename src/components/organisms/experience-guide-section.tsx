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
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { SectionTitle } from "@/components/atoms/section-title";
import { Skeleton } from "@/components/atoms/skeleton";
import { GUIDE_SECTION_IDS } from "@/components/organisms/guide-navigation";
import { PlaceCard, type PlaceRoute } from "@/components/molecules/place-card";
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
  route: PlaceRoute;
}

export function ExperienceGuideSection({
  code,
  route,
}: ExperienceGuideSectionProps) {
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
    <Card
      id={GUIDE_SECTION_IDS.experiences}
      tone="gold"
      className="scroll-mt-24"
    >
      <SectionTitle icon={Compass} iconClassName="bg-gold-100 text-gold-700">
        Guia de experiências
      </SectionTitle>

      {state.status === "loading" && <GuideSkeleton />}

      {state.status === "error" && (
        <div className="mt-4 grid justify-items-start gap-3 rounded-xl bg-white/70 p-4 ring-1 ring-gold-200">
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

      {state.status === "ready" && (
        <GuideContent guide={state.guide} route={route} />
      )}
    </Card>
  );
}

function GuideSkeleton() {
  return (
    <div className="mt-4 grid gap-3" role="status">
      <p className="flex items-center gap-2 text-sm text-gold-900">
        <Sparkles aria-hidden className="size-4 animate-pulse text-gold-700" />
        Preparando recomendações personalizadas da região para você...
      </p>
      <Skeleton className="h-16 w-full bg-gold-200/60" />
      <div className="grid gap-2.5 sm:grid-cols-2">
        <Skeleton className="h-24 w-full bg-gold-200/60" />
        <Skeleton className="h-24 w-full bg-gold-200/60" />
        <Skeleton className="h-24 w-full bg-gold-200/60" />
        <Skeleton className="h-24 w-full bg-gold-200/60" />
      </div>
    </div>
  );
}

interface GuideSubsectionProps {
  icon: LucideIcon;
  title: string;
  ariaLabel: string;
  children: ReactNode;
}

function GuideSubsection({
  icon: Icon,
  title,
  ariaLabel,
  children,
}: GuideSubsectionProps) {
  return (
    <section aria-label={ariaLabel}>
      <h3 className="mb-2.5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gold-900">
        <Icon aria-hidden className="size-4 text-gold-700" />
        {title}
      </h3>
      <ul className="grid gap-2.5">{children}</ul>
    </section>
  );
}

interface GuideContentProps {
  guide: ExperienceGuide;
  route: PlaceRoute;
}

function GuideContent({ guide, route }: GuideContentProps) {
  const { content } = guide;
  return (
    <div className="mt-4 grid gap-6">
      <p className="rounded-xl bg-white/70 p-4 text-sm leading-relaxed text-gold-900 ring-1 ring-gold-200">
        {content.welcomeMessage}
      </p>

      <GuideSubsection icon={UtensilsCrossed} title="Onde comer" ariaLabel="Restaurantes próximos">
        {content.restaurants.map((place) => (
          <PlaceCard
            key={place.name}
            place={place}
            icon={UtensilsCrossed}
            route={route}
          />
        ))}
      </GuideSubsection>

      <GuideSubsection icon={Compass} title="O que fazer" ariaLabel="Atrações próximas">
        {content.attractions.map((place) => (
          <PlaceCard key={place.name} place={place} icon={Compass} route={route} />
        ))}
      </GuideSubsection>

      <GuideSubsection icon={Cross} title="Serviços essenciais" ariaLabel="Serviços essenciais">
        {content.essentialServices.map((service) => (
          <PlaceCard
            key={service.name}
            place={service}
            icon={ESSENTIAL_ICONS[service.category]}
            route={route}
          />
        ))}
      </GuideSubsection>

      <section
        aria-label="Dica da estação"
        className="flex gap-3 rounded-xl bg-white/70 p-4 ring-1 ring-gold-200"
      >
        <CalendarHeart aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-700" />
        <div>
          <h3 className="text-sm font-semibold text-gold-900">
            Dica da estação
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-gold-900">
            {content.seasonalTip}
          </p>
        </div>
      </section>
    </div>
  );
}
