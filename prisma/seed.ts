import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const properties = [
  {
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
    amenities: [
      "wifi",
      "tv",
      "air_conditioning",
      "kitchen",
      "washing_machine",
      "elevator",
      "balcony",
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=80",
    ],
    hostName: "Ana Paula",
    hostPhone: "+5548991234567",
  },
  {
    code: "GRM001",
    name: "Chalé Serra Gramado",
    propertyType: "Casa",
    bedroomQuantity: 3,
    bathroomQuantity: 2,
    guestCapacity: 6,
    street: "Rua das Hortênsias",
    number: "220",
    complement: null,
    neighborhood: "Planalto",
    city: "Gramado",
    state: "RS",
    postalCode: "95670-000",
    wifiNetwork: "ChaletSerra_GRM",
    wifiPassword: "gramado@2024",
    isSelfCheckin: false,
    accessType: "keybox",
    accessInstructions: "A chave está no cofre na entrada. Código: 1983",
    accessPassword: "1983",
    hasParkingSpot: true,
    parkingSpotIdentifier: null,
    parkingSpotInstructions: "Garagem própria para 2 carros",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    allowsPets: true,
    allowsSmoking: false,
    suitableForChildren: true,
    suitableForBabies: false,
    allowsEvents: false,
    amenities: ["wifi", "tv", "kitchen", "bbq_grill", "balcony", "dishwasher"],
    images: [
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1600&q=80",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1600&q=80",
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1600&q=80",
      "https://images.unsplash.com/photo-1520984032042-162d526883e0?w=1600&q=80",
    ],
    hostName: "Carlos Eduardo",
    hostPhone: "+5554998765432",
  },
];

async function main(): Promise<void> {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  try {
    for (const property of properties) {
      const { code, ...data } = property;
      await prisma.property.upsert({
        where: { code },
        create: { code, ...data },
        update: data,
      });
      console.info(`Seeded property ${code}`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
