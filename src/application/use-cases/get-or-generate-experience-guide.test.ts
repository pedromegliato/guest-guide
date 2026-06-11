import { describe, expect, it, vi } from "vitest";
import type {
  ExperienceGuide,
  ExperienceGuideContent,
} from "@/domain/experience-guide";
import type { ExperienceGuideRepository } from "@/application/ports/experience-guide-repository";
import { GetOrGenerateExperienceGuide } from "@/application/use-cases/get-or-generate-experience-guide";
import { buildGuideContent, buildProperty } from "@/test/fixtures";

class InMemoryExperienceGuideRepository implements ExperienceGuideRepository {
  private readonly guides = new Map<string, ExperienceGuide>();

  async findByPropertyId(propertyId: string): Promise<ExperienceGuide | null> {
    return this.guides.get(propertyId) ?? null;
  }

  async save(
    propertyId: string,
    season: string,
    content: ExperienceGuideContent,
  ): Promise<ExperienceGuide> {
    const guide: ExperienceGuide = {
      content,
      season,
      generatedAt: new Date("2026-06-10T12:00:00Z").toISOString(),
    };
    this.guides.set(propertyId, guide);
    return guide;
  }
}

const WINTER_2026 = () => new Date("2026-06-10T12:00:00");

describe("GetOrGenerateExperienceGuide", () => {
  it("gera e persiste o guia quando não existe", async () => {
    const repository = new InMemoryExperienceGuideRepository();
    const generate = vi.fn().mockResolvedValue(buildGuideContent());
    const useCase = new GetOrGenerateExperienceGuide(
      repository,
      generate,
      WINTER_2026,
    );
    const property = buildProperty();

    const guide = await useCase.execute(property);

    expect(generate).toHaveBeenCalledOnce();
    expect(guide.season).toBe("inverno-2026");
    await expect(repository.findByPropertyId(property.id)).resolves.toEqual(
      guide,
    );
  });

  it("reutiliza o guia persistido da mesma estação sem regenerar", async () => {
    const repository = new InMemoryExperienceGuideRepository();
    const generate = vi.fn().mockResolvedValue(buildGuideContent());
    const useCase = new GetOrGenerateExperienceGuide(
      repository,
      generate,
      WINTER_2026,
    );
    const property = buildProperty();

    const first = await useCase.execute(property);
    const second = await useCase.execute(property);

    expect(generate).toHaveBeenCalledOnce();
    expect(second).toEqual(first);
  });

  it("regenera o guia quando a estação muda", async () => {
    const repository = new InMemoryExperienceGuideRepository();
    const generate = vi.fn().mockResolvedValue(buildGuideContent());
    const property = buildProperty();
    await repository.save(property.id, "outono-2026", buildGuideContent());
    const useCase = new GetOrGenerateExperienceGuide(
      repository,
      generate,
      WINTER_2026,
    );

    const guide = await useCase.execute(property);

    expect(generate).toHaveBeenCalledOnce();
    expect(guide.season).toBe("inverno-2026");
  });

  it("compartilha uma única geração entre acessos concorrentes", async () => {
    const repository = new InMemoryExperienceGuideRepository();
    let resolveGeneration!: (content: ExperienceGuideContent) => void;
    const generation = new Promise<ExperienceGuideContent>((resolve) => {
      resolveGeneration = resolve;
    });
    const generate = vi.fn().mockReturnValue(generation);
    const useCase = new GetOrGenerateExperienceGuide(
      repository,
      generate,
      WINTER_2026,
    );
    const property = buildProperty();

    const first = useCase.execute(property);
    const second = useCase.execute(property);
    await vi.waitFor(() => expect(generate).toHaveBeenCalledOnce());
    resolveGeneration(buildGuideContent());

    expect(await first).toEqual(await second);
    expect(generate).toHaveBeenCalledOnce();
  });

  it("propaga a falha da geração sem persistir nada", async () => {
    const repository = new InMemoryExperienceGuideRepository();
    const generate = vi.fn().mockRejectedValue(new Error("ai indisponível"));
    const useCase = new GetOrGenerateExperienceGuide(
      repository,
      generate,
      WINTER_2026,
    );
    const property = buildProperty();

    await expect(useCase.execute(property)).rejects.toThrow("ai indisponível");
    await expect(repository.findByPropertyId(property.id)).resolves.toBeNull();
  });
});
