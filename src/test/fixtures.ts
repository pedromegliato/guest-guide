import type {
  ExperienceGuideContent,
  Place,
} from "@/domain/experience-guide";
import type { Property } from "@/domain/property";

export function buildProperty(overrides: Partial<Property> = {}): Property {
  return {
    id: "property-1",
    code: "FLN001",
    name: "Apartamento Beira-Mar Florianópolis",
    propertyType: "Apartamento",
    bedroomQuantity: 2,
    bathroomQuantity: 1,
    guestCapacity: 4,
    address: {
      street: "Rua Lauro Linhares",
      number: "589",
      complement: "Apto 301",
      neighborhood: "Trindade",
      city: "Florianópolis",
      state: "SC",
      postalCode: "88036-001",
    },
    operational: {
      wifiNetwork: "SeaHome_FLN001",
      wifiPassword: "floripa2024",
      isSelfCheckin: true,
      accessType: "smart_lock",
      accessInstructions: "Use o código 4521 na fechadura eletrônica",
      accessPassword: "4521",
      parking: {
        identifier: "Vaga 12 — subsolo B1",
        instructions: "Portão lateral, código 7890 no interfone",
      },
    },
    rules: {
      checkInTime: "15:00",
      checkOutTime: "11:00",
      allowsPets: false,
      allowsSmoking: false,
      suitableForChildren: true,
      suitableForBabies: true,
      allowsEvents: false,
    },
    amenities: ["wifi", "tv", "air_conditioning"],
    images: ["https://images.unsplash.com/photo-1?w=1600"],
    host: {
      name: "Ana Paula",
      phone: "+5548991234567",
    },
    ...overrides,
  };
}

function buildPlace(name: string): Place {
  return {
    name,
    distance: "Aprox. 1 km",
    description: "Descrição do lugar.",
  };
}

export function buildGuideContent(
  overrides: Partial<ExperienceGuideContent> = {},
): ExperienceGuideContent {
  return {
    welcomeMessage: "Bem-vindo ao coração da Trindade!",
    restaurants: [
      buildPlace("Box 32"),
      buildPlace("Armazém Vieira"),
      buildPlace("Bar do Arante"),
      buildPlace("Ostradamus"),
    ],
    attractions: [
      buildPlace("Praia da Joaquina"),
      buildPlace("Lagoa da Conceição"),
      buildPlace("Mercado Público"),
    ],
    essentialServices: [
      { ...buildPlace("Farmácia Catarinense"), category: "farmácia" },
      { ...buildPlace("Supermercado Angeloni"), category: "supermercado" },
      { ...buildPlace("Hospital Universitário"), category: "hospital" },
    ],
    seasonalTip: "Em junho, leve um agasalho para as noites frias.",
    ...overrides,
  };
}
