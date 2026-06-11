-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "bedroomQuantity" INTEGER NOT NULL,
    "bathroomQuantity" INTEGER NOT NULL,
    "guestCapacity" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "wifiNetwork" TEXT NOT NULL,
    "wifiPassword" TEXT NOT NULL,
    "isSelfCheckin" BOOLEAN NOT NULL,
    "accessType" TEXT NOT NULL,
    "accessInstructions" TEXT NOT NULL,
    "accessPassword" TEXT,
    "hasParkingSpot" BOOLEAN NOT NULL,
    "parkingSpotIdentifier" TEXT,
    "parkingSpotInstructions" TEXT,
    "checkInTime" TEXT NOT NULL,
    "checkOutTime" TEXT NOT NULL,
    "allowsPets" BOOLEAN NOT NULL,
    "allowsSmoking" BOOLEAN NOT NULL,
    "suitableForChildren" BOOLEAN NOT NULL,
    "suitableForBabies" BOOLEAN NOT NULL,
    "allowsEvents" BOOLEAN NOT NULL,
    "amenities" TEXT[],
    "images" TEXT[],
    "hostName" TEXT NOT NULL,
    "hostPhone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceGuide" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExperienceGuide_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_code_key" ON "Property"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ExperienceGuide_propertyId_key" ON "ExperienceGuide"("propertyId");

-- AddForeignKey
ALTER TABLE "ExperienceGuide" ADD CONSTRAINT "ExperienceGuide_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
