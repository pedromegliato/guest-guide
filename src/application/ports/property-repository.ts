import type { Property } from "@/domain/property";

export interface PropertyRepository {
  findByCode(code: string): Promise<Property | null>;
}
