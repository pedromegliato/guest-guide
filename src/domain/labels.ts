const AMENITY_LABELS: Record<string, string> = {
  wifi: "Wi-Fi",
  tv: "TV",
  air_conditioning: "Ar-condicionado",
  kitchen: "Cozinha",
  washing_machine: "Máquina de lavar",
  elevator: "Elevador",
  balcony: "Varanda",
  bbq_grill: "Churrasqueira",
  dishwasher: "Lava-louças",
  pool: "Piscina",
  heating: "Aquecimento",
  fireplace: "Lareira",
};

const ACCESS_TYPE_LABELS: Record<string, string> = {
  smart_lock: "Fechadura eletrônica",
  keybox: "Cofre de chaves",
  doorman: "Portaria",
  host_checkin: "Entrega de chaves pelo anfitrião",
};

function humanize(key: string): string {
  const text = key.replaceAll("_", " ").trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function amenityLabel(key: string): string {
  return AMENITY_LABELS[key] ?? humanize(key);
}

export function accessTypeLabel(key: string): string {
  return ACCESS_TYPE_LABELS[key] ?? humanize(key);
}
