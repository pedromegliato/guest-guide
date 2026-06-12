import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ExperienceGuideSection } from "@/components/organisms/experience-guide-section";
import type { PlaceRoute } from "@/components/molecules/place-card";
import type { ExperienceGuide } from "@/domain/experience-guide";
import { buildGuideContent } from "@/test/fixtures";

const DEFAULT_ROUTE: PlaceRoute = {
  origin: "Rua Lauro Linhares, 589 — Trindade",
  destinationContext: "Florianópolis - SC",
};

function buildGuide(): ExperienceGuide {
  return {
    content: buildGuideContent(),
    season: "inverno-2026",
    generatedAt: "2026-06-10T12:00:00.000Z",
  };
}

function mockFetchOnce(response: Partial<Response>): ReturnType<typeof vi.fn> {
  const fetchMock = vi.fn().mockResolvedValue(response as Response);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ExperienceGuideSection", () => {
  it("mostra feedback de carregamento enquanto o guia é gerado", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(new Promise(() => undefined)),
    );

    render(<ExperienceGuideSection code="FLN001" route={DEFAULT_ROUTE} />);

    expect(
      screen.getByText(/Preparando recomendações personalizadas/i),
    ).toBeInTheDocument();
  });

  it("renderiza o guia retornado pela API", async () => {
    mockFetchOnce({
      ok: true,
      json: async () => buildGuide(),
    });

    render(<ExperienceGuideSection code="FLN001" route={DEFAULT_ROUTE} />);

    expect(await screen.findByText("Box 32")).toBeInTheDocument();
    expect(screen.getByText("Praia da Joaquina")).toBeInTheDocument();
    expect(screen.getByText(/leve um agasalho/i)).toBeInTheDocument();
  });

  it("mostra erro amigável e permite tentar novamente", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: "Falha temporária na geração." }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => buildGuide(),
      } as Response);
    vi.stubGlobal("fetch", fetchMock);

    render(<ExperienceGuideSection code="FLN001" route={DEFAULT_ROUTE} />);

    expect(
      await screen.findByText("Falha temporária na geração."),
    ).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: /tentar novamente/i }),
    );

    expect(await screen.findByText("Box 32")).toBeInTheDocument();
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
  });
});
