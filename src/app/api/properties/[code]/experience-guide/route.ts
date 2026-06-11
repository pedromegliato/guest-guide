import { normalizePropertyCode } from "@/domain/property";
import {
  getGetOrGenerateExperienceGuide,
  getPropertyRepository,
} from "@/di/container";

interface RouteParams {
  params: Promise<{ code: string }>;
}

export async function GET(
  _request: Request,
  { params }: RouteParams,
): Promise<Response> {
  const { code } = await params;
  const property = await getPropertyRepository().findByCode(
    normalizePropertyCode(code),
  );
  if (!property) {
    return Response.json(
      { error: "property_not_found", message: "Imóvel não encontrado." },
      { status: 404 },
    );
  }

  try {
    const guide = await getGetOrGenerateExperienceGuide().execute(property);
    return Response.json(guide);
  } catch (error) {
    console.error(
      `Falha ao gerar o guia de experiências do imóvel ${property.code}`,
      error,
    );
    return Response.json(
      {
        error: "experience_guide_unavailable",
        message:
          "Não foi possível gerar o guia de experiências agora. Tente novamente em instantes.",
      },
      { status: 502 },
    );
  }
}
