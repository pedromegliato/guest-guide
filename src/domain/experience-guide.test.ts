import { describe, expect, it } from "vitest";
import { experienceGuideContentSchema } from "@/domain/experience-guide";

function buildPlace(name: string) {
  return {
    name,
    distance: "Aprox. 1 km",
    description: "Descrição do lugar.",
  };
}

function buildValidContent() {
  return {
    welcomeMessage: "Bem-vindo ao seu apartamento na Trindade!",
    restaurants: [
      buildPlace("Restaurante A"),
      buildPlace("Restaurante B"),
      buildPlace("Restaurante C"),
      buildPlace("Restaurante D"),
    ],
    attractions: [
      buildPlace("Atração A"),
      buildPlace("Atração B"),
      buildPlace("Atração C"),
    ],
    essentialServices: [
      { ...buildPlace("Farmácia X"), category: "farmácia" },
      { ...buildPlace("Mercado Y"), category: "supermercado" },
      { ...buildPlace("Hospital Z"), category: "hospital" },
    ],
    seasonalTip: "Leve um agasalho: as noites de junho são frias.",
  };
}

describe("experienceGuideContentSchema", () => {
  it("aceita um guia completo e válido", () => {
    const result = experienceGuideContentSchema.safeParse(buildValidContent());
    expect(result.success).toBe(true);
  });

  it("rejeita guia com menos de 4 restaurantes", () => {
    const content = buildValidContent();
    content.restaurants = content.restaurants.slice(0, 3);
    expect(experienceGuideContentSchema.safeParse(content).success).toBe(false);
  });

  it("rejeita guia com menos de 3 atrações", () => {
    const content = buildValidContent();
    content.attractions = content.attractions.slice(0, 2);
    expect(experienceGuideContentSchema.safeParse(content).success).toBe(false);
  });

  it("rejeita serviço essencial com categoria desconhecida", () => {
    const content = buildValidContent();
    content.essentialServices[0] = {
      ...content.essentialServices[0],
      category: "padaria" as never,
    };
    expect(experienceGuideContentSchema.safeParse(content).success).toBe(false);
  });

  it("rejeita conteúdo persistido corrompido", () => {
    expect(experienceGuideContentSchema.safeParse({ foo: "bar" }).success).toBe(
      false,
    );
  });
});
