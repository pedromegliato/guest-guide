import "server-only";

import type { ExperienceGuideRepository } from "@/application/ports/experience-guide-repository";
import {
  experienceGuideContentSchema,
  type ExperienceGuide,
  type ExperienceGuideContent,
} from "@/domain/experience-guide";
import type { PrismaClient } from "@/generated/prisma/client";

export class PrismaExperienceGuideRepository
  implements ExperienceGuideRepository
{
  constructor(private readonly client: PrismaClient) {}

  async findByPropertyId(propertyId: string): Promise<ExperienceGuide | null> {
    const record = await this.client.experienceGuide.findUnique({
      where: { propertyId },
    });
    if (!record) {
      return null;
    }
    const parsed = experienceGuideContentSchema.safeParse(record.content);
    if (!parsed.success) {
      return null;
    }
    return {
      content: parsed.data,
      season: record.season,
      generatedAt: record.generatedAt.toISOString(),
    };
  }

  async save(
    propertyId: string,
    season: string,
    content: ExperienceGuideContent,
  ): Promise<ExperienceGuide> {
    const record = await this.client.experienceGuide.upsert({
      where: { propertyId },
      create: { propertyId, season, content },
      update: { season, content, generatedAt: new Date() },
    });
    return {
      content,
      season: record.season,
      generatedAt: record.generatedAt.toISOString(),
    };
  }
}
