import { streamText as _streamText, convertToCoreMessages } from 'ai';
import { getAPIKey, getBaseURL } from '~/lib/.server/llm/api-key';
import { getOpenAIModel } from '~/lib/.server/llm/model';
import { MAX_TOKENS } from './constants';
import { getSystemPrompt } from './prompts';

interface ToolResult<Name extends string, Args, Result> {
  toolCallId: string;
  toolName: Name;
  args: Args;
  result: Result;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  toolInvocations?: ToolResult<string, unknown, unknown>[];
}

export type Messages = Message[];

export type StreamingOptions = Omit<Parameters<typeof _streamText>[0], 'model'>;

export function streamText(messages: Messages, env: Env, options?: StreamingOptions) {
  const model = 'gpt-3.5-turbo'
  const apiKey = getAPIKey(env)
  const baseURL = getBaseURL('OpenAI')
  return _streamText({
    model: getOpenAIModel(baseURL, apiKey, model),
    system: getSystemPrompt(),
    maxTokens: MAX_TOKENS,
    messages: convertToCoreMessages(messages),
    ...options,
  });
}
