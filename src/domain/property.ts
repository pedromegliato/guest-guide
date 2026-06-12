export interface Address {
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface ParkingInfo {
  identifier: string | null;
  instructions: string | null;
}

export interface OperationalInfo {
  wifiNetwork: string;
  wifiPassword: string;
  isSelfCheckin: boolean;
  accessType: string;
  accessInstructions: string;
  accessPassword: string | null;
  parking: ParkingInfo | null;
}

export interface StayRules {
  checkInTime: string;
  checkOutTime: string;
  allowsPets: boolean;
  allowsSmoking: boolean;
  suitableForChildren: boolean;
  suitableForBabies: boolean;
  allowsEvents: boolean;
}

export interface Host {
  name: string;
  phone: string;
}

export interface Property {
  id: string;
  code: string;
  name: string;
  propertyType: string;
  bedroomQuantity: number;
  bathroomQuantity: number;
  guestCapacity: number;
  address: Address;
  operational: OperationalInfo;
  rules: StayRules;
  amenities: string[];
  images: string[];
  host: Host;
}

export function normalizePropertyCode(raw: string): string {
  return raw.trim().toUpperCase();
}

export function formatFullAddress(address: Address): string {
  const complement = address.complement ? `, ${address.complement}` : "";
  return [
    `${address.street}, ${address.number}${complement}`,
    `${address.neighborhood}, ${address.city} - ${address.state}`,
    `CEP ${address.postalCode}`,
  ].join(" — ");
}

export function formatLocation(address: Address): string {
  return `${address.neighborhood}, ${formatCityState(address)}`;
}

export function formatCityState(address: Address): string {
  return `${address.city} - ${address.state}`;
}
