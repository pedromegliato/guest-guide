import { Clock, ScrollText } from "lucide-react";
import { Card } from "@/components/atoms/card";
import { SectionTitle } from "@/components/atoms/section-title";
import { PolicyItem } from "@/components/molecules/policy-item";
import type { StayRules } from "@/domain/property";

interface RulesSectionProps {
  rules: StayRules;
}

export function RulesSection({ rules }: RulesSectionProps) {
  return (
    <Card>
      <SectionTitle icon={ScrollText}>Regras da estadia</SectionTitle>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-xl bg-brand-50 px-3.5 py-3 ring-1 ring-brand-100">
          <Clock aria-hidden className="size-5 shrink-0 text-brand-600" />
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-brand-700">
              Check-in
            </p>
            <p className="text-base font-semibold text-stone-900">
              a partir das {rules.checkInTime}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-brand-50 px-3.5 py-3 ring-1 ring-brand-100">
          <Clock aria-hidden className="size-5 shrink-0 text-brand-600" />
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-brand-700">
              Check-out
            </p>
            <p className="text-base font-semibold text-stone-900">
              até as {rules.checkOutTime}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        <PolicyItem label="Animais de estimação" allowed={rules.allowsPets} />
        <PolicyItem label="Fumar no imóvel" allowed={rules.allowsSmoking} />
        <PolicyItem label="Festas e eventos" allowed={rules.allowsEvents} />
        <PolicyItem label="Crianças" allowed={rules.suitableForChildren} />
        <PolicyItem label="Bebês" allowed={rules.suitableForBabies} />
      </div>
    </Card>
  );
}
