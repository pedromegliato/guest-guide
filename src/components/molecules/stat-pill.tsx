import type { LucideIcon } from "lucide-react";

interface StatPillProps {
  icon: LucideIcon;
  value: number;
  label: string;
}

export function StatPill({ icon: Icon, value, label }: StatPillProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 text-sm shadow-sm ring-1 ring-stone-200 backdrop-blur">
      <Icon aria-hidden className="size-4 text-brand-600" />
      <span className="font-semibold text-stone-900">{value}</span>
      <span className="text-stone-600">{label}</span>
    </div>
  );
}
