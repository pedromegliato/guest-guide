import { describe, expect, it } from "vitest";
import { seasonForDate } from "@/domain/season";
import {
  buildChatSystemPrompt,
  buildExperienceGuideUserPrompt,
} from "@/infrastructure/ai/prompts";
import { buildGuideContent, buildProperty } from "@/test/fixtures";

describe("buildExperienceGuideUserPrompt", () => {
  it("contextualiza o prompt com endereço real e estação do ano", () => {
    const property = buildProperty();
    const season = seasonForDate(new Date("2026-06-10T12:00:00"));

    const prompt = buildExperienceGuideUserPrompt(property, season);

    expect(prompt).toContain("Florianópolis - SC");
    expect(prompt).toContain("Trindade");
    expect(prompt).toContain("Rua Lauro Linhares");
    expect(prompt).toContain("junho de 2026");
    expect(prompt).toContain("inverno");
  });
});

describe("buildChatSystemPrompt", () => {
  it("inclui os dados operacionais que o assistente precisa responder", () => {
    const prompt = buildChatSystemPrompt(buildProperty(), buildGuideContent());

    expect(prompt).toContain("SeaHome_FLN001");
    expect(prompt).toContain("floripa2024");
    expect(prompt).toContain("Check-in a partir de: 15:00");
    expect(prompt).toContain("Animais de estimação: não permitido");
    expect(prompt).toContain("Box 32");
  });

  it("orienta a contatar o anfitrião quando faltar informação", () => {
    const prompt = buildChatSystemPrompt(buildProperty(), null);

    expect(prompt).toContain("Ana Paula");
    expect(prompt).toContain("+5548991234567");
    expect(prompt).toContain("ainda não disponível");
  });

  it("proíbe o assistente de inventar informações", () => {
    const prompt = buildChatSystemPrompt(buildProperty(), buildGuideContent());

    expect(prompt).toContain("Nunca invente");
    expect(prompt).toContain("APENAS com base nos dados fornecidos");
  });
});
