import "server-only";

import type { ExperienceGuideRepository } from "@/application/ports/experience-guide-repository";
import type { PropertyRepository } from "@/application/ports/property-repository";
import { GetOrGenerateExperienceGuide } from "@/application/use-cases/get-or-generate-experience-guide";
import { createAiExperienceGuideGenerator } from "@/infrastructure/ai/ai-experience-guide-generator";
import { resolveLanguageModel } from "@/infrastructure/ai/model";
import { prisma } from "@/infrastructure/db/prisma";
import { PrismaExperienceGuideRepository } from "@/infrastructure/repositories/prisma-experience-guide-repository";
import { PrismaPropertyRepository } from "@/infrastructure/repositories/prisma-property-repository";

let propertyRepository: PropertyRepository | undefined;
let experienceGuideRepository: ExperienceGuideRepository | undefined;
let getOrGenerateExperienceGuide: GetOrGenerateExperienceGuide | undefined;

export function getPropertyRepository(): PropertyRepository {
  propertyRepository ??= new PrismaPropertyRepository(prisma);
  return propertyRepository;
}

export function getExperienceGuideRepository(): ExperienceGuideRepository {
  experienceGuideRepository ??= new PrismaExperienceGuideRepository(prisma);
  return experienceGuideRepository;
}

export function getGetOrGenerateExperienceGuide(): GetOrGenerateExperienceGuide {
  getOrGenerateExperienceGuide ??= new GetOrGenerateExperienceGuide(
    getExperienceGuideRepository(),
    createAiExperienceGuideGenerator(resolveLanguageModel),
  );
  return getOrGenerateExperienceGuide;
}
