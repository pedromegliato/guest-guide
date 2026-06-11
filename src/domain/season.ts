export type SeasonName = "verão" | "outono" | "inverno" | "primavera";

export interface Season {
  key: string;
  name: SeasonName;
  year: number;
  monthName: string;
}

const MONTH_NAMES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
] as const;

const SEASON_BY_MONTH: readonly SeasonName[] = [
  "verão",
  "verão",
  "outono",
  "outono",
  "outono",
  "inverno",
  "inverno",
  "inverno",
  "primavera",
  "primavera",
  "primavera",
  "verão",
];

export function seasonForDate(date: Date): Season {
  const month = date.getMonth();
  const year = date.getFullYear();
  const name = SEASON_BY_MONTH[month];
  return {
    key: `${name}-${year}`,
    name,
    year,
    monthName: MONTH_NAMES[month],
  };
}
