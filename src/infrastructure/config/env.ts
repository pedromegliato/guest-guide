import "server-only";

const DEFAULT_AI_MODEL = "claude-sonnet-4-6";

export class MissingEnvError extends Error {
  constructor(variableName: string) {
    super(`Variável de ambiente obrigatória ausente: ${variableName}`);
    this.name = "MissingEnvError";
  }
}

export interface DatabaseEnv {
  url: string;
}

export interface AiEnv {
  apiKey: string;
  model: string;
}

export function databaseEnv(): DatabaseEnv {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new MissingEnvError("DATABASE_URL");
  }
  return { url };
}

export function aiEnv(): AiEnv {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new MissingEnvError("ANTHROPIC_API_KEY");
  }
  const model = process.env.AI_MODEL?.trim();
  return { apiKey, model: model || DEFAULT_AI_MODEL };
}
