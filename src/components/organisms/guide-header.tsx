import { Bath, BedDouble, MapPin, Users } from "lucide-react";
import { StatPill } from "@/components/molecules/stat-pill";
import { PhotoGallery } from "@/components/organisms/photo-gallery";
import { formatLocation, type Property } from "@/domain/property";

interface GuideHeaderProps {
  property: Property;
}

export function GuideHeader({ property }: GuideHeaderProps) {
  return (
    <header>
      <PhotoGallery images={property.images} alt={property.name} />
      <div className="relative z-10 mx-3 -mt-12 rounded-2xl bg-white/85 p-5 shadow-xl ring-1 ring-white/70 backdrop-blur md:mx-6 md:-mt-16 md:p-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
          {property.propertyType}
          <span className="text-brand-200">{property.code}</span>
        </span>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
          {property.name}
        </h1>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-stone-600">
          <MapPin aria-hidden className="size-4 text-brand-600" />
          {formatLocation(property.address)}
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
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
      </div>
    </header>
  );
}
