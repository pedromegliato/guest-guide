import { Car, DoorOpen, KeyRound } from "lucide-react";
import { Badge } from "@/components/atoms/badge";
import { Card } from "@/components/atoms/card";
import { SectionTitle } from "@/components/atoms/section-title";
import { CopyField } from "@/components/molecules/copy-field";
import { InfoRow } from "@/components/molecules/info-row";
import { accessTypeLabel } from "@/domain/labels";
import type { OperationalInfo } from "@/domain/property";

interface AccessSectionProps {
  operational: OperationalInfo;
}

export function AccessSection({ operational }: AccessSectionProps) {
  return (
    <Card>
      <SectionTitle icon={KeyRound}>Acesso ao imóvel</SectionTitle>
      <div className="mt-4 grid gap-3">
        <div className="grid gap-2.5 sm:grid-cols-2">
          <CopyField label="Rede Wi-Fi" value={operational.wifiNetwork} />
          <CopyField label="Senha do Wi-Fi" value={operational.wifiPassword} />
        </div>

        <InfoRow icon={DoorOpen} label="Como entrar">
          <div className="grid gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">
                {accessTypeLabel(operational.accessType)}
              </span>
              {operational.isSelfCheckin && (
                <Badge variant="success">Self check-in</Badge>
              )}
            </div>
            <p>{operational.accessInstructions}</p>
            {operational.accessPassword && (
              <div className="max-w-60">
                <CopyField
                  label="Código de acesso"
                  value={operational.accessPassword}
                />
              </div>
            )}
          </div>
        </InfoRow>

        <InfoRow icon={Car} label="Estacionamento">
          {operational.parking ? (
            <div className="grid gap-0.5">
              {operational.parking.identifier && (
                <p className="font-medium">{operational.parking.identifier}</p>
              )}
              {operational.parking.instructions && (
                <p>{operational.parking.instructions}</p>
              )}
            </div>
          ) : (
            <p>Este imóvel não possui vaga de estacionamento.</p>
          )}
        </InfoRow>
      </div>
    </Card>
  );
}
