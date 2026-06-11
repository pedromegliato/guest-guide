import type { ExperienceGuideContent } from "@/domain/experience-guide";
import type { Property } from "@/domain/property";
import type { Season } from "@/domain/season";

export type ExperienceGuideGenerator = (
  property: Property,
  season: Season,
) => Promise<ExperienceGuideContent>;
