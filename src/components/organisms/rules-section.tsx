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
      <div className="mt-4 flex flex-wrap gap-2">
        <p className="flex items-center gap-2 rounded-full bg-brand-100 px-3.5 py-2 text-[13px] font-semibold text-brand-800">
          <Clock aria-hidden className="size-4 shrink-0" />
          Check-in a partir das {rules.checkInTime}
        </p>
        <p className="flex items-center gap-2 rounded-full bg-brand-100 px-3.5 py-2 text-[13px] font-semibold text-brand-800">
          <Clock aria-hidden className="size-4 shrink-0" />
          Check-out até as {rules.checkOutTime}
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <PolicyItem label="Animais de estimação" allowed={rules.allowsPets} />
        <PolicyItem label="Fumar no imóvel" allowed={rules.allowsSmoking} />
        <PolicyItem label="Festas e eventos" allowed={rules.allowsEvents} />
        <PolicyItem label="Crianças" allowed={rules.suitableForChildren} />
        <PolicyItem label="Bebês" allowed={rules.suitableForBabies} />
      </div>
    </Card>
  );
}
