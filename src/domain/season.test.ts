import { describe, expect, it } from "vitest";
import { seasonForDate } from "@/domain/season";

describe("seasonForDate", () => {
  it.each([
    ["2026-01-15", "verão"],
    ["2026-04-10", "outono"],
    ["2026-06-10", "inverno"],
    ["2026-07-20", "inverno"],
    ["2026-10-05", "primavera"],
    ["2026-12-25", "verão"],
  ])("classifica %s como %s no hemisfério sul", (date, expected) => {
    expect(seasonForDate(new Date(`${date}T12:00:00`)).name).toBe(expected);
  });

  it("gera uma chave estável com estação e ano", () => {
    const season = seasonForDate(new Date("2026-06-10T12:00:00"));
    expect(season.key).toBe("inverno-2026");
  });

  it("expõe o nome do mês para contextualizar prompts", () => {
    const season = seasonForDate(new Date("2026-06-10T12:00:00"));
    expect(season.monthName).toBe("junho");
    expect(season.year).toBe(2026);
  });
});
