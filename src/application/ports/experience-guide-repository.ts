import type {
  ExperienceGuide,
  ExperienceGuideContent,
} from "@/domain/experience-guide";

export interface ExperienceGuideRepository {
  findByPropertyId(propertyId: string): Promise<ExperienceGuide | null>;
  save(
    propertyId: string,
    season: string,
    content: ExperienceGuideContent,
  ): Promise<ExperienceGuide>;
}
