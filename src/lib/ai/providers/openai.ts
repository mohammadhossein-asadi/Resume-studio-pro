import OpenAI from 'openai';
import { BaseProvider, ProviderOptions, ProviderResponse } from './base';
import { AIError, ProviderError } from '../errors';

const API_KEYS = [
  process.env.OPENAI_API_KEY_1,
  process.env.OPENAI_API_KEY_2,
  process.env.OPENAI_API_KEY_3,
].filter(Boolean);

let currentKeyIndex = 0;

function getClient(): OpenAI {
  const apiKey = API_KEYS[currentKeyIndex];
  if (!apiKey) {
    throw new ConfigurationError('No OpenAI API key configured');
  }
  return new OpenAI({ apiKey });
}

function rotateKey(): void {
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
}

export class OpenAIProvider extends BaseProvider {
  readonly name = 'openai';
  readonly models = ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'];
  readonly defaultModel = 'gpt-4o-mini';

  async complete(prompt: string, options?: ProviderOptions): Promise<ProviderResponse> {
    const client = getClient();
    const model = this.getModel(options);
    const messages = this.buildMessages(prompt, options?.systemPrompt);

    let lastError: Error | null = null;

    for (let attempt = 0; attempt < API_KEYS.length; attempt++) {
      try {
        const completion = await client.chat.completions.create({
          model,
          messages,
          temperature: this.getTemperature(options),
          max_tokens: this.getMaxTokens(options),
        });

        const content = completion.choices[0]?.message?.content || '';
        return {
          content,
          usage: completion.usage
            ? {
                promptTokens: completion.usage.prompt_tokens,
                completionTokens: completion.usage.completion_tokens,
                totalTokens: completion.usage.total_tokens,
              }
            : undefined,
          model,
        };
      } catch (error) {
        lastError = error as Error;
        if (this.isRateLimitError(error)) {
          rotateKey();
          continue;
        }
        throw new ProviderError(this.formatError(error), this.name);
      }
    }

    throw new ProviderError(lastError?.message || 'All OpenAI keys exhausted', this.name);
  }

  async *stream(prompt: string, options?: ProviderOptions): AsyncIterable<string> {
    const client = getClient();
    const model = this.getModel(options);
    const messages = this.buildMessages(prompt, options?.systemPrompt);

    const stream = await client.chat.completions.create({
      model,
      messages,
      temperature: this.getTemperature(options),
      max_tokens: this.getMaxTokens(options),
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) yield content;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const client = getClient();
      await client.models.list();
      return true;
    } catch {
      return false;
    }
  }

  private isRateLimitError(error: unknown): boolean {
    if (error instanceof OpenAI.RateLimitError) return true;
    const message = (error as Error)?.message?.toLowerCase() || '';
    return message.includes('rate limit') || message.includes('429');
  }

  private formatError(error: unknown): string {
    if (error instanceof OpenAI.APIError) {
      return ${error.status}: ;
    }
    return (error as Error)?.message || 'Unknown error';
  }
}

class ConfigurationError extends AIError {
  constructor(message: string) {
    super(message, 'CONFIGURATION_ERROR', 500);
  }
}
