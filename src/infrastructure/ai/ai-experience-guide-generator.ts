import "server-only";

import { generateObject, type LanguageModel } from "ai";
import type { ExperienceGuideGenerator } from "@/application/ports/experience-guide-generator";
import { experienceGuideContentSchema } from "@/domain/experience-guide";
import {
  buildExperienceGuideSystemPrompt,
  buildExperienceGuideUserPrompt,
} from "@/infrastructure/ai/prompts";

export function createAiExperienceGuideGenerator(
  resolveModel: () => LanguageModel,
): ExperienceGuideGenerator {
  return async (property, season) => {
    const { object } = await generateObject({
      model: resolveModel(),
      temperature: 0.2,
      schema: experienceGuideContentSchema,
      system: buildExperienceGuideSystemPrompt(),
      prompt: buildExperienceGuideUserPrompt(property, season),
    });
    return object;
  };
}
