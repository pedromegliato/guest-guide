import { Bath, BedDouble, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/atoms/badge";
import { StatPill } from "@/components/molecules/stat-pill";
import { PhotoGallery } from "@/components/organisms/photo-gallery";
import { formatLocation, type Property } from "@/domain/property";

interface GuideHeaderProps {
  property: Property;
}

export function GuideHeader({ property }: GuideHeaderProps) {
  return (
    <header className="grid gap-4">
      <PhotoGallery images={property.images} alt={property.name} />
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="brand">{property.propertyType}</Badge>
          <Badge variant="neutral">{property.code}</Badge>
        </div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
          {property.name}
        </h1>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-stone-600">
          <MapPin aria-hidden className="size-4 text-brand-600" />
          {formatLocation(property.address)}
        </p>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <StatPill
          icon={BedDouble}
          value={property.bedroomQuantity}
          label={property.bedroomQuantity === 1 ? "quarto" : "quartos"}
        />
        <StatPill
          icon={Bath}
          value={property.bathroomQuantity}
          label={property.bathroomQuantity === 1 ? "banheiro" : "banheiros"}
        />
        <StatPill
          icon={Users}
          value={property.guestCapacity}
          label="hóspedes"
        />
      </div>
    </header>
  );
}
