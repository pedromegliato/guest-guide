import { Sparkles } from "lucide-react";
import { Card } from "@/components/atoms/card";
import { SectionTitle } from "@/components/atoms/section-title";
import { AmenityTag } from "@/components/molecules/amenity-tag";

interface AmenitiesSectionProps {
  amenities: string[];
}

export function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  if (amenities.length === 0) {
    return null;
  }
  return (
    <Card>
      <SectionTitle icon={Sparkles}>Amenidades</SectionTitle>
      <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {amenities.map((amenity) => (
          <AmenityTag key={amenity} amenity={amenity} />
        ))}
      </ul>
    </Card>
  );
}
