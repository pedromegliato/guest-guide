import "server-only";

import type { PropertyRepository } from "@/application/ports/property-repository";
import type { Property } from "@/domain/property";
import type { PrismaClient } from "@/generated/prisma/client";
import type { PropertyModel as PropertyRecord } from "@/generated/prisma/models";

export function toDomainProperty(record: PropertyRecord): Property {
  return {
    id: record.id,
    code: record.code,
    name: record.name,
    propertyType: record.propertyType,
    bedroomQuantity: record.bedroomQuantity,
    bathroomQuantity: record.bathroomQuantity,
    guestCapacity: record.guestCapacity,
    address: {
      street: record.street,
      number: record.number,
      complement: record.complement,
      neighborhood: record.neighborhood,
      city: record.city,
      state: record.state,
      postalCode: record.postalCode,
    },
    operational: {
      wifiNetwork: record.wifiNetwork,
      wifiPassword: record.wifiPassword,
      isSelfCheckin: record.isSelfCheckin,
      accessType: record.accessType,
      accessInstructions: record.accessInstructions,
      accessPassword: record.accessPassword,
      parking: record.hasParkingSpot
        ? {
            identifier: record.parkingSpotIdentifier,
            instructions: record.parkingSpotInstructions,
          }
        : null,
    },
    rules: {
      checkInTime: record.checkInTime,
      checkOutTime: record.checkOutTime,
      allowsPets: record.allowsPets,
      allowsSmoking: record.allowsSmoking,
      suitableForChildren: record.suitableForChildren,
      suitableForBabies: record.suitableForBabies,
      allowsEvents: record.allowsEvents,
    },
    amenities: record.amenities,
    images: record.images,
    host: {
      name: record.hostName,
      phone: record.hostPhone,
    },
  };
}

export class PrismaPropertyRepository implements PropertyRepository {
  constructor(private readonly client: PrismaClient) {}

  async findByCode(code: string): Promise<Property | null> {
    const record = await this.client.property.findUnique({ where: { code } });
    return record ? toDomainProperty(record) : null;
  }
}
