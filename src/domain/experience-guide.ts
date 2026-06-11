import { z } from "zod";

export const placeSchema = z.object({
  name: z.string().min(1),
  distance: z.string().min(1),
  description: z.string().min(1),
});

export const essentialServiceSchema = placeSchema.extend({
  category: z.enum(["farmácia", "supermercado", "hospital"]),
});

export const experienceGuideContentSchema = z.object({
  welcomeMessage: z.string().min(1),
  restaurants: z.array(placeSchema).min(4).max(5),
  attractions: z.array(placeSchema).min(3).max(4),
  essentialServices: z.array(essentialServiceSchema).min(3).max(6),
  seasonalTip: z.string().min(1),
});

export type Place = z.infer<typeof placeSchema>;
export type EssentialService = z.infer<typeof essentialServiceSchema>;
export type EssentialServiceCategory = EssentialService["category"];
export type ExperienceGuideContent = z.infer<typeof experienceGuideContentSchema>;

export interface ExperienceGuide {
  content: ExperienceGuideContent;
  season: string;
  generatedAt: string;
}
