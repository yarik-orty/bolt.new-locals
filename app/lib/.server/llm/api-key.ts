import { env } from 'node:process';

export function getAPIKey(cloudflareEnv: Env) {
  /**
   * The `cloudflareEnv` is only used when deployed or when previewing locally.
   * In development the environment variables are available through `env`.
   */
  return env.OPENAI_API_KEY || '';
}

export function getBaseURL(provider: string) {
  switch (provider) {
    case 'OpenAI':
      let baseUrl = env.OPENAI_API_BASE_URL || "http://127.0.0.1:8080";
      if (env.RUNNING_IN_DOCKER === 'true') {
        baseUrl = baseUrl.replace("127.0.0.1", "host.docker.internal");
      }
      return baseUrl
    default:
      return "";
  }
}