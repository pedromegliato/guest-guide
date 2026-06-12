import { MapPin, MessageCircle, Phone, UserRound } from "lucide-react";
import { buttonClasses } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { SectionTitle } from "@/components/atoms/section-title";
import { InfoRow } from "@/components/molecules/info-row";
import { GUIDE_SECTION_IDS } from "@/components/organisms/guide-navigation";
import {
  formatFullAddress,
  formatLocation,
  type Address,
  type Host,
} from "@/domain/property";
import { buildMapsSearchUrl } from "@/lib/maps";

interface ContactSectionProps {
  host: Host;
  address: Address;
}

function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function ContactSection({ host, address }: ContactSectionProps) {
  const fullAddress = formatFullAddress(address);
  const mapsUrl = buildMapsSearchUrl(
    `${address.street}, ${address.number}, ${formatLocation(address)}`,
  );

  return (
    <Card id={GUIDE_SECTION_IDS.contact} className="scroll-mt-24">
      <SectionTitle icon={UserRound}>Contato e endereço</SectionTitle>
      <div className="mt-4 grid gap-4">
        <InfoRow icon={UserRound} label="Anfitrião">
          <p className="font-medium">{host.name}</p>
        </InfoRow>
        <InfoRow icon={Phone} label="Telefone">
          <a
            href={`tel:${host.phone}`}
            className="font-medium text-brand-700 underline-offset-2 hover:underline"
          >
            {host.phone}
          </a>
        </InfoRow>
        <InfoRow icon={MapPin} label="Endereço">
          <p>{fullAddress}</p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-sm font-medium text-brand-700 underline-offset-2 hover:underline"
          >
            Ver no mapa
          </a>
        </InfoRow>
      </div>
      <div className="mt-5 flex flex-wrap gap-2.5">
        <a
          href={`https://wa.me/${digitsOnly(host.phone)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("primary")}
        >
          <MessageCircle aria-hidden className="size-4" />
          Falar no WhatsApp
        </a>
        <a
          href={`tel:${host.phone}`}
          className="inline-flex items-center gap-2 rounded-xl bg-stone-100 px-4 py-2.5 text-sm font-semibold text-stone-800 transition-colors hover:bg-stone-200"
        >
          <Phone aria-hidden className="size-4" />
          Ligar para {host.name.split(" ")[0]}
        </a>
      </div>
    </Card>
  );
}
