import type { ExperienceGuide } from "@/domain/experience-guide";
import type { Property } from "@/domain/property";
import { seasonForDate, type Season } from "@/domain/season";
import type { ExperienceGuideGenerator } from "@/application/ports/experience-guide-generator";
import type { ExperienceGuideRepository } from "@/application/ports/experience-guide-repository";

export class GetOrGenerateExperienceGuide {
  private readonly inFlight = new Map<string, Promise<ExperienceGuide>>();

  constructor(
    private readonly guides: ExperienceGuideRepository,
    private readonly generate: ExperienceGuideGenerator,
    private readonly now: () => Date = () => new Date(),
  ) {}

  async execute(property: Property): Promise<ExperienceGuide> {
    const season = seasonForDate(this.now());
    const stored = await this.guides.findByPropertyId(property.id);
    if (stored && stored.season === season.key) {
      return stored;
    }

    const pending = this.inFlight.get(property.id);
    if (pending) {
      return pending;
    }

    const generation = this.generateAndPersist(property, season).finally(() =>
      this.inFlight.delete(property.id),
    );
    this.inFlight.set(property.id, generation);
    return generation;
  }

  private async generateAndPersist(
    property: Property,
    season: Season,
  ): Promise<ExperienceGuide> {
    const content = await this.generate(property, season);
    return this.guides.save(property.id, season.key, content);
  }
}
