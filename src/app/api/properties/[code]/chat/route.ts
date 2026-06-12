import { convertToModelMessages, streamText, validateUIMessages } from "ai";
import { normalizePropertyCode } from "@/domain/property";
import {
  getExperienceGuideRepository,
  getPropertyRepository,
} from "@/di/container";
import { resolveLanguageModel } from "@/infrastructure/ai/model";
import { buildChatSystemPrompt } from "@/infrastructure/ai/prompts";

const MAX_HISTORY_MESSAGES = 20;

interface RouteParams {
  params: Promise<{ code: string }>;
}

export async function POST(
  request: Request,
  { params }: RouteParams,
): Promise<Response> {
  const { code } = await params;
  const [property, body] = await Promise.all([
    getPropertyRepository().findByCode(normalizePropertyCode(code)),
    request.json().catch(() => undefined) as Promise<unknown>,
  ]);
  if (!property) {
    return Response.json(
      { error: "property_not_found", message: "Imóvel não encontrado." },
      { status: 404 },
    );
  }
  if (body === undefined) {
    return Response.json(
      { error: "invalid_body", message: "Corpo da requisição inválido." },
      { status: 400 },
    );
  }

  let messages;
  try {
    messages = await validateUIMessages({
      messages: (body as { messages?: unknown })?.messages,
    });
  } catch {
    return Response.json(
      { error: "invalid_messages", message: "Mensagens em formato inválido." },
      { status: 400 },
    );
  }

  const guide = await getExperienceGuideRepository().findByPropertyId(
    property.id,
  );

  const result = streamText({
    model: resolveLanguageModel(),
    temperature: 0.2,
    system: buildChatSystemPrompt(property, guide?.content ?? null),
    messages: await convertToModelMessages(
      messages.slice(-MAX_HISTORY_MESSAGES),
    ),
  });

  return result.toUIMessageStreamResponse({
    onError: (error) => {
      console.error(`Falha no chat do imóvel ${property.code}`, error);
      return "Não consegui responder agora. Tente novamente em instantes ou contate o anfitrião.";
    },
  });
}
