import { describe, expect, it } from "vitest";
import type { PropertyModel } from "@/generated/prisma/models";
import { toDomainProperty } from "@/infrastructure/repositories/prisma-property-repository";

function buildRecord(overrides: Partial<PropertyModel> = {}): PropertyModel {
  return {
    id: "property-1",
    code: "FLN001",
    name: "Apartamento Beira-Mar Florianópolis",
    propertyType: "Apartamento",
    bedroomQuantity: 2,
    bathroomQuantity: 1,
    guestCapacity: 4,
    street: "Rua Lauro Linhares",
    number: "589",
    complement: "Apto 301",
    neighborhood: "Trindade",
    city: "Florianópolis",
    state: "SC",
    postalCode: "88036-001",
    wifiNetwork: "SeaHome_FLN001",
    wifiPassword: "floripa2024",
    isSelfCheckin: true,
    accessType: "smart_lock",
    accessInstructions: "Use o código 4521 na fechadura eletrônica",
    accessPassword: "4521",
    hasParkingSpot: true,
    parkingSpotIdentifier: "Vaga 12 — subsolo B1",
    parkingSpotInstructions: "Portão lateral, código 7890 no interfone",
    checkInTime: "15:00",
    checkOutTime: "11:00",
    allowsPets: false,
    allowsSmoking: false,
    suitableForChildren: true,
    suitableForBabies: true,
    allowsEvents: false,
    amenities: ["wifi", "tv"],
    images: ["https://images.unsplash.com/photo-1?w=1600"],
    hostName: "Ana Paula",
    hostPhone: "+5548991234567",
    createdAt: new Date("2026-06-10T12:00:00Z"),
    updatedAt: new Date("2026-06-10T12:00:00Z"),
    ...overrides,
  };
}

describe("toDomainProperty", () => {
  it("agrupa os campos planos do banco em objetos de domínio", () => {
    const property = toDomainProperty(buildRecord());

    expect(property.address.neighborhood).toBe("Trindade");
    expect(property.operational.wifiPassword).toBe("floripa2024");
    expect(property.operational.parking).toEqual({
      identifier: "Vaga 12 — subsolo B1",
      instructions: "Portão lateral, código 7890 no interfone",
    });
    expect(property.rules.allowsPets).toBe(false);
    expect(property.host.name).toBe("Ana Paula");
  });

  it("traduz hasParkingSpot=false para parking nulo", () => {
    const property = toDomainProperty(
      buildRecord({
        hasParkingSpot: false,
        parkingSpotIdentifier: null,
        parkingSpotInstructions: null,
      }),
    );

    expect(property.operational.parking).toBeNull();
  });
});
