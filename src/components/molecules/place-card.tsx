import type { LucideIcon } from "lucide-react";
import { MapPin } from "lucide-react";
import type { Place } from "@/domain/experience-guide";

interface PlaceCardProps {
  place: Place;
  icon: LucideIcon;
}

export function PlaceCard({ place, icon: Icon }: PlaceCardProps) {
  return (
    <li className="flex gap-3 rounded-xl bg-stone-50 p-3.5 ring-1 ring-stone-200">
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-white text-brand-600 ring-1 ring-stone-200">
        <Icon aria-hidden className="size-4.5" />
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <h3 className="text-sm font-semibold text-stone-900">{place.name}</h3>
          <span className="inline-flex items-center gap-1 text-xs text-stone-500">
            <MapPin aria-hidden className="size-3" />
            {place.distance}
          </span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-stone-600">
          {place.description}
        </p>
      </div>
    </li>
  );
}
