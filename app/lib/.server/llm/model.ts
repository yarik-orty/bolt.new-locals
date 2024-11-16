import { createOpenAI } from '@ai-sdk/openai';

export function getOpenAIModel(baseURL: string, apiKey: string, model: string) {
  const openAI = createOpenAI({
    baseURL,
    apiKey,
  });

  return openAI(model);
}
