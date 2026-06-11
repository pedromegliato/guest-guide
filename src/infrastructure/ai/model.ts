import "server-only";

import { createAnthropic } from "@ai-sdk/anthropic";
import type { LanguageModel } from "ai";
import { aiEnv } from "@/infrastructure/config/env";

export function resolveLanguageModel(): LanguageModel {
  const { apiKey, model } = aiEnv();
  return createAnthropic({ apiKey })(model);
}
