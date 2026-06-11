import {
  AirVent,
  ArrowUpDown,
  CookingPot,
  Flame,
  MonitorPlay,
  Sparkles,
  Sun,
  Utensils,
  WashingMachine,
  Waves,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { amenityLabel } from "@/domain/labels";

const AMENITY_ICONS: Record<string, LucideIcon> = {
  wifi: Wifi,
  tv: MonitorPlay,
  air_conditioning: AirVent,
  kitchen: CookingPot,
  washing_machine: WashingMachine,
  elevator: ArrowUpDown,
  balcony: Sun,
  bbq_grill: Flame,
  dishwasher: Utensils,
  pool: Waves,
};

interface AmenityTagProps {
  amenity: string;
}

export function AmenityTag({ amenity }: AmenityTagProps) {
  const Icon = AMENITY_ICONS[amenity] ?? Sparkles;
  return (
    <li className="flex items-center gap-2 rounded-xl bg-stone-50 px-3 py-2.5 text-sm text-stone-800 ring-1 ring-stone-200">
      <Icon aria-hidden className="size-4 shrink-0 text-brand-600" />
      {amenityLabel(amenity)}
    </li>
  );
}
