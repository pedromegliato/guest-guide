import "server-only";

import { createOpenAI } from "@ai-sdk/openai";
import type { LanguageModel } from "ai";
import { aiEnv } from "@/infrastructure/config/env";

export function resolveLanguageModel(): LanguageModel {
  const { apiKey, model } = aiEnv();
  return createOpenAI({ apiKey })(model);
}
